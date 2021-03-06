import styled, {css} from 'styled-components';

//this wil have access to all the component props since calling inside CustomButtonContainer 
//and CustomButtonContainer is getting all the props
const getButtonStyles = props => {
    if(props.isGoogleSignIn){
        return googleSignInStyles
    }
    return props.inverted ? invertedStyles : buttonStyles
}


export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    // background-color: black;
    // color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    // border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;

    // &:hover {
    //     background-color: white;
    //     color: black;
    //     border: 1px solid black;
    // }

    ${getButtonStyles}
`;

const googleSignInStyles = css`
    background-color: #4285f4;
    color: white;

    &:hover {
    background-color: #357ae8;
    border: none;
    }
`;

const invertedStyles = css`
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
    background-color: black;
    color: white;
    border: none;
    }
`;

const buttonStyles = css`
    background-color: black;
    color: white;
    border: none;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`;


//Another way to give custom styles just for example
 //let's say in html, we have.. 

 //<<div classname="Text" isActive={true}></div>

//  const Text = styled.div`
//     color:red;
//     font-size:28px;
//     border: ${(props) => props.isActive ? '1px solid black' : '3px dotted green'};
//  `;

//  <Text isActive={true}></Text>