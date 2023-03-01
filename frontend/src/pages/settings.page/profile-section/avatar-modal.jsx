import { useRef, useContext } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { useFormikContext } from 'formik';
import Cropper from 'react-cropper';
import styled from 'styled-components';

import { ProfileSectionContext } from './index.jsx';

const CropperStyled = styled(Cropper)`
  max-width: 18.75rem;
  margin-left: auto;
  margin-right: auto;
`;

const AvatarModal = ({ $avatarInput }) => {
  const $cropper = useRef(null);
  const { values, setFieldValue } = useFormikContext();
  const { editFieldsId, setEditFieldsId } = useContext(ProfileSectionContext);

  const handleCropClick = () => {
    $cropper.current.cropper.getCroppedCanvas().toBlob((blob) => {
      const file = new File([blob], 'avatar.png', { type: 'png' });
      setFieldValue('avatar', file);
    });
    $avatarInput.current.value = '';
    setEditFieldsId([...editFieldsId, 'avatar']);
    setFieldValue('avatarModalFile', '');
  };

  const handleCloseClick = () => {
    $avatarInput.current.value = '';
    setFieldValue('avatarModalFile', '');
  };

  return (
    <Modal centered show={values.avatarModalFile}>
      <Modal.Header>
        <span className='fs-4'>Выбор автара</span>
      </Modal.Header>
      <Modal.Body>
        <CropperStyled
          ref={$cropper}
          src={
            values.avatarModalFile &&
            URL.createObjectURL(values.avatarModalFile)
          }
          viewMode={1}
          aspectRatio={1}
        />
      </Modal.Body>
      <Modal.Footer>
        <Col>
          <Button
            className='w-100'
            type='button'
            size='sm'
            variant='success'
            onClick={handleCropClick}
          >
            Принять
          </Button>
        </Col>
        <Col>
          <Button
            className='w-100'
            type='button'
            size='sm'
            variant='danger'
            onClick={handleCloseClick}
          >
            Закрыть
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default AvatarModal;
