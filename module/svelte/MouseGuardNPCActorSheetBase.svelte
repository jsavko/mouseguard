<script>
	import { setContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";

	// Component imports
	//TODO: IMPORTS
	import MouseGuardActorSheetPortrait from "./MouseGuardActorSheetMousePortrait.svelte"; 
	
	import MouseGuardActorSheetMouseAbilities from "./MouseGuardActorSheetMouseAbilities.svelte";
	import MouseGuardActorSheetHeader from "./MouseGuardActorSheetHeader.svelte";
	import MouseGuardNpcActorSheetBody from "./MouseGuardNPCActorSheetBody.svelte";
	import MouseGuardActorSheetMouseSkillAbilityTab from "./MouseGuardActorSheetMouseSkillAbilityTab.svelte";
	import MouseGuardEditor from "./MouseGuardEditor.svelte";

	//Exports
	export let dataStore ;
	setContext("sheetStore", dataStore);
	//let sheetData = getContext("sheetStore");
	let { actor, data, sheet } = $dataStore;

</script>
<div class="box"><MouseGuardActorSheetHeader /></div>

<div class="box">
	<MouseGuardNpcActorSheetBody />
</div>
<style>

	.box {
      border-radius: 0 0 .5rem .5rem;
      border-top: 0;
      }

	content {
		overflow-y: scroll;
	}
	.wrapper {
		display: flex;
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