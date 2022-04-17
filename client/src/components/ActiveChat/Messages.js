import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, updateMessageReadStatus} = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        if(message.senderId !== userId && !message.recipientRead) {
          const body = {
            messageId: message.id,
            conversationId: message.conversationId
          }
          console.log('read message',  message.recipientRead);
          updateMessageReadStatus(body);
        }
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
