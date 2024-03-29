/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    // Define template paths to load
    const templatePaths = [
        // Attribute list partial.
        "systems/mouseguard/templates/parts/sheet-attributes.html",
        "systems/mouseguard/templates/parts/sheet-groups.html",
        "systems/mouseguard/templates/sidebar/combatant.html",
        "systems/mouseguard/templates/effects/effects-panel.hbs",
        "systems/mouseguard/templates/effects/effect.hbs"
    ];

    // Load the template parts
    return loadTemplates(templatePaths);
};
