<script>
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";


	//getContext("sheetStore", dataStore);	
	let sheetData = getContext("sheetStore");
	let { actor, sheet } = $sheetData;
	let data;
	$: data = $sheetData.data;

</script>

<largecard>
	<h1>Rewards</h1>
	<left class="left">
		<fatebox>
			<label class="header">{game.i18n.localize("MOUSEGUARD.Fate")}</label>
			<input name="data.rewards.fate" type="number" value="{data.data.rewards.fate}" placeholder="0"/>
		</fatebox>
		<personabox>
			<label class="header">{game.i18n.localize("MOUSEGUARD.Persona")}</label>
			<input name="data.rewards.persona" type="number" value="{data.data.rewards.persona}" placeholder="0"/>
		</personabox>
	</left>
	<right class="right">
		<beliefbox>
			<label>{game.i18n.localize("MOUSEGUARD.Belief")}</label>
			<label>{@html game.i18n.localize("MOUSEGUARD.BeliefSub")}</label>
			<input name="data.rewards.belief" type="text" value="{data.data.rewards.belief}" placeholder="{game.i18n.localize("MOUSEGUARD.Belief")}"/>
		</beliefbox>
		<instinctbox>
			<label>{game.i18n.localize("MOUSEGUARD.Instinct")}</label>
			<label>{@html game.i18n.localize("MOUSEGUARD.InstinctSub")}</label>
			<input name="data.rewards.instinct" type="text" value="{data.data.rewards.instinct}" placeholder="{game.i18n.localize("MOUSEGUARD.Instinct")}"/>

		</instinctbox>
		<goalbox>
			<label>{game.i18n.localize("MOUSEGUARD.Goal")}</label>
			<label>{@html game.i18n.localize("MOUSEGUARD.GoalSub")}</label>
			<input name="data.rewards.goal" type="text" value="{data.data.rewards.goal}" placeholder="{game.i18n.localize("MOUSEGUARD.Goal")}"/>

		</goalbox>
	</right>
</largecard>


<style>
	largecard {
		margin: 0 auto;
		display: flex;
		border: 1px solid black;
		height: 290px;
		width: 460px;
		font-family: 'Khula', sans-serif;
	}
	.container {
		display: flex;
		flex-direction: row;
	}
	.child {
		width: 50%;
		height: 100%; /* Or whatever */
  		margin: auto;  /* Magic! */
	}

	lineitem {
		width: 210px;
		margin: auto;  /* Magic! */
		display:flex;
		float:left;
		padding: 5px;
		height: 100%;
	}
	label {
		margin-top: 3px;
	}
	input {
		border: none;
	}

	h1 { 
		font-family: 'Germania One', cursive;
		padding-left: 30px;
		
	}

	.header { 
		font-family: 'Germania One', cursive;
		font-size: large;
		width: 100%;
		text-align: center;
		display: block;
	}

	fatebox { 
		position: relative;
		top:60;
		left: 10px;
		width: 85px;
		height: 110px;
		border: 1px solid red; 
		display:block;
		font-family: 'Germania One', cursive;
		background-image: url("../assets/actor/Fate.svg");
		background-repeat: no-repeat;
		background-position-y: 25px;
	}

	fatebox input {
		width: 50px;
		position: relative;
		top: 27px;
		left: 25px;
		height: 30px;
		width: 30px;
		text-align: center;
		font-size: large;
	}

	personabox { 
		position: relative;
		top:10px;
		left: 10px;
		width: 85px;
		height: 125px;
		border: 1px solid red; 
		display:block;
		font-family: 'Germania One', cursive;
		background-image: url("../assets/actor/Persona.svg");
		background-repeat: no-repeat;
		background-position-y: 24px;
	}

	personabox input {
		width: 50px;
		position: relative;
		top: 22px;
		left: 25px;
		height: 50px;
		width: 30px;
		text-align: center;
		font-size: large;
	}

	beliefbox { 
		position: relative;
		top: 10px;
		left: 10px;
		width: 300px;
		height: 70px;
		border: 1px solid red; 
		display:block;
		font-family: 'Germania One', cursive;
	}

	.left {
		width: 100px;
		display: block;
	}

	.right { 
		width: 350px;
		display: block;
	}



</style>