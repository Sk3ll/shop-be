import * as getProductsList from '@functions/getProductsList/handler';

describe('Functionality getProductsList', () => {
  test('should  return HTTP code 200 when get products data', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { statusCode } = await getProductsList.main({});
    expect(statusCode).toEqual(200);
  });
});
