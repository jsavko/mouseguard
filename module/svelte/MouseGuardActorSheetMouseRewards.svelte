<script>
    import { getContext } from "svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<largecard>
    <h1>{game.i18n.localize("MOUSEGUARD.Rewards")}</h1>
    <left class="left">
        <fatebox>
            <label class="header">{game.i18n.localize("MOUSEGUARD.Fate")}</label
            >
            <input
                name="system.rewards.fate"
                type="number"
                value={data.system.rewards.fate}
                placeholder="0"
            />
        </fatebox>
        <personabox>
            <label class="header"
                >{game.i18n.localize("MOUSEGUARD.Persona")}</label
            >
            <input
                name="system.rewards.persona"
                type="number"
                value={data.system.rewards.persona}
                placeholder="0"
            />
        </personabox>
        <checksbox>
            <label class="header"
                >{game.i18n.localize("MOUSEGUARD.Checks")}</label
            >
            <input
                name="system.rewards.check"
                type="number"
                value={data.system.rewards.check}
                placeholder="0"
            />
        </checksbox>
    </left>
    <right class="right">
        <rewardbox>
            <label>{game.i18n.localize("MOUSEGUARD.Belief")}</label>
            <label class="sub"
                >{@html game.i18n.localize("MOUSEGUARD.BeliefSub")}</label
            >
            <textarea name="system.rewards.belief"
                >{data.system.rewards.belief}</textarea
            >
        </rewardbox>
        <rewardbox>
            <label>{game.i18n.localize("MOUSEGUARD.Instinct")}</label>
            <label class="sub"
                >{@html game.i18n.localize("MOUSEGUARD.InstinctSub")}</label
            >
            <textarea name="system.rewards.instinct"
                >{data.system.rewards.instinct}</textarea
            >
        </rewardbox>
        <rewardbox>
            <label>{game.i18n.localize("MOUSEGUARD.Goal")}</label>
            <label class="sub"
                >{@html game.i18n.localize("MOUSEGUARD.GoalSub")}</label
            >
            <textarea name="system.rewards.goal"
                >{data.system.rewards.goal}</textarea
            >
        </rewardbox>
    </right>
</largecard>

<style>
    largecard {
        margin: 0 auto;
        display: flex;
        width: 100%;
        font-family: "Khula", sans-serif;
        flex-wrap: wrap;
    }

    label {
        margin-top: 3px;
    }
    input {
        border: none;
    }

    h1 {
        font-family: "Germania One", cursive;
        padding-left: 30px;
        width: 100%;
    }

    .header {
        font-family: "Germania One", cursive;
        font-size: large;
        width: 100%;
        text-align: center;
        display: block;
    }

    fatebox {
        display: block;
        font-family: "Germania One", cursive;
    }

    fatebox input {
        width: 100px;
        height: 100px;
        text-align: center;
        font-size: large;
        background: rgba(0, 0, 0, 0) url("../assets/actor/Fate.svg") center no-repeat;
    }

    personabox {
        display: block;
        font-family: "Germania One", cursive;
    }

    personabox input {
        width: 100px;
        height: 100px;
        text-align: center;
        font-size: large;
        background: rgba(0, 0, 0, 0) url("../assets/actor/Persona.svg") center no-repeat;
    }

    checksbox {
        display: block;
        font-family: "Germania One", cursive;
    }

    checksbox input {
        width: 100px;
        height: 100px;
        text-align: center;
        font-size: large;
        background: rgba(0, 0, 0, 0) url("../assets/actor/Checks.svg") center no-repeat;
    }

    rewardbox {
        margin-bottom: 10px;
        display: block;
        font-family: "Germania One", cursive;
        font-size: large;
    }

    label {
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

    .left {
        width: 100px;
        display: block;
    }

    .right {
        width: 85%;
        display: block;
        padding-left: 10px;
    }
</style>
