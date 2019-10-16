import React from 'react';

const players = (props) => {
    console.log("players" + props);
    let playerList = null;
    playerList = (
        <div id="playerlist">
         {props.players.map(player => {
                return <p onClick="showDetails()">{player.firstName} {player.lastName}</p>
          })}
        </div>
    )

    return(
        <div>
        <div><h1>Hello Players</h1></div>
        {playerList}
        <div id="playerdetail">
            <h4>Display details of clicked player</h4>
        </div>
      </div>
    )
}

export default players;