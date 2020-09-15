import {availableLocaleCodes, availableLanguageCodes, defaultLocaleCode} from './locales.mjs';

/**
 * @param {string} navigatorLocaleCode E.g. "en-US" but also "en".
 * @returns {string} E.g. "en-US"
 * @private
 */
function _getLocaleCodeByNavigatorPreference(navigatorLocaleCode) {
    return availableLocaleCodes.find(localeCode => localeCode === navigatorLocaleCode)
        || availableLanguageCodes.find(localeCode => localeCode === navigatorLocaleCode);
}

/**
 * @param {string[]} navigatorPreferences Usually the user's "window.navigator.languages" array that may contain
 *        locale codes (e.g. "es-MX") or language codes (e.g. "es").
 * @returns {string} Always fully qualified, available locale codes. E.g. "en-US". Defaults to "en-US".
 */
export function getDefaultLocaleCodeByNavigatorPreferences(navigatorPreferences = window.navigator.languages) {
    /* Find first preferred locale that we know */
    const preferredNavigatorLocale = navigatorPreferences.find(_getLocaleCodeByNavigatorPreference);

    /* Return our clean locale code */
    return preferredNavigatorLocale ? _getLocaleCodeByNavigatorPreference(preferredNavigatorLocale) : defaultLocaleCode;
}