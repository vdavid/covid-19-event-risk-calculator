import React from '../web_modules/react.js';
import {render} from '../web_modules/react-dom.js';
import App from '../website/components/App.mjs';
import I18nProvider from "../i18n/components/I18nProvider.mjs";
import {availableLocaleCodes} from '../i18n/locales.mjs';

render(React.createElement(I18nProvider, {
        availableLocaleCodes: availableLocaleCodes,
        translationFolderPath: '/i18n/translations/',
        activeLocaleCode: 'en-US',
    },
    React.createElement(App, null)
), document.getElementById('app'));