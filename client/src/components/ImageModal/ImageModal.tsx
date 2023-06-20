import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar as MuiAvatar,
  Grid,
  Button,
  DialogActions,
} from '@mui/material';
import { WOODSMOKE, VANILLA_WHITE } from '@chattie/colors';
import { Typography } from 'src/shared/components';
import { mappedAvatarImages } from 'src/utils';
import { APPROX_BLUE } from '@chattie/colors';
import { GUN_POWDER } from '@chattie/colors';

export type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageNumber: string;
  handleImageChange: (idx: string) => void;
};

type ImageModalContentProps = Omit<ImageModalProps, 'isOpen'>;

const ImageModal = (props: ImageModalProps) => {
  const { isOpen, onClose } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      className="profile-picture-modal"
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
      <ImageModalContent {...props} />
    </Dialog>
  );
};

export default ImageModal;

const ImageModalContent = ({
  onClose,
  imageNumber,
  handleImageChange,
}: ImageModalContentProps) => {
  return (
    <>
      <DialogTitle className="profile-picture-modal-title">
        <Typography fontSize="1.75rem">Choose your profile picture!</Typography>
      </DialogTitle>
      <DialogContent
        className="profile-picture-modal-content"
        sx={{ pt: 0, my: 2 }}
      >
        <Grid
          container
          gap={3}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {mappedAvatarImages.map((image, idx) => (
            <Avatar
              key={idx}
              index={JSON.stringify(idx)}
              image={image}
              imageNumber={imageNumber}
              handleImageChange={handleImageChange}
            />
          ))}
        </Grid>
      </DialogContent>
      <DialogActions className="profile-picture--modal-actions">
        <Button
          onClick={() => onClose()}
          className="profile-picture--modal-actions-cancel-button"
          sx={{
            color: APPROX_BLUE,
            fontFamily: 'Jura',
            '&:hover': {
              backgroundColor: VANILLA_WHITE,
              opacity: 0.05,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onClose()}
          variant="contained"
          className="profile-picture-modal-actions-submit-button"
          sx={{
            bgcolor: APPROX_BLUE,
            fontFamily: 'Jura',
            ':hover': {
              bgcolor: GUN_POWDER,
              color: APPROX_BLUE,
            },
          }}
        >
          Update Picture!
        </Button>
      </DialogActions>
    </>
  );
};

type AvatarProps = {
  index: string;
  image: string;
  imageNumber: string;
  handleImageChange: (idx: string) => void;
};

const Avatar = ({
  index,
  imageNumber,
  image,
  handleImageChange,
}: AvatarProps) => {
  return (
    <MuiAvatar
      src={image}
      onClick={() => handleImageChange(index)}
      sx={{
        height: 64,
        width: 64,
        '&:hover': {
          cursor: 'pointer',
          opacity: '0.5',
        },
        opacity: imageNumber === index ? '0.5' : '1',
      }}
    />
  );
};
