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
    const { userId: flat } = ctx.params;
    const user = _.get(ctx, `request.body.user`);
    response.data = await userService.updateUser({
      query: { flat },
      update: user
    });
    RESPONSE_HELPER({ ctx, response });
  },

  async getUser(ctx) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    const { flatId: flat } = ctx.params;
    response.data = await userService.getUserbyFlatId(flat);
    RESPONSE_HELPER({ ctx, response });
  },

  async listUsers(ctx) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    response.data = await userService.listUsers();
    RESPONSE_HELPER({ ctx, response });
  },

  async stats(ctx) {
    let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
    response.data = await userService.stats();
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
