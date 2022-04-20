import React, { useMemo } from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { relativeTimeRounding } from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
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
  unreadText: {
    fontWeight: 600,
    color: "#000000",
  },
  unreadBadge: {
    position: "absolute",
    right: 30,
    top: "50%",

    "& .MuiBadge-badge": {
      backgroundColor: "#3F92FF",
      color: "#FFF",
      fontFamily: "Open Sans",
      fontWeight: "bold",
      fontSize: 12,
    }
  }
}));

const ChatContent = ({ conversation, activeConversation }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  const isActive = activeConversation?.userId === otherUser.id && activeConversation.username === otherUser?.username ? true : false;

  const unreadCount = useMemo(() => {
    if (conversation.id) {
      const unreadMessages = conversation.messages.filter(message => !message.recipientRead && message.senderId === otherUser.id);
      return unreadMessages.length;
    } else {
      return 0;
    }
  }, [conversation, otherUser]);

  const hasUnread = !isActive && unreadCount !== 0;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${classes.previewText} ${hasUnread && classes.unreadText}`}>
          {latestMessageText}
        </Typography>
      </Box>
      <Badge badgeContent={unreadCount} className={classes.unreadBadge} invisible={!hasUnread} />
    </Box>
  );
};

export default ChatContent;
