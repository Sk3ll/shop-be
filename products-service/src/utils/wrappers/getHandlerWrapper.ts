import { formatJSONResponse } from '@libs/apiGateway';
import { HttpStatusCode } from '@utils/constants';
import errorHandler from '@utils/errorHandler';

interface GenericObject {
  [key: string]: any;
}

type Service = (body: any) => Promise<any>;

export default (service: Service) =>
  async (event: GenericObject): Promise<GenericObject> => {
    try {
      console.log(`INFO: ${event}`);
      const data = await service(event.pathParameters?.id);

      return formatJSONResponse({
        status: HttpStatusCode.OK,
        data,
      });
    } catch (e) {
      console.log(`ERROR: status[${e.status || 500}] ${e.message || 'Internal server error'}`);
      return errorHandler(e);
    }
  };
