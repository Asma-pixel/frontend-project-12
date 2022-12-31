import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modals = {
  AddChannel,
  RemoveChannel,
  RenameChannel,
};
const DynamicModal = () => {
  const { type } = useSelector((state) => state.modalsReducer);
  if (type === null) return null;
  const CurrentModal = modals[type];
  console.log(modals[type]);
  return <CurrentModal />;
};
export default DynamicModal;
