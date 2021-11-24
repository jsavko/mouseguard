<script>
    import { getContext } from "svelte";
    import { identity, validate_each_argument } from "svelte/internal";
    import { updateRating, setMouseDice } from "./MouseGuardCommon.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    let abilities;
    $: data = $sheetData.data;
    $: abilities = $sheetData.data.data.itemTypes.ability;
    $: skills = $sheetData.data.data.itemTypes.skill;
    $: wises = $sheetData.data.data.itemTypes.wise;
    $: traits = $sheetData.data.data.itemTypes.trait;
</script>

<div class="box">
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
                </div>
            </ability>
        {/each}
    </largecard>
</div>

{#if Object(skills).length > 0}
    <div class="box">
        <largecard>
            <h1>{game.i18n.localize("MOUSEGUARD.Skills")}</h1>
            {#each skills as skill}
                <skill>
                    <div name={skill.id}>
                        <label
                            on:click={(e) =>
                                setMouseDice(sheet, skill.data.data.rank)}
                            class="header"
                            ><a>{game.i18n.localize(skill.name)}</a>:
                        </label>
                        <input
                            name={skill.id}
                            type="number"
                            value={skill.data.data.rank}
                            on:change={(e) =>
                                updateRating(
                                    sheet,
                                    e.target.name,
                                    "rank",
                                    parseInt(e.target.value)
                                )}
                        />
                    </div>
                    <div class="item-controls">
                        <a
                            on:click={sheet?._onItemDelete(skill._id)}
                            class="item-control item-delete"
                            title="Delete Item"><i class="fas fa-trash" /></a
                        >
                    </div>
                </skill>
            {/each}
        </largecard>
    </div>
{/if}

{#if Object(traits).length > 0}
    <div class="box">
        <largecard>
            <h1>{game.i18n.localize("MOUSEGUARD.Traits")}</h1>
            {#each traits as trait}
                <trait>
                    <div name={trait.id}>
                        <label
                            on:click={(e) =>
                                setMouseDice(sheet, trait.data.data.level)}
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
    </div>
{/if}

{#if Object(wises).length > 0}
    <h1>{game.i18n.localize("MOUSEGUARD.Wises")}</h1>
    {#each wises as wise}
        <wise>
            <div name={wise.id}>
                <label
                    on:click={(e) => setMouseDice(sheet, wise.data.data.rank)}
                    class="header"
                    ><a>{game.i18n.localize(wise.name)}</a>:
                </label>
                <input
                    name={wise.id}
                    type="number"
                    value={wise.data.data.rank}
                    on:change={(e) =>
                        updateRating(
                            sheet,
                            e.target.name,
                            "rank",
                            parseInt(e.target.value)
                        )}
                />
            </div>
            <div class="item-controls">
                <a
                    on:click={sheet?._onItemDelete(wise._id)}
                    class="item-control item-delete"
                    title="Delete Item"><i class="fas fa-trash" /></a
                >
            </div>
        </wise>
    {/each}
{/if}

<style>
    .box {
        border-radius: 0 0 0.5rem 0.5rem;
        border-top: 0;
        clear: both;
        height: 100%;
        display: flex;
    }

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
        float: left;
        height: 80px;
    }

    skill {
        display: flex;
        padding-left: 20px;
        float: left;
        height: 80px;
    }

    wise {
        display: flex;
        padding-left: 20px;
        float: left;
        height: 80px;
    }

    trait {
        display: flex;
        padding-left: 20px;
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
