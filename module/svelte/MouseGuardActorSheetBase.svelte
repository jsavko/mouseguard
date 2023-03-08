<script>
    import {setContext} from "svelte";

    // Component imports
    //TODO: IMPORTS
    import MouseGuardActorSheetMouseDetails from "./MouseGuardActorSheetMouseDetails.svelte";
    import MouseGuardActorSheetMouseRewards from "./MouseGuardActorSheetMouseRewards.svelte";
    import MouseGuardActorSheetMouseSkillAbilityTab from "./MouseGuardActorSheetMouseSkillAbilityTab.svelte";
    import MouseGuardActorSheetMouseDispo from "./MouseGuardActorSheetMouseDispo.svelte";
    import MouseGuardActorSheetPortrait from "./MouseGuardActorSheetMousePortrait.svelte";
    import MouseGuardActorSheetMouseName from "./MouseGuardActorSheetMouseName.svelte";
    import {isLimitedView} from "./MouseGuardCommon.svelte";

    //Exports
    export let dataStore;
    setContext("sheetStore", dataStore);

    let limitedView = isLimitedView($dataStore);
    let tabs = [
        {
            label: game.i18n.localize("MOUSEGUARD.About"),
            component: MouseGuardActorSheetMouseDetails
        },
        {
            label: game.i18n.localize("MOUSEGUARD.Tab2"),
            value: 2,
            component: MouseGuardActorSheetMouseSkillAbilityTab
        },
        {
            label: game.i18n.localize("MOUSEGUARD.Rewards"),
            component: MouseGuardActorSheetMouseRewards
        },
        {
            label: game.i18n.localize("MOUSEGUARD.Disposition"),
            component: MouseGuardActorSheetMouseDispo
        }
    ];

    export let activeTabValue = tabs[0].component;
    const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>

<content>
    <div class="flex-container">
        <div class="flex-item">
            <MouseGuardActorSheetMouseName limited={limitedView}/>
            {#if !limitedView}
                <nav class="sheet-navigation tabs">
                    {#each tabs as tab}
                        <a class="item {activeTabValue === tab.component ? 'active' : ''}"
                           on:click={handleClick(tab.component)}>
                            {tab.label}
                        </a>
                    {/each}
                </nav>
            {/if}
        </div>
        <MouseGuardActorSheetPortrait limited={limitedView}/>
    </div>
    <div class="box">
        {#if limitedView}
            <MouseGuardActorSheetMouseDetails limited={limitedView}/>
        {:else}
            {#if activeTabValue}
                <svelte:component this={activeTabValue}/>
            {/if}
        {/if}
    </div>
</content>

<style>
    content {
        overflow-y: scroll;
    }

    .flex-container {
        display: flex;
    }

    .flex-item {
        flex-grow: 1;
    }

    @import url("https://fonts.googleapis.com/css2?family=Germania+One&family=Khula&display=swap");
</style>
