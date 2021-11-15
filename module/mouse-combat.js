

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
        return this.setFlag('mouseguard', 'ConflictCaptain', value);
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
            ui.notifications.error("A Goal must be defined to start a combat. Sending Goal Request to Conflict Captain");
            this.askGoal();
            return false;
        }

        if (!!goal != false && CC ){
            this.askMove();
            return this.update({round: 1, turn: 0});  
        } 
        return false;
      }    

    getCCPlayer() {
        let combatant = this.combatants.get(this.getConflictCaptain);
        let actor = game.actors.get(combatant.data.actorId);
        let player;

        // Loop through permisisons looking for not GM
        Object.keys(actor.data.permission).forEach(key => {
            if(actor.data.permission[key] == 3){
                //Check if GM if not it's owner
                let user = game.users.get(key);
                if (!user.isGM) player = user;
            }
        });
        return player;

    }

    async askGoal() {
        let player = this.getCCPlayer();
        await game.socket.emit('system.mouseguard', {action: "askGoal", combat:this}, {recipients: [player.data._id]});
    }

    async askMove() { 

        let data = {combat: this};
        let actors = [];
        //combat.combatants.filter( comb => comb.actor.type == "type" )
        let combatants = this.combatants.filter( comb => comb.actor.type == "character" );
        Object.keys(combatants).forEach(key => {
            actors.push({combatant: combatants[key]._id, name:combatants[key].token.data.name})
        });

        data.actors = actors;
        data.action = "askMoves";

        let player = this.getCCPlayer();
        await game.socket.emit('system.mouseguard', data, {recipients: [player.data._id]});
    }



}


