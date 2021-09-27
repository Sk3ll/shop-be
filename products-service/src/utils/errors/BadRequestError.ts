import HttpStatusCode from '@utils/constants/HttpStatusCode';

export default class BadRequestError extends Error {
  status;

  constructor(status = HttpStatusCode.BAD_REQUEST, message = `Something went wrong`) {
    super(message);
    this.status = status;
  }
}
