import { EntitySheetHelper } from "./helper.js";
import { ATTRIBUTE_TYPES } from "./constants.js";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class MouseGuardItemSheet extends ItemSheet {
    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["mouseguard", "sheet", "item"],
            template: "systems/mouseguard/templates/item-sheet.html",
            width: 520,
            height: 480,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "description"
                }
            ],
            scrollY: [".attributes"]
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    getData() {
        const context = super.getData();
        //EntitySheetHelper.getAttributeData(context.data);
        context.systemData = context.item.system;
        console.log(context);
        return context;
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async activateListeners(html) {
        super.activateListeners(html);
    }

    /* -------------------------------------------- */
}
