import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat = ({
  user,
  conversations,
  activeConversation,
  postMessage,
  updateMessageReadStatus
}) => {
  const classes = useStyles();

  const conversation = useMemo(() => {
    return conversations
      ? conversations.find(
        (conversation) => conversation.otherUser.username === activeConversation?.otherUsername
      )
      : {}
  }, [conversations, activeConversation]);


  const [lastReadId, setLastReadId] = useState(null);
  const isConversation = (obj) => {
    return obj !== {} && obj !== undefined;
  };

  useEffect(() => {
    conversation && setLastReadId(conversation.lastReadId);
  }, [conversation, lastReadId, activeConversation]);

  return (
    <Box className={classes.root}>
      {isConversation(conversation) && conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            {user && (
              <>
                <Messages
                  messages={conversation.messages}
                  otherUser={conversation.otherUser}
                  userId={user.id}
                  updateMessageReadStatus={updateMessageReadStatus}
                  lastReadId={lastReadId}
                />
                <Input
                  otherUser={conversation.otherUser}
                  conversationId={conversation.id || null}
                  user={user}
                  postMessage={postMessage}
                />
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
