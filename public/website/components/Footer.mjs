import React from '../../web_modules/react.js';
import { useI18n } from '../../i18n/components/I18nProvider.mjs';

export default function Footer() {
    const {__} = useI18n();

    return React.createElement('footer', {}, [
        __('This is an open-source project'),
        ' (', React.createElement('a', {href: 'https://github.com/vdavid/covid-19-event-risk-calculator', target: '_blank'}, 'GitHub'), ') © 2020 ',
        React.createElement('a', {href: 'https://david.veszelovszki.hu', target: '_blank'}, __('David Veszelovszki')),
        ' – ', __('inspired by'), ' ',
        React.createElement('a', {href: 'https://www.bmj.com/content/370/bmj.m3223', target: '_blank'}, __('bmj’s article')),
        __('. If you like it, '),
        _buildPayPalDonateButton(),
    ]);
}

function _buildPayPalDonateButton() {
    return React.createElement('span', {className: 'donateButtonContainer', dangerouslySetInnerHTML: {__html: `<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="3XCZV5UDSFJ94" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" src="https://www.paypal.com/en_HU/i/scr/pixel.gif" width="1" height="1" />
</form>`}});
}