<script>
    import { getContext } from "svelte";
    import { updateRating, setMouseDice } from "./MouseGuardCommon.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { sheet } = $sheetData;
    let data;
    $: data = $sheetData.data;
    $: traits = $sheetData.data.system.itemTypes.trait;

    const openCompendium = () => () => game.packs.get("mouseguard.traits").render(true);
</script>

<largecard>
    <div class="item-controls item-create">
        <a
                on:click={openCompendium()}
                class="item-control"
                title="{game.i18n.localize('MOUSEGUARD.AddItem')}"
                data-type="wise"
        ><i class="fas fa-plus" />
            {game.i18n.localize("MOUSEGUARD.AddItem")}</a
        >
    </div>
    <h1>{game.i18n.localize("MOUSEGUARD.Traits")}</h1>
    {#each traits as trait}
        <trait>
            <div name={trait.id}>
                <label
                    on:click={(e) =>
                        setMouseDice(
                            sheet,
                            trait.system.level,
                            game.i18n.localize(trait.name)
                        )}
                    class="header"
                    ><a>{game.i18n.localize(trait.name)}</a>:
                </label>
                <input
                    name={trait.id}
                    type="number"
                    min="1"
                    max="3"
                    value={trait.system.level}
                    on:change={(e) =>
                        updateRating(
                            sheet,
                            e.target.name,
                            "level",
                            parseInt(e.target.value)
                        )}
                />
                <for
                    >{game.i18n.localize("MOUSEGUARD.F")}:
                    {#each { length: 1 } as _, i}
                        {#if trait.system.usedfor > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        trait.id,
                                        "usedfor",
                                        parseInt(trait.system.usedfor) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        trait.id,
                                        "usedfor",
                                        parseInt(trait.system.usedfor) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </for>
                <pass
                    >{game.i18n.localize("MOUSEGUARD.A")}:
                    {#each { length: 6 } as _, i}
                        {#if trait.system.usedagainst > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        trait.id,
                                        "usedagainst",
                                        parseInt(trait.system.usedagainst) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        trait.id,
                                        "usedagainst",
                                        parseInt(trait.system.usedagainst) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </pass>
            </div>
            <div class="item-controls">
                <a
                    on:click={sheet?._onItemDelete(trait.id)}
                    class="item-control item-delete"
                    title="Delete Item"><i class="fas fa-trash" /></a
                >
            </div>
        </trait>
    {/each}
</largecard>

<style>
    largecard {
        margin: 0 auto;
        height: 100%;
        width: 100%;
        font-family: "Khula", sans-serif;
        flex-wrap: wrap;
        display: block;
    }

    trait {
        display: flex;
        padding-left: 20px;
        width: 250px;
        float: left;
        height: 80px;
    }

    pass {
        display: flex;
        font-family: "Germania One", cursive;
    }

    for {
        display: flex;
        font-family: "Germania One", cursive;
    }

    .item-controls {
        float: right;
    }

    .item-create {
        padding-top: 8px;
    }

    input {
        border: none;
        width: 40px;
        float: left;
        text-align: center;
        background-color: white;
        margin-right: 5px;
        margin-top: 2px;
        height: 35px;
        font-family: "Germania One", cursive;
        font-size: large;
    }

    h1 {
        font-family: "Germania One", cursive;
        padding-left: 30px;
        width: 100%;
    }

    label {
        margin-top: 3px;
        width: 100%;
        display: block;
    }

    .header {
        font-family: "Germania One", cursive;
        font-size: large;
        width: 100%;
        display: block;
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
