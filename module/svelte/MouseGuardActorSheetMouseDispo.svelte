<script>
    import { getContext } from "svelte";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    $: data = $sheetData.data;
</script>

<largecard>
    <h1>{game.i18n.localize("MOUSEGUARD.Disposition")}</h1>
    <startingBox>
        <label class="header"
            >Starting {game.i18n.localize("MOUSEGUARD.Disposition")}</label
        >
    </startingBox>
    <currentBox>
        <label class="header"
            >Current {game.i18n.localize("MOUSEGUARD.Disposition")}</label
        >
    </currentBox>
    <dispoBox>
        <startingDispo>
            <input
                name="data.disposition.starting"
                type="number"
                value={data.data.disposition.starting}
                placeholder="0"
            />
        </startingDispo>

        <currentDispo>
            <input
                name="data.disposition.current"
                type="number"
                value={data.data.disposition.current}
                placeholder="0"
            />
        </currentDispo>
    </dispoBox>
</largecard>

<style>
    largecard {
        margin: 0 auto;
        display: flex;
        width: 100%;
        font-family: "Khula", sans-serif;
        flex-wrap: wrap;
    }

    startingBox {
        position: relative;
        left: 110px;
        top: 85px;
        width: 70px;
        font-family: "Germania One", cursive;
    }

    startingDispo {
        position: absolute;
        left: 140px;
        top: 60px;
        width: 70px;
        font-family: "Germania One", cursive;
    }

    startingDispo input {
        position: relative;
        top: 10px;
        /* left: 7px; */
        height: 50px;
        width: 50px;
        text-align: center;
        font-size: 40px;
        background: rgba(0, 0, 0, 0);
    }

    currentBox {
        position: relative;
        left: 40px;
        top: 170px;
        font-family: "Germania One", cursive;
        width: 0px;
    }

    currentDispo {
        position: absolute;
        left: 140px;
        top: 170px;
        font-family: "Germania One", cursive;
        width: 70px;
    }

    currentDispo input {
        position: relative;
        height: 50px;
        width: 50px;
        text-align: center;
        font-size: 40px;
        background: rgba(0, 0, 0, 0);
    }

    .container {
        display: flex;
        flex-direction: row;
    }
    .child {
        width: 50%;
        height: 100%; /* Or whatever */
        margin: auto; /* Magic! */
    }

    lineitem {
        width: 210px;
        margin: auto; /* Magic! */
        display: flex;
        float: left;
        padding: 5px;
        height: 100%;
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

    dispoBox {
        position: relative;
        top: 11px;
        left: 11px;
        width: 250px;
        height: 300px;
        display: block;
        font-family: "Germania One", cursive;
        background-image: url("../assets/actor/DispositionBanner.svg");
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
        width: 175px;
        display: block;
    }

    .right {
        width: 85%;
        display: block;
    }
</style>
