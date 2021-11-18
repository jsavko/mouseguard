<script>
	import { getContext } from "svelte";
	import { slide } from "svelte/transition";
	import { writable } from "svelte/store";

	import MouseGuardActorSheetMouseRewards from "./MouseGuardActorSheetMouseRewards.svelte"; 
	import MouseGuardEditor from "./MouseGuardEditor.svelte";


	//getContext("sheetStore", dataStore);	
	let sheetData = getContext("sheetStore");
	let { actor, sheet } = $sheetData;
	let data;
	$: data = $sheetData.data;


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
<largecard>
		<div class="namebox">
			<h1>{game.i18n.localize("MOUSEGUARD.Name")} </h1>
			<input name="name" type="text" value="{data.name}" placeholder="Name"/>
		</div>
		<ul>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Age")}: </label>
			<input name="data.details.age" type="number" value="{data.data.details.age}" placeholder="0"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Parents")}: </label>
			<input name="data.details.parents" type="text" value="{data.data.details.parents}" placeholder="{game.i18n.localize("MOUSEGUARD.Parents")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Home")}: </label>
			<input name="data.details.home" type="text" value="{data.data.details.home}" placeholder="{game.i18n.localize("MOUSEGUARD.Home")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Senior")}: </label>
			<input name="data.details.senior_artisan" type="text" value="{data.data.details.senior_artisan}" placeholder="{game.i18n.localize("MOUSEGUARD.Senior")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Fur")}: </label>
			<input name="data.details.fur_color" type="text" value="{data.data.details.fur_color}" placeholder="{game.i18n.localize("MOUSEGUARD.Fur")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Mentor")}: </label>
			<input name="data.details.mentor" type="text" value="{data.data.details.mentor}" placeholder="{game.i18n.localize("MOUSEGUARD.Mentor")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Cloak")}: </label>
			<input name="data.details.cloak_color" type="text" value="{data.data.details.cloak_color}" placeholder="{game.i18n.localize("MOUSEGUARD.Cloak")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Friend")}: </label>
			<input name="data.details.friend" type="text" value="{data.data.details.friend}" placeholder="{game.i18n.localize("MOUSEGUARD.Friend")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.GuardRank")}: </label>
			<input name="data.details.guard_rank" type="text" value="{data.data.details.guard_rank}" placeholder="{game.i18n.localize("MOUSEGUARD.GuardRank")}"/>
		</lineitem>
		<lineitem>
			<label>{game.i18n.localize("MOUSEGUARD.Enemy")}: </label>
			<input name="data.details.enemy" type="text" value="{data.data.details.enemy}" placeholder="{game.i18n.localize("MOUSEGUARD.Enemy")}"/>
		</lineitem>
		</ul>
</largecard>
<h1>{game.i18n.localize("MOUSEGUARD.Bio")}</h1>
	<MouseGuardEditor target="data.biography" />

<style>	
	largecard {
		margin: 0 auto;
		display: inline-block;
		height: 250px;
		width: 100%;
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
		margin: auto;  /* Magic! */
		display:flex;
		float:left;
		padding: 5px;
		height: 100%;
	}
	label {
		width:180px;
		text-align: right;
		margin-top: 3px;
		padding-right: 2px;
		font-weight: bold;
		font-family: 'Khula', sans-serif;
	}
	input {
		border: none;
	}
	.namebox {
		position: relative;
		font-family: 'Germania One', cursive;
		height: 60px;
		pointer-events: none; 
	}
	.namebox input {
		background: rgba(0, 0, 0, 0);
		background-image: url("../assets/actor/NameBanner.svg");
		background-repeat: no-repeat;
		height: 60px;
		width: 300px;
		font-size: 24px;
		padding-left: 20px;
		padding-bottom: 14px;
		position: relative;
		top: -40px;
		left: 100px;
		pointer-events: auto; 
	}
	
	.namebox h1 { 
		padding-left: 30px;
	}
	
	lineitem input {
		padding-top:5px;
		pointer-events: auto; 
	}

	h1 { 
		font-family: 'Germania One', cursive;
		padding-left: 30px;
		width: 100%;
	}
</style>