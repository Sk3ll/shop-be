import { formatJSONResponse, Response as TypeResponse } from '@libs/apiGateway';
import { HttpStatusCode } from '@utils/constants';

interface Error {
  status: number;
  message: string;
}

export default ({
  status = HttpStatusCode.INTERNAL_SERVER_ERROR,
  message = 'Internal server error',
}: Error): TypeResponse =>
  formatJSONResponse({
    status,
    error: message,
  });
