import React from '../../web_modules/react.js';
import { useI18n } from '../../i18n/components/I18nProvider.mjs';

/**
 * @private
 */
export default function DecisionPoints(filterSet, setFilterSet) {
    const {__} = useI18n();

    const decisionPoints = [
        {question: __('Is the place crowded?'), filterName: 'isCrowded', options: [{title: __('low occupancy'), value: false}, {title: __('high occupancy'), value: true}]},
        {question: __('Is it outside or inside?'), filterName: 'isInside', options: [{title: __('outside'), value: false}, {title: __('inside'), value: true}]},
        {question: __('Is it well ventilated?'), filterName: 'isPoorlyVentilated', options: [{title: __('well ventilated'), value: false}, {title: __('poorly ventilated'), value: true}]},
        {question: __('Do all others near you wear masks?'), filterName: 'bareFaces', options: [{title: __('yes'), value: false}, {title: __('no'), value: true}]},
        {question: __('Are you there for a long time?'), filterName: 'prolongedTime', options: [{title: __('short time'), value: false}, {title: __('prolonged time'), value: true}]},
        {question: __('Are people near you speaking?'), filterName: 'speech', options: [{title: __('silent'), value: 0}, {title: __('speaking'), value: 1}, {title: __('shouting/singing'), value: 2}]},
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

