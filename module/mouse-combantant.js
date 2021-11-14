

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



}


