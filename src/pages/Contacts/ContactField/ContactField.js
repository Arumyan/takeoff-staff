import React from 'react';

const ContactField = ({
  isEditMode,
  value,
  valueInput,
  name,
  onChangeHandler,
}) => {
  return (
    <div>
      {isEditMode ? (
        <input
          type='text'
          name={name}
          value={valueInput}
          onChange={onChangeHandler}
        />
      ) : (
        value
      )}
    </div>
  );
};

export default ContactField;
