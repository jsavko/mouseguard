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
		<rewardbox>
			<label>{game.i18n.localize("MOUSEGUARD.Belief")}</label>
			<label class="sub">{@html game.i18n.localize("MOUSEGUARD.BeliefSub")}</label>
			<textarea name="data.rewards.belief">{data.data.rewards.belief}</textarea>
		</rewardbox>
		<rewardbox>
			<label>{game.i18n.localize("MOUSEGUARD.Instinct")}</label>
			<label class="sub">{@html game.i18n.localize("MOUSEGUARD.InstinctSub")}</label>
			<textarea name="data.rewards.instinct">{data.data.rewards.instinct}</textarea>
		</rewardbox>
		<rewardbox>
			<label>{game.i18n.localize("MOUSEGUARD.Goal")}</label>
			<label class="sub">{@html game.i18n.localize("MOUSEGUARD.GoalSub")}</label>
			<textarea name="data.rewards.goal">{data.data.rewards.goal}</textarea>

		</rewardbox>
	</right>
</largecard>


<style>
	largecard {
		margin: 0 auto;
		display: flex;
		border: 1px solid black;
		height: 410px;
		width: 460px;
		font-family: 'Khula', sans-serif;
		flex-wrap: wrap;
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
		width: 100%;
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
		left: 11px;
		width: 85px;
		height: 110px;
		display:block;
		font-family: 'Germania One', cursive;
		background-image: url("../assets/actor/Fate.svg");
		background-repeat: no-repeat;
		background-position-y: 25px;
	}

	fatebox input {
		width: 50px;
		position: relative;
		top: 30px;
		left: 25px;
		height: 30px;
		width: 35px;
		text-align: center;
		font-size: large;
		background: rgba(0, 0, 0, 0);

	}

	personabox { 
		position: relative;
		top:11px;
		left: 11px;
		width: 85px;
		height: 125px;
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
		width: 35px;
		text-align: center;
		font-size: large;
		background: rgba(0, 0, 0, 0);
	}

	rewardbox { 
		position: relative;
		left: 10px;
		width: 95%;
		margin-bottom: 10px;
		display:block;
		font-family: 'Germania One', cursive;
		font-size: large;
	}

	label {
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

	.left {
		width: 100px;
		display: block;
	}

	.right { 
		width: 350px;
		display: block;
	}



</style>