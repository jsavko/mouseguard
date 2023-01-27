import { EntitySheetHelper } from "./helper.js";

/**
 * Extend the base Item document to support attributes and groups with a custom template creation dialog.
 * @extends {Item}
 */
export class MouseGuardItem extends Item {
    /** @inheritdoc */
    prepareDerivedData() {
        super.prepareDerivedData();
        this.system.groups = this.system.groups || {};
        this.system.attributes = this.system.attributes || {};
    }

    /* -------------------------------------------- */
}
