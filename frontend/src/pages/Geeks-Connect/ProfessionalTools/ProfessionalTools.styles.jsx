import styled from "styled-components";

export const Utility = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 20px 100px 100px 100px;
    border-bottom: 1px solid #e6e6e6;
    flex-wrap: wrap;
    height: 100%;
    @media (max-width: 555px) {
        padding: 20px 0px 100px 0px;
    }
`;

export const UtilityAddCard = styled.div`
    width:360px;
    height:360px;
    position: relative;
`