import styled from 'styled-components';


export const CommentBoxContainer = styled.div`
    width: 900px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: 1035px) {
        width: 700px;
        height: 500px;
    }
    @media screen and (max-width: 768px) {
        width: 600px;
        height: 500px;
    }
    @media screen and (max-width: 572px) {
        width: 500px;
        height: 500px;
    }
    @media screen and (max-width: 468px) {
        width: 420px;
        height: 500px;
    }
`