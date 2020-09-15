import {getDefaultLocaleCodeByNavigatorPreferences} from './i18n/i18nHelper.mjs';

const preferredLocale = getDefaultLocaleCodeByNavigatorPreferences();
window.location.href = (preferredLocale === 'hu-HU') ? '/hu/' : '/en/';
