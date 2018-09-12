const userService = require("./userService");

module.exports = {
  async createUser(ctx, next) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    response.data = await userService.createUser(
      ctx.request.body,
      ctx.state.user
    );
    RESPONSE_HELPER({ ctx, response });
  },

  async updateUser(ctx) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    const { userId: _id } = ctx.params;
    const user = _.get(ctx, `request.body.user`);
    response.data = await userService.updateUser({
      query: { _id },
      update: user
    });
    RESPONSE_HELPER({ ctx, response });
  },

  async listUsers(ctx) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    response.data = await userService.listUsers();
    RESPONSE_HELPER({ ctx, response });
  },

  async listTopUsers(ctx) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    const { count } = ctx.params;
    response.data = await userService.listTopUsers(count);
    RESPONSE_HELPER({ ctx, response });
  },

  async authenticate(ctx, next) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    response.data = await userService.authenticate(ctx.request.body);
    RESPONSE_HELPER({ ctx, response });
  }
};
