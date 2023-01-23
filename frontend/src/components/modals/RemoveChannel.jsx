import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useApi } from '../../hooks';
import { actions } from '../../store/modalsSlice';

const RemoveChannel = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useApi();
  const [isDisabled, setDisabled] = useState(false);
  const { channel } = useSelector((state) => state.modalsReducer);
  const closeModal = () => {
    dispatch(actions.closeModal());
  };
  const deleteChannel = async () => {
    setDisabled(true);
    try {
      await removeChannel({ id: channel.id });
      toast.success(t('toast.deleteChannelSuccess'));
    } catch (e) {
      toast.error(t(e.message));
      rollbar.error(e);
    } finally {
      dispatch(actions.closeModal());
    }
    return setDisabled(false);
  };
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.removeChannel.body')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2 btn btn-secondary"
            onClick={closeModal}
          >
            {t('modals.removeChannel.canselBtn')}
          </Button>
          <Button
            disabled={isDisabled}
            className="btn btn-danger"
            onClick={deleteChannel}
          >
            {t('modals.removeChannel.deleteBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
