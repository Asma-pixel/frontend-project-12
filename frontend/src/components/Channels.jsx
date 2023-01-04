import cn from 'classnames';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions, selectors } from '../store/channelsSlice';
import { actions as modalActions } from '../store/modalsSlice';
import DynamicModal from './modals/DynamicModal.jsx';

const ChannelLink = ({ channel, channelId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isActive = channel.id === channelId;
  const btnColor = cn({ 'btn-secondary': isActive, btnWithOutBorder: !isActive });
  const btnClass = cn('w-100 rounded-0 text-start btn text-start text-truncate border-0', btnColor);
  const btnDropDown = cn(
    'flex-grow-0 dropdown-toggle dropdown-toggle-split btn-outline primary border-0',
    btnColor,
    { btnWithOutBorderPrimary: isActive },
  );

  const changeChannel = () => {
    dispatch(actions.setCurrentChannel(channel.id));
  };

  const renderInitialChannel = () => (
    <button type="button" className={btnClass} onClick={changeChannel}>
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
  const renderUserChannel = () => {
    const openModal = (type) => () => {
      dispatch(modalActions.openModal({ type, channel }));
    };
    return (
      <Dropdown
        as={ButtonGroup}
        className="d-flex mt-1"
      >
        {renderInitialChannel()}
        <Dropdown.Toggle variant="" className={btnDropDown}>
          <span className="visually-hidden">АОА</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={openModal('RemoveChannel', channel)}>
            {t('chat.removeChannel')}
          </Dropdown.Item>
          <Dropdown.Item onClick={openModal('RenameChannel', channel)}>
            {t('chat.renameChannel')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  return (
    <li className="nav-item w-100">
      {channel.removable ? renderUserChannel() : renderInitialChannel()}
    </li>
  );
};

const Channels = ({ channelId }) => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const handleShow = () => {
    dispatch(modalActions.openModal({ type: 'AddChannel' }));
  };
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channelsTitle')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShow}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">{t('chat.addChannelSpan')}</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <ChannelLink
            key={channel.id}
            channel={channel}
            channelId={channelId}
          />
        ))}
      </ul>
      <DynamicModal />
    </div>
  );
};

export default Channels;
