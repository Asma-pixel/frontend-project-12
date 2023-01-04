import { useTranslation } from 'react-i18next';

const NoFoundPage = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('notFoundPage.text')}</h1>
  );
};
export default NoFoundPage;
