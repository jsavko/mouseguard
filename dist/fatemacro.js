
main();

function main() {
  let playersNames = game.actors.entities.filter((t) => t.data.type === "character").map((p=> p.data.name)); 
  let playerNameList;
  let currentHeroPointsList = '';
  let playerSelected;
  if (actor) {   /* get selected token */
    playerSelected = canvas.tokens.controlled[0].actor.name;        
    playerNameList = `<option value="everyone">Everyone</option>`;  
  } else {
    playerNameList = `<option value="everyone" selected>Everyone</option>`;  
  }    
  playersNames.map((el) => {      
    if (el===playerSelected) {
      playerNameList += `<option value="${el}" selected>${el}</option>`;
    } else {
      playerNameList += `<option value="${el}">${el}</option>`;      
    }    
  });
  
  /* Show actual xp points*/
  let currentHeroPoints = checkHeroFate();
  for (let i = 0; i < currentHeroPoints.length; i++) {
    currentHeroPointsList += '<li>' + currentHeroPoints[i][0] + ' - Fate:' + currentHeroPoints[i][1]+ '</li>';    
  }  
  
  let template = `
  <h2>Choose</h2>
  <p><b>Hero:</b> <select id="playerName" style="width: 200px">${playerNameList}</select></p>
  <p>
    <b>How much points do you want to give?</b> <input id="heroPoints" type="number" min="-10" max="10" style="width: 80px; box-sizing: border-box;border: none;background-color: #2d3748;color: white; text-align: center; " value=1>
  </p>    
  <h2>Current Fate</h2>
  <ul>
    ${currentHeroPointsList}
  </ul>
  `;
  
  new Dialog({
    title: `Fate Manager`,
    content: template,
    buttons: {
      ok: {
        label: "Apply",
        callback: async (html) => {
          //Do the thing
          fatemanager(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}




function checkHeroFate() {
    let heros = [];
    let characters = game.actors.entities.filter((t) => t.data.type === "character");
    characters.forEach( (c) => {
      //console.log(c.data.name + '/ ' + c.data.data.attributes.heroPoints.rank);    
      heros.push([c.data.name, c.data.data.rewards.fate]);
    }); 
    return heros;
  }

  async function fatemanager(html){
    let playerName = html.find("#playerName")[0].value;
    let heroPoints = html.find("#heroPoints")[0].value;  
    if (playerName=='everyone') {    
      updateAllHerosXP(heroPoints);
    } else { 
      updateHeroPoints(playerName, heroPoints);
    }
  }


  async function updateHeroPoints(playerName, heroPoints) {
    let character = game.actors.entities.filter((t) => t.data.type === "character").filter((v) => v.data.name === playerName)[0];
    let currentHeroPoints = parseInt( character.data.data.rewards.fate);
    let total = currentHeroPoints + parseInt( heroPoints );
    await character.update({['data.rewards.fate']: total});
    FateMessage(character, heroPoints);
  }
  
  function updateAllHerosXP(heroPoints) {
    let players = game.actors.entities.filter((t) => t.data.type === "character");
    
    players.map(async player => {    
      let currentHeroPoints = parseInt( player.data.data.rewards.fate);
      let total = currentHeroPoints + parseInt( heroPoints );
      await player.update({['data.rewards.fate']: total});
      FateMessage(player, heroPoints);  
    });
  }


  function FateMessage(player, points) {
    let message = `<h2>${player.data.name}</h2>`;  
    message += `<p>Received <b>${points}</b> Fate.</p>`;  

    let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: message
    };  
    ChatMessage.create(chatData, {});
  }