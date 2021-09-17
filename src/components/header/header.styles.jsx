import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

//logo-container is a link so to style the same, we can just directly pass the component in bracket
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

//Now since option is a common class which has been applied to Link and div 
//so to not repeat the same styling for both the conatiners, 
//we can make 'css' styling instead of 'styled' and use the same in both 

const OptionContainerStyles = css`
    padding: 10px 15px;
    cursor: pointer;
`;

export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`;

export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;

