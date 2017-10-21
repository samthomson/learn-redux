var axios = require('axios')

export var changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
    }
}

export var addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    }
}

export var removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    }
}

export var addFilm = (title, genre) => {
    return {
        type: 'ADD_FILM',
        title,
        genre
    }
}
export var removeFilm = (id) => {
    return {
        type: 'REMOVE_FILM',
        id
    }
}

export var startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    }
}

export var completeLocationFetch = url => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    }
}

export var fetchLocation = () => {
    return (dispatch, getState) => {

        dispatch(startLocationFetch())

        axios.get('http://ipinfo.io').then((res) => {
            var { loc } = res.data
            var baseUrl = `http://maps.google.com?q=`
            
            dispatch(completeLocationFetch(baseUrl + loc))
        })
    }
}

