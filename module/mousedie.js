export class MouseDie extends Die {
    constructor(termData) {
        termData.faces = 6;
        super(termData);
    }

    /* -------------------------------------------- */

    /** @override */
    static DENOMINATION = "m";

    /* -------------------------------------------- */

    /** @override */
    getResultLabel(result) {
        return {
            1: '<img src="systems/mouseguard/assets/dice/snake.png" />',
            2: '<img src="systems/mouseguard/assets/dice/snake.png" />',
            3: '<img src="systems/mouseguard/assets/dice/snake.png" />',
            4: '<img src="systems/mouseguard/assets/dice/sword.png" />',
            5: '<img src="systems/mouseguard/assets/dice/sword.png" />',
            6: '<img src="systems/mouseguard/assets/dice/axe.png" />'
        }[result.result];
    }
}

/* Other Dice Faces Maybe?
        "1": '<img src="systems/mouseguard/assets/dice/dicesnake.webp" />',
        "2": '<img src="systems/mouseguard/assets/dice/dicesnake.webp" />',
        "3": '<img src="systems/mouseguard/assets/dice/dicesnake.webp" />',
        "4": '<img src="systems/mouseguard/assets/dice/dicesword.webp" />',
        "5": '<img src="systems/mouseguard/assets/dice/dicesword.webp" />',
        "6": '<img src="systems/mouseguard/assets/dice/diceaxe.webp" />'
*/

const mouseChatData = async (roll, chatOptions) => {
    const isPrivate = chatOptions.isPrivate;
    return {
        formula: isPrivate ? "???" : roll._formula,
        flavor: isPrivate ? null : chatOptions.flavor,
        user: chatOptions.user,
        tooltip: isPrivate ? "" : await roll.getTooltip(),
        result: isPrivate ? "?" : roll.result,
        dice_count: isPrivate ? "?" : roll.terms[0].number,
        drop: false,
        claimed: roll.claimed ?? false
    };
};

export class MouseRoll extends Roll {
    constructor(...args) {
        super(...args);
    }

    /**
     * Render a DropRoll instance to HTML
     * @param {object} [chatOptions]      An object configuring the behavior of the resulting chat message.
     * @return {Promise<string>}          The rendered HTML template as a string
     */
    async render(chatOptions = {}) {
        chatOptions = foundry.utils.mergeObject(
            {
                user: game.user.id,
                flavor: null,
                template: this.constructor.CHAT_TEMPLATE,
                blind: false
            },
            chatOptions
        );

        // Execute the roll, if needed
        if (!this._evaluated) this.evaluate();

        // Define chat data
        let chatData = await mouseChatData(this, chatOptions);

        // Render the roll display template
        return renderTemplate(chatOptions.template, chatData);
    }

    static CHAT_TEMPLATE = "systems/mouseguard/templates/dice/roll.html";
}
