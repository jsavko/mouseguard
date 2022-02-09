<script>
    import { getContext } from "svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
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

    label {
        width: 100%;
        display: block;
    }
</style>
