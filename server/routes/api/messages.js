const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.patch('/read', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { otherUserId, conversationId } = req.body;
    let currentUnread = 0;

    const updateMessages = await Message.update(
      { recipientRead: true },
      {
        where: {
          senderId: otherUserId,
          conversationId: conversationId
        }
      });

    if (!updateMessages || updateMessages.length === 0) {
      res.sendStatus(403);
    }
    //update unread count in backend
    const messages = await Message.findAll({
      where: {
        senderId: otherUserId,
        conversationId: conversationId
      }
    });

    messages.forEach(message => {
      const messageJSON = message.toJSON()
      if (!messageJSON.recipientRead && messageJSON.senderId === otherUserId) {
        currentUnread += 1;
      }
    });

    res.json({ currentUnread });
  } catch (error) {
    next(error);
  }
})

module.exports = router;
