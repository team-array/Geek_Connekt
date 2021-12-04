import styled from "styled-components";

export const Utility = styled.div`
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
  margin-left: 50px;
  margin-right: 50px;
  padding-bottom: 100px ;
  @media (max-width: 555px) {
    padding: 20px 0px 100px 0px;
    grid-column-gap: 50px;
    grid-row-gap: 50px;
    margin-left: 10px;
    margin-right: 10px;
  }
  @media (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 990px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const UtilityAddCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;
