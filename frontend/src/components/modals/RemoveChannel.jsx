import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks';
import { actions } from '../../store/modalsSlice';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const api = useApi();
  const [isDisabled, setDisabled] = useState(false);
  const { channel } = useSelector((state) => state.modalsReducer);
  const closeModal = () => {
    dispatch(actions.closeModal());
  };
  const handleResponse = (response) => {
    const { status } = response;
    if (status !== 'ok') return toast.error(t('generalErrors.network'));
    dispatch(actions.closeModal());
    toast.success(t('toast.deleteChannelSuccess'));
  };
  const deleteChannel = () => {
    setDisabled(true);
    api.removeChannel({ id: channel.id }, handleResponse);
    setDisabled(false);
  };
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.body')}</p>
        <div className="d-flex justify-content-end">
          <fieldset disabled={isDisabled}>
            <Button
              className="me-2 btn btn-secondary"
              onClick={closeModal}
            >
              {t('modals.removeChannel.canselBtn')}
            </Button>
            <Button
              className="btn btn-danger"
              onClick={deleteChannel}
            >
              {t('modals.removeChannel.deleteBtn')}
            </Button>
          </fieldset>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
