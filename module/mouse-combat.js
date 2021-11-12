

/**
 * A specialized form used to pop out the editor.
 * @extends {Combat}
 *
 * OPTIONS:
 *
 *
 */

export default class MouseCombat extends Combat {

    constructor(object={}, options={}) {
        super(object, options);
      }

    /** @override */
    getData() {
    const context = super.getData();
    return context;
    }

    get getGoal() {
        return this.getFlag('mouseguard', 'ConflictCaptain');
    }

    get getConflictCaptain() {
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
                    ConflictCaptain: NaN,
                    goal: NaN,
                },
            },
        });
    }


    async startCombat() {
        let goal = this.data.flags.mouseguard.goal;
        let CC = this.data.flags.mouseguard.ConflictCaptain;

        if (!CC ) {
            ui.notifications.error("A Conflict Captain Must be set to start a combat");
            return false;
        }
        if (goal == null ) {
            console.log("I need a goal"); 
            return false;
        }

        if (!!goal == false && CC ) return this.update({round: 1, turn: 0});
      }    



}


