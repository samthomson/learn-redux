var redux = require('redux')

console.log('starting redux example')

var reducer = (state = {name: 'Anonymous'}, action) => {
    // state = state || {name: 'Anonymous'}

    console.log('New action ', action)

    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var store = redux.createStore(reducer);

console.log('Current state ', store.getState())

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Sam'
})

console.log('Name should be sam ', store.getState())