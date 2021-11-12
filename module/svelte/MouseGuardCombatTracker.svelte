<script>
	import { setContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";


	//getContext("sheetStore", dataStore);	
	export let dataStore ;
	setContext("sheetStore", dataStore);
    console.log (dataStore);

</script>

<content>
	{dataStore.isGM}
</content>