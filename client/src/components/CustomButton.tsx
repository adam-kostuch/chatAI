import { signOut } from '@firebase/auth';
import { Button, styled } from '@mui/material';
import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useChattieContext } from 'src/ChattieContext';
import { COOKIE_TOKEN } from 'src/types';

type ButtonActionType = 'LOG OUT' | 'SIGN UP';

interface ICustomButton {
  backgroundColor: string;
  color: string;
  buttonText: ButtonActionType;
}

const CustomButton: FC<ICustomButton> = ({
  backgroundColor,
  color,
  buttonText,
}) => {
  const { auth } = useChattieContext();
  const [, , removeCookie] = useCookies();

  const CustomButtonWrapper = styled(Button)(({ theme }) => ({
    backgroundColor: backgroundColor,
    maxWidth: '100px',
    color: color,
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '10px',
    display: 'block',
    marginLeft: '20px',
    '&:hover': {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: backgroundColor,
      outline: '1px solid',
      outlineOffset: '-1px',
    },
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 'auto', 3, 'auto'),
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      width: '90%',
    },
  }));

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => removeCookie(COOKIE_TOKEN))
      .catch((error) => {
        console.error("Couldn't sign out user!", error);
      });
  };

  return (
    <CustomButtonWrapper
      onClick={() => {
        buttonText === 'LOG OUT' && handleSignOut();
      }}
    >
      {buttonText}
    </CustomButtonWrapper>
  );
};

export default CustomButton;
