import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { actions } from '../../store/modalsSlice';
import { actions as channelsActions, selectors } from '../../store/channelsSlice';
import { useApi } from '../../hooks';

const AddChannel = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const api = useApi();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const channelSchema = yup
    .string()
    .notOneOf(channelsNames, 'notUniqueField')
    .min(3, 'incorrectFieldLenth')
    .max(20, 'incorrectFieldLenth')
    .required('emptyField');

  const handleResponse = async (err, response) => {
    if (err) {
      rollbar.error(err);
      dispatch(actions.closeModal());
      toast.error(t('generalErrors.network'));
      return;
    }
    const { status, data } = response;
    if (status !== 'ok') {
      toast.error(t('generalErrors.unknown'));
      return;
    }
    const { id } = data;
    dispatch(channelsActions.setCurrentChannel(id));
    dispatch(actions.closeModal());
    toast.success(t('toast.addChannelSuccess'));
  };
  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: yup.object({ body: channelSchema }),
    onSubmit: async (values) => {
      const filteredName = filter.clean(values.body);
      await api.addChannel({ name: filteredName }, handleResponse);
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const closeModal = () => {
    dispatch(actions.closeModal());
  };
  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-1">
            <Form.Control
              disabled={formik.isSubmitting}
              isInvalid={!formik.isValid}
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
              id="body"
            />
            <Form.Label className="visually-hidden" htmlFor="body">{t('modals.addChannel.label')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {!formik.isValid && t(`modals.errors.${formik.errors.body}`)}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="btn btn-primary mx-1"
            >
              {t('modals.addChannel.addBtn')}
            </Button>
            <Button
              type="submit"
              className="me-2 btn btn-secondary"
              value="Отменить"
              onClick={closeModal}
            >
              {t('modals.addChannel.canselBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
