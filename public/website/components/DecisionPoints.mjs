import React from '../../web_modules/react.js';

/**
 * @private
 */
export default function DecisionPoints(filterSet, setFilterSet) {
    const decisionPoints = [
        {question: 'Is the place crowded?', filterName: 'isCrowded', options: [{title: 'low occupancy', value: false}, {title: 'high occupancy', value: true}]},
        {question: 'Is it outside or inside?', filterName: 'isInside', options: [{title: 'outside', value: false}, {title: 'inside', value: true}]},
        {question: 'Is it well ventilated?', filterName: 'isPoorlyVentilated', options: [{title: 'well ventilated', value: false}, {title: 'poorly ventilated', value: true}]},
        {question: 'Do all others near you wear masks?', filterName: 'bareFaces', options: [{title: 'yes', value: false}, {title: 'no', value: true}]},
        {question: 'Are you there for a long time?', filterName: 'prolongedTime', options: [{title: 'short time', value: false}, {title: 'prolonged time', value: true}]},
        {question: 'Are people near you speaking?', filterName: 'speech', options: [{title: 'silent', value: 0}, {title: 'speaking', value: 1}, {title: 'shouting/singing', value: 2}]},
    ];

    return React.createElement('div', {className: 'decisionPoints'},
        decisionPoints.map(decisionPoint => _buildDecisionPoint(filterSet, setFilterSet, decisionPoint))
    );
}

/**
 * @param {FilterSet} filterSet
 * @param {function(FilterSet): void} setFilterSet
 * @param {string} question
 * @param {string} filterName
 * @param {{title: string, value: boolean|int}[]} options
 * @private
 */
function _buildDecisionPoint(filterSet, setFilterSet, {question, filterName, options}) {
    return React.createElement('div', {className: 'decisionPoint'}, [
        React.createElement('div', {className: 'question'}, question),
        options.map(option => React.createElement('div', {
                className: 'option ' + (filterSet[filterName] === option.value ? 'on' : 'off'),
                onClick: () => _toggleFilter(filterSet, setFilterSet, filterName, option.value)
            }, option.title)
        ),
    ]);
}

/**
 * @param {FilterSet} filterSet
 * @param {function(FilterSet): void} setFilterSet
 * @param {string} filterName
 * @param {boolean|int} value
 * @private
 */
function _toggleFilter(filterSet, setFilterSet, filterName, value) {
    setFilterSet({
        isCrowded: (filterName === 'isCrowded') ? (filterSet.isCrowded === value ? undefined : value) : filterSet.isCrowded,
        isInside: (filterName === 'isInside') ? (filterSet.isInside === value ? undefined : value) : filterSet.isInside,
        isPoorlyVentilated: (filterName === 'isPoorlyVentilated') ? (filterSet.isPoorlyVentilated === value ? undefined : value) : filterSet.isPoorlyVentilated,
        bareFaces: (filterName === 'bareFaces') ? (filterSet.bareFaces === value ? undefined : value) : filterSet.bareFaces,
        prolongedTime: (filterName === 'prolongedTime') ? (filterSet.prolongedTime === value ? undefined : value) : filterSet.prolongedTime,
        speech: (filterName === 'speech') ? (filterSet.speech === value ? undefined : value) : filterSet.speech,
    });
}

