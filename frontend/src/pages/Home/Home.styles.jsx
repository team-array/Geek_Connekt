import styled from 'styled-components';
import SocialUpdate from "../../assets/SocialUpdates.svg";
import SocialUpdate1600 from "../../assets/SocialUpdates1600.svg";
import SocialUpdate1300 from "../../assets/SocialUpdates1300.svg";




export const HomePage = styled.div`
    display: flex-column;
    align-items: center;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around; !important;
    align-items: center;
    margin: 1.6rem 3rem;
    height:77vh;
    @media (max-width: 500px) {
        margin: 2rem;
    }
`

export const MainContext = styled.div`
    self-align: center;
    width: 50vw;
    margin-right: auto;
    margin-top: 1rem;
    @media (max-width: 1000px) {
        margin-right: auto;
        margin-left: auto;
        width: 100%;
        p{
            text-align: justify;
        }
    }
    @media (max-width: 500px) {
        margin-right: auto;
        margin-left: auto;
        width: 100%;
        p{
            text-align: justify;
            font-size: 1rem!important;
        }
        h1{
            font-size: 1.4rem!important;
        }
        .MainContextButton{
            font-size: 1rem!important;
        }
    }
`

export const ImgContainer = styled.div`
    // display: block;
    // border: 2px solid #000;
    // padding: 1rem;
    margin-left:auto;
    // margin-right: auto;
    width: 100%;
    height: 100%;
    background-image: url(${SocialUpdate});
    background-repeat: no-repeat;
    margin-top: 3rem;
    @media (max-width: 1600px) {
        background-image: url(${SocialUpdate1600});
    }
    @media (max-width: 1300px) {
        background-image: url(${SocialUpdate1300});
        margin-top: 0rem;

    }
    @media (max-width: 1000px) {
        width: 0%;
        display: none;
        margin-top: 0rem;
    }
`