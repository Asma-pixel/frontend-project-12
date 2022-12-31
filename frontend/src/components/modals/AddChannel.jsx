import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { actions } from '../../store/modalsSlice';
import { actions as channelsActions, selectors } from '../../store/channelsSlice';
import { useApi } from '../../hooks';

const AddChannel = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const channelSchema = yup.string().notOneOf(channelsNames).min(3).max(20);

  const handleResponse = (response) => {
    const { status, data } = response;
    if (status !== 'ok') return status;
    const { id } = data;
    dispatch(channelsActions.changeCurrentChannel(id));
    dispatch(actions.closeModal());
  };
  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: yup.object({ body: channelSchema }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      api.addChannel({ name: values.body }, handleResponse);
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
        <Modal.Title>Добавить канал</Modal.Title>
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

export default AddChannel;
