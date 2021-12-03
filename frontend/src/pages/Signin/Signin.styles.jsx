import styled from "styled-components";
import SigninBg from '../../assets/SigninBg.jpg';

export const ImgBlock = styled.div`
    background-image: url(${SigninBg});
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
`;

export const FormBox = styled.div`
    width: 500px;
    padding: 2rem 4rem;
    background-color: #fff;
    display: block;
    border-radius: 0.23rem;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1);
    margin-left: auto;
    @media (max-width: 846px) {
        margin: auto;
    }
    @media (max-width: 501px) {
        width: 400px;
    }
    @media (max-width: 410px) {
        max-width: 300px;
        padding: 2rem;
    }
`;

export const BgCover = styled.section`
    position: absolute;
    width: 100%; 
    height:100%;
    background:rgba(0,0,0,.5);
    transition: all 1s;
`