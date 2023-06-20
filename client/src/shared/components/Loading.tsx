import { FC } from 'react';
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps,
} from '@mui/material';
import { Flex } from '.';

const Loading: FC<CircularProgressProps> = (props) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100vw"
  >
    <MuiCircularProgress {...props} size={128} />
  </Flex>
);

export default Loading;
