export default class MouseSocket {

    static async askGoal(data) { 
        
        data.this = this;
        renderTemplate('systems/mouseguard/templates/parts/conflict-manager.hbs', data).then(dlg => {
            new Dialog({
                title: `Conflict Manager`,
                content: dlg,
                buttons: {
                  ok: {
                    label: "Apply",
                    callback: async (html) => {
                      //Do the thing
                      data.this.goalManager(html,data);
                    },
                  },
                  cancel: {
                    label: "Cancel",
                  },
                },
              }).render(true);
        });

    }

    static async goalManager(html,data) {
        let conflictGoal = html.find("#conflict_goal")[0].value;
        await game.socket.emit('system.mouseguard', {action: "setGoal", combat: data.combat._id, goal:conflictGoal });
    }


    static async setGoal(data) {
        if (game.user.isGM) {
            let combat = game.combats.get(data.combat);
            combat.setFlag('mouseguard','goal',data.goal)
        }
    }

    static async askMoves(data) { 
 
        renderTemplate('systems/mouseguard/templates/parts/conflict-move-manager.hbs', data).then(dlg => {
                    new Dialog({
                        title: `Conflict Manager`,
                        content: dlg,
                        buttons: {
                        ok: {
                            label: "Apply",
                            callback: async (html) => {
                            //TODO: Loop this? 
                            let Move1Actor = html.find("#move0-actor")[0].value;
                            let Move1Move = html.find(".move0:checked").val()  //$('input[name="name_of_your_radiobutton"]:checked').val();
                            let Move2Actor = html.find("#move1-actor")[0].value;
                            let Move2Move = html.find(".move1:checked").val()  //$('input[name="name_of_your_radiobutton"]:checked').val();
                            let Move3Actor = html.find("#move2-actor")[0].value;
                            let Move3Move = html.find(".move2:checked").val()  //$('input[name="name_of_your_radiobutton"]:checked').val();
                            let CombatantData = {[Move1Actor]:[], [Move2Actor]:[], [Move3Actor]: []};
                            CombatantData[Move1Actor].push({id:randomID(), move: Move1Move, combatant: Move1Actor});
                            CombatantData[Move2Actor].push({id:randomID(),move: Move2Move, combatant: Move2Actor});
                            CombatantData[Move3Actor].push({id:randomID(),move: Move3Move, combatant: Move3Actor});
                            let moveData = {action: 'setMoves', combat:data.combat, data: CombatantData};

                            await game.socket.emit('system.mouseguard',moveData);

                        },
                        },
                        cancel: {
                            label: "Cancel",
                        },
                        },
                    }).render(true);
                });
    }

    static async moveManger(html,data){

    }

    static async setMoves(data) {
        if (game.user.isGM) {
            let combat = game.combats.get(data.combat._id);
            let x = Object.keys(data.data).length;
            for (const key of Object.keys(data.data)) {
                let combantant = combat.combatants.get(key);
                await  combantant.setFlag('mouseguard','Moves',data.data[key]);
            }
        }
    }

}

