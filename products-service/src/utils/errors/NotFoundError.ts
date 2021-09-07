import HttpStatusCode from '@utils/constants/HttpStatusCode';

export default class NotFoundError extends Error {
  status;

  constructor(status = HttpStatusCode.NOT_FOUND, message = `This product didn't find`) {
    super(message);
    this.status = status;
  }
}
