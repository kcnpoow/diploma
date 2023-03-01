import styled, { css } from 'styled-components';

const mediumRegex = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);

const strongRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

const handlePasswordStrength = (password) => {
  if (strongRegex.test(password)) {
    return css`
      width: 100%;
      background-color: green;
    `;
  }

  if (mediumRegex.test(password)) {
    return css`
      width: 66.6%;
      background-color: orange;
    `;
  }

  if (password) {
    return css`
      width: 33.3%;
    `;
  }
};

const Meter = styled.div`
  height: 0.4rem;
  background-color: #eeeeee;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 100%;
    background-color: red;
    transition: background-color, width 0.3s;
    ${({ password }) => handlePasswordStrength(password)};
  }
`;

const PasswordMeter = ({ password }) => {
  return <Meter password={password} />;
};

export default PasswordMeter;
