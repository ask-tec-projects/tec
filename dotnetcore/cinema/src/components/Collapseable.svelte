<script>
    export let title;
    export let shown = false;
</script>

<main>
    <h1 on:click="{() => shown = !shown}">{shown ? "-" : "+"} {title}</h1>
    {#if shown}
        <slot/>
    {/if}
</main>

<style lang="scss">
    @import "../scss/main";

    h1 {
        cursor: pointer;
    }

    main {
        border: 1px solid $bg-hl;
        padding: 8px;
    }
</style>
