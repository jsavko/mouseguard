<script>
    import { getContext } from "svelte";
    import { updateRating, setMouseDice } from "./MouseGuardCommon.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { sheet } = $sheetData;
    let data;
    $: data = $sheetData.data;
    $: skills = $sheetData.data.system.itemTypes.skill;

    const openCompendium = () => () => game.packs.get("mouseguard.skills").render(true);
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
    <h1>{game.i18n.localize("MOUSEGUARD.Skills")}</h1>
    {#each skills as skill}
        <skill>
            <div name={skill.id}>
                <label
                    on:click={(e) =>
                        setMouseDice(
                            sheet,
                            skill.system.rank,
                            game.i18n.localize(skill.name)
                        )}
                    class="header"
                    ><a>{game.i18n.localize(skill.name)}</a>:
                </label>
                <input
                    name={skill.id}
                    type="number"
                    min="0"
                    value={skill.system.rank}
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
                    {#each { length: parseInt(skill.system.rank) + 1 } as _, i}
                        {#if skill.system.pass > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        skill.id,
                                        "pass",
                                        parseInt(skill.system.pass) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        skill.id,
                                        "pass",
                                        parseInt(skill.system.pass) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </pass>
                <fail
                    >{game.i18n.localize("MOUSEGUARD.F")}:
                    {#each { length: parseInt(skill.system.rank) } as _, i}
                        {#if skill.system.fail > i}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        skill.id,
                                        "fail",
                                        parseInt(skill.system.fail) - 1
                                    )}
                                class="checkmark"
                            />
                        {:else}
                            <div
                                on:click={(e) =>
                                    updateRating(
                                        sheet,
                                        skill.id,
                                        "fail",
                                        parseInt(skill.system.fail) + 1
                                    )}
                                class="no-checkmark"
                            />
                        {/if}
                    {/each}
                </fail>
            </div>
            <div class="item-controls">
                <a
                    on:click={sheet?._onItemDelete(skill.id)}
                    class="item-control item-delete"
                    title="Delete Item"><i class="fas fa-trash" /></a
                >
            </div>
        </skill>
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

    skill {
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
