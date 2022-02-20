const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },

  // user data (im lazy, its just a json string)
  data: {
    type: String,
    required: false,
    default: "{}",
  },
});

UserSchema.statics.GetDiscordId = (id) => {
  return "discord:" + id;
}

const User = mongoose.model('user', UserSchema);

module.exports = {
  User,
  UserSchema,
};
