<script>
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";
	import { identity, validate_each_argument } from "svelte/internal";


	//getContext("sheetStore", dataStore);	
	let sheetData = getContext("sheetStore");
	let { actor, sheet } = $sheetData;
	let data;
	let abilities;
	$: data = $sheetData.data;
	$: abilities = $sheetData.data.data.itemTypes.ability;

	function updateRating(item, type, value){
		sheet?._updateActorAbility(item, type, value)
	}


</script>

<largecard>
	<h1>Abilities</h1>
	{#each abilities as ability}
		<div name="{ability.id}">
			<label>{game.i18n.localize( ability.name )}: </label>
			<input name="{ability.id}" type="number" value="{ability.data.data.rating}" on:change={e => updateRating(e.target.name, 'rating', e.target.value) }/>
			{ability.data.data.rating} Pass: {ability.data.data.pass}  Fail: {ability.data.data.fail}
			<pass>P:
			{#each {length: parseInt(ability.data.data.rating) +1} as _, i}
				{#if ability.data.data.pass > i}
					<div  on:click={e => updateRating(ability.id, 'pass', parseInt(ability.data.data.pass)-1 ) }  class="checkmark"></div>
				{:else}
					<div on:click={e => updateRating(ability.id, 'pass', parseInt(ability.data.data.pass)+1 ) }  class="no-checkmark"></div>
				{/if}
			{/each}
			</pass>
			<fail>F:
				{#each {length: parseInt(ability.data.data.rating) } as _, i}
					{#if ability.data.data.fail > i}
						<div  on:click={e => updateRating(ability.id, 'fail', parseInt(ability.data.data.fail)-1 ) } class="checkmark"></div>
					{:else}
						<div on:click={e => updateRating(ability.id, 'fail', parseInt(ability.data.data.fail)+1 ) } class="no-checkmark"></div>
					{/if}
				{/each}
			</fail>
		</div>
		<br>	
	{/each}

</largecard>


<style>
	largecard {
		margin: 0 auto;
		width: 100%;
		font-family: 'Khula', sans-serif;
		flex-wrap: wrap;
	}

	pass {
		display:flex;
	}

	fail {
		display:flex;
	}

	input {
		border: none;
	}

	h1 { 
		font-family: 'Germania One', cursive;
		padding-left: 30px;
		width: 100%;
	}

	label {
		margin-top: 3px;
		width: 100%;
		display:block;
	}
	.sub {
		font-size:small;
		font-family: 'Khula', sans-serif;
	}

	textarea {
		font-size:small;
		font-family: 'Khula', sans-serif;
		border: none;
		font-weight: bold;
		background: rgba(0, 0, 0, 0.05);

	}

.checkmark:after {
	content: '✔';
	display:block;
	width: 12px; 
	height: 12px;
	text-align: center;
	font-size:10px;
	border: 1px solid #aaa;
	background: #f8f8f8;
	border-radius: 50%;
	box-shadow: inset 0 1px 3px rgba(0,0,0,.3)
}

.no-checkmark:after {
	content: ' ';
	display:block;
	width: 12px; 
	height: 12px;
	text-align: center;
	font-size:10px;
	border: 1px solid #aaa;
	background: #f8f8f8;
	border-radius: 50%;
	box-shadow: inset 0 1px 3px rgba(0,0,0,.3)
}


</style>