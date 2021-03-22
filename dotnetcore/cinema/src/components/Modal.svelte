<script lang="ts">
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let width = 650;
    let modal: HTMLElement | undefined;
    function modal_click(event: MouseEvent): void {
        if (event.target === modal) {
            dispatch("close");
        }
    }
</script>

<main transition:fade bind:this="{modal}" on:click="{modal_click}">
    <div class="close-btn" on:click="{() => dispatch('close')}">&times;</div>
    <div class="inner" style="width: {width}px;">
        <slot>No content</slot>
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.7);
        top: 0;
        left: 0;
        .close-btn {
            position: fixed;
            top: 15px;
            right: 30px;
            cursor: pointer;
            font-size: 48px;
            color: white;
        }
        .inner {
            max-width: 80%;
            background-color: white;
            box-shadow: 5px 5px 15px 5px #000000;
        }
    }
</style>
