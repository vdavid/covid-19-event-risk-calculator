export default class I18n {
    /**
     * @param {string[]} availableLocaleCodes E.g. ['en-US', 'hu-HU']. The order doesn't matter.
     * @param {string} translationFolderPath Must end with a slash
     * @param {string} activeLocaleCode E.g. "en-US"
     */
    constructor({availableLocaleCodes, translationFolderPath, activeLocaleCode}) {
        this._availableLocaleCodes = availableLocaleCodes;
        this._translationFolderPath = translationFolderPath;
        this._activeLocaleCode = activeLocaleCode;
        this._translations = {};
    }

    /**
     * @returns {Promise<void>}
     */
    async loadTranslations() {
        /* Load translations in all locales in parallel */
        const localeAndTranslationPromises = this._availableLocaleCodes.map(
            async localeCode => ({localeCode, translations: await this._loadTranslationsForLocale(localeCode)}));
        const localesAndTranslations = await Promise.all(localeAndTranslationPromises);

        /* Load this data to keys in this._translations */
        localesAndTranslations.forEach(localeAndTranslation => this._translations[localeAndTranslation.localeCode] = localeAndTranslation.translations);
    }

    /**
     * @param {string} localeCode Must be one of the active locales.
     */
    setActiveLocale(localeCode) {
        if (this._availableLocaleCodes.includes(localeCode)) {
            this._activeLocaleCode = localeCode;
        } else {
            throw new Error('Invalid locale code to set as active: ' + localeCode);
        }
    }

    /**
     * @returns {string}
     */
    getActiveLocaleCode() {
        return this._activeLocaleCode;
    }

    /**
     * This function replaces placeholders like {this-one} with the values provided.
     * @param {string} localizedString
     * @param {Object<string, string>} values
     * @returns {string}
     * @private
     */
    _replacePlaceholdersInLocalizedString(localizedString, values) {
        return localizedString.replace(/{([\w-]+?)}/g, (match, key) => values[key] || key);
    }

    /**
     * @param {string} phrase
     * @param {string} localeCode
     * @private
     */
    _logMissingPhrase(phrase, localeCode) {
        console.warn('Missing phrase: "' + phrase + '". (Tried to translate it to ' + localeCode + '.)');
    }

    /**
     * @param {string} phrase The phrase to translate.
     *        May contain placeholders in curly braces like in "Hello {name}!"
     * @param {Object<string, string>} [values]
     * @param {string} [localeCode] The locale to translate to.
     * @return {string|Component}
     */
    translate(phrase, values = {}, localeCode = this._activeLocaleCode) {
        if (this._translations[localeCode]) {
            if(typeof phrase === 'string') {
                const localizedString = (this._translations[localeCode][phrase] || {}).translation;
                if (localizedString !== undefined) {
                    if(typeof localizedString === 'string') {
                        return this._replacePlaceholdersInLocalizedString(localizedString, values);
                    } else { /* JSX, placeholder replace is not supported. */
                        return localizedString;
                    }
                } else {
                    if (localeCode !== 'en-US') { /* We don't need translations for the base language. */
                        this._logMissingPhrase(phrase, localeCode);
                    }
                    return this._replacePlaceholdersInLocalizedString(phrase, values);
                }
            } else {
                throw new Error ('The phrase must be a string! ' + phrase + ' is not a string.');
            }
        } else {
            if (Object.keys(this._translations).length !== 0) {
                throw new Error('Invalid locale code for translation: ' + localeCode);
            } else {
                throw new Error('Translations haven’t been loaded yet!');
            }
        }
    }

    /**
     * @param {string} localeCode
     * @returns {Promise<Object<string, {translation:string}>>}
     * @private
     */
    async _loadTranslationsForLocale(localeCode) {
        const {translations} = await import(this._translationFolderPath + localeCode + '.mjs');
        return translations;
    }
}