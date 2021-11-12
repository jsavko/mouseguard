var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetHeader.esbuild-svelte-fake-css
var require_ = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetHeader.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseRewards.esbuild-svelte-fake-css
var require_2 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseRewards.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseDetails.esbuild-svelte-fake-css
var require_3 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseDetails.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseAbilities.esbuild-svelte-fake-css
var require_4 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseAbilities.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseSkills.esbuild-svelte-fake-css
var require_5 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseSkills.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseWises.esbuild-svelte-fake-css
var require_6 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseWises.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseSkillAbilityTab.esbuild-svelte-fake-css
var require_7 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetMouseSkillAbilityTab.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/Tabs.esbuild-svelte-fake-css
var require_8 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/Tabs.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetBase.esbuild-svelte-fake-css
var require_9 = __commonJS({
  "fakecss:D:/FoundryData/Data/systems/mouseguard/module/svelte/MouseGuardActorSheetBase.esbuild-svelte-fake-css"(exports, module) {
    module.exports = {};
  }
});

// module/constants.js
var ATTRIBUTE_TYPES = ["String", "Number", "Boolean", "Formula", "Resource"];

// module/helper.js
var EntitySheetHelper = class {
  static getAttributeData(data) {
    for (let attr2 of Object.values(data.data.attributes)) {
      if (attr2.dtype) {
        attr2.isCheckbox = attr2.dtype === "Boolean";
        attr2.isResource = attr2.dtype === "Resource";
        attr2.isFormula = attr2.dtype === "Formula";
      }
    }
    data.data.ungroupedAttributes = {};
    const groups = data.data.groups || {};
    let groupKeys = Object.keys(groups).sort((a, b) => {
      let aSort = groups[a].label ?? a;
      let bSort = groups[b].label ?? b;
      return aSort.localeCompare(bSort);
    });
    for (let key of groupKeys) {
      let group = data.data.attributes[key] || {};
      if (!data.data.groups[key]["attributes"])
        data.data.groups[key]["attributes"] = {};
      Object.keys(group).sort((a, b) => a.localeCompare(b)).forEach((attr2) => {
        if (typeof group[attr2] != "object" || !group[attr2])
          return;
        group[attr2]["isCheckbox"] = group[attr2]["dtype"] === "Boolean";
        group[attr2]["isResource"] = group[attr2]["dtype"] === "Resource";
        group[attr2]["isFormula"] = group[attr2]["dtype"] === "Formula";
        data.data.groups[key]["attributes"][attr2] = group[attr2];
      });
    }
    Object.keys(data.data.attributes).filter((a) => !groupKeys.includes(a)).sort((a, b) => a.localeCompare(b)).forEach((key) => {
      data.data.ungroupedAttributes[key] = data.data.attributes[key];
    });
    if (data.items) {
      data.items.forEach((item2) => {
        for (let [k, v] of Object.entries(item2.data.attributes)) {
          if (!v.dtype) {
            for (let [gk, gv] of Object.entries(v)) {
              if (gv.dtype) {
                if (!gv.label)
                  gv.label = gk;
                if (gv.dtype === "Formula") {
                  gv.isFormula = true;
                } else {
                  gv.isFormula = false;
                }
              }
            }
          } else {
            if (!v.label)
              v.label = k;
            if (v.dtype === "Formula") {
              v.isFormula = true;
            } else {
              v.isFormula = false;
            }
          }
        }
      });
    }
  }
  static onSubmit(event) {
    if (event.currentTarget) {
      if (event.currentTarget.tagName.toLowerCase() === "input" && !event.currentTarget.hasAttribute("name")) {
        return false;
      }
      let attr2 = false;
      const el = event.currentTarget;
      if (el.classList.contains("attribute-key")) {
        let val = el.value;
        let oldVal = el.closest(".attribute").dataset.attribute;
        let attrError = false;
        let groups = document.querySelectorAll(".group-key");
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].value === val) {
            ui.notifications.error(game.i18n.localize("MOUSEGUARD.NotifyAttrDuplicate") + ` (${val})`);
            el.value = oldVal;
            attrError = true;
            break;
          }
        }
        if (!attrError) {
          oldVal = oldVal.includes(".") ? oldVal.split(".")[1] : oldVal;
          attr2 = $(el).attr("name").replace(oldVal, val);
        }
      }
      return attr2 ? attr2 : true;
    }
  }
  static async onClickAttributeControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;
    switch (action) {
      case "create":
        return EntitySheetHelper.createAttribute(event, this);
      case "delete":
        return EntitySheetHelper.deleteAttribute(event, this);
    }
  }
  static async onClickAttributeGroupControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;
    switch (action) {
      case "create-group":
        return EntitySheetHelper.createAttributeGroup(event, this);
      case "delete-group":
        return EntitySheetHelper.deleteAttributeGroup(event, this);
    }
  }
  static onAttributeRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const label = button.closest(".attribute").querySelector(".attribute-label")?.value;
    const chatLabel = label ?? button.parentElement.querySelector(".attribute-key").value;
    const shorthand = game.settings.get("mouseguard", "macroShorthand");
    const rollData = this.actor.getRollData();
    let formula = button.closest(".attribute").querySelector(".attribute-value")?.value;
    if (formula) {
      let replacement = null;
      if (formula.includes("@item.") && this.item) {
        let itemName = this.item.name.slugify({ strict: true });
        replacement = !!shorthand ? `@items.${itemName}.` : `@items.${itemName}.attributes.`;
        formula = formula.replace("@item.", replacement);
      }
      let r = new Roll(formula, rollData);
      return r.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `${chatLabel}`
      });
    }
  }
  static getAttributeHtml(items, index, group = false) {
    let result = '<div style="display: none;">';
    for (let [key, item2] of Object.entries(items)) {
      result = result + `<input type="${item2.type}" name="data.attributes${group ? "." + group : ""}.attr${index}.${key}" value="${item2.value}"/>`;
    }
    return result + "</div>";
  }
  static validateGroup(groupName, document2) {
    let groups = Object.keys(document2.data.data.groups || {});
    let attributes = Object.keys(document2.data.data.attributes).filter((a) => !groups.includes(a));
    if (groups.includes(groupName)) {
      ui.notifications.error(game.i18n.localize("MOUSEGUARD.NotifyGroupDuplicate") + ` (${groupName})`);
      return false;
    }
    if (attributes.includes(groupName)) {
      ui.notifications.error(game.i18n.localize("MOUSEGUARD.NotifyGroupAttrDuplicate") + ` (${groupName})`);
      return false;
    }
    if (groupName.match(/[\s|\.]/i)) {
      ui.notifications.error(game.i18n.localize("MOUSEGUARD.NotifyGroupAlphanumeric"));
      return false;
    }
    return true;
  }
  static async createAttribute(event, app) {
    const a = event.currentTarget;
    const group = a.dataset.group;
    let dtype = a.dataset.dtype;
    const attrs = app.object.data.data.attributes;
    const groups = app.object.data.data.groups;
    const form = app.form;
    let objKeys = Object.keys(attrs).filter((k) => !Object.keys(groups).includes(k));
    let nk = Object.keys(attrs).length + 1;
    let newValue = `attr${nk}`;
    let newKey = document.createElement("div");
    while (objKeys.includes(newValue)) {
      ++nk;
      newValue = `attr${nk}`;
    }
    let htmlItems = {
      key: {
        type: "text",
        value: newValue
      }
    };
    if (group) {
      objKeys = attrs[group] ? Object.keys(attrs[group]) : [];
      nk = objKeys.length + 1;
      newValue = `attr${nk}`;
      while (objKeys.includes(newValue)) {
        ++nk;
        newValue = `attr${nk}`;
      }
      htmlItems.key.value = newValue;
      htmlItems.group = {
        type: "hidden",
        value: group
      };
      htmlItems.dtype = {
        type: "hidden",
        value: dtype
      };
    } else {
      if (!dtype) {
        let lastAttr = document.querySelector(".attributes > .attributes-group .attribute:last-child .attribute-dtype")?.value;
        dtype = lastAttr ? lastAttr : "String";
        htmlItems.dtype = {
          type: "hidden",
          value: dtype
        };
      }
    }
    newKey.innerHTML = EntitySheetHelper.getAttributeHtml(htmlItems, nk, group);
    newKey = newKey.children[0];
    form.appendChild(newKey);
    await app._onSubmit(event);
  }
  static async deleteAttribute(event, app) {
    const a = event.currentTarget;
    const li = a.closest(".attribute");
    if (li) {
      li.parentElement.removeChild(li);
      await app._onSubmit(event);
    }
  }
  static async createAttributeGroup(event, app) {
    const a = event.currentTarget;
    const form = app.form;
    let newValue = $(a).siblings(".group-prefix").val();
    if (newValue.length > 0 && EntitySheetHelper.validateGroup(newValue, app.object)) {
      let newKey = document.createElement("div");
      newKey.innerHTML = `<input type="text" name="data.groups.${newValue}.key" value="${newValue}"/>`;
      newKey = newKey.children[0];
      form.appendChild(newKey);
      await app._onSubmit(event);
    }
  }
  static async deleteAttributeGroup(event, app) {
    const a = event.currentTarget;
    let groupHeader = a.closest(".group-header");
    let groupContainer = groupHeader.closest(".group");
    let group = $(groupHeader).find(".group-key");
    new Dialog({
      title: game.i18n.localize("MOUSEGUARD.DeleteGroup"),
      content: `${game.i18n.localize("MOUSEGUARD.DeleteGroupContent")} <strong>${group.val()}</strong>`,
      buttons: {
        confirm: {
          icon: '<i class="fas fa-trash"></i>',
          label: game.i18n.localize("Yes"),
          callback: async () => {
            groupContainer.parentElement.removeChild(groupContainer);
            await app._onSubmit(event);
          }
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize("No")
        }
      }
    }).render(true);
  }
  static updateAttributes(formData, document2) {
    let groupKeys = [];
    const formAttrs = foundry.utils.expandObject(formData)?.data?.attributes || {};
    const attributes = Object.values(formAttrs).reduce((obj, v) => {
      let attrs = [];
      let group = null;
      if (!v["key"]) {
        attrs = Object.keys(v);
        attrs.forEach((attrKey) => {
          group = v[attrKey]["group"];
          groupKeys.push(group);
          let attr2 = v[attrKey];
          let k = v[attrKey]["key"] ? v[attrKey]["key"].trim() : attrKey.trim();
          if (/[\s\.]/.test(k))
            return ui.notifications.error("Attribute keys may not contain spaces or periods");
          delete attr2["key"];
          if (!obj[group]) {
            obj[group] = {};
          }
          obj[group][k] = attr2;
        });
      } else {
        let k = v["key"].trim();
        if (/[\s\.]/.test(k))
          return ui.notifications.error("Attribute keys may not contain spaces or periods");
        delete v["key"];
        if (!group) {
          obj[k] = v;
        }
      }
      return obj;
    }, {});
    for (let k of Object.keys(document2.data.data.attributes)) {
      if (!attributes.hasOwnProperty(k))
        attributes[`-=${k}`] = null;
    }
    for (let group of groupKeys) {
      if (document2.data.data.attributes[group]) {
        for (let k of Object.keys(document2.data.data.attributes[group])) {
          if (!attributes[group].hasOwnProperty(k))
            attributes[group][`-=${k}`] = null;
        }
      }
    }
    formData = Object.entries(formData).filter((e) => !e[0].startsWith("data.attributes")).reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, { _id: document2.id, "data.attributes": attributes });
    return formData;
  }
  static updateGroups(formData, document2) {
    const formGroups = expandObject(formData).data.groups || {};
    const groups = Object.values(formGroups).reduce((obj, v) => {
      if (Array.isArray(v["key"])) {
        v["key"] = v["key"][0];
      }
      let k = v["key"].trim();
      if (/[\s\.]/.test(k))
        return ui.notifications.error("Group keys may not contain spaces or periods");
      delete v["key"];
      obj[k] = v;
      return obj;
    }, {});
    for (let k of Object.keys(document2.data.data.groups)) {
      if (!groups.hasOwnProperty(k))
        groups[`-=${k}`] = null;
    }
    formData = Object.entries(formData).filter((e) => !e[0].startsWith("data.groups")).reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, { _id: document2.id, "data.groups": groups });
    return formData;
  }
  static async createDialog(data = {}, options = {}) {
    const documentName = this.metadata.name;
    const folders = game.folders.filter((f) => f.data.type === documentName && f.displayed);
    const label = game.i18n.localize(this.metadata.label);
    const title = game.i18n.format("ENTITY.Create", { entity: label });
    const collection = game.collections.get(this.documentName);
    const templates = collection.filter((a) => a.getFlag("mouseguard", "isTemplate"));
    const defaultType = this.metadata.types[0];
    const types = {
      [defaultType]: game.i18n.localize("MOUSEGUARD.NoTemplate")
    };
    for (let a of templates) {
      types[a.id] = a.name;
    }
    const html = await renderTemplate(`templates/sidebar/entity-create.html`, {
      name: data.name || game.i18n.format("ENTITY.New", { entity: label }),
      folder: data.folder,
      folders,
      hasFolders: folders.length > 1,
      type: data.type || templates[0]?.id || "",
      types,
      hasTypes: true
    });
    return Dialog.prompt({
      title,
      content: html,
      label: title,
      callback: (html2) => {
        const form = html2[0].querySelector("form");
        const fd = new FormDataExtended(form);
        let createData = fd.toObject();
        const template = collection.get(form.type.value);
        if (template) {
          createData = foundry.utils.mergeObject(template.toObject(), createData);
          createData.type = template.data.type;
          delete createData.flags.mouseguard.isTemplate;
        }
        createData = foundry.utils.mergeObject(createData, data);
        return this.create(createData, { renderSheet: true });
      },
      rejectClose: false,
      options
    });
  }
};

// module/actor.js
var MouseGuardActor = class extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();
    this.data.data.groups = this.data.data.groups || {};
    this.data.data.attributes = this.data.data.attributes || {};
  }
  prepareData() {
    super.prepareData();
    const actorData = this.data;
    if (this.type === "character")
      this._prepareCharacterData(this.data);
  }
  _prepareCharacterData(actorData) {
    actorData.data.itemTypes = this.itemTypes;
  }
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    const abilities = [];
    if (data.type === "character" && this.itemTypes.ability.length <= 0) {
      const create_ability = ["MOUSEGUARD.MNature", "MOUSEGUARD.Will", "MOUSEGUARD.Health", "MOUSEGUARD.Resources", "MOUSEGUARD.Circles"];
      for (let i of create_ability) {
        abilities.push({
          name: i,
          type: "ability"
        });
      }
      this.data.update({ items: abilities });
    }
  }
  getRollData() {
    const data = this.toObject(false).data;
    const shorthand = game.settings.get("mouseguard", "macroShorthand");
    const formulaAttributes = [];
    const itemAttributes = [];
    this._applyShorthand(data, formulaAttributes, shorthand);
    this._applyItems(data, itemAttributes, shorthand);
    this._applyItemsFormulaReplacements(data, itemAttributes, shorthand);
    this._applyFormulaReplacements(data, formulaAttributes, shorthand);
    if (!!shorthand) {
      delete data.attributes;
      delete data.attr;
      delete data.abil;
      delete data.groups;
    }
    return data;
  }
  _applyShorthand(data, formulaAttributes, shorthand) {
    for (let [k, v] of Object.entries(data.attributes || {})) {
      if (v.dtype === "Formula")
        formulaAttributes.push(k);
      if (!!shorthand) {
        if (!(k in data)) {
          if (v.dtype) {
            data[k] = v.value;
          } else {
            data[k] = {};
            for (let [gk, gv] of Object.entries(v)) {
              data[k][gk] = gv.value;
              if (gv.dtype === "Formula")
                formulaAttributes.push(`${k}.${gk}`);
            }
          }
        }
      }
    }
  }
  _applyItems(data, itemAttributes, shorthand) {
    data.items = this.items.reduce((obj, item2) => {
      const key = item2.name.slugify({ strict: true });
      const itemData = item2.toObject(false).data;
      for (let [k, v] of Object.entries(itemData.attributes)) {
        if (v.dtype === "Formula")
          itemAttributes.push(`${key}..${k}`);
        if (!!shorthand) {
          if (!(k in itemData)) {
            if (v.dtype) {
              itemData[k] = v.value;
            } else {
              if (!itemData[k])
                itemData[k] = {};
              for (let [gk, gv] of Object.entries(v)) {
                itemData[k][gk] = gv.value;
                if (gv.dtype === "Formula")
                  itemAttributes.push(`${key}..${k}.${gk}`);
              }
            }
          }
        } else {
          if (!v.dtype) {
            if (!itemData[k])
              itemData[k] = {};
            for (let [gk, gv] of Object.entries(v)) {
              itemData[k][gk] = gv.value;
              if (gv.dtype === "Formula")
                itemAttributes.push(`${key}..${k}.${gk}`);
            }
          }
        }
      }
      if (!!shorthand) {
        delete itemData.attributes;
      }
      obj[key] = itemData;
      return obj;
    }, {});
  }
  _applyItemsFormulaReplacements(data, itemAttributes, shorthand) {
    for (let k of itemAttributes) {
      let item2 = null;
      let itemKey = k.split("..");
      item2 = itemKey[0];
      k = itemKey[1];
      let gk = null;
      if (k.includes(".")) {
        let attrKey = k.split(".");
        k = attrKey[0];
        gk = attrKey[1];
      }
      let formula = "";
      if (!!shorthand) {
        if (data.items[item2][k][gk]) {
          formula = data.items[item2][k][gk].replace("@item.", `@items.${item2}.`);
          data.items[item2][k][gk] = Roll.replaceFormulaData(formula, data);
        } else if (data.items[item2][k]) {
          formula = data.items[item2][k].replace("@item.", `@items.${item2}.`);
          data.items[item2][k] = Roll.replaceFormulaData(formula, data);
        }
      } else {
        if (data.items[item2]["attributes"][k][gk]) {
          formula = data.items[item2]["attributes"][k][gk]["value"].replace("@item.", `@items.${item2}.attributes.`);
          data.items[item2]["attributes"][k][gk]["value"] = Roll.replaceFormulaData(formula, data);
        } else if (data.items[item2]["attributes"][k]["value"]) {
          formula = data.items[item2]["attributes"][k]["value"].replace("@item.", `@items.${item2}.attributes.`);
          data.items[item2]["attributes"][k]["value"] = Roll.replaceFormulaData(formula, data);
        }
      }
    }
  }
  _applyFormulaReplacements(data, formulaAttributes, shorthand) {
    for (let k of formulaAttributes) {
      let attr2 = null;
      if (k.includes(".")) {
        let attrKey = k.split(".");
        k = attrKey[0];
        attr2 = attrKey[1];
      }
      if (data.attributes[k]?.value) {
        data.attributes[k].value = Roll.replaceFormulaData(data.attributes[k].value, data);
      } else if (attr2) {
        data.attributes[k][attr2].value = Roll.replaceFormulaData(data.attributes[k][attr2].value, data);
      }
      if (!!shorthand) {
        if (data.attributes[k]?.value) {
          data[k] = data.attributes[k].value;
        } else {
          if (attr2) {
            if (!data[k]) {
              data[k] = {};
            }
            data[k][attr2] = data.attributes[k][attr2].value;
          }
        }
      }
    }
  }
};

// module/item.js
var MouseGuardItem = class extends Item {
  prepareDerivedData() {
    super.prepareDerivedData();
    this.data.data.groups = this.data.data.groups || {};
    this.data.data.attributes = this.data.data.attributes || {};
  }
};

// module/item-sheet.js
var MouseGuardItemSheet = class extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mouseguard", "sheet", "item"],
      template: "systems/mouseguard/templates/item-sheet.html",
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
      scrollY: [".attributes"]
    });
  }
  getData() {
    const context = super.getData();
    EntitySheetHelper.getAttributeData(context.data);
    context.systemData = context.data.data;
    context.dtypes = ATTRIBUTE_TYPES;
    return context;
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable)
      return;
    html.find(".attributes").on("click", ".attribute-control", EntitySheetHelper.onClickAttributeControl.bind(this));
    html.find(".groups").on("click", ".group-control", EntitySheetHelper.onClickAttributeGroupControl.bind(this));
    html.find(".attributes").on("click", "a.attribute-roll", EntitySheetHelper.onAttributeRoll.bind(this));
    html.find(".attributes a.attribute-roll").each((i, a) => {
      a.setAttribute("draggable", true);
      a.addEventListener("dragstart", (ev) => {
        let dragData = ev.currentTarget.dataset;
        ev.dataTransfer.setData("text/plain", JSON.stringify(dragData));
      }, false);
    });
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    formData = EntitySheetHelper.updateAttributes(formData, this.object);
    formData = EntitySheetHelper.updateGroups(formData, this.object);
    return formData;
  }
};

// node_modules/svelte/internal/index.mjs
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var tasks = new Set();
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init)
    return;
  target.hydrate_init = true;
  const children2 = target.childNodes;
  const m = new Int32Array(children2.length + 1);
  const p = new Int32Array(children2.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children2.length; i++) {
    const current = children2[i].claim_order;
    const seqLen = upper_bound(1, longest + 1, (idx) => children2[m[idx]].claim_order, current) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children2.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children2[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children2[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children2[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    }
    if (node !== target.actual_end_child) {
      target.insertBefore(node, target.actual_end_child);
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target) {
    target.appendChild(node);
  }
}
function insert(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append(target, node);
  } else if (node.parentNode !== target || anchor && node.nextSibling !== anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var flushing = false;
var seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
var outroing = new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance9, create_fragment10, not_equal, props, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : options.context || []),
    callbacks: blank_object(),
    dirty,
    skip_bound: false
  };
  let ready = false;
  $$.ctx = instance9 ? instance9(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment10 ? create_fragment10($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr2, _oldValue, newValue) {
      this[attr2] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}
var SvelteComponent = class {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
};

// node_modules/svelte/store/index.mjs
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}

// module/svelte/MouseGuardActorSheetHeader.svelte
require_();

// module/svelte/MouseGuardActorSheetMouseRewards.svelte
function create_fragment(ctx) {
  let largecard;
  let h1;
  let t1;
  let left;
  let fatebox;
  let label0;
  let t3;
  let input0;
  let input0_value_value;
  let t4;
  let personabox;
  let label1;
  let t6;
  let input1;
  let input1_value_value;
  let t7;
  let right;
  let rewardbox0;
  let label2;
  let t9;
  let label3;
  let raw0_value = game.i18n.localize("MOUSEGUARD.BeliefSub") + "";
  let t10;
  let textarea0;
  let textarea0_value_value;
  let t11;
  let rewardbox1;
  let label4;
  let t13;
  let label5;
  let raw1_value = game.i18n.localize("MOUSEGUARD.InstinctSub") + "";
  let t14;
  let textarea1;
  let textarea1_value_value;
  let t15;
  let rewardbox2;
  let label6;
  let t17;
  let label7;
  let raw2_value = game.i18n.localize("MOUSEGUARD.GoalSub") + "";
  let t18;
  let textarea2;
  let textarea2_value_value;
  return {
    c() {
      largecard = element("largecard");
      h1 = element("h1");
      h1.textContent = "Rewards";
      t1 = space();
      left = element("left");
      fatebox = element("fatebox");
      label0 = element("label");
      label0.textContent = `${game.i18n.localize("MOUSEGUARD.Fate")}`;
      t3 = space();
      input0 = element("input");
      t4 = space();
      personabox = element("personabox");
      label1 = element("label");
      label1.textContent = `${game.i18n.localize("MOUSEGUARD.Persona")}`;
      t6 = space();
      input1 = element("input");
      t7 = space();
      right = element("right");
      rewardbox0 = element("rewardbox");
      label2 = element("label");
      label2.textContent = `${game.i18n.localize("MOUSEGUARD.Belief")}`;
      t9 = space();
      label3 = element("label");
      t10 = space();
      textarea0 = element("textarea");
      t11 = space();
      rewardbox1 = element("rewardbox");
      label4 = element("label");
      label4.textContent = `${game.i18n.localize("MOUSEGUARD.Instinct")}`;
      t13 = space();
      label5 = element("label");
      t14 = space();
      textarea1 = element("textarea");
      t15 = space();
      rewardbox2 = element("rewardbox");
      label6 = element("label");
      label6.textContent = `${game.i18n.localize("MOUSEGUARD.Goal")}`;
      t17 = space();
      label7 = element("label");
      t18 = space();
      textarea2 = element("textarea");
      attr(h1, "class", "svelte-5if18l");
      attr(label0, "class", "header svelte-5if18l");
      attr(input0, "name", "data.rewards.fate");
      attr(input0, "type", "number");
      input0.value = input0_value_value = ctx[0].data.rewards.fate;
      attr(input0, "placeholder", "0");
      attr(input0, "class", "svelte-5if18l");
      attr(fatebox, "class", "svelte-5if18l");
      attr(label1, "class", "header svelte-5if18l");
      attr(input1, "name", "data.rewards.persona");
      attr(input1, "type", "number");
      input1.value = input1_value_value = ctx[0].data.rewards.persona;
      attr(input1, "placeholder", "0");
      attr(input1, "class", "svelte-5if18l");
      attr(personabox, "class", "svelte-5if18l");
      attr(left, "class", "left svelte-5if18l");
      attr(label2, "class", "svelte-5if18l");
      attr(label3, "class", "sub svelte-5if18l");
      attr(textarea0, "name", "data.rewards.belief");
      textarea0.value = textarea0_value_value = ctx[0].data.rewards.belief;
      attr(textarea0, "class", "svelte-5if18l");
      attr(rewardbox0, "class", "svelte-5if18l");
      attr(label4, "class", "svelte-5if18l");
      attr(label5, "class", "sub svelte-5if18l");
      attr(textarea1, "name", "data.rewards.instinct");
      textarea1.value = textarea1_value_value = ctx[0].data.rewards.instinct;
      attr(textarea1, "class", "svelte-5if18l");
      attr(rewardbox1, "class", "svelte-5if18l");
      attr(label6, "class", "svelte-5if18l");
      attr(label7, "class", "sub svelte-5if18l");
      attr(textarea2, "name", "data.rewards.goal");
      textarea2.value = textarea2_value_value = ctx[0].data.rewards.goal;
      attr(textarea2, "class", "svelte-5if18l");
      attr(rewardbox2, "class", "svelte-5if18l");
      attr(right, "class", "right svelte-5if18l");
      attr(largecard, "class", "svelte-5if18l");
    },
    m(target, anchor) {
      insert(target, largecard, anchor);
      append(largecard, h1);
      append(largecard, t1);
      append(largecard, left);
      append(left, fatebox);
      append(fatebox, label0);
      append(fatebox, t3);
      append(fatebox, input0);
      append(left, t4);
      append(left, personabox);
      append(personabox, label1);
      append(personabox, t6);
      append(personabox, input1);
      append(largecard, t7);
      append(largecard, right);
      append(right, rewardbox0);
      append(rewardbox0, label2);
      append(rewardbox0, t9);
      append(rewardbox0, label3);
      label3.innerHTML = raw0_value;
      append(rewardbox0, t10);
      append(rewardbox0, textarea0);
      append(right, t11);
      append(right, rewardbox1);
      append(rewardbox1, label4);
      append(rewardbox1, t13);
      append(rewardbox1, label5);
      label5.innerHTML = raw1_value;
      append(rewardbox1, t14);
      append(rewardbox1, textarea1);
      append(right, t15);
      append(right, rewardbox2);
      append(rewardbox2, label6);
      append(rewardbox2, t17);
      append(rewardbox2, label7);
      label7.innerHTML = raw2_value;
      append(rewardbox2, t18);
      append(rewardbox2, textarea2);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && input0_value_value !== (input0_value_value = ctx2[0].data.rewards.fate)) {
        input0.value = input0_value_value;
      }
      if (dirty & 1 && input1_value_value !== (input1_value_value = ctx2[0].data.rewards.persona)) {
        input1.value = input1_value_value;
      }
      if (dirty & 1 && textarea0_value_value !== (textarea0_value_value = ctx2[0].data.rewards.belief)) {
        textarea0.value = textarea0_value_value;
      }
      if (dirty & 1 && textarea1_value_value !== (textarea1_value_value = ctx2[0].data.rewards.instinct)) {
        textarea1.value = textarea1_value_value;
      }
      if (dirty & 1 && textarea2_value_value !== (textarea2_value_value = ctx2[0].data.rewards.goal)) {
        textarea2.value = textarea2_value_value;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(largecard);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(2, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 4) {
      $:
        $$invalidate(0, data = $sheetData.data);
    }
  };
  return [data, sheetData, $sheetData];
}
var MouseGuardActorSheetMouseRewards = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseRewards_default = MouseGuardActorSheetMouseRewards;
require_2();

// module/svelte/MouseGuardActorSheetMouseDetails.svelte
function create_fragment2(ctx) {
  let largecard;
  let div;
  let h1;
  let t1;
  let input0;
  let input0_value_value;
  let t2;
  let ul;
  let lineitem0;
  let label0;
  let t5;
  let input1;
  let input1_value_value;
  let t6;
  let lineitem1;
  let label1;
  let t9;
  let input2;
  let input2_value_value;
  let input2_placeholder_value;
  let t10;
  let lineitem2;
  let label2;
  let t13;
  let input3;
  let input3_value_value;
  let input3_placeholder_value;
  let t14;
  let lineitem3;
  let label3;
  let t17;
  let input4;
  let input4_value_value;
  let input4_placeholder_value;
  let t18;
  let lineitem4;
  let label4;
  let t21;
  let input5;
  let input5_value_value;
  let input5_placeholder_value;
  let t22;
  let lineitem5;
  let label5;
  let t25;
  let input6;
  let input6_value_value;
  let input6_placeholder_value;
  let t26;
  let lineitem6;
  let label6;
  let t29;
  let input7;
  let input7_value_value;
  let input7_placeholder_value;
  let t30;
  let lineitem7;
  let label7;
  let t33;
  let input8;
  let input8_value_value;
  let input8_placeholder_value;
  let t34;
  let lineitem8;
  let label8;
  let t37;
  let input9;
  let input9_value_value;
  let input9_placeholder_value;
  let t38;
  let lineitem9;
  let label9;
  let t41;
  let input10;
  let input10_value_value;
  let input10_placeholder_value;
  let t42;
  let mouseguardactorsheetmouserewards;
  let current;
  mouseguardactorsheetmouserewards = new MouseGuardActorSheetMouseRewards_default({});
  return {
    c() {
      largecard = element("largecard");
      div = element("div");
      h1 = element("h1");
      h1.textContent = "Name";
      t1 = space();
      input0 = element("input");
      t2 = space();
      ul = element("ul");
      lineitem0 = element("lineitem");
      label0 = element("label");
      label0.textContent = `${game.i18n.localize("MOUSEGUARD.Age")}:`;
      t5 = space();
      input1 = element("input");
      t6 = space();
      lineitem1 = element("lineitem");
      label1 = element("label");
      label1.textContent = `${game.i18n.localize("MOUSEGUARD.Parents")}:`;
      t9 = space();
      input2 = element("input");
      t10 = space();
      lineitem2 = element("lineitem");
      label2 = element("label");
      label2.textContent = `${game.i18n.localize("MOUSEGUARD.Home")}:`;
      t13 = space();
      input3 = element("input");
      t14 = space();
      lineitem3 = element("lineitem");
      label3 = element("label");
      label3.textContent = `${game.i18n.localize("MOUSEGUARD.Senior")}:`;
      t17 = space();
      input4 = element("input");
      t18 = space();
      lineitem4 = element("lineitem");
      label4 = element("label");
      label4.textContent = `${game.i18n.localize("MOUSEGUARD.Fur")}:`;
      t21 = space();
      input5 = element("input");
      t22 = space();
      lineitem5 = element("lineitem");
      label5 = element("label");
      label5.textContent = `${game.i18n.localize("MOUSEGUARD.Mentor")}:`;
      t25 = space();
      input6 = element("input");
      t26 = space();
      lineitem6 = element("lineitem");
      label6 = element("label");
      label6.textContent = `${game.i18n.localize("MOUSEGUARD.Cloak")}:`;
      t29 = space();
      input7 = element("input");
      t30 = space();
      lineitem7 = element("lineitem");
      label7 = element("label");
      label7.textContent = `${game.i18n.localize("MOUSEGUARD.Friend")}:`;
      t33 = space();
      input8 = element("input");
      t34 = space();
      lineitem8 = element("lineitem");
      label8 = element("label");
      label8.textContent = `${game.i18n.localize("MOUSEGUARD.GuardRank")}:`;
      t37 = space();
      input9 = element("input");
      t38 = space();
      lineitem9 = element("lineitem");
      label9 = element("label");
      label9.textContent = `${game.i18n.localize("MOUSEGUARD.Enemy")}:`;
      t41 = space();
      input10 = element("input");
      t42 = space();
      create_component(mouseguardactorsheetmouserewards.$$.fragment);
      attr(h1, "class", "svelte-iahukr");
      attr(input0, "name", "name");
      attr(input0, "type", "text");
      input0.value = input0_value_value = ctx[0].name;
      attr(input0, "placeholder", "Name");
      attr(input0, "class", "svelte-iahukr");
      attr(div, "class", "namebox svelte-iahukr");
      attr(label0, "class", "svelte-iahukr");
      attr(input1, "name", "data.details.age");
      attr(input1, "type", "number");
      input1.value = input1_value_value = ctx[0].data.details.age;
      attr(input1, "placeholder", "0");
      attr(input1, "class", "svelte-iahukr");
      attr(lineitem0, "class", "svelte-iahukr");
      attr(label1, "class", "svelte-iahukr");
      attr(input2, "name", "data.details.parents");
      attr(input2, "type", "text");
      input2.value = input2_value_value = ctx[0].data.details.parents;
      attr(input2, "placeholder", input2_placeholder_value = game.i18n.localize("MOUSEGUARD.Parents"));
      attr(input2, "class", "svelte-iahukr");
      attr(lineitem1, "class", "svelte-iahukr");
      attr(label2, "class", "svelte-iahukr");
      attr(input3, "name", "data.details.home");
      attr(input3, "type", "text");
      input3.value = input3_value_value = ctx[0].data.details.home;
      attr(input3, "placeholder", input3_placeholder_value = game.i18n.localize("MOUSEGUARD.Home"));
      attr(input3, "class", "svelte-iahukr");
      attr(lineitem2, "class", "svelte-iahukr");
      attr(label3, "class", "svelte-iahukr");
      attr(input4, "name", "data.details.senior_artisan");
      attr(input4, "type", "text");
      input4.value = input4_value_value = ctx[0].data.details.senior_artisan;
      attr(input4, "placeholder", input4_placeholder_value = game.i18n.localize("MOUSEGUARD.Senior"));
      attr(input4, "class", "svelte-iahukr");
      attr(lineitem3, "class", "svelte-iahukr");
      attr(label4, "class", "svelte-iahukr");
      attr(input5, "name", "data.details.fur_color");
      attr(input5, "type", "text");
      input5.value = input5_value_value = ctx[0].data.details.fur_color;
      attr(input5, "placeholder", input5_placeholder_value = game.i18n.localize("MOUSEGUARD.Fur"));
      attr(input5, "class", "svelte-iahukr");
      attr(lineitem4, "class", "svelte-iahukr");
      attr(label5, "class", "svelte-iahukr");
      attr(input6, "name", "data.details.mentor");
      attr(input6, "type", "text");
      input6.value = input6_value_value = ctx[0].data.details.mentor;
      attr(input6, "placeholder", input6_placeholder_value = game.i18n.localize("MOUSEGUARD.Mentor"));
      attr(input6, "class", "svelte-iahukr");
      attr(lineitem5, "class", "svelte-iahukr");
      attr(label6, "class", "svelte-iahukr");
      attr(input7, "name", "data.details.cloak_color");
      attr(input7, "type", "text");
      input7.value = input7_value_value = ctx[0].data.details.cloak_color;
      attr(input7, "placeholder", input7_placeholder_value = game.i18n.localize("MOUSEGUARD.Cloak"));
      attr(input7, "class", "svelte-iahukr");
      attr(lineitem6, "class", "svelte-iahukr");
      attr(label7, "class", "svelte-iahukr");
      attr(input8, "name", "data.details.friend");
      attr(input8, "type", "text");
      input8.value = input8_value_value = ctx[0].data.details.friend;
      attr(input8, "placeholder", input8_placeholder_value = game.i18n.localize("MOUSEGUARD.Friend"));
      attr(input8, "class", "svelte-iahukr");
      attr(lineitem7, "class", "svelte-iahukr");
      attr(label8, "class", "svelte-iahukr");
      attr(input9, "name", "data.details.guard_rank");
      attr(input9, "type", "text");
      input9.value = input9_value_value = ctx[0].data.details.guard_rank;
      attr(input9, "placeholder", input9_placeholder_value = game.i18n.localize("MOUSEGUARD.GuardRank"));
      attr(input9, "class", "svelte-iahukr");
      attr(lineitem8, "class", "svelte-iahukr");
      attr(label9, "class", "svelte-iahukr");
      attr(input10, "name", "data.details.enemy");
      attr(input10, "type", "text");
      input10.value = input10_value_value = ctx[0].data.details.enemy;
      attr(input10, "placeholder", input10_placeholder_value = game.i18n.localize("MOUSEGUARD.Enemy"));
      attr(input10, "class", "svelte-iahukr");
      attr(lineitem9, "class", "svelte-iahukr");
      attr(largecard, "class", "svelte-iahukr");
    },
    m(target, anchor) {
      insert(target, largecard, anchor);
      append(largecard, div);
      append(div, h1);
      append(div, t1);
      append(div, input0);
      append(largecard, t2);
      append(largecard, ul);
      append(ul, lineitem0);
      append(lineitem0, label0);
      append(lineitem0, t5);
      append(lineitem0, input1);
      append(ul, t6);
      append(ul, lineitem1);
      append(lineitem1, label1);
      append(lineitem1, t9);
      append(lineitem1, input2);
      append(ul, t10);
      append(ul, lineitem2);
      append(lineitem2, label2);
      append(lineitem2, t13);
      append(lineitem2, input3);
      append(ul, t14);
      append(ul, lineitem3);
      append(lineitem3, label3);
      append(lineitem3, t17);
      append(lineitem3, input4);
      append(ul, t18);
      append(ul, lineitem4);
      append(lineitem4, label4);
      append(lineitem4, t21);
      append(lineitem4, input5);
      append(ul, t22);
      append(ul, lineitem5);
      append(lineitem5, label5);
      append(lineitem5, t25);
      append(lineitem5, input6);
      append(ul, t26);
      append(ul, lineitem6);
      append(lineitem6, label6);
      append(lineitem6, t29);
      append(lineitem6, input7);
      append(ul, t30);
      append(ul, lineitem7);
      append(lineitem7, label7);
      append(lineitem7, t33);
      append(lineitem7, input8);
      append(ul, t34);
      append(ul, lineitem8);
      append(lineitem8, label8);
      append(lineitem8, t37);
      append(lineitem8, input9);
      append(ul, t38);
      append(ul, lineitem9);
      append(lineitem9, label9);
      append(lineitem9, t41);
      append(lineitem9, input10);
      insert(target, t42, anchor);
      mount_component(mouseguardactorsheetmouserewards, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & 1 && input0_value_value !== (input0_value_value = ctx2[0].name) && input0.value !== input0_value_value) {
        input0.value = input0_value_value;
      }
      if (!current || dirty & 1 && input1_value_value !== (input1_value_value = ctx2[0].data.details.age)) {
        input1.value = input1_value_value;
      }
      if (!current || dirty & 1 && input2_value_value !== (input2_value_value = ctx2[0].data.details.parents) && input2.value !== input2_value_value) {
        input2.value = input2_value_value;
      }
      if (!current || dirty & 1 && input3_value_value !== (input3_value_value = ctx2[0].data.details.home) && input3.value !== input3_value_value) {
        input3.value = input3_value_value;
      }
      if (!current || dirty & 1 && input4_value_value !== (input4_value_value = ctx2[0].data.details.senior_artisan) && input4.value !== input4_value_value) {
        input4.value = input4_value_value;
      }
      if (!current || dirty & 1 && input5_value_value !== (input5_value_value = ctx2[0].data.details.fur_color) && input5.value !== input5_value_value) {
        input5.value = input5_value_value;
      }
      if (!current || dirty & 1 && input6_value_value !== (input6_value_value = ctx2[0].data.details.mentor) && input6.value !== input6_value_value) {
        input6.value = input6_value_value;
      }
      if (!current || dirty & 1 && input7_value_value !== (input7_value_value = ctx2[0].data.details.cloak_color) && input7.value !== input7_value_value) {
        input7.value = input7_value_value;
      }
      if (!current || dirty & 1 && input8_value_value !== (input8_value_value = ctx2[0].data.details.friend) && input8.value !== input8_value_value) {
        input8.value = input8_value_value;
      }
      if (!current || dirty & 1 && input9_value_value !== (input9_value_value = ctx2[0].data.details.guard_rank) && input9.value !== input9_value_value) {
        input9.value = input9_value_value;
      }
      if (!current || dirty & 1 && input10_value_value !== (input10_value_value = ctx2[0].data.details.enemy) && input10.value !== input10_value_value) {
        input10.value = input10_value_value;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(mouseguardactorsheetmouserewards.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mouseguardactorsheetmouserewards.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(largecard);
      if (detaching)
        detach(t42);
      destroy_component(mouseguardactorsheetmouserewards, detaching);
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(2, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  const filePicker = (event) => {
    const attr2 = event.currentTarget.dataset.edit;
    const current = getProperty(data, attr2);
    const fp = new FilePicker({
      type: "image",
      current,
      callback: (path) => {
        actor.update({ [attr2]: path });
      },
      top: sheet.position.top + 40,
      left: sheet.position.left + 10
    });
    return fp.browse();
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 4) {
      $:
        $$invalidate(0, data = $sheetData.data);
    }
  };
  return [data, sheetData, $sheetData];
}
var MouseGuardActorSheetMouseDetails = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance2, create_fragment2, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseDetails_default = MouseGuardActorSheetMouseDetails;
require_3();

// module/svelte/MouseGuardActorSheetMousePortrait.svelte
function create_fragment3(ctx) {
  let img;
  let img_src_value;
  let img_title_value;
  let mounted;
  let dispose;
  return {
    c() {
      img = element("img");
      attr(img, "class", "profile-img");
      if (img.src !== (img_src_value = ctx[0].img))
        attr(img, "src", img_src_value);
      attr(img, "data-edit", "img");
      attr(img, "title", img_title_value = ctx[0].name);
      attr(img, "height", "100");
      attr(img, "width", "100");
    },
    m(target, anchor) {
      insert(target, img, anchor);
      if (!mounted) {
        dispose = listen(img, "click", ctx[2]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && img.src !== (img_src_value = ctx2[0].img)) {
        attr(img, "src", img_src_value);
      }
      if (dirty & 1 && img_title_value !== (img_title_value = ctx2[0].name)) {
        attr(img, "title", img_title_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      mounted = false;
      dispose();
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(3, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  const filePicker = (event) => {
    const attr2 = event.currentTarget.dataset.edit;
    const current = getProperty(data, attr2);
    const fp = new FilePicker({
      type: "image",
      current,
      callback: (path) => {
        actor.update({ [attr2]: path });
      },
      top: sheet.position.top + 40,
      left: sheet.position.left + 10
    });
    return fp.browse();
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $:
        $$invalidate(0, data = $sheetData.data);
    }
  };
  return [data, sheetData, filePicker, $sheetData];
}
var MouseGuardActorSheetMousePortrait = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance3, create_fragment3, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMousePortrait_default = MouseGuardActorSheetMousePortrait;

// module/svelte/MouseGuardCommon.svelte
function updateRating(sheet, item2, type, value) {
  const ob = { [type]: value };
  if (type == "rank" || type == "rating") {
    if (value < 1)
      ob[type] = 1;
    ob.fail = 0;
    ob.pass = 0;
  }
  sheet?._updateEmbededItem(item2, ob);
}
function setMouseDice(sheet, count) {
  sheet?._setMouseDice(count);
}

// module/svelte/MouseGuardActorSheetMouseAbilities.svelte
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  child_ctx[17] = i;
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  child_ctx[17] = i;
  return child_ctx;
}
function create_else_block_1(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_2(...args) {
    return ctx[7](ctx[12], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "no-checkmark svelte-1nllne8");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_1(...args) {
    return ctx[6](ctx[12], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "checkmark svelte-1nllne8");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_2(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (ctx2[12].data.data.pass > ctx2[17])
      return create_if_block_1;
    return create_else_block_1;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_4(...args) {
    return ctx[9](ctx[12], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "no-checkmark svelte-1nllne8");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_4);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_3(...args) {
    return ctx[8](ctx[12], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "checkmark svelte-1nllne8");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_3);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_1(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[12].data.data.fail > ctx2[17])
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type_1(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_each_block(ctx) {
  let ability;
  let div;
  let label;
  let a;
  let t0_value = game.i18n.localize(ctx[12].name) + "";
  let t0;
  let t1;
  let t2;
  let input;
  let input_name_value;
  let input_value_value;
  let t3;
  let pass;
  let t4;
  let t5;
  let fail;
  let t6;
  let div_name_value;
  let t7;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[4](ctx[12], ...args);
  }
  let each_value_2 = {
    length: parseInt(ctx[12].data.data.rating) + 1
  };
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  let each_value_1 = {
    length: parseInt(ctx[12].data.data.rating)
  };
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  return {
    c() {
      ability = element("ability");
      div = element("div");
      label = element("label");
      a = element("a");
      t0 = text(t0_value);
      t1 = text(":");
      t2 = space();
      input = element("input");
      t3 = space();
      pass = element("pass");
      t4 = text("P:\r\n			");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t5 = space();
      fail = element("fail");
      t6 = text("F:\r\n				");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t7 = space();
      attr(label, "class", "header svelte-1nllne8");
      attr(input, "name", input_name_value = ctx[12].id);
      attr(input, "type", "number");
      input.value = input_value_value = ctx[12].data.data.rating;
      attr(input, "class", "svelte-1nllne8");
      attr(pass, "class", "svelte-1nllne8");
      attr(fail, "class", "svelte-1nllne8");
      attr(div, "name", div_name_value = ctx[12].id);
      attr(ability, "class", "svelte-1nllne8");
    },
    m(target, anchor) {
      insert(target, ability, anchor);
      append(ability, div);
      append(div, label);
      append(label, a);
      append(a, t0);
      append(label, t1);
      append(div, t2);
      append(div, input);
      append(div, t3);
      append(div, pass);
      append(pass, t4);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(pass, null);
      }
      append(div, t5);
      append(div, fail);
      append(fail, t6);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(fail, null);
      }
      append(ability, t7);
      if (!mounted) {
        dispose = [
          listen(label, "click", click_handler),
          listen(input, "change", ctx[5])
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 1 && t0_value !== (t0_value = game.i18n.localize(ctx[12].name) + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && input_name_value !== (input_name_value = ctx[12].id)) {
        attr(input, "name", input_name_value);
      }
      if (dirty & 1 && input_value_value !== (input_value_value = ctx[12].data.data.rating)) {
        input.value = input_value_value;
      }
      if (dirty & 5) {
        each_value_2 = {
          length: parseInt(ctx[12].data.data.rating) + 1
        };
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx, each_value_2, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_2(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(pass, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_2.length;
      }
      if (dirty & 5) {
        each_value_1 = {
          length: parseInt(ctx[12].data.data.rating)
        };
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(fail, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      if (dirty & 1 && div_name_value !== (div_name_value = ctx[12].id)) {
        attr(div, "name", div_name_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(ability);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment4(ctx) {
  let largecard;
  let h1;
  let t1;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      largecard = element("largecard");
      h1 = element("h1");
      h1.textContent = "Abilities";
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(h1, "class", "svelte-1nllne8");
      attr(largecard, "class", "svelte-1nllne8");
    },
    m(target, anchor) {
      insert(target, largecard, anchor);
      append(largecard, h1);
      append(largecard, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(largecard, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 5) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(largecard, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(largecard);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance4($$self, $$props, $$invalidate) {
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(3, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  let abilities;
  const click_handler = (ability, e) => setMouseDice(sheet, ability.data.data.rating);
  const change_handler = (e) => updateRating(sheet, e.target.name, "rating", parseInt(e.target.value));
  const click_handler_1 = (ability, e) => updateRating(sheet, ability.id, "pass", parseInt(ability.data.data.pass) - 1);
  const click_handler_2 = (ability, e) => updateRating(sheet, ability.id, "pass", parseInt(ability.data.data.pass) + 1);
  const click_handler_3 = (ability, e) => updateRating(sheet, ability.id, "fail", parseInt(ability.data.data.fail) - 1);
  const click_handler_4 = (ability, e) => updateRating(sheet, ability.id, "fail", parseInt(ability.data.data.fail) + 1);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 8) {
      $:
        $$invalidate(0, abilities = $sheetData.data.data.itemTypes.ability);
    }
  };
  return [
    abilities,
    sheetData,
    sheet,
    $sheetData,
    click_handler,
    change_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
var MouseGuardActorSheetMouseAbilities = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance4, create_fragment4, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseAbilities_default = MouseGuardActorSheetMouseAbilities;
require_4();

// module/svelte/MouseGuardActorSheetMouseSkills.svelte
function get_each_context2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}
function get_each_context_12(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  child_ctx[18] = i;
  return child_ctx;
}
function get_each_context_22(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  child_ctx[18] = i;
  return child_ctx;
}
function create_else_block_12(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_2(...args) {
    return ctx[7](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "no-checkmark svelte-19h3piw");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_12(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_1(...args) {
    return ctx[6](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "checkmark svelte-19h3piw");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_22(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (ctx2[13].data.data.pass > ctx2[18])
      return create_if_block_12;
    return create_else_block_12;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block2(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_4(...args) {
    return ctx[9](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "no-checkmark svelte-19h3piw");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_4);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block2(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_3(...args) {
    return ctx[8](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "checkmark svelte-19h3piw");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_3);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_12(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[13].data.data.fail > ctx2[18])
      return create_if_block2;
    return create_else_block2;
  }
  let current_block_type = select_block_type_1(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_each_block2(ctx) {
  let skill;
  let div0;
  let label;
  let a0;
  let t0_value = game.i18n.localize(ctx[13].name) + "";
  let t0;
  let t1;
  let t2;
  let input;
  let input_name_value;
  let input_value_value;
  let t3;
  let pass;
  let t4;
  let t5;
  let fail;
  let t6;
  let div0_name_value;
  let t7;
  let div1;
  let a1;
  let t8;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[4](ctx[13], ...args);
  }
  let each_value_2 = {
    length: parseInt(ctx[13].data.data.rank) + 1
  };
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_1[i] = create_each_block_22(get_each_context_22(ctx, each_value_2, i));
  }
  let each_value_1 = {
    length: parseInt(ctx[13].data.data.rank)
  };
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
  }
  return {
    c() {
      skill = element("skill");
      div0 = element("div");
      label = element("label");
      a0 = element("a");
      t0 = text(t0_value);
      t1 = text(":");
      t2 = space();
      input = element("input");
      t3 = space();
      pass = element("pass");
      t4 = text("P:\r\n			");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t5 = space();
      fail = element("fail");
      t6 = text("F:\r\n				");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t7 = space();
      div1 = element("div");
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-trash"></i>`;
      t8 = space();
      attr(label, "class", "header svelte-19h3piw");
      attr(input, "name", input_name_value = ctx[13].id);
      attr(input, "type", "number");
      input.value = input_value_value = ctx[13].data.data.rank;
      attr(input, "class", "svelte-19h3piw");
      attr(pass, "class", "svelte-19h3piw");
      attr(fail, "class", "svelte-19h3piw");
      attr(div0, "name", div0_name_value = ctx[13].id);
      attr(a1, "class", "item-control item-delete");
      attr(a1, "title", "Delete Item");
      attr(div1, "class", "item-controls");
      attr(skill, "class", "svelte-19h3piw");
    },
    m(target, anchor) {
      insert(target, skill, anchor);
      append(skill, div0);
      append(div0, label);
      append(label, a0);
      append(a0, t0);
      append(label, t1);
      append(div0, t2);
      append(div0, input);
      append(div0, t3);
      append(div0, pass);
      append(pass, t4);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(pass, null);
      }
      append(div0, t5);
      append(div0, fail);
      append(fail, t6);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(fail, null);
      }
      append(skill, t7);
      append(skill, div1);
      append(div1, a1);
      append(skill, t8);
      if (!mounted) {
        dispose = [
          listen(label, "click", click_handler),
          listen(input, "change", ctx[5]),
          listen(a1, "click", function() {
            if (is_function(ctx[2]?._onItemDelete(ctx[13]._id)))
              ctx[2]?._onItemDelete(ctx[13]._id).apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 1 && t0_value !== (t0_value = game.i18n.localize(ctx[13].name) + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && input_name_value !== (input_name_value = ctx[13].id)) {
        attr(input, "name", input_name_value);
      }
      if (dirty & 1 && input_value_value !== (input_value_value = ctx[13].data.data.rank)) {
        input.value = input_value_value;
      }
      if (dirty & 5) {
        each_value_2 = {
          length: parseInt(ctx[13].data.data.rank) + 1
        };
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_22(ctx, each_value_2, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_22(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(pass, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_2.length;
      }
      if (dirty & 5) {
        each_value_1 = {
          length: parseInt(ctx[13].data.data.rank)
        };
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_12(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_12(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(fail, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      if (dirty & 1 && div0_name_value !== (div0_name_value = ctx[13].id)) {
        attr(div0, "name", div0_name_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(skill);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment5(ctx) {
  let largecard;
  let h1;
  let t1;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
  }
  return {
    c() {
      largecard = element("largecard");
      h1 = element("h1");
      h1.textContent = "Skills";
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(h1, "class", "svelte-19h3piw");
      attr(largecard, "class", "svelte-19h3piw");
    },
    m(target, anchor) {
      insert(target, largecard, anchor);
      append(largecard, h1);
      append(largecard, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(largecard, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 5) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(largecard, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(largecard);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance5($$self, $$props, $$invalidate) {
  let skills;
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(3, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  let abilities;
  const click_handler = (skill, e) => setMouseDice(sheet, skill.data.data.rank);
  const change_handler = (e) => updateRating(sheet, e.target.name, "rank", parseInt(e.target.value));
  const click_handler_1 = (skill, e) => updateRating(sheet, skill.id, "pass", parseInt(skill.data.data.pass) - 1);
  const click_handler_2 = (skill, e) => updateRating(sheet, skill.id, "pass", parseInt(skill.data.data.pass) + 1);
  const click_handler_3 = (skill, e) => updateRating(sheet, skill.id, "fail", parseInt(skill.data.data.fail) - 1);
  const click_handler_4 = (skill, e) => updateRating(sheet, skill.id, "fail", parseInt(skill.data.data.fail) + 1);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 8) {
      $:
        $$invalidate(0, skills = $sheetData.data.data.itemTypes.skill);
    }
  };
  return [
    skills,
    sheetData,
    sheet,
    $sheetData,
    click_handler,
    change_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
var MouseGuardActorSheetMouseSkills = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance5, create_fragment5, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseSkills_default = MouseGuardActorSheetMouseSkills;
require_5();

// module/svelte/MouseGuardActorSheetMouseWises.svelte
function get_each_context3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[13] = list[i];
  return child_ctx;
}
function get_each_context_13(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  child_ctx[18] = i;
  return child_ctx;
}
function get_each_context_23(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  child_ctx[18] = i;
  return child_ctx;
}
function create_else_block_13(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_2(...args) {
    return ctx[7](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "no-checkmark svelte-105ojo3");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_13(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_1(...args) {
    return ctx[6](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "checkmark svelte-105ojo3");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_23(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (ctx2[13].data.data.pass > ctx2[18])
      return create_if_block_13;
    return create_else_block_13;
  }
  let current_block_type = select_block_type(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block3(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_4(...args) {
    return ctx[9](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "no-checkmark svelte-105ojo3");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_4);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block3(ctx) {
  let div;
  let mounted;
  let dispose;
  function click_handler_3(...args) {
    return ctx[8](ctx[13], ...args);
  }
  return {
    c() {
      div = element("div");
      attr(div, "class", "checkmark svelte-105ojo3");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", click_handler_3);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block_13(ctx) {
  let if_block_anchor;
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[13].data.data.fail > ctx2[18])
      return create_if_block3;
    return create_else_block3;
  }
  let current_block_type = select_block_type_1(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_each_block3(ctx) {
  let wise;
  let div0;
  let label;
  let a0;
  let t0_value = game.i18n.localize(ctx[13].name) + "";
  let t0;
  let t1;
  let t2;
  let input;
  let input_name_value;
  let input_value_value;
  let t3;
  let pass;
  let t4;
  let t5;
  let fail;
  let t6;
  let div0_name_value;
  let t7;
  let div1;
  let a1;
  let mounted;
  let dispose;
  function click_handler(...args) {
    return ctx[4](ctx[13], ...args);
  }
  let each_value_2 = {
    length: parseInt(ctx[13].data.data.rank) + 1
  };
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_1[i] = create_each_block_23(get_each_context_23(ctx, each_value_2, i));
  }
  let each_value_1 = {
    length: parseInt(ctx[13].data.data.rank)
  };
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_13(get_each_context_13(ctx, each_value_1, i));
  }
  return {
    c() {
      wise = element("wise");
      div0 = element("div");
      label = element("label");
      a0 = element("a");
      t0 = text(t0_value);
      t1 = text(":");
      t2 = space();
      input = element("input");
      t3 = space();
      pass = element("pass");
      t4 = text("P: \r\n			");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t5 = space();
      fail = element("fail");
      t6 = text("F: \r\n				");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t7 = space();
      div1 = element("div");
      a1 = element("a");
      a1.innerHTML = `<i class="fas fa-trash"></i>`;
      attr(label, "class", "header svelte-105ojo3");
      attr(input, "name", input_name_value = ctx[13].id);
      attr(input, "type", "number");
      input.value = input_value_value = ctx[13].data.data.rank;
      attr(input, "class", "svelte-105ojo3");
      attr(pass, "class", "svelte-105ojo3");
      attr(fail, "class", "svelte-105ojo3");
      attr(div0, "name", div0_name_value = ctx[13].id);
      attr(a1, "class", "item-control item-delete");
      attr(a1, "title", "Delete Item");
      attr(div1, "class", "item-controls svelte-105ojo3");
      attr(wise, "class", "svelte-105ojo3");
    },
    m(target, anchor) {
      insert(target, wise, anchor);
      append(wise, div0);
      append(div0, label);
      append(label, a0);
      append(a0, t0);
      append(label, t1);
      append(div0, t2);
      append(div0, input);
      append(div0, t3);
      append(div0, pass);
      append(pass, t4);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(pass, null);
      }
      append(div0, t5);
      append(div0, fail);
      append(fail, t6);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(fail, null);
      }
      append(wise, t7);
      append(wise, div1);
      append(div1, a1);
      if (!mounted) {
        dispose = [
          listen(label, "click", click_handler),
          listen(input, "change", ctx[5]),
          listen(a1, "click", function() {
            if (is_function(ctx[2]?._onItemDelete(ctx[13]._id)))
              ctx[2]?._onItemDelete(ctx[13]._id).apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 1 && t0_value !== (t0_value = game.i18n.localize(ctx[13].name) + ""))
        set_data(t0, t0_value);
      if (dirty & 1 && input_name_value !== (input_name_value = ctx[13].id)) {
        attr(input, "name", input_name_value);
      }
      if (dirty & 1 && input_value_value !== (input_value_value = ctx[13].data.data.rank)) {
        input.value = input_value_value;
      }
      if (dirty & 5) {
        each_value_2 = {
          length: parseInt(ctx[13].data.data.rank) + 1
        };
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_23(ctx, each_value_2, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_23(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(pass, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_2.length;
      }
      if (dirty & 5) {
        each_value_1 = {
          length: parseInt(ctx[13].data.data.rank)
        };
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_13(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_13(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(fail, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
      if (dirty & 1 && div0_name_value !== (div0_name_value = ctx[13].id)) {
        attr(div0, "name", div0_name_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(wise);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment6(ctx) {
  let largecard;
  let h1;
  let t1;
  let t2;
  let ol;
  let li;
  let div0;
  let t3;
  let div1;
  let t4;
  let div2;
  let a;
  let mounted;
  let dispose;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
  }
  return {
    c() {
      largecard = element("largecard");
      h1 = element("h1");
      h1.textContent = "Wises";
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      ol = element("ol");
      li = element("li");
      div0 = element("div");
      t3 = space();
      div1 = element("div");
      t4 = space();
      div2 = element("div");
      a = element("a");
      a.innerHTML = `<i class="fas fa-plus"></i> Add item`;
      attr(h1, "class", "svelte-105ojo3");
      attr(div0, "class", "item-image");
      attr(div1, "class", "item-name");
      attr(a, "class", "item-control item-create");
      attr(a, "title", "Create item");
      attr(a, "data-type", "wise");
      attr(div2, "class", "item-controls svelte-105ojo3");
      attr(li, "class", "item flexrow item-header");
      attr(largecard, "class", "svelte-105ojo3");
    },
    m(target, anchor) {
      insert(target, largecard, anchor);
      append(largecard, h1);
      append(largecard, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(largecard, null);
      }
      append(largecard, t2);
      append(largecard, ol);
      append(ol, li);
      append(li, div0);
      append(li, t3);
      append(li, div1);
      append(li, t4);
      append(li, div2);
      append(div2, a);
      if (!mounted) {
        dispose = listen(a, "click", ctx[2]?._onItemCreate.bind(ctx[2]));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 5) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context3(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(largecard, t2);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(largecard);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance6($$self, $$props, $$invalidate) {
  let wises;
  let $sheetData;
  let sheetData = getContext("sheetStore");
  component_subscribe($$self, sheetData, (value) => $$invalidate(3, $sheetData = value));
  let { actor, sheet } = $sheetData;
  let data;
  let abilities;
  const click_handler = (wise, e) => setMouseDice(sheet, wise.data.data.rank);
  const change_handler = (e) => updateRating(sheet, e.target.name, "rank", parseInt(e.target.value));
  const click_handler_1 = (wise, e) => updateRating(sheet, wise.id, "pass", parseInt(wise.data.data.pass) - 1);
  const click_handler_2 = (wise, e) => updateRating(sheet, wise.id, "pass", parseInt(wise.data.data.pass) + 1);
  const click_handler_3 = (wise, e) => updateRating(sheet, wise.id, "fail", parseInt(wise.data.data.fail) - 1);
  const click_handler_4 = (wise, e) => updateRating(sheet, wise.id, "fail", parseInt(wise.data.data.fail) + 1);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $:
        data = $sheetData.data;
    }
    if ($$self.$$.dirty & 8) {
      $:
        $$invalidate(0, wises = $sheetData.data.data.itemTypes.wise);
    }
  };
  return [
    wises,
    sheetData,
    sheet,
    $sheetData,
    click_handler,
    change_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4
  ];
}
var MouseGuardActorSheetMouseWises = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance6, create_fragment6, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseWises_default = MouseGuardActorSheetMouseWises;
require_6();

// module/svelte/MouseGuardActorSheetMouseSkillAbilityTab.svelte
function create_fragment7(ctx) {
  let abilities;
  let mouseguardactorsheetmouseabilities;
  let t0;
  let wise;
  let mouseguardactorsheetmousewises;
  let t1;
  let skill;
  let mouseguardactorsheetmouseskills;
  let current;
  mouseguardactorsheetmouseabilities = new MouseGuardActorSheetMouseAbilities_default({});
  mouseguardactorsheetmousewises = new MouseGuardActorSheetMouseWises_default({});
  mouseguardactorsheetmouseskills = new MouseGuardActorSheetMouseSkills_default({});
  return {
    c() {
      abilities = element("abilities");
      create_component(mouseguardactorsheetmouseabilities.$$.fragment);
      t0 = space();
      wise = element("wise");
      create_component(mouseguardactorsheetmousewises.$$.fragment);
      t1 = space();
      skill = element("skill");
      create_component(mouseguardactorsheetmouseskills.$$.fragment);
      attr(abilities, "class", "svelte-19ngt2d");
      attr(wise, "class", "svelte-19ngt2d");
      attr(skill, "class", "svelte-19ngt2d");
    },
    m(target, anchor) {
      insert(target, abilities, anchor);
      mount_component(mouseguardactorsheetmouseabilities, abilities, null);
      insert(target, t0, anchor);
      insert(target, wise, anchor);
      mount_component(mouseguardactorsheetmousewises, wise, null);
      insert(target, t1, anchor);
      insert(target, skill, anchor);
      mount_component(mouseguardactorsheetmouseskills, skill, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(mouseguardactorsheetmouseabilities.$$.fragment, local);
      transition_in(mouseguardactorsheetmousewises.$$.fragment, local);
      transition_in(mouseguardactorsheetmouseskills.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(mouseguardactorsheetmouseabilities.$$.fragment, local);
      transition_out(mouseguardactorsheetmousewises.$$.fragment, local);
      transition_out(mouseguardactorsheetmouseskills.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(abilities);
      destroy_component(mouseguardactorsheetmouseabilities);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(wise);
      destroy_component(mouseguardactorsheetmousewises);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(skill);
      destroy_component(mouseguardactorsheetmouseskills);
    }
  };
}
var MouseGuardActorSheetMouseSkillAbilityTab = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment7, safe_not_equal, {});
  }
};
var MouseGuardActorSheetMouseSkillAbilityTab_default = MouseGuardActorSheetMouseSkillAbilityTab;
require_7();

// module/svelte/Tabs.svelte
function get_each_context4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function get_each_context_14(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
}
function create_each_block_14(ctx) {
  let li;
  let span;
  let t0_value = ctx[3].label + "";
  let t0;
  let t1;
  let li_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      li = element("li");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      attr(span, "class", "svelte-14or48x");
      attr(li, "class", li_class_value = "" + (null_to_empty(ctx[0] === ctx[3].value ? "active" : "") + " svelte-14or48x"));
    },
    m(target, anchor) {
      insert(target, li, anchor);
      append(li, span);
      append(span, t0);
      append(li, t1);
      if (!mounted) {
        dispose = listen(span, "click", function() {
          if (is_function(ctx[2](ctx[3].value)))
            ctx[2](ctx[3].value).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 2 && t0_value !== (t0_value = ctx[3].label + ""))
        set_data(t0, t0_value);
      if (dirty & 3 && li_class_value !== (li_class_value = "" + (null_to_empty(ctx[0] === ctx[3].value ? "active" : "") + " svelte-14or48x"))) {
        attr(li, "class", li_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(li);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block4(ctx) {
  let div;
  let switch_instance;
  let t;
  let current;
  var switch_value = ctx[3].component;
  function switch_props(ctx2) {
    return {};
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      div = element("div");
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t = space();
      attr(div, "class", "box svelte-14or48x");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (switch_instance) {
        mount_component(switch_instance, div, null);
      }
      append(div, t);
      current = true;
    },
    p(ctx2, dirty) {
      if (switch_value !== (switch_value = ctx2[3].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, t);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
function create_each_block4(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0] == ctx[3].value && create_if_block4(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[0] == ctx2[3].value) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 3) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment8(ctx) {
  let ul;
  let t;
  let each1_anchor;
  let current;
  let each_value_1 = ctx[1];
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_14(get_each_context_14(ctx, each_value_1, i));
  }
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      ul = element("ul");
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each1_anchor = empty();
      attr(ul, "class", "svelte-14or48x");
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(ul, null);
      }
      insert(target, t, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & 7) {
        each_value_1 = ctx2[1];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_14(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_14(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(ul, null);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_1.length;
      }
      if (dirty & 3) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context4(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block4(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(ul);
      destroy_each(each_blocks_1, detaching);
      if (detaching)
        detach(t);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each1_anchor);
    }
  };
}
function instance7($$self, $$props, $$invalidate) {
  let { items = [] } = $$props;
  let { activeTabValue = 1 } = $$props;
  const handleClick = (tabValue) => () => $$invalidate(0, activeTabValue = tabValue);
  $$self.$$set = ($$props2) => {
    if ("items" in $$props2)
      $$invalidate(1, items = $$props2.items);
    if ("activeTabValue" in $$props2)
      $$invalidate(0, activeTabValue = $$props2.activeTabValue);
  };
  return [activeTabValue, items, handleClick];
}
var Tabs = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance7, create_fragment8, safe_not_equal, { items: 1, activeTabValue: 0 });
  }
};
var Tabs_default = Tabs;
require_8();

// module/svelte/MouseGuardActorSheetBase.svelte
function create_fragment9(ctx) {
  let content;
  let tabs;
  let current;
  tabs = new Tabs_default({ props: { items: ctx[1] } });
  return {
    c() {
      content = element("content");
      create_component(tabs.$$.fragment);
      attr(content, "class", "svelte-u0vwks");
    },
    m(target, anchor) {
      insert(target, content, anchor);
      mount_component(tabs, content, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(tabs.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabs.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(content);
      destroy_component(tabs);
    }
  };
}
function instance8($$self, $$props, $$invalidate) {
  let $dataStore, $$unsubscribe_dataStore = noop, $$subscribe_dataStore = () => ($$unsubscribe_dataStore(), $$unsubscribe_dataStore = subscribe(dataStore, ($$value) => $$invalidate(2, $dataStore = $$value)), dataStore);
  $$self.$$.on_destroy.push(() => $$unsubscribe_dataStore());
  let { dataStore } = $$props;
  $$subscribe_dataStore();
  setContext("sheetStore", dataStore);
  let { actor, data, sheet } = $dataStore;
  let items = [
    {
      label: "About",
      value: 1,
      component: MouseGuardActorSheetMouseDetails_default
    },
    {
      label: "Abilities, Wises, & Skills",
      value: 2,
      component: MouseGuardActorSheetMouseSkillAbilityTab_default
    },
    {
      label: "Rewards",
      value: 3,
      component: MouseGuardActorSheetMouseRewards_default
    },
    {
      label: "Other",
      value: 4,
      component: MouseGuardActorSheetMousePortrait_default
    }
  ];
  $$self.$$set = ($$props2) => {
    if ("dataStore" in $$props2)
      $$subscribe_dataStore($$invalidate(0, dataStore = $$props2.dataStore));
  };
  return [dataStore, items];
}
var MouseGuardActorSheetBase = class extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance8, create_fragment9, safe_not_equal, { dataStore: 0 });
  }
};
var MouseGuardActorSheetBase_default = MouseGuardActorSheetBase;
require_9();

// module/actor-sheet.js
var MouseGuardActorSheet = class extends ActorSheet {
  app = null;
  dataStore = null;
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["mouseguard", "sheet", "actor"],
      template: "systems/mouseguard/templates/actor-sheetv2.html",
      width: 850,
      height: 600,
      tabs: []
    });
  }
  getData() {
    const context = super.getData();
    context.systemData = context.data.data;
    context.sheet = this;
    return context;
  }
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.isEditable)
      return;
    html.find(".item-control").click(this._onItemControl.bind(this));
    html.find(".items .rollable").on("click", this._onItemRoll.bind(this));
  }
  _onItemControl(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const li = button.closest(".item");
    const item2 = this.actor.items.get(li?.dataset.itemId);
    switch (button.dataset.action) {
      case "create":
        const cls = getDocumentClass("Item");
        return cls.create({ name: game.i18n.localize("MOUSEGUARD.ItemNew"), type: "item" }, { parent: this.actor });
      case "edit":
        return item2.sheet.render(true);
      case "delete":
        return item2.delete();
    }
  }
  _onItemRoll(event) {
    let button = $(event.currentTarget);
    const li = button.parents(".item");
    const item2 = this.actor.items.get(li.data("itemId"));
    let r = new Roll(button.data("roll"), this.actor.getRollData());
    return r.toMessage({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: `<h2>${item2.name}</h2><h3>${button.text()}</h3>`
    });
  }
  _getSubmitData(updateData) {
    let formData = super._getSubmitData(updateData);
    return formData;
  }
  _setMouseDice(count) {
    game.mouseguard.RollCount = count;
    game.mouseguard.updateDisplay(count);
  }
  async _updateActorAbility(id, type, value) {
    await this.actor.updateEmbeddedDocuments("Item", [{ _id: id, data: { [type]: value } }]);
  }
  async _updateEmbededItem(id, _data) {
    await this.actor.updateEmbeddedDocuments("Item", [{ _id: id, data: _data }]);
  }
  async _onItemDelete(itemId) {
    const item2 = this.actor.items.get(itemId);
    item2.delete();
    this.render();
  }
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const data = duplicate(header.dataset);
    const name = `New ${type.capitalize()}`;
    const itemData = {
      name,
      type,
      data
    };
    itemData.data = { rank: 1 };
    delete itemData.data["type"];
    return await Item.create(itemData, { parent: this.actor }).then((item2) => {
      item2.sheet.render(true);
    });
  }
  render(force = false, options = {}) {
    let sheetData = this.getData();
    if (this.app !== null) {
      let states = Application.RENDER_STATES;
      if (this._state == states.RENDERING || this._state == states.RENDERED) {
        this.dataStore?.set(sheetData);
        return;
      }
    }
    this._render(force, options).catch((err) => {
      err.message = `An error occurred while rendering ${this.constructor.name} ${this.appId}: ${err.message}`;
      console.error(err);
      this._state = Application.RENDER_STATES.ERROR;
    }).then((rendered) => {
      this.dataStore = writable(sheetData);
      this.app = new MouseGuardActorSheetBase_default({
        target: this.element.find("form").get(0),
        props: {
          dataStore: this.dataStore
        }
      });
    });
    options.editable = options.editable ?? this.object.isOwner;
    this.object.apps[this.appId] = this;
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
};

// module/templates.js
var preloadHandlebarsTemplates = async function() {
  const templatePaths = [
    "systems/mouseguard/templates/parts/sheet-attributes.html",
    "systems/mouseguard/templates/parts/sheet-groups.html"
  ];
  return loadTemplates(templatePaths);
};

// module/macro.js
async function createMouseGuardMacro(data, slot) {
  const command = `const roll = new Roll("${data.roll}", actor ? actor.getRollData() : {});
  roll.toMessage({speaker, flavor: "${data.label}"});`;
  let macro = game.macros.entities.find((m) => m.name === item.label && m.command === command);
  if (!macro) {
    macro = await Macro.create({
      name: data.label,
      type: "script",
      command,
      flags: { "mouseguard.attrMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

// module/mousedie.js
var MouseDie = class extends Die {
  constructor(termData) {
    termData.faces = 6;
    super(termData);
  }
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
};
__publicField(MouseDie, "DENOMINATION", "m");
var mouseChatData = async (roll, chatOptions) => {
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
var MouseRoll = class extends Roll {
  constructor(...args) {
    super(...args);
  }
  async render(chatOptions = {}) {
    chatOptions = foundry.utils.mergeObject({
      user: game.user.id,
      flavor: null,
      template: this.constructor.CHAT_TEMPLATE,
      blind: false
    }, chatOptions);
    if (!this._evaluated)
      this.evaluate();
    let chatData = await mouseChatData(this, chatOptions);
    return renderTemplate(chatOptions.template, chatData);
  }
};
__publicField(MouseRoll, "CHAT_TEMPLATE", "systems/mouseguard/templates/dice/roll.html");

// module/conflict-tracker.js
var ConflictTracker = class extends FormApplication {
  constructor(object = {}, options = {}) {
    super(object, options);
    this.isRunningQueue = false;
    if (options?.menu) {
      this.menu = options.menu;
    }
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "conflict-tracker",
      classes: ["mouseguard"],
      title: "Conflict Tracker",
      template: "systems/mouseguard/templates/conflict-tracker.html"
    });
  }
  getData() {
    const context = super.getData();
    context.isGM = game.user.isGM;
    const x = $(window).width();
    const y = $(window).height();
    this.position.left = x / 2 - 505 / 2;
    this.position.top = 10;
    this.position.width = 150;
    this.position.height = 105;
    return context;
  }
  async close(options = {}) {
  }
  activateListeners(html) {
  }
};

// module/mouse-combantant.js
var MouseCombatant = class extends Combatant {
  constructor(...args) {
    super(...args);
  }
  prepareDerivedData() {
    super.prepareDerivedData;
  }
  getData() {
    const context = super.getData();
    return context;
  }
  get ConflictCaptain() {
    return this.getFlag("mouseguard", "ConflictCaptain");
  }
  async setConflictCaptain(value) {
    return this.setFlag("swade", "ConflictCaptain", value);
  }
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    this.data.update({
      flags: {
        mouseguard: {
          ConflictCaptain: false
        }
      }
    });
  }
};

// module/mouse-combat.js
var MouseCombat = class extends Combat {
  constructor(object = {}, options = {}) {
    super(object, options);
  }
  getData() {
    const context = super.getData();
    return context;
  }
  get getGoal() {
    return this.getFlag("mouseguard", "ConflictCaptain");
  }
  get getConflictCaptain() {
    return this.getFlag("mouseguard", "ConflictCaptain");
  }
  async setConflictCaptain(value) {
    return this.setFlag("swade", "ConflictCaptain", value);
  }
  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    this.data.update({
      flags: {
        mouseguard: {
          ConflictCaptain: NaN,
          goal: NaN
        }
      }
    });
  }
  async startCombat() {
    let goal = this.data.flags.mouseguard.goal;
    let CC = this.data.flags.mouseguard.ConflictCaptain;
    if (!CC) {
      ui.notifications.error("A Conflict Captain Must be set to start a combat");
      return false;
    }
    if (goal == null) {
      console.log("I need a goal");
      return false;
    }
    if (!!goal == false && CC)
      return this.update({ round: 1, turn: 0 });
  }
};

// module/mouse-combat-tracker.js
var MouseCombatTracker = class extends CombatTracker {
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
        icon: '<i class="fas fa-dice-d20"></i>',
        callback: (li) => {
          const combatant = this.viewed.combatants.get(li.data("combatant-id"));
          console.log("captain: " + !!this.viewed.data.flags.mouseguard.ConflictCaptain);
          console.log(combatant.id);
          if (this.viewed.data.flags.mouseguard.ConflictCaptain == combatant.id) {
            console.log("Toggling Captain to Off");
            this.viewed.setFlag("mouseguard", "ConflictCaptain", NaN);
            return combatant.setFlag("mouseguard", "ConflictCaptain", false);
          }
          if (!!this.viewed.data.flags.mouseguard.ConflictCaptain == false) {
            if (combatant) {
              console.log("New Captain");
              this.viewed.setFlag("mouseguard", "ConflictCaptain", li.data("combatant-id"));
              return combatant.setFlag("mouseguard", "ConflictCaptain", true);
            }
          } else {
            ui.notifications.error("A Conflict Captain Has Already Been Set");
            return false;
          }
          console.log(this);
        }
      },
      {
        name: "COMBAT.CombatantUpdate",
        icon: '<i class="fas fa-edit"></i>',
        callback: this._onConfigureCombatant.bind(this)
      },
      {
        name: "COMBAT.CombatantRemove",
        icon: '<i class="fas fa-trash"></i>',
        callback: (li) => {
          const combatant = this.viewed.combatants.get(li.data("combatant-id"));
          if (combatant)
            return combatant.delete();
        }
      }
    ];
  }
  async getData(options) {
    const combat = this.viewed;
    const hasCombat = combat !== null;
    const combats = this.combats;
    const currentIdx = combats.findIndex((c) => c === combat);
    const previousId = currentIdx > 0 ? combats[currentIdx - 1].id : null;
    const nextId = currentIdx < combats.length - 1 ? combats[currentIdx + 1].id : null;
    const settings = game.settings.get("core", Combat.CONFIG_SETTING);
    const data = {
      user: game.user,
      combats,
      currentIndex: currentIdx + 1,
      combatCount: combats.length,
      hasCombat,
      combat,
      turns: [],
      previousId,
      nextId,
      started: this.started,
      control: false,
      settings
    };
    if (!hasCombat)
      return data;
    let hasDecimals = false;
    const turns = [];
    for (let [i, combatant] of combat.turns.entries()) {
      if (!combatant.isVisible)
        continue;
      const resource = combatant.permission >= CONST.ENTITY_PERMISSIONS.OBSERVER ? combatant.resource : null;
      const turn = {
        id: combatant.id,
        name: combatant.name,
        img: combatant.img,
        active: i === combat.turn,
        owner: combatant.isOwner,
        defeated: combatant.data.defeated,
        flags: combatant.data.flags,
        hidden: combatant.hidden,
        initiative: combatant.initiative,
        hasRolled: combatant.initiative !== null,
        hasResource: resource !== null,
        resource
      };
      if (Number.isFinite(turn.initiative) && !Number.isInteger(turn.initiative))
        hasDecimals = true;
      turn.css = [
        turn.active ? "active" : "",
        turn.hidden ? "hidden" : "",
        turn.defeated ? "defeated" : ""
      ].join(" ").trim();
      if (VideoHelper.hasVideoExtension(turn.img)) {
        if (combatant._thumb)
          turn.img = combatant._thumb;
        else
          turn.img = combatant._thumb = await game.video.createThumbnail(combatant.img, { width: 100, height: 100 });
      }
      turn.effects = new Set();
      if (combatant.token) {
        combatant.token.data.effects.forEach((e) => turn.effects.add(e));
        if (combatant.token.data.overlayEffect)
          turn.effects.add(combatant.token.data.overlayEffect);
      }
      if (combatant.actor)
        combatant.actor.temporaryEffects.forEach((e) => {
          if (e.getFlag("core", "statusId") === CONFIG.Combat.defeatedStatusId)
            turn.defeated = true;
          else if (e.data.icon)
            turn.effects.add(e.data.icon);
        });
      turns.push(turn);
    }
    const precision = CONFIG.Combat.initiative.decimals;
    turns.forEach((t) => {
      if (t.initiative !== null)
        t.initiative = t.initiative.toFixed(hasDecimals ? precision : 0);
    });
    return foundry.utils.mergeObject(data, {
      round: combat.data.round,
      turn: combat.data.turn,
      turns,
      control: combat.combatant?.players?.includes(game.user)
    });
  }
};

// module/mouseguard.js
Hooks.once("init", async function() {
  console.log(`Initializing MouseGuard MouseGuard System`);
  let RollCount = 0;
  game.mouseguard = {
    MouseGuardActor,
    createMouseGuardMacro,
    RollCount,
    updateDisplay,
    MouseDie,
    MouseRoll
  };
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
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("mouseguard", MouseGuardActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("mouseguard", MouseGuardItemSheet, { makeDefault: true });
  game.settings.register("mouseguard", "macroShorthand", {
    name: "SETTINGS.MouseGuardMacroShorthandN",
    hint: "SETTINGS.MouseGuardMacroShorthandL",
    scope: "world",
    type: Boolean,
    default: true,
    config: true
  });
  game.settings.register("mouseguard", "initFormula", {
    name: "SETTINGS.MouseGuardInitFormulaN",
    hint: "SETTINGS.MouseGuardInitFormulaL",
    scope: "world",
    type: String,
    default: "1d20",
    config: true,
    onChange: (formula) => _simpleUpdateInit(formula, true)
  });
  const initFormula = game.settings.get("mouseguard", "initFormula");
  _simpleUpdateInit(initFormula);
  function _simpleUpdateInit(formula, notify = false) {
    const isValid = Roll.validate(formula);
    if (!isValid) {
      if (notify)
        ui.notifications.error(`${game.i18n.localize("MOUSEGUARD.NotifyInitFormulaInvalid")}: ${formula}`);
      return;
    }
    CONFIG.Combat.initiative.formula = formula;
  }
  Handlebars.registerHelper("slugify", function(value) {
    return value.slugify({ strict: true });
  });
  await preloadHandlebarsTemplates();
});
Hooks.once("init", async function() {
  CONFIG.Dice.terms["m"] = MouseDie;
  CONFIG.Dice.terms["6"] = MouseDie;
});
Hooks.once("diceSoNiceReady", (dice3d) => {
  let dicetheme = "mouseguard";
  if (!dicetheme || dicetheme == "mouseguard") {
    dice3d.addSystem({ id: "mouseguard", name: "Mouse Guard" }, true);
    dice3d.addDicePreset({
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
    }, "d6");
  }
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
  console.log("Render Sidebar Mouse Pool?");
  const template = "./systems/mouseguard/templates/mousetray.html";
  let $chat_form = html.find("#chat-form");
  renderTemplate(template).then((c) => {
    let $content = $(c);
    $chat_form.after($content);
    $content.find(".mouse_dice_button").on("mousedown", (event) => {
      event.preventDefault();
      switch (event.which) {
        case 1:
          game.mouseguard.RollCount++;
          break;
        case 3:
          game.mouseguard.RollCount--;
          break;
      }
      if (game.mouseguard.RollCount < 1)
        game.mouseguard.RollCount = 0;
      updateDisplay(game.mouseguard.RollCount);
    });
    $content.find(".mouse_roll_button").on("click", (event) => {
      event.preventDefault();
      let $self = $(event.currentTarget);
      let dataset = event.currentTarget.dataset;
      if (game.mouseguard.RollCount > 0) {
        let actor = game.user.character ?? canvas.tokens.controlled[0]?.actor;
        var roll = new MouseRoll(game.mouseguard.RollCount + "dmcs>3");
        roll.evaluate({ async: true });
        roll.toMessage({
          user: game.user.id,
          speaker: ChatMessage.getSpeaker({ actor })
        });
        game.mouseguard.RollCount = 0;
        updateDisplay(0);
      }
    });
  });
});
Hooks.once("ready", async () => {
});
function updateDisplay(count) {
  let mouse_rolls = document.getElementById("mouse-dice-roll");
  let diceHTML = '<li class="roll mousedie d6 "><img src="systems/mouseguard/assets/dice/sword.png" height="24" width="24"></li>';
  let theHTML = "";
  for (let i = 0; i < count; i++) {
    theHTML += diceHTML;
  }
  mouse_rolls.innerHTML = theHTML;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=mouseguard.js.map
