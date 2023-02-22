<script>
    import { getContext } from "svelte";

    import MouseGuardActorSheetPortrait from "./MouseGuardActorSheetMousePortrait.svelte";
    import MouseGuardActorSheetMouseName from "./MouseGuardActorSheetMouseName.svelte";

    //getContext("sheetStore", dataStore);
    let sheetData = getContext("sheetStore");
    let { actor, sheet } = $sheetData;
    let data;
    $: data = $sheetData.data;
    console.log(data);

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
    <div class="flex-container">
        <div class="flex-item">
            <MouseGuardActorSheetMouseName />
        </div>
        <MouseGuardActorSheetPortrait />
    </div>
</actorhead>

<style>
    .flex-container {
        display: flex;
    }

    .flex-item {
        flex-grow: 1;
    }
</style>
