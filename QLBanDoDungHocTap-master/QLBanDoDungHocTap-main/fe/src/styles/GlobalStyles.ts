import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(180deg, #fff7f7 0%, #f8fafc 35%, #f3f4f6 100%);
    color: #1f2937;
    line-height: 1.5;
  }

  #root {
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
  }

  ::selection {
    background: rgba(227, 30, 36, 0.18);
  }
`
