<script>
    import { getContext } from "svelte";

    import { updateRating, setMouseDice } from "./MouseGuardCommon.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { sheet } = $sheetData;
    let data;
    $: data = $sheetData.data;
    $: wises = $sheetData.data.system.itemTypes.wise;
</script>

<largecard>
    <div class="item-controls item-create">
        <a
            on:click={sheet?._onItemCreate.bind(sheet)}
            class="item-control"
            title={game.i18n.localize("MOUSEGUARD.AddWise")}
            data-type="wise"
            ><i class="fas fa-plus" />
            {game.i18n.localize("MOUSEGUARD.AddWise")}</a
        >
    </div>
    <h1>{game.i18n.localize("MOUSEGUARD.Wises")}</h1>
    {#each wises as wise}
        <wise>
            <div name={wise.id}>
                <label
                    on:click={(e) =>
                        setMouseDice(
                            sheet,
                            wise.system.rank,
                            game.i18n.localize(wise.name)
                        )}
                    class="header"
                    ><a>{game.i18n.localize(wise.name)}</a>:
                </label>
                <input
                    name={wise.id}
                    type="number"
                    min="0"
                    value={wise.system.rank}
                    on:change={(e) =>
                        updateRating(
                            sheet,
                            e.target.name,
                            "rank",
                            parseInt(e.target.value)
                        )}
                />
                <pass
                    >{game.i18n.localize("MOUSEGUARD.P")}:
                    {#each { length: parseInt(wise.system.rank) + 1 } as _, i}
                        {#if wise.system.pass > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        wise.id,
                                        "pass",
                                        parseInt(wise.system.pass) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        wise.id,
                                        "pass",
                                        parseInt(wise.system.pass) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </pass>
                <fail
                    >{game.i18n.localize("MOUSEGUARD.F")}:
                    {#each { length: parseInt(wise.system.rank) } as _, i}
                        {#if wise.system.fail > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        wise.id,
                                        "fail",
                                        parseInt(wise.system.fail) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        wise.id,
                                        "fail",
                                        parseInt(wise.system.fail) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </fail>
            </div>
            <div class="item-controls">
                <a
                    on:click={sheet?._onItemDelete(wise.id)}
                    class="item-control item-delete"
                    title="Delete Item"><i class="fas fa-trash" /></a
                >
            </div>
        </wise>
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

    wise {
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

    fail {
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
