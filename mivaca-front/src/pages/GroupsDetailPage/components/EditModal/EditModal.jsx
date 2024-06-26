import { useState } from 'react';
import PropTypes from 'prop-types';
import * as groupsService from '../../../../services/GroupService';
import Modal from '../../../../components/Modal/Modal';
import TextInput from '../../../../components/TextInput/TextInput';
import ColorPicker from '../../../../components/ColorPicker/ColorPicker';
import Button from '../../../../components/Button/Button';
import schema from './Validations';

const EditModal = ({ group, isModalOpen, setIsModalOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState(group.name);
  const [color, setColor] = useState(group.color);

  const onCreate = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        name,
        color,
        id: group.id,
      },
      {
        abortEarly: false,
      }
    );

    if (error) {
      setMessage(error.details[0].message);
      return;
    }

    setMessage('');
    setIsLoading(true);

    groupsService
      .edit(value)
      .then(() => {
        setIsModalOpen(false);
        onSuccess();
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage(error.response.data.message);
      });
  };

  return (
    <Modal title="Edit Group" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <form onSubmit={onCreate}>
        <div className="flex flex-col gap-4 justify-center">
          <TextInput
            ariaLabel="Group name"
            type="text"
            placeholder="Group name"
            name="groupName"
            icon="people"
            onChange={(value) => setName(value)}
            value={name}
          />
          <ColorPicker onSelected={setColor} selectedColor={color} />
          <Button className="w-full" disabled={isLoading} text="Edit" type="submit" />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

EditModal.propTypes = {
  group: PropTypes.any,
  setIsModalOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

export default EditModal;
