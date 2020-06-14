import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1.6rem;
    background: #F9F9F9;
  }
  
  * { 
    box-sizing: border-box;
  }
`;

export const Theme: React.FC = ({ children }) => (
  <>
    <GlobalStyle />
    {children}
  </>
);
