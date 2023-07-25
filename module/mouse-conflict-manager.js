import MouseGuardConflictManager from "./svelte/MouseGuardConflictManager.svelte"; // import Svelte App
import { writable } from "svelte/store";

export class MouseConflictManager extends Application {
    constructor(...args) {
        super(...args);
    }

    app = null;
    dataStore = null;

    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh = foundry.utils.debounce(this.render, 100);

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            ...super.defaultOptions,
            id: "mouseguard-conflict-panel",
            classes: ["mouseguard"],
            template: "systems/mouseguard/templates/actor-sheetv2.html",
            width: 850,
            height: 600
        });
    }

    render(force = false, options = {}) {
        // Grab the sheetdata for both updates and new apps.
        let sheetData = this.getData();
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
                this.app = new MouseGuardConflictManager({
                    target: this.element.find("form").get(0),
                    props: {
                        dataStore: this.dataStore
                        //name: 'world',
                    }
                });
            });
        // Update editable permission
        //options.editable = options.editable ?? this.object.isOwner;

        // Register the active Application with the referenced Documents
        //this.object.apps[this.appId] = this;
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
