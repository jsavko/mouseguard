<script>
    import { getContext } from "svelte";
    import { updateRating, setMouseDice } from "./MouseGuardCommon.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { sheet } = $sheetData;
    let data;
    let abilities;
    $: data = $sheetData.data;
    $: abilities = $sheetData.data.data.itemTypes.ability;
</script>

<largecard>
    <h1>{game.i18n.localize("MOUSEGUARD.Abilities")}</h1>
    {#each abilities as ability}
        <ability>
            <div name={ability.id}>
                <label
                    on:click={(e) =>
                        setMouseDice(sheet, ability.data.data.rating)}
                    class="header"
                    ><a>{game.i18n.localize(ability.name)}</a>:
                </label>
                <input
                    name={ability.id}
                    type="number"
                    value={ability.data.data.rating}
                    on:change={(e) =>
                        updateRating(
                            sheet,
                            e.target.name,
                            "rating",
                            parseInt(e.target.value)
                        )}
                />
                {#if ability.name === "MOUSEGUARD.MNature"}
                    <input
                        name={ability.id}
                        type="number"
                        value={ability.data.data.tax}
                        on:change={(e) =>
                            updateRating(
                                sheet,
                                e.target.name,
                                "tax",
                                parseInt(e.target.value)
                            )}
                    />
                {/if}
                <pass
                    >P:
                    {#each { length: parseInt(ability.data.data.rating) + 1 } as _, i}
                        {#if ability.data.data.pass > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        ability.id,
                                        "pass",
                                        parseInt(ability.data.data.pass) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        ability.id,
                                        "pass",
                                        parseInt(ability.data.data.pass) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </pass>
                <fail
                    >F:
                    {#each { length: parseInt(ability.data.data.rating) } as _, i}
                        {#if ability.data.data.fail > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        ability.id,
                                        "fail",
                                        parseInt(ability.data.data.fail) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        ability.id,
                                        "fail",
                                        parseInt(ability.data.data.fail) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </fail>
            </div>
        </ability>
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

    ability {
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
        cursor: pointer;
    }

    label:hover {
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
