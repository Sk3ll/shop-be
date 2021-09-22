import S3 from "aws-sdk/clients/s3";
import AWS from "aws-sdk";
import { S3Handler } from "aws-lambda";
import csv from "csv-parser";
import SQS from "aws-sdk/clients/sqs";

const BUCKET = "input-service";

export const importFileParser: S3Handler = async (event) => {
  console.log("importFileParser EVENT: ", event);

  try {
    const s3: S3 = new AWS.S3({ region: "eu-west-1" });
    const { Records } = event;
    const s3Streams: Promise<unknown>[] = [];
    const sendMessages: Promise<unknown>[] = [];

    for (const record of Records) {
      const params = {
        Bucket: BUCKET,
        Key: record.s3.object.key,
      };

      const stream = new Promise((resolve, reject) => {
        const s3Stream = s3.getObject(params).createReadStream();

        s3Stream
          .pipe(csv())
          .on("data", (data) => {
            const sqs: SQS = new AWS.SQS({ region: "eu-west-1" });
            console.log(process.env.SQS_URL);
            sendMessages.push(
              new Promise((resolve, reject) => {
                sqs.sendMessage(
                  {
                    MessageBody: JSON.stringify(data),
                    QueueUrl: process.env.SQS_URL,
                  },
                  (err, response) => {
                    if (err) {
                      console.log("Send message error: ", err);
                      return reject(err);
                    }
                    console.log("Send message result: ", response);
                    return resolve(response);
                  }
                );
              })
            );
          })
          .on("end", async () => {
            console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

            const key: string = record.s3.object.key.replace(
              "uploaded",
              "parsed"
            );

            await s3
              .copyObject({
                ...params,
                Key: key,
                CopySource: `${BUCKET}/${params.Key}`,
              })
              .promise();

            await s3.deleteObject(params).promise();

            console.log(`Copy into ${BUCKET}/${key}`);

            resolve();
          })
          .on("error", (err) => {
            reject(err);
          });
      });
      s3Streams.push(stream);
    }
    console.log("s3Streams: ", s3Streams);
    await Promise.allSettled(s3Streams);
    console.log("sendMessages: ", sendMessages);
    await Promise.allSettled(sendMessages);
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};
