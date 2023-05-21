import { FC } from 'react';
import {
  Divider as MuiDivider,
  DividerProps as MuiDividerProps,
} from '@mui/material';
import { GUN_POWDER } from '@chattie/colors';

const Divider: FC<MuiDividerProps> = (props) => (
  <MuiDivider {...props} light sx={{ borderColor: GUN_POWDER }} />
);

export default Divider;
