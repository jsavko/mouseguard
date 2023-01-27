import MouseGuardNPCActorSheetBase from "./svelte/MouseGuardNPCActorSheetBase.svelte"; // import Svelte App
import { writable } from "svelte/store";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class MouseGuardNPCActorSheet extends ActorSheet {
    app = null;
    dataStore = null;

    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["mouseguard", "sheet", "actor"],
            template: "systems/mouseguard/templates/actor-sheetv2.html",
            width: 550,
            height: 600,
            tabs: []
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    getData() {
        const context = super.getData();
        context.systemData = context.system;
        context.sheet = this;

        return context;
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;

        // Item Controls
        html.find(".item-control").click(this._onItemControl.bind(this));
        html.find(".items .rollable").on("click", this._onItemRoll.bind(this));
    }

    /* -------------------------------------------- */

    /**
     * Handle click events for Item control buttons within the Actor Sheet
     * @param event
     * @private
     */
    _onItemControl(event) {
        event.preventDefault();

        // Obtain event data
        const button = event.currentTarget;
        const li = button.closest(".item");
        const item = this.actor.items.get(li?.dataset.itemId);

        // Handle different actions
        switch (button.dataset.action) {
            case "create":
                const cls = getDocumentClass("Item");
                return cls.create(
                    {
                        name: game.i18n.localize("MOUSEGUARD.ItemNew"),
                        type: "item"
                    },
                    { parent: this.actor }
                );
            case "edit":
                return item.sheet.render(true);
            case "delete":
                return item.delete();
        }
    }

    /* -------------------------------------------- */

    /**
     * Listen for roll buttons on items.
     * @param {MouseEvent} event    The originating left click event
     */
    _onItemRoll(event) {
        let button = $(event.currentTarget);
        const li = button.parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        let r = new Roll(button.data("roll"), this.actor.getRollData());
        return r.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<h2>${item.name}</h2><h3>${button.text()}</h3>`
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    _getSubmitData(updateData) {
        let formData = super._getSubmitData(updateData);
        return formData;
    }

    _setMouseDice(count) {
        game.mouseguard.RollCount = count;
        game.mouseguard.updateDisplay(count);
    }

    async _updateActorAbility(id, type, value) {
        await this.actor.updateEmbeddedDocuments("Item", [
            { _id: id, data: { [type]: value } }
        ]);
    }

    async _updateEmbededItem(id, _data) {
        await this.actor.updateEmbeddedDocuments("Item", [
            { _id: id, data: _data }
        ]);
        //console.log(this.actor)
    }

    async _onItemDelete(itemId) {
        const item = this.actor.items.get(itemId);
        item.delete();
        this.render();
    }

    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        // Get the type of item to create.
        const type = header.dataset.type;
        // Grab any data associated with this control.
        const data = duplicate(header.dataset);
        // Initialize a default name.
        const name = `New ${type.capitalize()}`;
        // Prepare the item object.
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        itemData.data = { rank: 1 };
        // Remove the type from the dataset since it's in the itemData.type prop.
        delete itemData.data["type"];
        // Finally, create the item!
        //console.log(itemData);
        return await Item.create(itemData, { parent: this.actor }).then(
            (item) => {
                item.sheet.render(true);
            }
        );
    }

    render(force = false, options = {}) {
        // Grab the sheetdata for both updates and new apps.
        let sheetData = this.getData();
        //console.log(sheetData)
        // Exit if Vue has already rendered.
        if (this.app !== null) {
            let states = Application.RENDER_STATES;
            if (
                this._state == states.RENDERING ||
                this._state == states.RENDERED
            ) {
                // Update the Datastore.
                this.dataStore?.set(sheetData);
                return;
            }
        }
        // Run the normal Foundry render once.
        this._render(force, options)
            .catch((err) => {
                err.message = `An error occurred while rendering ${this.constructor.name} ${this.appId}: ${err.message}`;
                console.error(err);
                this._state = Application.RENDER_STATES.ERROR;
            })
            // Run Svelte's render, assign it to our prop for tracking.
            .then((rendered) => {
                // Prepare the actor data.
                this.dataStore = writable(sheetData);
                //console.log(sheetData);
                this.app = new MouseGuardNPCActorSheetBase({
                    target: this.element.find("form").get(0),
                    props: {
                        dataStore: this.dataStore
                        //name: 'world',
                    }
                });
            });
        // Update editable permission
        options.editable = options.editable ?? this.object.isOwner;

        // Register the active Application with the referenced Documents
        this.object.apps[this.appId] = this;
        // Return per the overridden method.
        return this;
    }

    close(options = {}) {
        if (this.app != null) {
            this.app.$destroy();
            this.app = null;
            this.dataStore = null;
        }
        return super.close(options);
    }
}
