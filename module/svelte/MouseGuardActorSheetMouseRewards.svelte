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
                name="data.rewards.fate"
                type="number"
                value={data.data.rewards.fate}
                placeholder="0"
            />
        </fatebox>
        <personabox>
            <label class="header"
                >{game.i18n.localize("MOUSEGUARD.Persona")}</label
            >
            <input
                name="data.rewards.persona"
                type="number"
                value={data.data.rewards.persona}
                placeholder="0"
            />
        </personabox>
        <checksbox>
            <label class="header"
                >{game.i18n.localize("MOUSEGUARD.Checks")}</label
            >
            <input
                name="data.rewards.check"
                type="number"
                value={data.data.rewards.check}
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
            <textarea name="data.rewards.belief"
                >{data.data.rewards.belief}</textarea
            >
        </rewardbox>
        <rewardbox>
            <label>{game.i18n.localize("MOUSEGUARD.Instinct")}</label>
            <label class="sub"
                >{@html game.i18n.localize("MOUSEGUARD.InstinctSub")}</label
            >
            <textarea name="data.rewards.instinct"
                >{data.data.rewards.instinct}</textarea
            >
        </rewardbox>
        <rewardbox>
            <label>{game.i18n.localize("MOUSEGUARD.Goal")}</label>
            <label class="sub"
                >{@html game.i18n.localize("MOUSEGUARD.GoalSub")}</label
            >
            <textarea name="data.rewards.goal"
                >{data.data.rewards.goal}</textarea
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
        position: relative;
        top: 60;
        left: 11px;
        width: 85px;
        height: 110px;
        display: block;
        font-family: "Germania One", cursive;
        background-image: url("../assets/actor/Fate.svg");
        background-repeat: no-repeat;
        background-position-y: 25px;
    }

    fatebox input {
        width: 50px;
        position: relative;
        top: 30px;
        left: 25px;
        height: 30px;
        width: 35px;
        text-align: center;
        font-size: large;
        background: rgba(0, 0, 0, 0);
    }

    personabox {
        position: relative;
        top: 11px;
        left: 11px;
        width: 85px;
        height: 125px;
        display: block;
        font-family: "Germania One", cursive;
        background-image: url("../assets/actor/Persona.svg");
        background-repeat: no-repeat;
        background-position-y: 24px;
    }

    personabox input {
        width: 50px;
        position: relative;
        top: 22px;
        left: 25px;
        height: 50px;
        width: 35px;
        text-align: center;
        font-size: large;
        background: rgba(0, 0, 0, 0);
    }

    rewardbox {
        position: relative;
        left: 10px;
        width: 95%;
        margin-bottom: 10px;
        display: block;
        font-family: "Germania One", cursive;
        font-size: large;
    }

    checksbox {
        position: relative;
        top: 11px;
        left: 11px;
        width: 85px;
        height: 125px;
        display: block;
        font-family: "Germania One", cursive;
        background-image: url("../assets/actor/Checks.svg");
        background-repeat: no-repeat;
        background-position-y: 24px;
    }

    checksbox input {
        width: 50px;
        position: relative;
        top: 18px;
        left: 25px;
        height: 50px;
        width: 35px;
        text-align: center;
        font-size: large;
        background: rgba(0, 0, 0, 0);
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
    }
</style>
