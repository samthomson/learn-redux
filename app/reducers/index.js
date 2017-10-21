
// name reducer and action generators
// ----------------------------------
export var nameReducer = (state = 'anonymous', action) => {
    switch(action.type) {
        case 'CHANGE_NAME': return action.name
        default: return state
    }
}

// hobby reducer and action generators
// ----------------------------------
var nextHobbyId = 1 
export var hobbiesReducer = (state = [], action) => {
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

// Map reducer and action generators
// ----------------------------------

export var mapReducer = (state = { isFetching: false, url: undefined }, action) => {
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
