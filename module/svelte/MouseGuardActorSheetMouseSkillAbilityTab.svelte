<script>
		import MouseGuardActorSheetMouseAbilities from "./MouseGuardActorSheetMouseAbilities.svelte";
		import MouseGuardActorSheetMouseSkills from "./MouseGuardActorSheetMouseSkills.svelte";
		import MouseGuardActorSheetMouseWises from "./MouseGuardActorSheetMouseWises.svelte";

</script>

<abilities >
<MouseGuardActorSheetMouseAbilities />
</abilities>
<skill> 
<MouseGuardActorSheetMouseSkills />
</skill>
<wise>
<MouseGuardActorSheetMouseWises />
</wise>

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