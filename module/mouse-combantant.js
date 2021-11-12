

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
        return this.setFlag('swade', 'ConflictCaptain', value);
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        this.data.update({
            flags: {
                mouseguard: {
                    ConflictCaptain: false,
                },
            },
        });
    }



}


