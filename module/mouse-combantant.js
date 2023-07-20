/**
 * A specialized form used to pop out the editor.
 * @extends {Combatant}
 *
 * OPTIONS:
 *
 *
 */

export default class MouseCombatant extends Combatant {
    constructor(...args) {
        super(...args);
        //this.ConflictCaptain = false;
    }

    prepareDerivedData() {
        super.prepareDerivedData();
    }

    getData() {
        // Get current value
        const context = super.getData();
        //context.data.ConflictCaptain = this.ConflictCaptain;
        return context;
    }

    get ConflictCaptain() {
        return this.getFlag("mouseguard", "ConflictCaptain");
    }

    get team() {
        return this.getFlag("mouseguard", "Team");
    }

    async setConflictCaptain(value) {
        return this.setFlag("mouseguard", "ConflictCaptain", value);
    }

    async SetMove(move) {
        this.setFlag("mouseguard", "Moves", move);
    }

    async setTeam(value) {
        return this.setFlag("mouseguard", "Team", value);
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        //console.log(data);
        let init = 0;
        let actor = game.actors.get(data.actorId);
        if (actor.type == "character") init = 1;
        this.updateSource({
            initiative: init,
            flags: {
                mouseguard: {
                    ConflictCaptain: false,
                    Moves: [],
                    Team: 0
                }
            }
        });
    }

    async doMove(id) {
        let Moves = this.getFlag("mouseguard", "Moves");
        //Get the Move being used.
        let theMove = Moves.filter((item) => item.id == id);

        //Send it to chat
        let template = "systems/mouseguard/templates/chat/combat-action.hbs";
        let data = { actor: [this.actor][0], move: theMove[0].move };

        var content = await renderTemplate(template, data);

        let chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: data.actor }),
            flags: { "mouseguard.unflipped": true }
        };
        chatData.content = content;
        ChatMessage.create(chatData);

        //Remove move from array and save other moves
        let otherMoves = Moves.filter((item) => item.id !== id);
        this.SetMove(otherMoves);
    }
}
