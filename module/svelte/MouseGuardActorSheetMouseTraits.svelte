<script>
    import { getContext } from "svelte";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";
    import { identity, validate_each_argument } from "svelte/internal";
    import { updateRating, setMouseDice } from "./MouseGuardCommon.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    let abilities;
    $: data = $sheetData.data;
    $: traits = $sheetData.data.data.itemTypes.trait;
</script>

<largecard>
    <h1>{game.i18n.localize("MOUSEGUARD.Traits")}</h1>
    {#each traits as trait}
        <trait>
            <div name={trait.id}>
                <label
                    on:click={(e) => setMouseDice(sheet, trait.data.data.level)}
                    class="header"
                    ><a>{game.i18n.localize(trait.name)}</a>:
                </label>
                <input
                    name={trait.id}
                    type="number"
                    value={trait.data.data.level}
                    on:change={(e) =>
                        updateRating(
                            sheet,
                            e.target.name,
                            "level",
                            parseInt(e.target.value)
                        )}
                />
                <for
                    >F:
                    {#each { length: 1 } as _, i}
                        {#if trait.data.data.usedfor > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        trait.id,
                                        "usedfor",
                                        parseInt(trait.data.data.usedfor) - 1
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
                                        parseInt(trait.data.data.usedfor) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </for>
                <pass
                    >A:
                    {#each { length: 6 } as _, i}
                        {#if trait.data.data.usedagainst > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        trait.id,
                                        "usedagainst",
                                        parseInt(trait.data.data.usedagainst) -
                                            1
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
                                        parseInt(trait.data.data.usedagainst) +
                                            1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </pass>
            </div>
            <div class="item-controls">
                <a
                    on:click={sheet?._onItemDelete(trait._id)}
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
    .sub {
        font-size: small;
        font-family: "Khula", sans-serif;
    }

    textarea {
        font-size: small;
        font-family: "Khula", sans-serif;
        border: none;
        font-weight: bold;
        background: rgba(0, 0, 0, 0.05);
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
