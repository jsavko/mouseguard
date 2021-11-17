

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

    prepareDerivedData(){
        super.prepareDerivedData;

    }

      getData() {
        // Get current value
        const context = super.getData();
        //context.data.ConflictCaptain = this.ConflictCaptain;
        return context;
      }

    get ConflictCaptain() {
        return this.getFlag('mouseguard', 'ConflictCaptain');
    }

    async setConflictCaptain(value) {
        return this.setFlag('mouseguard', 'ConflictCaptain', value);
    }


    async SetMove(move) { 
        this.setFlag('mouseguard','Moves',move);
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        this.data.update({
            flags: {
                mouseguard: {
                    ConflictCaptain: false,
                    Moves: [],
                },
            },
        });
    }


    async doMove(id){
        let Moves = this.getFlag('mouseguard', 'Moves');
        //Get the Move being used.
        let theMove = Moves.filter(item => (item.id == id));

        //Send it to chat
        let template = 'systems/mouseguard/templates/chat/combat-action.hbs';
        let data = {actor: [this.actor][0], move: theMove[0].move};

        var RollTemplate = renderTemplate(template, data).then(content => {
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker({ actor: data.actor })
              };
            chatData.content = content;
            ChatMessage.create(chatData);
            
        });

        //Remove move from array and save other moves
        let otherMoves  = Moves.filter(item => (item.id !== id));
        this.SetMove(otherMoves);



    }


}


