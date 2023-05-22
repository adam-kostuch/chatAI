import { FC } from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import { SCAMPI } from '@chattie/colors';

const TextField: FC<TextFieldProps> = (props) => (
  <MuiTextField
    {...props}
    variant="standard"
    fullWidth
    sx={{
      input: { color: SCAMPI, fontWeight: 'bold', fontFamily: 'Jura' },
      '& .MuiInput-root:before': {
        borderColor: SCAMPI,
      },
      '& .MuiInput-root:after': {
        borderColor: SCAMPI,
      },
    }}
  />
);

export default TextField;
