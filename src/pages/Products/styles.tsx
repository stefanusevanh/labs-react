import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const PageHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
export const PageTitle = styled.h3`
  display: flex;
  align-self: flex-start;
  font-size: 1.5rem;
  font-weight: 600;
`;
