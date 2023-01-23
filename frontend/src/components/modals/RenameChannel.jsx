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
import { selectors } from '../../store/channelsSlice';
import { useApi } from '../../hooks';

const RenameChannel = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannel } = useApi();
  const channels = useSelector(selectors.selectAll);
  const { channel } = useSelector((state) => state.modalsReducer);
  const channelsNames = channels.map((item) => item.name);
  const channelSchema = yup
    .string()
    .notOneOf(channelsNames, 'notUniqueField')
    .min(3, 'incorrectFieldLenth')
    .max(20, 'incorrectFieldLenth')
    .required('emptyField');

  const formik = useFormik({
    initialValues: { body: channel.name },
    validationSchema: yup.object({ body: channelSchema }),
    onSubmit: async (values) => {
      try {
        const filteredName = filter.clean(values.body);
        await renameChannel({ id: channel.id, name: filteredName });
        toast.success(t('toast.renameChannelSuccess'));
      } catch (e) {
        rollbar.error(e);
        toast.error(t(e.message));
      } finally {
        dispatch(actions.closeModal());
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
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
        <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-2">
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
            <Form.Label className="visually-hidden" htmlFor="body">{t('modals.renameChannel.label')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {!formik.isValid && t(`modals.errors.${formik.errors.body}`)}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2 btn btn-secondary"
              value="Отменить"
              onClick={closeModal}
            >
              {t('modals.renameChannel.canselBtn')}
            </Button>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              className="btn btn-primary"
            >
              {t('modals.renameChannel.renameBtn')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
