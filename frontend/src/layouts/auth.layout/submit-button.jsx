import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import CircleLoader from '../../components/circle-loader.jsx';

const ButtonText = styled.span`
  opacity: ${({ isSubmitting }) => Number(!isSubmitting)};
`;

const SubmitButton = ({ children, isSubmitting }) => {
  return (
    <Button className='position-relative' type='submit'>
      <ButtonText isSubmitting={isSubmitting}>{children}</ButtonText>
      {isSubmitting && (
        <div className='d-flex align-items-center justify-content-center position-absolute top-0 bottom-0 start-0 end-0'>
          <CircleLoader
            loaderSize={17}
            lineWidth={3}
            truckColor='transparent'
            thumbColor='#fff'
          />
        </div>
      )}
    </Button>
  );
};

export default SubmitButton;
