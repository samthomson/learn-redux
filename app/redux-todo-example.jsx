var redux = require('redux')

console.log('starting redux todo example')

var defaultState = {searchText: '', showCompleted: false, todos: []}

var reducer = (state = defaultState, action) => state
var store = redux.createStore(reducer)

console.log('currentState ', store.getState())