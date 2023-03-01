import { useContext } from 'react';
import { useFormikContext } from 'formik';

import { ProfileSectionContext } from './index.jsx';

const ToggleButton = ({ fieldId, onCancel }) => {
  const { initialValues, setFieldError, setFieldValue } = useFormikContext();
  const { editFieldsId, setEditFieldsId } = useContext(ProfileSectionContext);

  const handleClick = () => {
    if (editFieldsId.includes(fieldId)) {
      setFieldValue(fieldId, initialValues[fieldId]);
      setFieldError(fieldId, '');
      setEditFieldsId(
        editFieldsId.filter((curFieldId) => curFieldId !== fieldId)
      );

      if (onCancel) {
        onCancel();
      }
    } else {
      setEditFieldsId([...editFieldsId, fieldId]);
    }
  };

  return (
    <button
      className={`${
        editFieldsId.includes(fieldId) ? 'text-danger' : 'text-primary'
      }`}
      type='button'
      onClick={handleClick}
    >
      {editFieldsId.includes(fieldId) ? 'отменить' : 'изменить'}
    </button>
  );
};

export default ToggleButton;
