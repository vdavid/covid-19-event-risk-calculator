import React from '../../web_modules/react.js';

/**
 * @param {FilterSet} filterSet
 */
export default function Result(filterSet) {
    const possibleColorLetters = _getAllPossibleSpecificFilterSet(filterSet).map(_getColorLetterForSpecificFilterSet);
    const uniqueLetters = possibleColorLetters.filter((value, index, self) => self.indexOf(value) === index);
    return React.createElement('div', {className: 'result'}, [
        React.createElement('div', {className: 'question'}, 'Are you in danger?'),
        React.createElement('div', {className: 'answer ' + _getResultClass(uniqueLetters)}, _getResultText(uniqueLetters)),
    ]);
}

function _getResultClass(uniqueLetters) {
    return (uniqueLetters.length > 1) ? 'unsure' : (uniqueLetters[0] === 'g' ? 'low' : (uniqueLetters[0] === 'y' ? 'medium' : 'high'));
}

function _getResultText(uniqueLetters) {
    if (uniqueLetters.length > 1) {
        return 'Not sure yet. Give a few more answers.';
    } else {
        if (uniqueLetters[0] === 'g') {
            return 'You are at manageable risk. Take care though.';
        } else if (uniqueLetters[0] === 'y') {
            return 'You are at medium risk. Keep your distance at all times from people outside your household.';
        } else {
            return 'You are at high risk. Avoid/get out of this situation to take care of yourself and others.';
        }
    }
}

/**
 * @param {FilterSet} filterSet
 * @returns {FilterSet[]}
 * @private
 */
function _getAllPossibleSpecificFilterSet(filterSet) {
    /** @type {{FilterSet}[]} */
    return _getAllPermutations(
        _getAllPermutations(
            _getAllPermutations(
                _getAllPermutations(
                    _getAllPermutations(
                        _getAllPermutations([filterSet],
                            'isCrowded', [true, false]),
                        'isInside', [true, false]),
                    'isPoorlyVentilated', [true, false]),
                'bareFaces', [true, false]),
            'prolongedTime', [true, false]),
        'speech', [0, 1, 2]);
}

/**
 *
 * @param {FilterSet[]} filterSetArray
 * @param {string} filterName
 * @param {(boolean|int)[]}possibleValues
 * @returns {FilterSet[]}
 * @private
 */
function _getAllPermutations(filterSetArray, filterName, possibleValues) {
    return filterSetArray.reduce((result, tempFilterSet) =>
            [...result, ...((tempFilterSet[filterName] === undefined)
                ? possibleValues.map(value => ({...tempFilterSet, [filterName]: value}))
                : [tempFilterSet])],
        []);
}

/**
 * @param {FilterSet} filterSet
 * @returns {string} "g", "y" and "r" for green, yellow, and red.
 * @private
 */
function _getColorLetterForSpecificFilterSet(filterSet) {
    const filterStateToColorMap = 'gggggygggggyggyyyrggygyrggyyyrgyryrrggyyyrgyyyrryyrrrrgyryrryyrrrryrrrrr';
    return filterStateToColorMap[filterSet.isCrowded * 3 + filterSet.isInside * 1 + (filterSet.isInside && filterSet.isPoorlyVentilated) * 1 + filterSet.bareFaces * 72 / 2 + filterSet.prolongedTime * 72 / 4 + filterSet.speech * 6];
}
