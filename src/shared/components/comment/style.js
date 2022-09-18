import styled from 'styled-components';

export const CommentWrapper = styled.div`
    .grid-container {
        position: relative;
    }
    
    .upvoted {
        color: #4f9deb;
    }
`;

export const Points = styled.span`
    position: absolute;
    font-size: 10px;
    margin-top: 0px;
    font-weight: 600;
    left: 20px;
`;

export const VerticalLine = styled.div`
    position: absolute;
    margin-left: 32px;
    border-left: 2px solid #EAEAEA;
    bottom: 15px;
    top: 50px;
`;
