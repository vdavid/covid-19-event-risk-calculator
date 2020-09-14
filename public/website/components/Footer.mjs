import React from '../../web_modules/react.js';

export default function Footer() {
    return React.createElement('footer', {}, [
        'Copyright © 2020 ',
        React.createElement('a', {href: 'https://david.veszelovszki.hu', target: '_blank'}, 'David Veszelovszki'),
        '—inspired by ',
        React.createElement('a', {href: 'https://www.bmj.com/content/370/bmj.m3223', target: '_blank'}, 'bmj’s article'),
        '. If you like it:',
        React.createElement('div', {className: 'donateButtonContainer', dangerouslySetInnerHTML: {__html: `<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="3XCZV5UDSFJ94" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" src="https://www.paypal.com/en_HU/i/scr/pixel.gif" width="1" height="1" />
</form>`}})
    ]);
}
