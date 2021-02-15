import styled from 'styled-components';

export const Input = styled.input`
  background-color: #1E1F27;
  height: 40px;
  width: 300px;
  color: #CFD2E3;
  border: 1px solid #1E1F27;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 30px #1E1F27 inset !important;
    -webkit-text-fill-color: #CFD2E3;
  }
`;
