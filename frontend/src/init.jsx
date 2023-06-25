import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './Components/App';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './store/store';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import rollbarConfig from './rollbar/rollbarConfig.js';
import leoProfanity from 'leo-profanity';

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
