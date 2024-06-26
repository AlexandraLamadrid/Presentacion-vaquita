import { useState } from 'react';
import PropTypes from 'prop-types';
import * as groupsService from '../../../../services/GroupService';
import Modal from '../../../../components/Modal/Modal';
import TextInput from '../../../../components/TextInput/TextInput';
import ColorPicker from '../../../../components/ColorPicker/ColorPicker';
import Button from '../../../../components/Button/Button';
import schema from './Validations';

const CreateModal = ({ isModalOpen, setIsModalOpen, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('#FFFFFF');

  const onCreate = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      {
        name,
        color,
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
      .create(value)
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
    <Modal title="New Group" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <form onSubmit={onCreate}>
        <div className="flex flex-col gap-4 justify-center">
          <TextInput
            ariaLabel="Group name"
            type="text"
            placeholder="Group name"
            name="groupName"
            icon="people"
            onChange={(value) => setName(value)}
          />
          <ColorPicker onSelected={setColor} selectedColor={color} />
          <Button className="w-full" disabled={isLoading} text="Create" type="submit" />
        </div>
      </form>
      {message && <p className="text-vaki-red mt-6 text-center">{message}</p>}
    </Modal>
  );
};

CreateModal.propTypes = {
  setIsModalOpen: PropTypes.func,
  onSuccess: PropTypes.func,
  isModalOpen: PropTypes.bool,
};

export default CreateModal;
