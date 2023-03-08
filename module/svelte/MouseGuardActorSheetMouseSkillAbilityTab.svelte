<script>
    import MouseGuardActorSheetRollableItemBase from "./MouseGuardActorSheetRollableItemBase.svelte";
</script>

<ol class="items-list">
    <MouseGuardActorSheetRollableItemBase itemType="ability"/>
    <MouseGuardActorSheetRollableItemBase itemType="wise"/>
    <MouseGuardActorSheetRollableItemBase itemType="skill"/>
    <MouseGuardActorSheetRollableItemBase itemType="trait"/>
</ol>

<style>
    .items-list {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        scrollbar-width: thin;
        color: #7a7971;
    }
</style>