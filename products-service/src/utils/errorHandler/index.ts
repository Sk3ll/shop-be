import { formatJSONResponse, Response as TypeResponse } from '@libs/apiGateway';

interface Error {
  status: number;
  message: string;
}

export default ({ status = 500, message = 'Internal server error' }: Error): TypeResponse =>
  formatJSONResponse({
    status,
    error: message,
  });
