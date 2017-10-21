var redux = require('redux')

console.log('starting redux todo example')

var defaultState = {searchText: '', showCompleted: false, todos: []}

var reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
            }
        default:
            return state;
    }
}
var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension () : f => f
))

// subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState()

    console.log('search text is ', state.searchText)
    document.getElementById('app').innerHTML = state.searchText
})


console.log('currentState ', store.getState())
store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'new search text'
})
store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: '1'
})
store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: '2'
})

console.log('currentState ', store.getState())
