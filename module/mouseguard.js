/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 */

// Import Modules
import { MouseGuardActor } from "./actor.js";
import { MouseGuardItem } from "./item.js";
import { MouseGuardItemSheet } from "./item-sheet.js";
import { MouseGuardActorSheet } from "./actor-sheet.js";
import { MouseGuardNPCActorSheet } from "./npcactor-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { createMouseGuardMacro } from "./macro.js";
import { MouseDie, MouseRoll } from "./mousedie.js";
import ConflictTracker from "./conflict-tracker.js";
import MouseCombatant from "./mouse-combantant.js";
import MouseCombat from "./mouse-combat.js";
import MouseCombatTracker from "./mouse-combat-tracker.js";
import MouseSocket from "./socket.js";
//import MouseCombatModal from "./mouse-combat-modal.js";
import { EffectsPanel } from "./mouse-effects.js";
import { MouseConflictManager } from "./mouse-conflict-manager.js";
import { statusEffects } from "./status-effects.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function () {
    console.log(`Initializing MouseGuard MouseGuard System`);

    /**
     * Set an initiative formula for the system. This will be updated later.
     * @type {String}
     */

    let RollCount = 0;
    let RollMessage = "";

    game.mouseguard = {
        MouseGuardActor,
        createMouseGuardMacro,
        RollCount,
        RollMessage,
        updateDisplay,
        MouseDie,
        MouseRoll,
        effectPanel: new EffectsPanel()
    };

    // Define custom Entity classes
    CONFIG.Actor.documentClass = MouseGuardActor;
    CONFIG.Item.documentClass = MouseGuardItem;
    CONFIG.Dice.rolls.push(MouseRoll);

    CONFIG.Combatant.documentClass = MouseCombatant;
    CONFIG.Combat.documentClass = MouseCombat;
    CONFIG.ui.combat = MouseCombatTracker;

    CONFIG.Combat.initiative = {
        formula: "1d20",
        decimals: 2
    };

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("mouseguard", MouseGuardNPCActorSheet, {
        types: ["mouse", "weasel", "animal"],
        makeDefault: true
    });
    console.log("Setting actor Sheet");
    Actors.registerSheet("mouseguard", MouseGuardActorSheet, {
        types: ["character"],
        makeDefault: true
    });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("mouseguard", MouseGuardItemSheet, {
        makeDefault: true
    });

    // Register system settings
    game.settings.register("mouseguard", "macroShorthand", {
        name: "SETTINGS.MouseGuardMacroShorthandN",
        hint: "SETTINGS.MouseGuardMacroShorthandL",
        scope: "world",
        type: Boolean,
        default: true,
        config: true
    });

    // Register initiative setting.
    game.settings.register("mouseguard", "initFormula", {
        name: "SETTINGS.MouseGuardInitFormulaN",
        hint: "SETTINGS.MouseGuardInitFormulaL",
        scope: "world",
        type: String,
        default: "1d20",
        config: true,
        onChange: (formula) => _simpleUpdateInit(formula, true)
    });

    // Retrieve and assign the initiative formula setting.
    const initFormula = game.settings.get("mouseguard", "initFormula");
    _simpleUpdateInit(initFormula);

    /**
     * Update the initiative formula.
     * @param {string} formula - Dice formula to evaluate.
     * @param {boolean} notify - Whether or not to post nofications.
     */
    function _simpleUpdateInit(formula, notify = false) {
        const isValid = Roll.validate(formula);
        if (!isValid) {
            if (notify)
                ui.notifications.error(
                    `${game.i18n.localize(
                        "MOUSEGUARD.NotifyInitFormulaInvalid"
                    )}: ${formula}`
                );
            return;
        }
        CONFIG.Combat.initiative.formula = formula;
    }

    /**
     * Slugify a string.
     */
    Handlebars.registerHelper("slugify", function (value) {
        return value.slugify({ strict: true });
    });

    // Preload template partials
    await preloadHandlebarsTemplates();
});

/**
 * Macrobar hook.
 */
//Hooks.on("hotbarDrop", (bar, data, slot) => createMouseGuardMacro(data, slot));

Hooks.once("init", async function () {
    CONFIG.Dice.terms["m"] = MouseDie;
    CONFIG.Dice.terms["6"] = MouseDie;

    game.socket.on("system.mouseguard", (data) => {
        if (data.action === "askGoal") MouseSocket.askGoal(data);
        if (data.action === "setGoal") MouseSocket.setGoal(data);
        if (data.action === "askMoves") MouseSocket.askMoves(data);
        if (data.action === "setMoves") MouseSocket.setMoves(data);
    });

    await registerTours();
});

//                labels: [
//    "systems/mouseguard/assets/dice/snake.png",
//    "systems/mouseguard/assets/dice/snake.png",
//    "systems/mouseguard/assets/dice/snake.png",
//    "systems/mouseguard/assets/dice/sword.png",
//    "systems/mouseguard/assets/dice/sword.png",
//    "systems/mouseguard/assets/dice/axe.png"
//],
Hooks.once("diceSoNiceReady", (dice3d) => {
    let dicetheme = "mouseguard";
    if (!dicetheme || dicetheme == "mouseguard") {
        dice3d.addSystem({ id: "mouseguard", name: "Mouse Guard" }, true);

        dice3d.addDicePreset(
            {
                type: "dm",
                labels: [
                    "systems/mouseguard/assets/dice/snake.png",
                    "systems/mouseguard/assets/dice/snake.png",
                    "systems/mouseguard/assets/dice/snake.png",
                    "systems/mouseguard/assets/dice/sword.png",
                    "systems/mouseguard/assets/dice/sword.png",
                    "systems/mouseguard/assets/dice/axe.png"
                ],
                colorset: "white",
                system: "mouseguard"
            },
            "d6"
        );
    }

    //sw dice colors

    dice3d.addColorset({
        name: "white-mg",
        description: "Mouse Guard white",
        category: "Colors",
        foreground: "#000000",
        background: "#ffffff",
        outline: "black",
        texture: "none",
        material: "plastic"
    });
});

Hooks.on("renderSidebarTab", (app, html, data) => {
    const template = "./systems/mouseguard/templates/mousetray.html";

    let $chat_form = html.find("#chat-form");
    renderTemplate(template).then((c) => {
        let $content = $(c);
        $chat_form.after($content);
        $content.find(".mouse_dice_button").on("click", (event) => {
            event.preventDefault();
            if (event.currentTarget.classList.contains("add")) {
                game.mouseguard.RollCount++;
            } else {
                game.mouseguard.RollCount--;
            }

            if (game.mouseguard.RollCount < 1) game.mouseguard.RollCount = 0;

            // Render Dice in Dice Pool Area
            updateDisplay(game.mouseguard.RollCount);
        });

        $content.find(".mouse_roll_button").on("click", (event) => {
            event.preventDefault();
            let $self = $(event.currentTarget);
            let dataset = event.currentTarget.dataset;

            if (game.mouseguard.RollCount > 0) {
                let actor =
                    game.user.character ?? canvas.tokens.controlled[0]?.actor;
                var roll = new MouseRoll(game.mouseguard.RollCount + "dmcs>3");
                roll.evaluate({ async: true });
                roll.toMessage({
                    user: game.user.id,
                    flavor: game.mouseguard.RollMessage,
                    speaker: ChatMessage.getSpeaker({ actor: actor })
                });

                game.mouseguard.RollCount = 0;
                game.mouseguard.RollMessage = "";
                updateDisplay(0);
            }
        });

        updateDisplay(game.mouseguard.RollCount);
    });
});

Hooks.once("ready", async () => {
    //const cTracker = new ConflictTracker(undefined, {  });
    //cTracker.render(true);
    // If First time launching the system Start the roll Tour
    let tourRolls = game.user.getFlag("mouseguard", "tourRolls");
    if (tourRolls == undefined) {
        const tour = game.tours.get("mouseguard.welcome");
        tour.start();
        game.user.setFlag("mouseguard", "tourRolls", 1);
    }

    Hooks.on(
        "controlToken",
        game.mouseguard.effectPanel.refresh.bind(
            game.mouseguard.effectPanel,
            true
        )
    );

    for (const hook of [
        "createActiveEffect",
        "updateActiveEffect",
        "deleteActiveEffect"
    ]) {
        Hooks.on(hook, function (effect) {
            if (effect.parent === game.mouseguard.effectPanel.actor)
                game.mouseguard.effectPanel.refresh(true);
        });
    }
});

Hooks.on("renderChatMessage", (chatMessage, [html], messageData) => {
    if (messageData.message.flags?.mouseguard?.unflipped) {
        html.querySelector("img").src =
            "systems/mouseguard/assets/deck/CardBack.webp";

        if (game.user.isGM) {
            html.querySelector(".action-move").insertAdjacentHTML(
                "beforeend",
                ' <button id="reveal-button" type="button">Reveal Card</button> '
            );

            html.querySelector("#reveal-button").addEventListener(
                "click",
                (event) => {
                    let message = game.messages.get(
                        event.target.closest("li").dataset.messageId
                    );
                    message.setFlag("mouseguard", "unflipped", false);
                }
            );
        }
    }
});

Hooks.on("canvasReady", () => {
    // Effect Panel singleton application
    game.mouseguard.effectPanel.render(true);
});

Hooks.once("setup", () => {
    CONFIG.statusEffects = statusEffects;
});

async function registerTours() {
    try {
        game.tours.register(
            "mouseguard",
            "welcome",
            await SidebarTour.fromJSON("/systems/mouseguard/tours/welcome.json")
        );
    } catch (err) {
        console.error(err);
    }
}

function updateDisplay(count) {
    //let $mouse_rolls = html.find('.mouse-dice-roll');

    let diceHTML =
        '<li class="roll mousedie d6"><img src="systems/mouseguard/assets/dice/sword.png" height="24" width="24"></li>';
    let theHTML = "";

    for (let i = 0; i < count; i++) {
        theHTML += diceHTML;
    }

    $(".mouse-dice-roll").html(theHTML);

    $(".mouse_dice_button.subtract").prop("disabled", !count);
    $(".mouse_roll_button").prop("disabled", !count);
    if (!count) game.mouseguard.RollMessage = "";
}

Handlebars.registerHelper("times", function (n, block) {
    var accum = "";
    for (var i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper("concat", function () {
    var outStr = "";
    for (var arg in arguments) {
        if (typeof arguments[arg] != "object") {
            outStr += arguments[arg];
        }
    }
    return outStr;
});

Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
