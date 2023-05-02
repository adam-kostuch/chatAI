import * as React from 'react';

import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';
import { useChattieContext } from '../../ChattieContext';

import {
  styled,
  List,
  Grid,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  Divider,
  TextField,
} from '@mui/material';

const CustomBorderTextField = styled(TextField)({
  '& label': {
    '&.Mui-focused': {
      color: '#FF6700',
    },
  },
  '.MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiInputBase-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#FCCAA9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF6700',
    },
  },
});

const Search = () => {
  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState<DocumentData>();
  const [err, setErr] = React.useState(false);

  const { db } = useChattieContext();

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('display_name', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === 'Enter' && handleSearch();
  };

  return (
    <Grid item>
      <Grid className="search" item xs={12} style={{ padding: '10px' }}>
        <CustomBorderTextField
          className="search-form"
          id="outlined-basic-email"
          label="Fina a user"
          variant="outlined"
          fullWidth
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      {err && <span>User not found</span>}
      {user && (
        <List className="user-chat">
          <ListItem button key={user.displayName}>
            <ListItemIcon>
              <Avatar alt="" src={user.photoURL} />
            </ListItemIcon>
            <ListItemText primary="Adas Kostuch"></ListItemText>
          </ListItem>
        </List>
      )}
      <Divider />
      <Divider />
    </Grid>
  );
};

export default Search;
