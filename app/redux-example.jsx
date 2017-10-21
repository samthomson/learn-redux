var redux = require('redux')
var axios = require('axios')

console.log('starting redux example')

var defaultState = {
    name: 'Anonymous',
    hobbies: [],
    films: []
}

var oldReducer = (state = defaultState, action) => {

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

// name reducer and action generators
// ----------------------------------
var nameReducer = (state = 'anonymous', action) => {
    switch(action.type) {
        case 'CHANGE_NAME': return action.name
        default: return state
    }
}
var changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
}

// hobby reducer and action generators
// ----------------------------------
var nextHobbyId = 1 
var hobbiesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_HOBBY':
            return [
                ...state,
                {
                    id: nextHobbyId++,
                    hobby: action.hobby
                }
            ]
        case 'REMOVE_HOBBY':
            return state.filter((hobby) => {
                    return hobby.id !== action.id
                })
        default: return state
    }
}
var addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
}
var removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
}

// films reducer and action generators
// ----------------------------------
var nextMovieId = 1
var filmsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_FILM':
            return [
                ...state,
                {
                    id: nextMovieId++,
                    title: action.title,
                    genre: action.genre
                }
            ]
        case 'REMOVE_FILM':
            return state.filter((film) => {
                return film.id !== action.id
            })
        default: return state
    }
}
var addFilm = (title, genre) => {
    return {
        type: 'ADD_FILM',
        title,
        genre
    }
}
var removeFilm = (id) => {
    return {
        type: 'REMOVE_FILM',
        id
    }
}


// Map reducer and action generators
// ----------------------------------
var mapReducer = (state = { isFetching: false, url: undefined }, action) => {
    switch (action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true,
                url: undefined
            }
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            }
        default: return state
    }
}
var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
}
var completeLocationFetch = url => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
}
var fetchLocation = () => {
    store.dispatch(startLocationFetch())

    axios.get('http://ipinfo.io').then((res) => {
        var { loc } = res.data
        var baseUrl = `http://maps.google.com?q=`
        
        store.dispatch(completeLocationFetch(baseUrl + loc))
    })
}

var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    films: filmsReducer,
    map: mapReducer
})

var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension () : f => f
));


// subscribe to changes
var unsubscribe = store.subscribe(() => {
    var state = store.getState()

    console.log('new state', state)
    
    if (state.map.isFetching) {
        document.getElementById('app').innerHTML = 'Loading..'
    } else if (state.map.url) {
        document.getElementById('app').innerHTML = `<a target="_blank" href="${state.map.url}">view your location</a>`
    }
})

fetchLocation()

store.dispatch(changeName('Sam'))

store.dispatch(addHobby('Photography'))
store.dispatch(removeHobby(1))

store.dispatch(addFilm('The Shining', 'horror'))
store.dispatch(addFilm('Reservoir dogs', 'classic'))
store.dispatch(removeFilm(2))

store.dispatch(changeName('Samuel'))
