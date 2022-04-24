const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const User = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.findGroupConversation = async function (...userIds) {

  for(let i = 0; i < userIds.length; i++) {
    const userConversations = await User.findOne({
      where: {id: userIds[i]},
      include: Conversation
    })

    const convos = userConversations.conversations;

    for(let j = 0; j < convos.length; j++) {
      const convo = await Conversation.findOne({
        where: {id: convo.id},
        include: User
      });

      const usersInConvo = convo.users.every((user) => {
        return userIds.includes(user.id);
      })

      if(userId.length === convo.users.length && usersInConvo) {
        return convos[j];
      }
    }
  }
}

module.exports = Conversation;
