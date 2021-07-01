<script>
	import { setContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";

	// Component imports
	//TODO: IMPORTS
	import MouseGuardActorSheetHeader from "./MouseGuardActorSheetHeader.svelte"; 
	import MouseGuardActorSheetMouseDetails from "./MouseGuardActorSheetMouseDetails.svelte"; 
	import MouseGuardActorSheetPortrait from "./MouseGuardActorSheetMousePortrait.svelte"; 
	import MouseGuardActorSheetMouseRewards from "./MouseGuardActorSheetMouseRewards.svelte"; 



	//Exports
	export let dataStore ;
	setContext("sheetStore", dataStore);
	//let sheetData = getContext("sheetStore");
	let { actor, data, sheet } = $dataStore;
</script>

<content>
<div class="wrapper">
	<left class="left">
		<MouseGuardActorSheetMouseDetails />
		<MouseGuardActorSheetMouseRewards />

	</left>
	<right class="right">
		<MouseGuardActorSheetPortrait />
	</right>
</div>
</content>
<style>
	content {
		overflow-y: scroll;
	}
	.wrapper {
		display: flex;
		background: white;
		border: 4px solid black;
	}

	.left {
		width: 460px;
	}

	.right { 
		width: 365px;
	}

	@media all {
	.left { order: 1; }
	.right    { order: 2; }

}

@import url('https://fonts.googleapis.com/css2?family=Germania+One&family=Khula&display=swap');

</style>