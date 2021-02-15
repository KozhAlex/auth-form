import styled from 'styled-components';

export const Button = styled.button`
  background-color: #855AFF;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  color: #FFF;
  border: 0;
  height: 40px;
  min-width: 300px;

  &:disabled {
    background-color: #85AAFF;
  }

  &:hover {
    cursor: pointer;
  }
`;
