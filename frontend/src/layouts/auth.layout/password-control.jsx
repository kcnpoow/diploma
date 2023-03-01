import { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import styled from 'styled-components';

const Input = styled(FormControl)`
  padding-right: 2.375rem;
`;

const Toggler = styled.button`
  position: absolute;
  top: 50%;
  right: 0.688rem;
  transform: translateY(-50%);
`;

const PasswordControl = ({ ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleTogglerClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='position-relative'>
      <Input {...props} type={isVisible ? 'text' : 'password'} />
      <Toggler type='button' onClick={handleTogglerClick}>
        {isVisible ? <EyeSlash /> : <Eye />}
      </Toggler>
    </div>
  );
};

export default PasswordControl;
