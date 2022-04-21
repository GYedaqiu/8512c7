import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, updateMessageReadStatus, lastReadId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} lastRead={lastReadId === message.id} otherUser={otherUser} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            updateMessageReadStatus={updateMessageReadStatus}
            messageId={message.id}
            conversationId={message.conversationId}
            readStatus={message.recipientRead}
            lastReadId={lastReadId}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
