import {
  List,
  Grid,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
  TextField,
} from '@mui/material';

import * as React from 'react';

const Search = () => {
  return (
    <>
      <Grid item xs={3}>
        <List>
          <ListItem button key="Adas">
            <ListItemIcon>
              <Avatar
                alt="Adas"
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
            </ListItemIcon>
            <ListItemText primary="Adas Kostuch"></ListItemText>
          </ListItem>
        </List>
        <Divider />
        <Grid item xs={12} style={{ padding: '10px' }}>
          <TextField
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Divider />
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
      </Grid>
    </>
  );
};

export default Search;
