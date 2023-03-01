import styled, { css } from 'styled-components';

const ErrorContainer = styled.div`
  padding: 0.9rem 0.75rem;
  color: #ffffff;
  font-size: 0.9rem;
  text-align: center;
  background-color: #b00020;
  border-radius: 0.313rem;
  position: relative;

  ${({ isField }) =>
    isField &&
    css`
      padding-top: 0.375rem;
      padding-bottom: 0.375rem;
      text-align: start;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `}
`;

const ErrorMessage = ({ children, isField }) => {
  return <ErrorContainer isField={isField}>{children}</ErrorContainer>;
};

export default ErrorMessage;
