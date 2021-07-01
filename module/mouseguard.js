/**
 * A simple and flexible system for world-building using an arbitrary collection of character and item attributes
 * Author: Atropos
 */

// Import Modules
import { MouseGuardActor } from "./actor.js";
import { MouseGuardItem } from "./item.js";
import { MouseGuardItemSheet } from "./item-sheet.js";
import { MouseGuardActorSheet } from "./actor-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";
import { createMouseGuardMacro } from "./macro.js";
import { MouseDie } from "./mousedie.js";


/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
  console.log(`Initializing MouseGuard MouseGuard System`);

  /**
   * Set an initiative formula for the system. This will be updated later.
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  game.mouseguard = {
    MouseGuardActor,
    createMouseGuardMacro
  };

  // Define custom Entity classes
  CONFIG.Actor.documentClass = MouseGuardActor;
  CONFIG.Item.documentClass = MouseGuardItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mouseguard", MouseGuardActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mouseguard", MouseGuardItemSheet, { makeDefault: true });

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
    onChange: formula => _simpleUpdateInit(formula, true)
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
    if ( !isValid ) {
      if ( notify ) ui.notifications.error(`${game.i18n.localize("MOUSEGUARD.NotifyInitFormulaInvalid")}: ${formula}`);
      return;
    }
    CONFIG.Combat.initiative.formula = formula;
  }

  /**
   * Slugify a string.
   */
  Handlebars.registerHelper('slugify', function(value) {
    return value.slugify({strict: true});
  });

  // Preload template partials
  await preloadHandlebarsTemplates();
});

/**
 * Macrobar hook.
 */
Hooks.on("hotbarDrop", (bar, data, slot) => createMouseGuardMacro(data, slot));


Hooks.once("init", async function () {
  CONFIG.Dice.terms["m"] = MouseDie;
});



Hooks.once("diceSoNiceReady", (dice3d) => {
  let dicetheme ="mouseguard";
  if (!dicetheme || dicetheme == "mouseguard") {
    dice3d.addSystem({ id: "mouseguard", name: "Mouse Guard" }, true);

    dice3d.addDicePreset(
      {
        type: "dm",
        labels:[
          'systems/mouseguard/assets/dice/snake.png', 
          'systems/mouseguard/assets/dice/snake.png', 
          'systems/mouseguard/assets/dice/snake.png', 
          'systems/mouseguard/assets/dice/sword.png', 
          'systems/mouseguard/assets/dice/sword.png', 
          'systems/mouseguard/assets/dice/axe.png'
        ],
        colorset: "white-m",
        system: "mouseguard",
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
  });
});

 