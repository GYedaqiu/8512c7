import React, { useMemo } from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  const unreadCount = useMemo(() => {
    if(conversation.id) {
      const unreadMessages = conversation.messages.filter(message => !message.recipientRead && message.senderId === otherUser);
      console.log(unreadMessages.length)
      return unreadMessages.length;
    }else {
      return 0;
    }
  },[conversation]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
        <Badge badgeContent={unreadCount}></Badge>
      </Box>
    </Box>
  );
};

export default ChatContent;
