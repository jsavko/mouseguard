

/**
 * A specialized form used to pop out the editor.
 * @extends {CombatTracker}
 *
 * OPTIONS:
 *
 *
 */

import { compute_rest_props } from "svelte/internal";

export default class MouseCombatTracker extends CombatTracker {



	static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
        id: "combat",
        template: "systems/mouseguard/templates/sidebar/combat-tracker.html",
        title: "Combat Tracker",
        scrollY: [".directory-list"]
      });
    }

    _getEntryContextOptions() {
        return [
            {
                name: "COMBAT.ConflictCaptain",
                icon: '<i class="fas fa-crown"></i>',
                callback: li => {
                    const combatant = this.viewed.combatants.get(li.data("combatant-id"));

                    if (this.viewed.data.flags.mouseguard.ConflictCaptain == combatant.id) {
                        //Unset if self
                        this.viewed.setFlag('mouseguard','ConflictCaptain', NaN)
                        return combatant.setFlag('mouseguard','ConflictCaptain',false)
                    } 
                    if (!!this.viewed.data.flags.mouseguard.ConflictCaptain == false) {
                        // New Captain Never had an old one
                        if ( combatant ) {
                            //Set Flag on New Captain
                            this.viewed.setFlag('mouseguard','ConflictCaptain', li.data("combatant-id"))
                            return combatant.setFlag('mouseguard','ConflictCaptain',true)
                        }
                    } else {
                        ui.notifications.error("A Conflict Captain Has Already Been Set");
                        return false;
                    }

                    //Should never get here
                     console.log(this)
                }
              },
          {
            name: "COMBAT.CombatantUpdate",
            icon: '<i class="fas fa-edit"></i>',
            callback: this._onConfigureCombatant.bind(this)
          },
          {
            name: "Console.Log",
            icon: '<i class="fas fa-edit"></i>',
            callback: li => {
                const combatant = this.viewed.combatants.get(li.data("combatant-id"));
                if ( combatant ) console.log(combatant);
              }
          },
          {
            name: "COMBAT.CombatantRemove",
            icon: '<i class="fas fa-trash"></i>',
            callback: li => {
              const combatant = this.viewed.combatants.get(li.data("combatant-id"));
              if ( combatant ) return combatant.delete();
            }
          }
        ];
      }


      activateListeners(html) {
        super.activateListeners(html);
      }

        /**
   * Handle a Combatant control toggle
   * @private
   * @param {Event} event   The originating mousedown event
   */
  async _onCombatantControl(event) {
    event.preventDefault();
    event.stopPropagation();
    const btn = event.currentTarget;
    const li = btn.closest(".combatant");
    const combat = this.viewed;
    const c = combat.combatants.get(li.dataset.combatantId);

    // Switch control action
    switch (btn.dataset.control) {
      
      case "doMove":
          return c.doMove(btn.dataset.move);
      // Toggle combatant visibility
      case "toggleHidden":
        return c.update({hidden: !c.hidden});

      // Toggle combatant defeated flag
      case "toggleDefeated":
        return this._onToggleDefeatedStatus(c);

      // Roll combatant initiative
      case "rollInitiative":
        return combat.rollInitiative([c.id]);
    }
  }

      async getData(options) {

        // Get the combat encounters possible for the viewed Scene
        const combat = this.viewed;
        const hasCombat = combat !== null;
        const combats = this.combats;
        const currentIdx = combats.findIndex(c => c === combat);
        const previousId = currentIdx > 0 ? combats[currentIdx-1].id : null;
        const nextId = currentIdx < combats.length - 1 ? combats[currentIdx+1].id : null;
        const settings = game.settings.get("core", Combat.CONFIG_SETTING);
    
        // Prepare rendering data
        const data = {
          user: game.user,
          combats: combats,
          currentIndex: currentIdx + 1,
          combatCount: combats.length,
          hasCombat: hasCombat,
          combat,
          turns: [],
          previousId,
          nextId,
          started: this.started,
          control: false,
          settings
        };
        if ( !hasCombat ) return data;
    
        // Format information about each combatant in the encounter
        let hasDecimals = false;
        const turns = [];
        for ( let [i, combatant] of combat.turns.entries() ) {
          if ( !combatant.isVisible ) continue;
    
          // Prepare turn data
          const resource = combatant.permission >= CONST.ENTITY_PERMISSIONS.OBSERVER ? combatant.resource : null
          const turn = {
            id: combatant.id,
            name: combatant.name,
            img: combatant.img,
            active: i === combat.turn,
            owner: combatant.isOwner,
            defeated: combatant.data.defeated,
            flags: combatant.data.flags,
            hidden: combatant.hidden,
            isFirstOwner: this.isFirstOwner(combatant.actor),
            hasPlayerOwner: this.hasPlayerOwner(combatant.actor),
            initiative: combatant.initiative,
            hasRolled: combatant.initiative !== null,
            hasResource: resource !== null,
            resource: resource
          };
          if ( Number.isFinite(turn.initiative) && !Number.isInteger(turn.initiative) ) hasDecimals = true;
          turn.css = [
            turn.active ? "active" : "",
            turn.hidden ? "hidden" : "",
            turn.defeated ? "defeated" : ""
          ].join(" ").trim();
    
          // Cached thumbnail image for video tokens
          if ( VideoHelper.hasVideoExtension(turn.img) ) {
            if ( combatant._thumb ) turn.img = combatant._thumb;
            else turn.img = combatant._thumb = await game.video.createThumbnail(combatant.img, {width: 100, height: 100});
          }
    
          // Actor and Token status effects
          turn.effects = new Set();
          if ( combatant.token ) {
            combatant.token.data.effects.forEach(e => turn.effects.add(e));
            if ( combatant.token.data.overlayEffect ) turn.effects.add(combatant.token.data.overlayEffect);
          }
          if ( combatant.actor ) combatant.actor.temporaryEffects.forEach(e => {
            if ( e.getFlag("core", "statusId") === CONFIG.Combat.defeatedStatusId ) turn.defeated = true;
            else if ( e.data.icon ) turn.effects.add(e.data.icon);
          });
          turns.push(turn);
        }
    
        // Format initiative numeric precision
        const precision = CONFIG.Combat.initiative.decimals;
        turns.forEach(t => {
          if ( t.initiative !== null ) t.initiative = t.initiative.toFixed(hasDecimals ? precision : 0);
        });
    
        // Merge update data for rendering
        return foundry.utils.mergeObject(data, {
          round: combat.data.round,
          turn: combat.data.turn,
          turns: turns,
          control: combat.combatant?.players?.includes(game.user)
        });
      }



      firstOwner(doc){
        /* null docs could mean an empty lookup, null docs are not owned by anyone */
        if (!doc) return false;
      
        const gmOwners = Object.entries(doc.data.permission)
          .filter(([id,level]) => (game.users.get(id)?.isGM && game.users.get(id)?.active) && level === 3)
          .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.data.permission)
          .filter(([id, level]) => (!game.users.get(id)?.isGM && game.users.get(id)?.active) && level === 3)
          .map(([id, level])=> id);
      
        if(otherOwners.length > 0) return game.users.get(otherOwners[0]);
        else return game.users.get(gmOwners[0]);
      }
      
      isFirstOwner(doc){
        console.log(this.firstOwner(doc).id)
        return game.user.id === this.firstOwner(doc).id;
      }
      

      hasPlayerOwner(doc) {
        if (!doc) return false;
      
        const gmOwners = Object.entries(doc.data.permission)
          .filter(([id,level]) => (game.users.get(id)?.isGM && game.users.get(id)?.active) && level === 3)
          .map(([id, level]) => id);
        const otherOwners = Object.entries(doc.data.permission)
          .filter(([id, level]) => (!game.users.get(id)?.isGM && game.users.get(id)?.active) && level === 3)
          .map(([id, level])=> id);
      
        if(otherOwners.length > 0) return true;
        else return false;
      }


}


