<script>
		import MouseGuardActorSheetMouseAbilities from "./MouseGuardActorSheetMouseAbilities.svelte";
		import MouseGuardActorSheetMouseSkills from "./MouseGuardActorSheetMouseSkills.svelte";
		import MouseGuardActorSheetMouseWises from "./MouseGuardActorSheetMouseWises.svelte";

</script>

<abilities >
<MouseGuardActorSheetMouseAbilities />
</abilities>
<wise>
	<MouseGuardActorSheetMouseWises />
</wise>
<skill> 
<MouseGuardActorSheetMouseSkills />
</skill>

<style>
	abilities { 
		clear: both;
		height: 100%;
    display: flex
	}
	skill { 
		clear: both;
		display:block;
	}
	wise { 
		clear: both;
		height: 100%;
    display: flex
	}
</style>