import React, {useState} from '../../web_modules/react.js';
import Result from './Result.mjs';
import Table from './Table.mjs';
import DecisionPoints from './DecisionPoints.mjs';
import Footer from './Footer.mjs';

/**
 * @typedef {Object} FilterSet
 * @property {boolean|undefined} isCrowded
 * @property {boolean|undefined} isInside
 * @property {boolean|undefined} isPoorlyVentilated
 * @property {boolean|undefined} bareFaces
 * @property {boolean|undefined} prolongedTime
 * @property {int|undefined} speech
 */

export default function App() {
    /** @type {FilterSet} */
    const [filterSet, setFilterSet] = useState({
        isCrowded: undefined,
        isInside: undefined,
        isPoorlyVentilated: undefined,
        bareFaces: undefined,
        prolongedTime: undefined,
        speech: undefined,
    });
    return [
        React.createElement('header', {}, [
            React.createElement('h1', {}, 'Covid-19 event risk calculator'),
            React.createElement('p', {}, 'Give some specifics about the planned event, see the risk you’re taking if you go.'),
        ]),
        DecisionPoints(filterSet, setFilterSet),
        Result(filterSet),
        Table(filterSet),
        Footer(),
    ];
}
