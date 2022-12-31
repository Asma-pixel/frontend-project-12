import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { actions } from '../../store/modalsSlice';
import { selectors } from '../../store/channelsSlice';
import { useApi } from '../../hooks';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const channels = useSelector(selectors.selectAll);
  const { channel } = useSelector((state) => state.modalsReducer);
  const channelsNames = channels.map((item) => item.name);
  const channelSchema = yup.string().notOneOf(channelsNames).min(3).max(20);

  const handleResponse = (response) => {
    const { status } = response;
    if (status !== 'ok') return;
    dispatch(actions.closeModal());
  };
  const formik = useFormik({
    initialValues: { body: channel.name },
    validationSchema: yup.object({ body: channelSchema }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      api.renameChannel({ id: channel.id, name: values.body }, handleResponse);
      setSubmitting(false);
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Form.Group>
              <Form.Control
                isInvalid={!formik.isValid}
                required
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
                data-testid="input-body"
                name="body"
              />
              <Form.Control.Feedback type="invalid">
                {!formik.isValid ? formik.errors.body : null}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" className="btn btn-primary">Отправить</Button>
              <Button type="submit" className="me-2 btn btn-secondary" value="Отменить" onClick={closeModal}>Отменить</Button>
            </div>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
