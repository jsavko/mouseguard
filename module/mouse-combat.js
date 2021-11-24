/**
 * A specialized form used to pop out the editor.
 * @extends {Combat}
 *
 * OPTIONS:
 *
 *
 */

import MouseSocket from "./socket";

export default class MouseCombat extends Combat {
    constructor(object = {}, options = {}) {
        super(object, options);
    }

    /** @override */
    getData() {
        const context = super.getData();

        return context;
    }

    get getGoal() {
        return this.getFlag("mouseguard", "ConflictCaptain");
    }

    get getConflictCaptain() {
        return this.getFlag("mouseguard", "ConflictCaptain");
    }

    async setConflictCaptain(value) {
        return this.setFlag("mouseguard", "ConflictCaptain", value);
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        this.data.update({
            flags: {
                mouseguard: {
                    ConflictCaptain: NaN,
                    goal: NaN
                }
            }
        });
    }

    static _canUpdate(user, doc, data) {
        if (user.isGM) return true; // GM users can do anything
        const updateKeys = new Set(Object.keys(data));
        const allowedKeys = new Set(["_id", "initiative", "flags"]);
        return updateKeys.isSubset(allowedKeys); // Players may only update initiative scores and flags
    }

    async startCombat() {
        let goal = this.data.flags.mouseguard.goal;
        let CC = this.data.flags.mouseguard.ConflictCaptain;

        if (!CC) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
            return false;
        }
        if (goal == null) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedGoal"));
            this.askGoal();
            return false;
        }

        if (!!goal != false && CC) {
            this.askMove();
            //ui.combat.renderPopout(true)
            return this.update({ round: 1, turn: 0 });
        }
        return false;
    }

    getCCPlayer() {
        let combatant = this.combatants.get(this.getConflictCaptain);
        let actor = game.actors.get(combatant.data.actorId);
        let player;

        // Loop through permisisons looking for not GM
        Object.keys(actor.data.permission).forEach((key) => {
            if (actor.data.permission[key] == 3) {
                //Check if GM if not it's owner
                let user = game.users.get(key);
                if (!user.isGM) player = user;
            }
        });
        return player;
    }

    async askGoal() {
        let CC = this.data.flags.mouseguard.ConflictCaptain;

        if (!CC) {
            ui.notifications.error("A Conflict Captain Must be set");
            return false;
        }

        let player = this.getCCPlayer();
        await game.socket.emit(
            "system.mouseguard",
            { action: "askGoal", combat: this },
            { recipients: [player.data._id] }
        );
    }

    async setGoal(goal) {
        this.setFlag("mouseguard", "goal", goal).then((content) => {
            this.startCombat();
        });

        return true;
    }

    async askMove() {
        let CC = this.data.flags.mouseguard.ConflictCaptain;

        if (!CC) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
            return false;
        }

        let data = { combat: this };
        let actors = [];
        let npc = [];
        //combat.combatants.filter( comb => comb.actor.type == "type" )
        let combatants = this.combatants.filter(
            (comb) => comb.actor.type == "character"
        );
        Object.keys(combatants).forEach((key) => {
            actors.push({
                combatant: combatants[key].id,
                name: combatants[key].token.data.name
            });
        });

        data.actors = actors;
        data.action = "askMoves";

        let player = this.getCCPlayer();

        await game.socket.emit("system.mouseguard", data, {
            recipients: [player.data._id]
        });

        let npccombatants = this.combatants.filter(
            (comb) => comb.actor.type != "character"
        );

        Object.keys(npccombatants).forEach((key) => {
            npc.push({
                combatant: npccombatants[key].id,
                name: npccombatants[key].token.data.name
            });
        });

        data.actors = npc;
        data.npc = true;

        await MouseSocket.askMoves(data);
    }

    async askNPCMove(data) {
        //console.log(data);
        MouseSocket.askMoves(data);
    }

    async nextRound() {
        let turn = 0;
        if (this.settings.skipDefeated) {
            turn = this.turns.findIndex((t) => {
                return !(
                    t.data.defeated ||
                    t.actor?.effects.find(
                        (e) =>
                            e.getFlag("core", "statusId") ===
                            CONFIG.Combat.defeatedStatusId
                    )
                );
            });
            if (turn === -1) {
                ui.notifications.warn("COMBAT.NoneRemaining", {
                    localize: true
                });
                turn = 0;
            }
        }
        let advanceTime =
            Math.max(this.turns.length - this.data.turn, 1) *
            CONFIG.time.turnTime;
        advanceTime += CONFIG.time.roundTime;
        this.askMove();
        return this.update(
            { round: this.round + 1, turn: turn },
            { advanceTime }
        );
    }
}
