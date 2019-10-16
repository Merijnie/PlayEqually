const initialState = {
    players: []
  };
  function rootReducer(state = initialState, action) {
    if (action.type === "ADD_PLAYERS") {
        return Object.assign({}, state, {
            players: state.players.concat(action.payload)
          });
      
      }
    return state;
  };
  export default rootReducer;