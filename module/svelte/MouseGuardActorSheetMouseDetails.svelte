<script>
    import { getContext } from "svelte";

    import MouseGuardEditor from "./MouseGuardEditor.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;
</script>

<largecard>
    <h1>{game.i18n.localize("MOUSEGUARD.About")}</h1>
    <ul>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Age")}: </label>
            <input
                name="system.details.age"
                type="number"
                value={data.system.details.age}
                placeholder="0"
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Parents")}: </label>
            <input
                name="system.details.parents"
                type="text"
                value={data.system.details.parents}
                placeholder={game.i18n.localize("MOUSEGUARD.Parents")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Home")}: </label>
            <input
                name="system.details.home"
                type="text"
                value={data.system.details.home}
                placeholder={game.i18n.localize("MOUSEGUARD.Home")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Senior")}: </label>
            <input
                name="system.details.senior_artisan"
                type="text"
                value={data.system.details.senior_artisan}
                placeholder={game.i18n.localize("MOUSEGUARD.Senior")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Fur")}: </label>
            <input
                name="system.details.fur_color"
                type="text"
                value={data.system.details.fur_color}
                placeholder={game.i18n.localize("MOUSEGUARD.Fur")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Mentor")}: </label>
            <input
                name="system.details.mentor"
                type="text"
                value={data.system.details.mentor}
                placeholder={game.i18n.localize("MOUSEGUARD.Mentor")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Cloak")}: </label>
            <input
                name="system.details.cloak_color"
                type="text"
                value={data.system.details.cloak_color}
                placeholder={game.i18n.localize("MOUSEGUARD.Cloak")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Friend")}: </label>
            <input
                name="system.details.friend"
                type="text"
                value={data.system.details.friend}
                placeholder={game.i18n.localize("MOUSEGUARD.Friend")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.GuardRank")}: </label>
            <input
                name="system.details.guard_rank"
                type="text"
                value={data.system.details.guard_rank}
                placeholder={game.i18n.localize("MOUSEGUARD.GuardRank")}
            />
        </lineitem>
        <lineitem>
            <label>{game.i18n.localize("MOUSEGUARD.Enemy")}: </label>
            <input
                name="system.details.enemy"
                type="text"
                value={data.system.details.enemy}
                placeholder={game.i18n.localize("MOUSEGUARD.Enemy")}
            />
        </lineitem>
    </ul>
</largecard>
<h1>{game.i18n.localize("MOUSEGUARD.Bio")}</h1>
<MouseGuardEditor target="system.biography" />

<style>
    largecard {
        margin: 0 auto;
        display: inline-block;
        width: 100%;
        font-family: "Khula", sans-serif;
    }

    lineitem {
        margin: auto; /* Magic! */
        display: flex;
        float: left;
        padding: 5px;
        height: 100%;
    }

    label {
        width: 180px;
        text-align: right;
        margin-top: 3px;
        padding-right: 2px;
        font-weight: bold;
        font-family: "Khula", sans-serif;
    }

    input {
        border: none;
    }

    lineitem input {
        padding-top: 5px;
        pointer-events: auto;
    }

    h1 {
        font-family: "Germania One", cursive;
        padding-left: 30px;
        width: 100%;
    }
</style>
