import * as getProductById from '@functions/getProductById/handler';

describe('Functionality getProductById', () => {
  const mockID = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
  test('should  return HTTP code 200 when get product data by id', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { statusCode } = await getProductById.main({ pathParameters: { id: mockID } });
    expect(statusCode).toEqual(200);
  });

  test('should  return HTTP code 404 when get product data by id', async () => {
    const mockInvalidID = '666ec4b-b10c-48c5-9345-fc73c48a80aa';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { statusCode } = await getProductById.main({ pathParameters: { id: mockInvalidID } });
    expect(statusCode).toEqual(404);
  });
});
