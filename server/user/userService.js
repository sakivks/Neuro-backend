const UserModel = MONGOOSE.model("User");
const jwt = require("jsonwebtoken");
const flat = require("flat");

module.exports = {
  async createUser(params) {
    return new UserModel(params.user).save();
  },

  async listUsers() {
    return UserModel.find().exec();
  },

  async listTopUsers(count = 10) {
    return UserModel.find()
      .sort([["score", -1]])
      .limit(parseInt(count, 10))
      .exec();
  },

  async updateUser({ query, update }) {
    let user = await UserModel.findOne(query).exec();
    update = flat(update, { safe: true });
    _.each(update, (value, key) => user.set(key, value));
    return user.save();
  },

  async authenticate(params) {
    const user = await UserModel.findOne({ email: params.user.email })
      .lean()
      .exec();
    if (!(await UserModel.comparePassword(params.user.password, user.password)))
      throw new APP_ERROR({ message: `Invalid password`, status: 401 });
    user.token = jwt.sign({ id: user._id }, GlobalConstant.tokenSecret, {
      expiresIn: GlobalConstant.tokenValidity // expires depend on env
    });
    delete user.password;
    return user;
  }
};
