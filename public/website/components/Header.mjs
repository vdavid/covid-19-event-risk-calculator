import React from '../../web_modules/react.js';
import {useI18n} from '../../i18n/components/I18nProvider.mjs';

/**
 * @typedef {Object} FilterSet
 * @property {boolean|undefined} isCrowded
 * @property {boolean|undefined} isInside
 * @property {boolean|undefined} isPoorlyVentilated
 * @property {boolean|undefined} bareFaces
 * @property {boolean|undefined} prolongedTime
 * @property {int|undefined} speech
 */

export default function Header() {
    const {getActiveLocaleCode, areTranslationsLoaded, __} = useI18n();

    return React.createElement('div', {className: 'header'}, [
        areTranslationsLoaded
            ? React.createElement('div', {className: 'languageSwitcher'},
            (getActiveLocaleCode() === 'en-US')
                ? React.createElement('a', {href: '/hu/'}, [
                    'Magyar változat',
                    React.createElement('img', {className: 'flag', src: '/website/img/hu-flag.png'}),
                ])
                : React.createElement('a', {href: '/en/'}, [
                    'Same in English',
                    React.createElement('img', {className: 'flag', src: '/website/img/us-flag.png'}),
                ])
            ) : '',

        React.createElement('header', {}, [
            React.createElement('h1', {}, __('Covid-19 event risk assessment tool')),
            React.createElement('p', {}, __('Click on some answers to give details on the planned event. See the risk you’re taking if you go.')),
        ]),
    ]);
}
