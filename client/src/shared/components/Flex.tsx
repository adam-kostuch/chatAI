import { FC } from 'react';
import { Box as MuiBox, BoxProps } from '@mui/material';

const Flex: FC<BoxProps> = (props) => <MuiBox {...props} display="flex" />;

export default Flex;
