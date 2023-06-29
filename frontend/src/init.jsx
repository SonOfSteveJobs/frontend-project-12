import {
  ErrorBoundary,
  Provider as RollbarProvider,
} from '@rollbar/react';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import {
  I18nextProvider,
  initReactI18next,
} from 'react-i18next';
import { Provider } from 'react-redux';
import onSocketEvent from './API/chatAPI';
import App from './Components/App';
import resources from './locales/index.js';
import rollbarConfig from './rollbar/rollbarConfig.js';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './store/channelsSlice';
import { addMessage } from './store/messagesSlice';
import store from './store/store';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const { dispatch } = store;

  onSocketEvent('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });
  onSocketEvent('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });
  onSocketEvent('removeChannel', (payload) => {
    dispatch(removeChannel(payload.id));
  });
  onSocketEvent('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
