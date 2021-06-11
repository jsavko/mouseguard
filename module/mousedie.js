export class MouseDie extends Die {
    constructor(termData ) {
        termData.faces=6;
        super(termData);
    }

    /* -------------------------------------------- */

    /** @override */
    static DENOMINATION = "m";

    /* -------------------------------------------- */

    /** @override */
    getResultLabel(result) {
        return {
        "1": '<img src="systems/mouseguard/assets/dice/snake.png" />',
        "2": '<img src="systems/mouseguard/assets/dice/snake.png" />',
        "3": '<img src="systems/mouseguard/assets/dice/snake.png" />',
        "4": '<img src="systems/mouseguard/assets/dice/sword.png" />',
        "5": '<img src="systems/mouseguard/assets/dice/sword.png" />',
        "6": '<img src="systems/mouseguard/assets/dice/axe.png" />'
        }[result.result];
    }
    
}
