import { createTheme, adaptV4Theme } from '@mui/material/styles';


export const lightTheme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: 'rgb(98, 126, 157)'
    }
  }
}));
