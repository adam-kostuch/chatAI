import { FC } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
} from '@mui/material';

const ChatUsers: FC = () => (
  <List>
    <ListItem button key="RemySharp">
      <ListItemIcon>
        <Avatar
          alt="Remy Sharp"
          src="https://material-ui.com/static/images/avatar/1.jpg"
        />
      </ListItemIcon>
      <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
      <ListItemText secondary="online"></ListItemText>
    </ListItem>
    <ListItem button key="Alice">
      <ListItemIcon>
        <Avatar
          alt="Alice"
          src="https://material-ui.com/static/images/avatar/3.jpg"
        />
      </ListItemIcon>
      <ListItemText primary="Alice">Alice</ListItemText>
    </ListItem>
    <ListItem button key="CindyBaker">
      <ListItemIcon>
        <Avatar
          alt="Cindy Baker"
          src="https://material-ui.com/static/images/avatar/2.jpg"
        />
      </ListItemIcon>
      <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
    </ListItem>
  </List>
);

export default ChatUsers;
