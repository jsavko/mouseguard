<script>
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";
	import { identity, validate_each_argument } from "svelte/internal";
	import { updateRating} from "./MouseGuardCommon.svelte";

	//getContext("sheetStore", dataStore);	
	let sheetData = getContext("sheetStore");
	let { actor, sheet } = $sheetData;
	let data;
	let abilities;
	$: data = $sheetData.data;
	$: wises = $sheetData.data.data.itemTypes.wise;


</script>

<largecard>
	<h1>Wises</h1>
	{#each wises as wise}
		<wise>
		<div name="{wise.id}">
			<label  class="header">{game.i18n.localize( wise.name )}: </label>
			<input name="{wise.id}" type="number" value="{wise.data.data.rank}" on:change={e => updateRating(sheet,e.target.name, 'rank', parseInt(e.target.value)) }/>
			<pass>P: 
			{#each {length: parseInt(wise.data.data.rank) +1} as _, i}
				{#if wise.data.data.pass > i}
					<div  on:click={e => updateRating(sheet,wise.id, 'pass', parseInt(wise.data.data.pass)-1 ) }  class="checkmark"></div>
				{:else}
					<div on:click={e => updateRating(sheet,wise.id, 'pass', parseInt(wise.data.data.pass)+1 ) }  class="no-checkmark"></div>
				{/if}
			{/each}
			</pass>
			<fail>F: 
				{#each {length: parseInt(wise.data.data.rank) } as _, i}
					{#if wise.data.data.fail > i}
						<div  on:click={e => updateRating(sheet,wise.id, 'fail', parseInt(wise.data.data.fail)-1 ) } class="checkmark"></div>
					{:else}
						<div on:click={e => updateRating(sheet,wise.id, 'fail', parseInt(wise.data.data.fail)+1 ) } class="no-checkmark"></div>
					{/if}
				{/each}
			</fail>
		</div>
		<div class="item-controls">
			<a on:click={sheet?._onItemDelete(wise._id)} class="item-control item-delete" title="Delete Item"><i class="fas fa-trash"></i></a>
		</div>
		</wise>
	{/each}
    <ol>
        <li class="item flexrow item-header">
            <div class="item-image"></div>
            <div class="item-name"></div>
            <div class="item-controls">
              <a on:click={sheet?._onItemCreate.bind(sheet)} class="item-control item-create" title="Create item" data-type="wise" ><i class="fas fa-plus"></i> Add item</a>
            </div>
          </li>
    </ol>
</largecard>


<style>
	largecard {
		margin: 0 auto;
		height: 100%;
		width: 100%;
		font-family: 'Khula', sans-serif;
		flex-wrap: wrap;
		display:block;
		}

	wise {
		display: flex;
		padding-left: 20px;
		width: 250px;
		float:left;
		height: 80px;

	}

	pass {
		display:flex;
		font-family: 'Germania One', cursive;
	}

	fail {
		display:flex;
		font-family: 'Germania One', cursive;
	}

	input {
		border: none;
		width: 40px;
		float: left;
		text-align: center;
		background-color: white;
		margin-right: 5px;
		margin-top: 2px;
		height: 35px;
		font-family: 'Germania One', cursive;
		font-size:large;	
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

	.header { 
		font-family: 'Germania One', cursive;
		font-size: large;
		width: 100%;
		display: block;
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