import { FC } from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

const Typography: FC<TypographyProps> = (props) => (
  <MuiTypography {...props} fontFamily="Jura" fontWeight="bold" />
);

export default Typography;
