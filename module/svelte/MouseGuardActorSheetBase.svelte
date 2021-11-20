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
	import MouseGuardActorSheetMouseAbilities from "./MouseGuardActorSheetMouseAbilities.svelte";
	import MouseGuardActorSheetMouseSkillAbilityTab from "./MouseGuardActorSheetMouseSkillAbilityTab.svelte";
	import MouseGuardActorSheetMouseDispo from "./MouseGuardActorSheetMouseDispo.svelte";
	import Tabs from "./Tabs.svelte";


	//Exports
	export let dataStore ;
	setContext("sheetStore", dataStore);
	//let sheetData = getContext("sheetStore");
	let { actor, data, sheet } = $dataStore;

	let items = [
    { label: game.i18n.localize("MOUSEGUARD.About"),
		 value: 1,
		 component: MouseGuardActorSheetMouseDetails
		},
    { label: game.i18n.localize("MOUSEGUARD.Tab2"),
		 value: 2,
		 component: MouseGuardActorSheetMouseSkillAbilityTab
		},
    { label: game.i18n.localize("MOUSEGUARD.Rewards"),
		 value: 3,
		 component: MouseGuardActorSheetMouseRewards
		},
	{ label: game.i18n.localize("MOUSEGUARD.Disposition"),
		 value: 4,
		 component: MouseGuardActorSheetMouseDispo
		}
  ];

	
</script>

<content>
	<Tabs {items} />
</content>
<style>
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