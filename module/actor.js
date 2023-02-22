//import { EntitySheetHelper } from "./helper.js";

/**
 * Extend the base Actor document to support attributes and groups with a custom template creation dialog.
 * @extends {Actor}
 */
export class MouseGuardActor extends Actor {
    /** @inheritdoc */
    prepareDerivedData() {
        super.prepareDerivedData();
        //this.system.groups = this.system.groups || {};
        //this.system.attributes = this.system.attributes || {};
    }

    prepareData() {
        super.prepareData();
        //const actorData = this.data;
        //console.log(actorData);
        this._prepareCharacterData(this);
    }

    _prepareCharacterData(actorData) {
        this.system.itemTypes = this.itemTypes;
        //mergeObject(actorData.data, this.itemTypes)
    }

    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);
        //this.data.update({name: "Some other name"});
        //Create Abilities using localization

        const abilities = [];

        let create_ability;

        if (
            (data.type === "character" || data.type === "mouse") &&
            this.itemTypes.ability.length <= 0
        ) {
            //Setup Abilities
            create_ability = [
                "MOUSEGUARD.MNature",
                "MOUSEGUARD.Will",
                "MOUSEGUARD.Health",
                "MOUSEGUARD.Resources",
                "MOUSEGUARD.Circles"
            ];
        } else if (
            data.type === "weasel" &&
            this.itemTypes.ability.length <= 0
        ) {
            //Setup Abilities
            create_ability = [
                "MOUSEGUARD.WNature",
                "MOUSEGUARD.Will",
                "MOUSEGUARD.Health",
                "MOUSEGUARD.Resources",
                "MOUSEGUARD.Circles"
            ];
        } else if (
            data.type === "animal" &&
            this.itemTypes.ability.length <= 0
        ) {
            //Setup Abilities
            create_ability = [
                game.i18n.localize("MOUSEGUARD.Nature") + " (" + data.name + ")"
            ];
        }

        if (Object(create_ability).length > 0) {
            for (let i of create_ability) {
                abilities.push({
                    name: i,
                    type: "ability"
                });
            }
            this.updateSource({
                items: abilities,
                img: "systems/mouseguard/assets/icons/seated-mouse.svg"
            });
        }
    }
}
