<script>
    import { getContext } from "svelte";
    import { updateRating, setMouseDice } from "./MouseGuardCommon.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { sheet } = $sheetData;
    let data;
    let abilities;
    $: data = $sheetData.data;
    $: abilities = $sheetData.data.system.itemTypes.ability;
    $: skills = $sheetData.data.system.itemTypes.skill;
    $: wises = $sheetData.data.system.itemTypes.wise;
    $: traits = $sheetData.data.system.itemTypes.trait;
</script>

<div class="box">
    <largecard>
        <h1>{game.i18n.localize("MOUSEGUARD.Abilities")}</h1>
        {#each abilities as ability}
            <ability>
                <div name={ability.id}>
                    <label
                        on:click={(e) =>
                            setMouseDice(sheet, ability.system.rating)}
                        class="header"
                        ><a>{game.i18n.localize(ability.name)}</a>:
                    </label>
                    <input
                        name={ability.id}
                        type="number"
                        value={ability.system.rating}
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
                                setMouseDice(sheet, skill.system.rank)}
                            class="header"
                            ><a>{game.i18n.localize(skill.name)}</a>:
                        </label>
                        <input
                            name={skill.id}
                            type="number"
                            value={skill.system.rank}
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
                                setMouseDice(sheet, trait.system.level)}
                            class="header"
                            ><a>{game.i18n.localize(trait.name)}</a>:
                        </label>
                        <input
                            name={trait.id}
                            type="number"
                            value={trait.system.level}
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
                    on:click={(e) => setMouseDice(sheet, wise.system.rank)}
                    class="header"
                    ><a>{game.i18n.localize(wise.name)}</a>:
                </label>
                <input
                    name={wise.id}
                    type="number"
                    value={wise.system.rank}
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
</style>
