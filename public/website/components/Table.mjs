import React from '../../web_modules/react.js';

/**
 * @param {FilterSet} filterSet
 */
export default function Table(filterSet) {
    return [
        React.createElement('table', {}, [
        React.createElement('colgroup', {}, [
            React.createElement('col', {}),
            React.createElement('col', {}),
            React.createElement('col', {}),
            React.createElement('col', {}),
            React.createElement('col', {}),
            React.createElement('col', {}),
            React.createElement('col', {}),
            React.createElement('col', {}),
        ]),
        React.createElement('tr', {}, [
            React.createElement('th', {rowspan: 2}, 'Type and level of group activity'),
            React.createElement('th', {colspan: 3}, 'Low occupancy'),
            React.createElement('th', {}, ''),
            React.createElement('th', {colspan: 3}, 'High occupancy'),
        ]),
        React.createElement('tr', {}, [
            React.createElement('th', {}, 'Outdoors and well ventilated'),
            React.createElement('th', {}, 'Indoors and well ventilated'),
            React.createElement('th', {}, 'Poorly ventilated'),
            React.createElement('th', {}, ''),
            React.createElement('th', {}, 'Outdoors and well ventilated'),
            React.createElement('th', {}, 'Indoors and well ventilated'),
            React.createElement('th', {}, 'Poorly ventilated'),
        ]),
        React.createElement('tr', {className: 'heading'}, [
            React.createElement('th', {colspan: 8}, 'Wearing face coverings, contact for short time'),
        ]),
        _buildTableRow({title: 'Silent', colors: 'gggggy', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: false, prolongedTime: false, speech: 0})}),
        _buildTableRow({title: 'Speaking', colors: 'gggggy', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: false, prolongedTime: false, speech: 1})}),
        _buildTableRow({title: 'Shouting, singing', colors: 'ggyyyr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: false, prolongedTime: false, speech: 2})}),
        React.createElement('tr', {className: 'heading'}, [
            React.createElement('th', {colspan: 8}, 'Wearing face coverings, contact for prolonged time'),
        ]),
        _buildTableRow({title: 'Silent', colors: 'ggygyr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: false, prolongedTime: true, speech: 0})}),
        _buildTableRow({title: 'Speaking', colors: 'ggyyyr', asterisks: ' * *  ', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: false, prolongedTime: true, speech: 1})}),
        _buildTableRow({title: 'Shouting, singing', colors: 'gyryrr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: false, prolongedTime: true, speech: 2})}),
        React.createElement('tr', {className: 'heading'}, [
            React.createElement('th', {colspan: 8}, 'No face coverings, contact for short time'),
        ]),
        _buildTableRow({title: 'Silent', colors: 'ggyyyr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: true, prolongedTime: false, speech: 0})}),
        _buildTableRow({title: 'Speaking', colors: 'gyyyrr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: true, prolongedTime: false, speech: 1})}),
        _buildTableRow({title: 'Shouting, singing', colors: 'yyrrrr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: true, prolongedTime: false, speech: 2})}),
        React.createElement('tr', {className: 'heading'}, [
            React.createElement('th', {colspan: 8}, 'No face coverings, contact for prolonged time'),
        ]),
        _buildTableRow({title: 'Silent', colors: 'gyryrr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: true, prolongedTime: true, speech: 0})}),
        _buildTableRow({title: 'Speaking', colors: 'yyrrrr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: true, prolongedTime: true, speech: 1})}),
        _buildTableRow({title: 'Shouting, singing', colors: 'yrrrrr', areEnabled: _calculateEnabledForRow(filterSet, {bareFaces: true, prolongedTime: true, speech: 2})}),
    ]),
        React.createElement('div', {className: 'asterisk'}, '* Borderline case that is highly dependent on quantitative definitions of distancing, number of individuals, and time of exposure')
        ];
}

/**
 * @param {FilterSet} filterSet
 * @param {boolean} bareFaces
 * @param {boolean} prolongedTime
 * @param {int} speech
 * @private
 */
function _calculateEnabledForRow(filterSet, {bareFaces, prolongedTime, speech}) {
    if ((filterSet.bareFaces === false && bareFaces) || (filterSet.prolongedTime === false && prolongedTime) || (filterSet.speech !== undefined && filterSet.speech !== speech)
        || (filterSet.bareFaces === true && !bareFaces) || (filterSet.prolongedTime === true && !prolongedTime)) {
        return (new Array(6)).fill(false);
    } else {
        return [
            !filterSet.isCrowded && !filterSet.isInside,
            !filterSet.isCrowded && (filterSet.isInside === undefined || filterSet.isInside) && !filterSet.isPoorlyVentilated,
            !filterSet.isCrowded && (filterSet.isInside === undefined || filterSet.isInside) && (filterSet.isPoorlyVentilated === undefined || filterSet.isPoorlyVentilated),
            (filterSet.isCrowded === undefined || filterSet.isCrowded) && !filterSet.isInside,
            (filterSet.isCrowded === undefined || filterSet.isCrowded) && (filterSet.isInside === undefined || filterSet.isInside) && !filterSet.isPoorlyVentilated,
            (filterSet.isCrowded === undefined || filterSet.isCrowded) && (filterSet.isInside === undefined || filterSet.isInside) && (filterSet.isPoorlyVentilated === undefined || filterSet.isPoorlyVentilated),
        ];
    }
}

/**
 * @param {string} title Row title.
 * @param {string} colors A string of 6 characters, with the letters "g", "y" and "r" for green, yellow, and red.
 * @param {string?} asterisks Maximum 6 characters, with asterisks to print.
 * @param {boolean[]} areEnabled 6 booleans.
 * @private
 */
function _buildTableRow({title, colors, asterisks, areEnabled}) {
    const paddedAsterisks = (asterisks || '').padEnd(6, ' ');
    return React.createElement('tr', {}, [
        React.createElement('th', {className: 'rowHeader'}, title),
        _buildTableCell(colors[0], paddedAsterisks[0].trim(), areEnabled[0]),
        _buildTableCell(colors[1], paddedAsterisks[1].trim(), areEnabled[1]),
        _buildTableCell(colors[2], paddedAsterisks[2].trim(), areEnabled[2]),
        React.createElement('td', {}, ''),
        _buildTableCell(colors[3], paddedAsterisks[3].trim(), areEnabled[3]),
        _buildTableCell(colors[4], paddedAsterisks[4].trim(), areEnabled[4]),
        _buildTableCell(colors[5], paddedAsterisks[5].trim(), areEnabled[5]),
    ]);
}

/**
 * @param {string} colorLetter "g", "y" and "r" for green, yellow, and red.
 * @param {string} content An asterisk, or nothing.
 * @param {boolean} isEnabled
 * @private
 */
function _buildTableCell(colorLetter, content, isEnabled) {
    return React.createElement('td', {className: _resolveColorLetter(colorLetter) + ' ' + (isEnabled ? 'on' : 'off')}, content);
}

/**
 * @param {string} letter "g", "y" and "r"
 * @returns {string} "green", "yellow", or "red".
 * @private
 */
function _resolveColorLetter(letter) {
    return letter === 'g' ? 'green' : (letter === 'y' ? 'yellow' : 'red');
}