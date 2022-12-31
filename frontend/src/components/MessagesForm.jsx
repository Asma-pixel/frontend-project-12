import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useApi, useAuth } from '../hooks/index.jsx';

const MessagesForm = () => {
  const api = useApi();
  const auth = useAuth();
  const { currentChannelId } = useSelector((state) => state.channelsReducer);

  const [isDisabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    const { username } = auth.getUser();
    const messageToServer = { channelId: currentChannelId, body: message, username };
    api.addMessage(messageToServer);
    setMessage('');
    setDisabled(true);
  };
  const changeMessage = (e) => {
    const { value } = e.target;
    if (value === '') return setDisabled(true);
    setMessage(e.target.value);
    setDisabled(false);
  };
  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={sendMessage}>
        <InputGroup className="has-validation border-0">
          <Form.Control
            type="text"
            onChange={changeMessage}
            value={message}
            placeholder="Введите сообщение"
            name="text"
            id="text"
            required
            className="border-0 p-0 ps-2 form-control"
          />
          <Button variant="group-vertical border-0" type="submit" disabled={isDisabled}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>

  );
};

export default MessagesForm;
