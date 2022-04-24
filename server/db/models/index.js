const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.belongsToMany(Conversation, {through: 'User_Conversations'});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Conversation.belongsToMany(User, {through: 'User_Conversations'});

module.exports = {
  User,
  Conversation,
  Message
};
