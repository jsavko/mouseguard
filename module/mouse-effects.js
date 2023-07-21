export class EffectsPanel extends Application {
    constructor(...args) {
        super(...args);

        //this.ConflictCaptain = false;
        //this._initialSidebarWidth = ui.sidebar.element.outerWidth();
    }

    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh = foundry.utils.debounce(this.render, 100);

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            ...super.defaultOptions,
            id: "mouseguard-effects-panel",
            popOut: false,
            classes: ["mouseguard"],
            template: "systems/mouseguard/templates/effects/effects-panel.hbs"
        });
    }

    get token() {
        return canvas.tokens.controlled.at(0)?.document ?? null;
    }

    get actor() {
        return this.token?.actor ?? game.user?.character ?? null;
    }

    async getData() {
        let currentStatus = [];
        const { actor } = this;
        if (actor == null) return;
        const { token } = this;
        //const { effects } = actor.itemTypes.effect;
        currentStatus = Array.from(actor.statuses);
        return { currentStatus };
    }

    async refresh(force) {
        return foundry.utils.debounce(this.render.bind(this, force), 100)();
    }
}
