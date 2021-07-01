<script>
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";


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
		left: sheet.position.left + 10,
		});
    return fp.browse();
	};

</script>


<smallcard>
	<img on:click={filePicker} class="profile-img" src="{data.img}" data-edit="img" title="{data.name}" height="125" width="125"/>
</smallcard>

<style>
	smallcard {
		margin: 0 auto;
		padding: 1em;
		display: inline-block;
		border: 1px solid black;
		text-align: center;
		vertical-align: bottom;
		height: 275px;
		width: 365px;
	}




</style>