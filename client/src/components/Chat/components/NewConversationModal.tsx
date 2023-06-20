import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import {
  WOODSMOKE,
  VANILLA_WHITE,
  APPROX_BLUE,
  GUN_POWDER,
  CHARADE,
} from '@chattie/colors';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { useChattieContext } from 'src/ChattieContext';
import { EmailSchema } from 'src/components/LoginPage/LoginPage';
import { Chatter } from 'src/types';
import { LoadingButton } from '@mui/lab';

export type NewConversationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleNewChatters: (chatter: Chatter) => void;
};

const NewConversationModal: FC<NewConversationModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const [isError, setIsError] = useState(false);

  const handleEmailError = (error: boolean) => {
    setIsError(error);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isError}
        autoHideDuration={6000}
        onClose={() => onClose()}
      >
        <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
          Email not found! Chatter with provided email does not exist.
        </Alert>
      </Snackbar>
      <Dialog
        open={isOpen}
        onClose={() => onClose()}
        className="new-chatter-modal"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              bgcolor: WOODSMOKE,
              color: VANILLA_WHITE,
              width: '100%',
              maxWidth: '500px',
            },
          },
        }}
      >
        <NewConversationModalContent
          {...props}
          handleEmailError={handleEmailError}
        />
      </Dialog>
    </>
  );
};

export default NewConversationModal;

type NewConversationModalContentProps = Omit<
  NewConversationModalProps,
  'isOpen'
> & {
  handleEmailError: (error: boolean) => void;
};

const NewConversationModalContent: FC<NewConversationModalContentProps> = ({
  onClose,
  handleNewChatters,
  handleEmailError,
}) => {
  const { db } = useChattieContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true);
    try {
      const usersCollection = collection(db, 'users');
      const usersQuery = query(usersCollection, where('email', '==', email));
      const usersQuerySnapshot = await getDocs(usersQuery);

      if (!usersQuerySnapshot.empty) {
        usersQuerySnapshot.forEach((userDoc) => {
          const chatter = userDoc.data() as Chatter;
          handleNewChatters(chatter);
          onClose();
        });
      } else {
        handleEmailError(true);
        console.log('User not found');
      }
    } catch (error) {
      throw new Error(`Error finding email ${error}`);
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: EmailSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <>
      <DialogTitle className="new-chatter-modal-title">
        Find user to start chatting!
      </DialogTitle>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent className="new-chatter-modal-content" sx={{ pt: 0 }}>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="filled"
            className="new-chatter-modal-content-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            InputLabelProps={{
              style: {
                color: VANILLA_WHITE,
              },
            }}
            InputProps={{
              style: {
                backgroundColor: CHARADE,
                color: VANILLA_WHITE,
              },
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <Box color="red" fontSize={14}>
              {formik.errors.email}
            </Box>
          )}
        </DialogContent>
        <DialogActions className="new-chatter-modal-actions">
          <Button
            onClick={() => onClose()}
            className="new-chatter-modal-actions-cancel-button"
            sx={{
              fontFamily: 'Jura',
              color: APPROX_BLUE,
              '&:hover': {
                backgroundColor: VANILLA_WHITE,
                opacity: 0.05,
              },
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            className="new-chatter-modal-actions-submit-button"
            loading={isLoading}
            sx={{
              bgcolor: APPROX_BLUE,
              ':hover': {
                bgcolor: GUN_POWDER,
                color: APPROX_BLUE,
              },
            }}
          >
            Find chatter!
          </LoadingButton>
        </DialogActions>
      </Box>
    </>
  );
};
