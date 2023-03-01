import PasswordControl from './password-control.jsx';
import ErrorMessage from './error-message.jsx';
import SubmitButton from './submit-button.jsx';

import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-wdith: 100%;
  min-height: 100%;
  background-color: #eee;
`;

const WrapperInner = styled.div`
  width: 100%;
  max-width: 25rem;
  padding: 3.438rem 2.188rem;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  border-radius: 1.25rem;
  -webkit-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;

const AuthLayout = ({ children }) => {
  return (
    <Wrapper>
      <Container className='py-3' fluid>
        <WrapperInner>{children}</WrapperInner>
      </Container>
    </Wrapper>
  );
};

export { PasswordControl, ErrorMessage, SubmitButton };
export default AuthLayout;
