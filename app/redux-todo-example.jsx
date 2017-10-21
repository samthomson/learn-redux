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
var store = redux.createStore(reducer)


console.log('currentState ', store.getState())
store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'new search text'
})

console.log('currentState ', store.getState())
