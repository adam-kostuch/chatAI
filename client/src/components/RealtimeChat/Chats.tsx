import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Fab,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import * as React from 'react';

const Chats = () => {
  return (
    <Grid item xs={9} className="chats">
      <List className="message-area user-chat" sx={{ height: '80vh' }}>
        <ListItem key="1" sx={{ textAlign: 'right' }}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText primary="Hey man, What is up"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary="09:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="2" sx={{ textAlign: 'left' }}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText primary="Hey, Iam Good! What about you ?"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary="09:31"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3" sx={{ textAlign: 'right' }}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <Divider />
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
          />
        </Grid>
        <Grid xs={1} sx={{ textAlign: 'right' }}>
          <Fab color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chats;
