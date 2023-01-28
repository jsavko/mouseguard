/**
 * A specialized form used to pop out the editor.
 * @extends {CombatTracker}
 *
 * OPTIONS:
 *
 *
 */

//import { compute_rest_props } from "svelte/internal";

export default class MouseCombatTracker extends CombatTracker {
    constructor(options) {
        super(options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "combat",
            template:
                "systems/mouseguard/templates/sidebar/combat-tracker.html",
            title: "COMBAT.SidebarTitle",
            scrollY: [".directory-list"]
        });
    }

    _getEntryContextOptions() {
        return [
            {
                name: "COMBAT.ConflictCaptain",
                icon: '<i class="fas fa-crown"></i>',
                callback: (li) => {
                    const combatant = this.viewed.combatants.get(
                        li.data("combatant-id")
                    );

                    if (
                        this.viewed.flags.mouseguard.ConflictCaptain ==
                        combatant.id
                    ) {
                        //Unset if self
                        this.viewed.setFlag(
                            "mouseguard",
                            "ConflictCaptain",
                            NaN
                        );
                        return combatant.setFlag(
                            "mouseguard",
                            "ConflictCaptain",
                            false
                        );
                    }
                    if (
                        !!this.viewed.flags.mouseguard.ConflictCaptain == false
                    ) {
                        // New Captain Never had an old one
                        if (combatant) {
                            //Set Flag on New Captain
                            this.viewed.setFlag(
                                "mouseguard",
                                "ConflictCaptain",
                                li.data("combatant-id")
                            );
                            return combatant.setFlag(
                                "mouseguard",
                                "ConflictCaptain",
                                true
                            );
                        }
                    } else {
                        ui.notifications.error(
                            game.i18n.localize("COMBAT.CCSet")
                        );
                        return false;
                    }

                    //Should never get here
                    console.log(this);
                }
            },
            {
                name: "COMBAT.CombatantUpdate",
                icon: '<i class="fas fa-edit"></i>',
                callback: this._onConfigureCombatant.bind(this)
            },
            {
                name: "Console.Log",
                icon: '<i class="fas fa-edit"></i>',
                callback: (li) => {
                    const combatant = this.viewed.combatants.get(
                        li.data("combatant-id")
                    );
                    if (combatant) console.log(combatant);
                }
            },
            {
                name: "COMBAT.CombatantRemove",
                icon: '<i class="fas fa-trash"></i>',
                callback: (li) => {
                    const combatant = this.viewed.combatants.get(
                        li.data("combatant-id")
                    );
                    if (combatant) return combatant.delete();
                }
            }
        ];
    }

    /**
     * Handle a Combatant control toggle
     * @private
     * @param {Event} event   The originating mousedown event
     */
    async _onCombatantControl(event) {
        event.preventDefault();
        event.stopPropagation();
        const btn = event.currentTarget;
        const li = btn.closest(".combatant");
        const combat = this.viewed;
        const c = combat.combatants.get(li.dataset.combatantId);

        // Switch control action
        switch (btn.dataset.control) {
            case "doMove":
                return c.doMove(btn.dataset.move);
            // Toggle combatant visibility
            case "toggleHidden":
                return c.update({ hidden: !c.hidden });

            // Toggle combatant defeated flag
            case "toggleDefeated":
                return this._onToggleDefeatedStatus(c);

            // Roll combatant initiative
            case "rollInitiative":
                return combat.rollInitiative([c.id]);

            // Actively ping the Combatant
            case "pingCombatant":
                return this._onPingCombatant(c);
        }
    }

    async getData(options) {
        let context = await super.getData(options);
        if (context.combat) {
            for (let [i, combatant] of context.combat.turns.entries()) {
                context.turns[i].flags = combatant.flags;
                context.turns[i].isFirstOwner = this.isFirstOwner(
                    combatant.actor
                );
                context.turns[i].hasPlayerOwner = this.hasPlayerOwner(
                    combatant.actor
                );
            }
        }

        //console.log(context);
        return context;
    }

    firstOwner(doc) {
        /* null docs could mean an empty lookup, null docs are not owned by anyone */
        if (!doc) return false;

        const gmOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    !game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);

        if (otherOwners.length > 0) return game.users.get(otherOwners[0]);
        else return game.users.get(gmOwners[0]);
    }

    isFirstOwner(doc) {
        //console.log(this.firstOwner(doc).id)
        return game.user.id === this.firstOwner(doc).id;
    }

    hasPlayerOwner(doc) {
        if (!doc) return false;

        const gmOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.ownership)
            .filter(
                ([id, level]) =>
                    !game.users.get(id)?.isGM &&
                    game.users.get(id)?.active &&
                    level === 3
            )
            .map(([id, level]) => id);

        if (otherOwners.length > 0) return true;
        else return false;
    }
}
