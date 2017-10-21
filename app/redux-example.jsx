var redux = require('redux')

console.log('starting redux example')

var defaultState = {
    name: 'Anonymous',
    hobbies: [],
    films: []
}
var nextHobbyId = 1, nextMovieId = 1

var reducer = (state = defaultState, action) => {

    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.name
            }
        case 'ADD_HOBBY':
            return {
                ...state,
                hobbies: [
                    ...state.hobbies,
                    {
                        id: nextHobbyId++,
                        hobby: action.hobby
                    }
                ]
            }
        case 'REMOVE_HOBBY':
            return {
                ...state,
                hobbies: state.hobbies.filter((hobby) => {
                    return hobby.id !== action.id
                })
            }
        case 'ADD_FILM':
            return {
                ...state,
                films: [
                    ...state.films,
                    {
                        id: nextMovieId++,
                        title: action.title,
                        genre: action.genre
                    }
                ]
            }
        case 'REMOVE_FILM':
            return {
                ...state,
                films: state.films.filter((film) => {
                    return film.id !== action.id
                })
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

    console.log('new state', state)
    document.getElementById('app').innerHTML = state.name
})

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Sam'
})

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Photography'
})

store.dispatch({
    type: 'REMOVE_HOBBY',
    id: 1
})

store.dispatch({
    type: 'ADD_FILM',
    title: 'The Shining',
    genre: 'horror'
})

store.dispatch({
    type: 'ADD_FILM',
    title: 'Reservoir dogs',
    genre: 'classic'
})

store.dispatch({
    type: 'REMOVE_FILM',
    id: 2
})


store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Samuel'
})
