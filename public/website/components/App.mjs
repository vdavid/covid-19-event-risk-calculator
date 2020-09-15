import {useState} from '../../web_modules/react.js';
import Header from './Header.mjs';
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
        Header(),
        DecisionPoints(filterSet, setFilterSet),
        Result(filterSet),
        Table(filterSet),
        Footer(),
    ];
}
