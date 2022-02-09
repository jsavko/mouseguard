<script>
    import { setContext } from "svelte";

    // Component imports
    //TODO: IMPORTS

    import MouseGuardActorSheetHeader from "./MouseGuardActorSheetHeader.svelte";
    import MouseGuardNpcActorSheetBody from "./MouseGuardNPCActorSheetBody.svelte";
    import MouseGuardActorSheetMouseDispo from "./MouseGuardActorSheetMouseDispo.svelte";

    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);
    //let sheetData = getContext("sheetStore");
</script>

<div class="box"><MouseGuardActorSheetHeader /></div>

<div class="box">
    <MouseGuardNpcActorSheetBody />
</div>
<div class="box">
    <MouseGuardActorSheetMouseDispo />
</div>

<style>
    .box {
        border-radius: 0 0 0.5rem 0.5rem;
        border-top: 0;
    }

    content {
        overflow-y: scroll;
    }

    @import url("https://fonts.googleapis.com/css2?family=Germania+One&family=Khula&display=swap");
</style>
