<script>
    import { onDestroy, getContext } from "svelte";
    export let target;

    let sheetData = getContext("sheetStore");
    let data;
    $: data = $sheetData.data;

    const TextEditor = globalThis.TextEditor;
    let editorContent;
    let height;
    let mce;
    let rawContent = getProperty($sheetData?.data, target) ?? "";
    let content = TextEditor.enrichHTML(rawContent, {
        secrets: $sheetData.isOwner,
        async: false
    });
    let editor = {};

    onDestroy(async () => {
        if (mce) mce.destroy();
    });

    const createEditor = async () => {
        TextEditor.create({
            target: editorContent,
            invalid_elements: "iframe",
            save_onsavecallback: async (m) => {
                //const submit = $sheetData.sheet._onSubmit(new Event("submit"));
                //mce.remove();
                mce = m;
                const isDirty = mce.getContent() !== editor.initial;
                mce.remove();
                // Regex remove the iframe
                if (isDirty) {
                    await $sheetData.sheet._onSubmit(new Event("submit"));
                }
                mce.destroy();
            }
        }).then((m) => {
            editor.m = m;
            mce = m;
            editor.changed = false;
            editor.active = true;
            mce.focus();
            mce.on("change", (ev) => (editor.changed = true));
        });
    };

    $: {
        rawContent = getProperty($sheetData?.data, target);
        content = TextEditor.enrichHTML(rawContent, {
            secrets: $sheetData.isOwner,
            async: false
        });
    }
</script>

<div class="editor">
    <span />
    <div
        class="editor-content"
        data-edit={target}
        bind:this={editorContent}
        bind:clientHeight={height}
    >
        {@html content}
    </div>
    {#if $sheetData.editable}
        <a class="editor-edit" on:click|preventDefault={createEditor}>
            <i class="fas fa-edit" />
        </a>
    {/if}
</div>

<style>
    .editor {
        display: grid;
        grid-template-rows: 1px 1fr;
    }
    .editor-content {
        min-height: 100px;
    }
</style>
