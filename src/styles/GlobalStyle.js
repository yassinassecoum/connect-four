import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --black : #000000;
        --white: #FFFFFF;
        --rose: #FD6687;
        --yellow: #FFCE67; 
        --purple-primary: #5C2DD5;
        --purple-secondary: #7945FF;

    }
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
        text-decoration: none;

    }
    body{
        background-color: var(--purple-primary);
        font-size: 1.2rem;
        color: white;

    }
`;

export default GlobalStyle;
