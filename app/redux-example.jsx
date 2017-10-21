var redux = require('redux')

console.log('starting redux example')

var reducer = (state = {name: 'Anonymous'}, action) => {

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
var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension () : f => f
));


// subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState()

    console.log('name is ', state.name)
    document.getElementById('app').innerHTML = state.name
})
// unsubscribe()

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Sam'
})

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Samuel'
})
