import React, {createContext, useState, useEffect, useContext} from '../../web_modules/react.js';
import I18n from '../I18n.mjs';

export const I18nContext = createContext();
export const useI18n = () => useContext(I18nContext);
/**
 * @param children
 * @param {string[]} availableLocaleCodes E.g. ["en-US", "hu-HU"], the order doesn't matter.
 * @param [string] translationFolderPath With a trailing slash please.
 * @param {string} activeLocaleCode E.g. "en-US"
 * @constructor
 */

export default function I18nProvider({
                                         children,
                                         availableLocaleCodes,
                                         translationFolderPath,
                                         activeLocaleCode
                                     }) {
    const [i18n, setI18n] = useState(null);
    useEffect(() => {
        async function loadTranslations() {
            const i18n = new I18n({
                availableLocaleCodes,
                translationFolderPath,
                activeLocaleCode
            });
            await i18n.loadTranslations();
            setI18n(i18n);
        } // noinspection JSIgnoredPromiseFromCall

        loadTranslations();
    }, []);
    return React.createElement(I18nContext.Provider, {
        value: {
            setActiveLocale: i18n ? i18n.setActiveLocale.bind(i18n) : undefined,
            getActiveLocaleCode: i18n ? i18n.getActiveLocaleCode.bind(i18n) : undefined,
            areTranslationsLoaded: !!i18n,
            __: (...args) => i18n ? i18n.translate.apply(i18n, args) : args[0]
        }
    }, children);
}