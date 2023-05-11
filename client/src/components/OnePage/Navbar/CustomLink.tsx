import { Button, styled } from '@mui/material';
import React, { FC } from 'react';

interface ICustomLink {
  color: string;
  linkText: string;
}

const CustomLink: FC<ICustomLink> = ({ color, linkText }) => {
  const CustomLinkWrapper = styled(Button)(({ theme }) => ({
    color: color,
    fontSize: '15px',
    fontWeight: 'bold',
    marginLeft: '40px',
    cursor: 'pointer',
    display: 'block',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 'auto', 3, 'auto'),
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      width: '90%',
    },
  }));

  return <CustomLinkWrapper>{linkText}</CustomLinkWrapper>;
};

export default CustomLink;
