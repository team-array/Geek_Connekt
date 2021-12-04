import styled from "styled-components";

export const CardGrid = styled.div`
    padding: 10px;
    display: grid;
    overflow: hidden;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-column-gap: 50px;
    justify-content: space-around;
    grid-row-gap: 50px;
    padding-bottom: 100px ;
    @media (max-width: 555px) {
    padding: 20px 10px 100px 10px;
    grid-column-gap: 50px;
    grid-row-gap: 50px;
    }
    @media (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 990px) {
    grid-template-columns: repeat(1, 1fr);
    }
`

// import styled from "styled-components";

// export const Utility = styled.div`
// `;

export const UtilityAddCard = styled.div`
  position: relative;
`;
