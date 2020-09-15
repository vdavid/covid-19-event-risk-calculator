import React from './web_modules/react.js';
import {render} from './web_modules/react-dom.js';
import App from './website/components/App.mjs';

render(React.createElement(App, null), document.getElementById('app'));