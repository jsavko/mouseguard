<script>
    import { setContext } from "svelte";

    //getContext("sheetStore", dataStore);
    export let dataStore;
    setContext("sheetStore", dataStore);
    console.log(dataStore);
</script>

<content>
    {dataStore.isGM}
</content>
