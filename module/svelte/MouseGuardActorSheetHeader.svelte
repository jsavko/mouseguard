<script>
    import { getContext } from "svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    $: data = $sheetData.data;

    /**
     * Opens a File Picker and updates the actor accordingly.
     */
    const filePicker = (event) => {
        const attr = event.currentTarget.dataset.edit;
        const current = getProperty(data, attr);
        const fp = new FilePicker({
            type: "image",
            current: current,
            callback: (path) => {
                actor.update({ [attr]: path });
            },
            top: sheet.position.top + 40,
            left: sheet.position.left + 10
        });
        return fp.browse();
    };
</script>

<actorhead>
    <img
        on:click={filePicker}
        class="profile-img"
        src={data.img}
        data-edit="img"
        title={data.name}
        height="125"
        width="125"
    />
    <div class="namebox">
        <input name="name" type="text" value={data.name} placeholder="Name" />
    </div>
</actorhead>

<style>
    actorhead {
        margin: 0 auto;
        padding: 1em;
        display: grid;
        grid-template-columns: 125px auto auto auto auto auto;
        grid-template-rows: 45px 80px auto;
        text-align: center;
        vertical-align: bottom;
        height: 100%;
    }

    actorhead input {
        border: none;
        height: 45px;
        font-size: 20px;
    }
    .profile-img {
        grid-column-start: 1;
        grid-column-end: 1;
        grid-row-start: 1;
        grid-row-end: 2;
        margin-top: 0px;
    }
    .namebox {
        grid-column-start: 2;
        grid-column-end: 7;
        grid-row-start: 1;
        grid-row-end: 1;
        text-align: left;
        vertical-align: bottom;
        margin-left: 2px;
    }
</style>
