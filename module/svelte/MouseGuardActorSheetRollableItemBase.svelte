<script>
    import {getContext} from "svelte";
    import {updateRating, setMouseDice} from "./MouseGuardCommon.svelte";

    export let itemType;

    let sheetData = getContext("sheetStore");
    let {sheet} = $sheetData;
    let data;
    $: data = $sheetData.data;
    $: items = $sheetData.data.system.itemTypes[itemType];
    $: displayDescription = {};

    let itemTypeConfigs = {
        ability: {
            header: game.i18n.localize("MOUSEGUARD.Abilities"),
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rating"),
            showAdvance: true,
            ratingProperty: "rating",
            maxRating: 7
        },
        wise: {
            header: game.i18n.localize("MOUSEGUARD.Wises"),
            editable: true,
            add: () => () => sheet?._onItemCreate.bind(sheet), //FIXME does not work
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rank"),
            showAdvance: true,
            ratingProperty: "rank",
            maxRating: 7
        },
        skill: {
            header: game.i18n.localize("MOUSEGUARD.Skills"),
            editable: true,
            add: () => () => game.packs.get("mouseguard.skills").render(true),
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Rank"),
            showAdvance: true,
            ratingProperty: "rank",
            maxRating: 7
        },
        trait: {
            header: game.i18n.localize("MOUSEGUARD.Traits"),
            editable: true,
            add: () => () => game.packs.get("mouseguard.traits").render(true),
            showRating: true,
            ratingPropertyName: game.i18n.localize("MOUSEGUARD.Level"),
            ratingProperty: "level",
            maxRating: 3
        }
        // TODO add support for items and connections
    };
    let itemTypeConfig = itemTypeConfigs[itemType];

    const advancementStep = (advancement, position) => advancement > position ? -1 : 1;
</script>

<li class="items-header flexrow">
    <h3 class="item-name flexrow">{itemTypeConfig.header}</h3>
    {#if itemTypeConfig.showRating}
        <div class="item-detail item-rank">{itemTypeConfig.ratingPropertyName}</div>
    {/if}
    {#if itemTypeConfig.showAdvance}
        <div class="item-detail item-advancement">Advancement</div>
    {/if}
    {#if itemType === 'trait'}
        <div class="item-detail item-uses">Uses</div>
    {/if}
    <div class="item-controls flexrow">
        {#if itemTypeConfig.editable}
            <a class="item-control item-create" on:click={itemTypeConfig.add()}>
                <i class="fas fa-plus"></i> {game.i18n.localize("MOUSEGUARD.AddItem")}
            </a>
        {/if}
    </div>
</li>
{#each items as item}
    <ol class="item-list" name="{item.id}">
        <li class="item flexrow">
            <div class="item-name flexrow rollable">
                <div class="item-image" style="background-image: url({item.img})"
                     on:click={(e) => setMouseDice(sheet, item.system[itemTypeConfig.ratingProperty], game.i18n.localize(item.name))}>
                </div>
                <h4 on:click={(e) => displayDescription[item.id] = !displayDescription[item.id]}>
                    {game.i18n.localize(item.name)}
                </h4>
            </div>
            {#if itemTypeConfig.showRating}
                <div class="item-detail item-rank flexrow">
                    <input name={item.id} type="number" min="1" max="{itemTypeConfig.maxRating}"
                           value={item.system[itemTypeConfig.ratingProperty]}
                           on:change={(e) => updateRating(sheet, e.target.name, itemTypeConfig.ratingProperty, parseInt(e.target.value))}>
                    {#if item.name === "MOUSEGUARD.MNature"}
                        <!-- Handling Nature -->
                        <div class="divider">/</div>
                        <input name={item.id} type="number" min="0" max="{item.system[itemTypeConfig.ratingProperty]}"
                               value={item.system.tax}
                               on:change={(e) => updateRating(sheet, e.target.name, "tax", parseInt(e.target.value))}/>
                    {/if}
                </div>
            {/if}
            {#if itemTypeConfig.showAdvance}
                <div class="item-detail item-advancement">
                    <pass>
                        {game.i18n.localize("MOUSEGUARD.P")}:
                        {#each {length: parseInt(item.system[itemTypeConfig.ratingProperty]) + 1} as _, i}
                            <div class="{advancementStep(item.system.pass, i) < 0 ? 'checkmark' : 'no-checkmark'}"
                                 on:click={(e) => updateRating(sheet, item.id, "pass",
                                    parseInt(item.system.pass) + advancementStep(item.system.pass, i))}></div>
                        {/each}
                    </pass>
                    <fail>
                        {game.i18n.localize("MOUSEGUARD.F")}:
                        {#each {length: parseInt(item.system[itemTypeConfig.ratingProperty])} as _, i}
                            <div class="{advancementStep(item.system.fail, i) < 0 ? 'checkmark' : 'no-checkmark'}"
                                 on:click={(e) => updateRating(sheet, item.id, "fail",
                                    parseInt(item.system.fail) + advancementStep(item.system.fail, i))}></div>
                        {/each}
                    </fail>
                </div>
            {/if}
            {#if itemType === 'trait'}
                <div class="item-detail item-uses">
                    <for>
                        {game.i18n.localize("MOUSEGUARD.F")}:
                        {#if item.system.level < 3}
                            {#each {length: parseInt(item.system.level)} as _, i}
                                <div class="{advancementStep(item.system.usedfor, i) < 0 ? 'checkmark' : 'no-checkmark'}"
                                     on:click={(e) => updateRating(sheet, item.id, "usedfor",
                                    parseInt(item.system.usedfor) + advancementStep(item.system.usedfor, i))}></div>
                            {/each}
                        {:else}
                            <strong>&infin;</strong>
                        {/if}
                    </for>
                    <against>
                        {game.i18n.localize("MOUSEGUARD.A")}:
                        {#each {length: 6} as _, i}
                            <div class="{advancementStep(item.system.usedagainst, i) < 0 ? 'checkmark' : 'no-checkmark'}"
                                 on:click={(e) => updateRating(sheet, item.id, "usedagainst",
                                    parseInt(item.system.usedagainst) + advancementStep(item.system.usedagainst, i))}></div>
                        {/each}
                    </against>
                </div>
            {/if}
            <div class="item-controls flexrow">
                {#if itemTypeConfig.editable}
                    <a class="item-control item-edit" on:click={sheet?._onItemUpdate(item.id)}>
                        <i class="fas fa-edit"></i>
                    </a>
                    <a class="item-control item-delete" on:click={sheet?._onItemDelete(item.id)}>
                        <i class="fas fa-trash"></i>
                    </a>
                {/if}
            </div>
            {#if displayDescription[item.id] && item.system.description}
                <div class="item-summary">
                    {@html item.system.description}
                </div>
            {/if}
        </li>
    </ol>
{/each}
<style>
    .items-header > * {
        font-size: 12px;
        text-align: center;
        font-family: "Germania One", cursive;
    }

    .item-detail, .item-name, .item-rank, .item-controls {
        font-family: "Germania One", cursive;
    }

    .items-header {
        height: 28px;
        margin: 2px 0;
        padding: 0;
        align-items: center;
        background: rgba(0, 0, 0, 0.05);
        border: 2px groove #eeede0;
        font-weight: bold;
    }

    .items-header h3 {
        padding-left: 5px;
        font-weight: 700;
        text-align: left;
        font-size: 16px;
        border: none;
        margin-bottom: 0;
    }

    .item-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .item {
        align-items: center;
        padding: 0 2px;
        border-bottom: 1px solid #c9c7b8;
    }

    .rollable:hover {
        text-shadow: 0 0 10px var(--color-shadow-primary);
    }

    .rollable:hover .item-image {
        background-image: url('../assets/dice/dicesword.webp') !important;
    }

    .item-image {
        flex: 0 0 35px;
        height: 40px;
        background-size: cover;
        background-position: 50% 0;
        border: none;
        margin-right: 5px;
    }

    .item-name {
        flex: 2;
        margin: 0;
        overflow: hidden;
        font-size: 13px;
        text-align: left;
        align-items: center;
    }

    .item .item-name {
        line-height: 40px;
    }

    .item-name h4 {
        margin-bottom: 0;
    }

    .item-detail {
        flex: 0 0 70px;
        font-size: 12px;
        text-align: center;
        border-right: 1px solid #c9c7b8;
        word-break: break-word;
        white-space: nowrap;
        overflow: hidden;
    }

    .item-rank {
        flex: 0 0 60px;
        border-left: 1px solid #c9c7b8;
        border-right: 1px solid #c9c7b8;
    }

    .item-rank input {
        border: none;
        text-align: center;
        background-color: white;
        height: 35px;
        font-size: large;
    }

    .item-rank input:hover {
        box-shadow: none;
    }

    .item-rank .divider {
        text-align: center;
        background-color: white;
        height: 35px;
        font-size: large;
        line-height: 35px;
    }

    .item-advancement, .item-uses {
        flex: 0 0 130px;
    }

    .item .item-advancement, .item .item-uses {
        text-align: left;
    }

    .item-controls {
        flex: 0 0 50px;
        justify-content: space-between;
    }

    .item-controls a {
        font-size: 12px;
        text-align: center;
    }

    .item-summary {
        flex: 0 0 100%;
        font-size: 12px;
        line-height: 16px;
        padding: 0.25em 0.5em;
        color: #191813;
        border-top: 1px solid #c9c7b8;
    }

    fail, pass, for, against {
        display: flex;
        width: 100%;
    }

    .checkmark:after {
        content: "✔";
        display: block;
        width: 12px;
        height: 12px;
        text-align: center;
        font-size: 10px;
        border: 1px solid #aaa;
        background: #f8f8f8;
        border-radius: 50%;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .no-checkmark:after {
        content: " ";
        display: block;
        width: 12px;
        height: 12px;
        text-align: center;
        font-size: 10px;
        border: 1px solid #aaa;
        background: #f8f8f8;
        border-radius: 50%;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    }
</style>
