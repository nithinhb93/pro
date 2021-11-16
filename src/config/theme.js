/* eslint-disable linebreak-style */
const ThemeConfig = {
  palette: {
    primary: {
      main: '#0073ca',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#757575',
      contrastText: '#FFFFFF',
    },
    prePrimary: {
      main: '#00467f',
      contrastText: '#FFFFFF',
    },
    preSecondary: {
      main: '#36495a',
      contrastText: '#FFFFFF',
    },
  },
  status: {
    success: {
      main: '#18B013',
      light: '#DFF1DE',
    },
    danger: {
      main: '#F14A4A',
      light: '#FFE4E4',
    },
    error: {
      main: '#F14A4A',
      light: '#FFE4E4',
    },
    warning: {
      main: '#FF9A26',
      light: '#FFEBDA',
    },
  },
  typography: {
    fontFamily: ['SF Pro Rounded', 'sans-serif'].join(','),
    h1: {
      fontSize: 56,
    },
    h2: {
      fontSize: 45,
    },
    h3: {
      fontSize: 34,
    },
    h4: {
      fontSize: 23,
    },
    h5: {
      fontSize: 11,
    },
    h6: {
      fontSize: 9,
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: '700',
    },
    subtitle2: {
      fontSize: 20,
      fontWeight: '500',
    },
    body1: {
      fontSize: 12,
      fontWeight: '500',
    },
    body2: {
      fontSize: 12,
      fontWeight: '700',
    },
    button: {
      fontSize: 14,
      fontWeight: '500',
    },
    caption: {
      fontSize: 11,
      fontWeight: '600',
      color: '#888888',
    },
    overline: {
      color: '#EEEEEE',
    },
  },
  overrides: {
    MuiSelect: {
      outlined: {
        '&:focus': {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      outlined: {
        borderRadius: '2px',
      },
      contained: {
        borderRadius: '2px',
      },
    },
    MuiFormLabel: {
      asterisk: {
        color: 'red',
        '&$error': {
          color: 'red',
        },
      },
    },
  },
};

export default ThemeConfig;
