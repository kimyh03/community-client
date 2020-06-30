import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    @import url('"https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"');
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.blackColor};
        font-size:14px;
        font-family: 'Open Sans', sans-serif;
        width:100%;
        max-width:1200px;
        margin: 0;
        margin: auto;
        height:100%;
    }
    a {
        color:${(props) => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
    button:hover{
        cursor: pointer;
    }
    button:focus{
        outline:none;
    }
`;
