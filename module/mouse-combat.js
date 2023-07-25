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

    get getGoal1() {
        return this.getFlag("mouseguard", "goal1");
    }

    get getGoal2() {
        return this.getFlag("mouseguard", "goal2");
    }

    get getConflictCaptain() {
        return this.getFlag("mouseguard", "ConflictCaptain");
    }

    get getConflictCaptainTeam2() {
        return this.getFlag("mouseguard", "ConflictCaptain2");
    }

    async setConflictCaptain(value) {
        return this.setFlag("mouseguard", "ConflictCaptain", value);
    }

    async setConflictCaptainTeam2(value) {
        return this.setFlag("mouseguard", "ConflictCaptain2", value);
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        this.updateSource({
            flags: {
                mouseguard: {
                    ConflictCaptain: null,
                    ConflictCaptain2: null,
                    goal1: null,
                    goal2: null,
                    team1Move: null,
                    team2Move: null
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
        let goal = this.flags.mouseguard.goal1;
        let goal2 = this.flags.mouseguard.goal2;
        let CC = this.flags.mouseguard.ConflictCaptain;
        let CC2 = this.flags.mouseguard.ConflictCaptain2;

        if (!CC) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
            return false;
        }
        if (goal == null) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedGoal"));
            this.askGoal();
            return false;
        }

        if (goal2 == null) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedGoal"));
            this.askGoal();
            return false;
        }

        if (!!goal != false && !!goal2 != false && CC && CC2) {
            this.askMove();
            //ui.combat.renderPopout(true)
            return this.update({ round: 1, turn: 0 });
        }
        return false;
    }

    getCCPlayerByID(conflictCaptainID) {
        let combatant = this.combatants.get(conflictCaptainID);
        let actor = game.actors.get(combatant.actorId);

        return (
            game.users.filter(
                (u) => !u.isGM && actor.testUserPermission(u, "OWNER")
            )?.[0] ?? game.users.activeGM
        );
    }

    async askGoal() {
        let CC = this.flags.mouseguard.ConflictCaptain;
        let CC2 = this.flags.mouseguard.ConflictCaptain2;

        if (!CC) {
            ui.notifications.error("A Conflict Captain Must be set for team 1");
            return false;
        }

        if (!CC2) {
            ui.notifications.error("A Conflict Captain Must be set for team 2");
            return false;
        }

        let player = this.getCCPlayerByID(CC);
        await game.socket.emit(
            "system.mouseguard",
            { action: "askGoal", combat: this, team: "1" },
            { recipients: [player._id] }
        );

        let player2 = this.getCCPlayerByID(CC2);
        await game.socket.emit(
            "system.mouseguard",
            { action: "askGoal", combat: this, team: "2" },
            { recipients: [player2._id] }
        );
    }

    async setGoal(goal, team) {
        this.setFlag("mouseguard", "goal" + team, goal).then((content) => {
            this.startCombat();
        });

        return true;
    }

    // Create a list of combatants for each team then send the conflict captains the modal for moves
    // Filter by combatant.team
    // Need to refactor to include Captains for both teams
    async askMove() {
        let CC = this.flags.mouseguard.ConflictCaptain;
        let CC2 = this.flags.mouseguard.ConflictCaptain2;

        //console.log(CC2);

        if (!CC) {
            ui.notifications.error(game.i18n.localize("COMBAT.NeedCC"));
            return false;
        }

        let data = { combat: this };
        let team1 = [];
        let team2 = [];

        //Team 1
        let combatants = this.combatants.filter((comb) => comb.team == "1");
        Object.keys(combatants).forEach((key) => {
            team1.push({
                combatant: combatants[key].id,
                name: combatants[key].token.name
            });
        });

        data.actors = team1;
        data.action = "askMoves";

        let player = this.getCCPlayerByID(CC);

        await game.socket.emit("system.mouseguard", data, {
            recipients: [player._id]
        });

        let player2 = this.getCCPlayerByID(CC2);
        if (player2 == "undefined") {
            data.npc = true;
        }
        //Team 2
        let team2combatants = this.combatants.filter(
            (comb) => comb.team == "2"
        );

        Object.keys(team2combatants).forEach((key) => {
            team2.push({
                combatant: team2combatants[key].id,
                name: team2combatants[key].token.name
            });
        });

        data.actors = team2;
        //data.npc = true;
        await game.socket.emit("system.mouseguard", data, {
            recipients: [player2._id]
        });

        //await MouseSocket.askMoves(data);
    }

    async askNPCMove(data) {
        //console.log(data);
        MouseSocket.askMoves(data);
    }

    async nextRound() {
        this.askMove();
        super.nextRound();
    }
}
