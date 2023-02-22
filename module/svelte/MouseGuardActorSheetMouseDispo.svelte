<script>
    import {getContext} from "svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<largecard>
    <h1>{game.i18n.localize("MOUSEGUARD.Disposition")}</h1>

    <dispoBox>
        <startingBox>
            <label class="header"
            >Starting {game.i18n.localize("MOUSEGUARD.Disposition")}</label
            >
            <input
                    class="disposition-value"
                    name="system.disposition.starting"
                    type="number"
                    value={data.system.disposition.starting}
                    placeholder="0"
            />
        </startingBox>
        <currentBox>
            <label class="header"
            >Current {game.i18n.localize("MOUSEGUARD.Disposition")}</label
            >
            <input
                    class="disposition-value"
                    name="system.disposition.current"
                    type="number"
                    value={data.system.disposition.current}
                    placeholder="0"
            />
        </currentBox>
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

    dispoBox {
        margin: auto;
        width: 250px;
        height: 300px;
        display: block;
        font-family: "Germania One", cursive;
        background-image: url("../assets/actor/DispositionBanner.svg");
        background-repeat: no-repeat;
        background-position-y: 24px;
    }

    startingBox {
        margin-top: 66px;
        display: grid;
        grid-template-columns: 125px auto;
        font-family: "Germania One", cursive;
    }

    currentBox {
        margin-top: 52px;
        display: grid;
        grid-template-columns: 125px auto;
        font-family: "Germania One", cursive;
    }

    input.disposition-value {
        margin: auto auto auto 12px;
        height: 50px;
        width: 50px;
        text-align: center;
        font-size: 40px;
        background: rgba(0, 0, 0, 0);
        border: none;
    }

    label {
        margin-top: 3px;
        width: 100%;
        display: block;
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
</style>
