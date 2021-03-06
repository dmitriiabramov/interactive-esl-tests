var data = require('../utils/data.js'),
    // item types that are stored in yml files
    TYPES_IN_YML = ['quiz'],
    uniqId = 1;

/**
 * @param {Immutable#Map} lesson
 * @return {Immutable#Map}
 */
module.exports = function(lesson) {
    var items = lesson.get('items');
    /**
     * change item reference for actual item data
     * if `type` is in the list of things that are stored in .yml files then
     * try to get it from yml data and assoc into [type] key
     *
     * e.g.
     *
     * items: [
     *      {type: 'quiz', id: 'quizes/1'}
     * ]
     *
     * will become
     *
     * items: [
     *      {
     *          type: 'quiz',
     *          id: 'quizes/1',
     *          quiz: {data: 'quiz data here...'}
     *      }
     * ]
     */
    items = items.map(function(item) {
        if (!!~TYPES_IN_YML.indexOf(item.get('type'))) {
            return item
                .set(item.get('type'), data.getIn(item.get('id').split('/')))
                .set('uniqId', generateUniqId());
        }
        return item.set('uniqId', generateUniqId());
    });

    return lesson.set('items', items);
};


// Generate temp uniq id to distinguish elements
function generateUniqId() {
    uniqId > 100000 && (uniqId = 1); // rotate
    return uniqId++;
};
