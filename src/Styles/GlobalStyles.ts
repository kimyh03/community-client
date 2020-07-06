import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.blackColor};
        font-size:14px;
        font-family: 'Open Sans', sans-serif;
        width:100%;
        margin: 0;
        margin: auto;
    }
    a {
        color:inherit;
        text-decoration:none;
    }
    li{
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
