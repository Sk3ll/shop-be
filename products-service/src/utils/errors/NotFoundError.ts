export default class NotFoundError extends Error {
  status;

  constructor(status = 404, message = `This product didn't find`) {
    super(message);
    this.status = status;
  }
}
