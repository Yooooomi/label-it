import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    primary: {
      main: '#4380db',
      dark: '#222831',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
      },
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
  },
});
