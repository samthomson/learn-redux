

var actions = require('./actions/index')
var store = require('./store/configureStore').configure()

console.log('starting redux example')

var defaultState = {
    name: 'Anonymous',
    hobbies: [],
    films: []
}


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

store.dispatch(actions.fetchLocation())

store.dispatch(actions.changeName('Sam'))

store.dispatch(actions.addHobby('Photography'))
store.dispatch(actions.removeHobby(1))

store.dispatch(actions.addFilm('The Shining', 'horror'))
store.dispatch(actions.addFilm('Reservoir dogs', 'classic'))
store.dispatch(actions.removeFilm(2))

store.dispatch(actions.changeName('Samuel'))
