/**
 * A specialized form used to pop out the editor.
 * @extends {FormApplication}
 *
 * OPTIONS:
 *
 *
 */

export default class ConflictTracker extends FormApplication {
    constructor(object = {}, options = {}) {
        super(object, options);

        this.isRunningQueue = false;
        if (options?.menu) {
            this.menu = options.menu;
        }
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "conflict-tracker",
            classes: ["mouseguard"],
            title: "Conflict Tracker",
            template: "systems/mouseguard/templates/conflict-tracker.html"
        });
    }

    /** @override */
    getData() {
        // Get current value
        const context = super.getData();
        context.isGM = game.user.isGM;

        const x = $(window).width();
        //const y = $(window).height();

        //this.position.left = x - 505;
        //this.position.top = y - 75;
        this.position.left = x / 2 - 505 / 2;
        this.position.top = 10;
        this.position.width = 150;
        this.position.height = 105;

        // filter menu based on role.

        //const menu = this.menu.filter((m) => game.user.hasRole(m.minimumRole) || !m.minimumRole);

        // Return data
        return context;
    }

    /** @override */
    async close(options = {}) {}

    /** @override */
    activateListeners(html) {}
}
