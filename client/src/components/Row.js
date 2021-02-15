import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0;
  align-items: ${props => props.align || 'normal'};
`;
