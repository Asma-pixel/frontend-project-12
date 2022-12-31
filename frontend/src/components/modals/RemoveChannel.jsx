import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';

const AddChannel = () => {
  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values) => {
      const a = values;
      return a;
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
            />
          </Form.Group>
          <Button type="submit" className="btn btn-primary mt-2" value="Добавить" />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
