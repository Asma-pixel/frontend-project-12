import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useFormik } from 'formik';
import { useApi, useAuth } from '../hooks/index.jsx';

const MessagesForm = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const { addMessage } = useApi();
  const { user } = useAuth();
  const { currentChannelId } = useSelector((state) => state.channelsReducer);
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, { resetForm }) => {
      const tempValues = values;
      const { username } = user;
      const messageToServer = {
        channelId: currentChannelId,
        body: filter.clean(tempValues.message),
        username,
      };
      try {
        await addMessage(messageToServer);
        resetForm();
      } catch (e) {
        toast.error(t(e.message));
        rollbar.error(e);
      }
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup className="has-validation border-0">
          <Form.Control
            disabled={formik.isSubmitting}
            type="text"
            onChange={formik.handleChange}
            value={formik.values.message}
            placeholder={t('chat.sendMessagePlaceholder')}
            aria-label={t('chat.sendMessageAriaLabel')}
            name="message"
            id="message"
            required
            className="border-0 p-0 ps-2 form-control"
          />
          <Button variant="group-vertical border-0" type="submit" disabled={formik.values.message === '' || formik.isSubmitting}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
            <span className="visually-hidden">{t('chat.sendMessageBtn')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesForm;
