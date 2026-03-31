import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      dark: string;
      gray: string;
      lightGray: string;
      white: string;
      success: string;
      warning: string;
      danger: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
