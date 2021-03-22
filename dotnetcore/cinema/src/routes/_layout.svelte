<script lang="ts">
    import Modal from "../components/Modal.svelte";

    const register_form = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        is_admin: false,
    };
    const login_form = {
        email: "",
        password: "",
    };

    let is_showing_login_modal = false;
    let is_showing_register_modal = false;

    function toggle_login_modal(): void {
        is_showing_login_modal = !is_showing_login_modal;
    }

    function toggle_register_modal(): void {
        is_showing_register_modal = !is_showing_register_modal;
    }

    async function request_login(): Promise<void> {
    }
</script>

{#if is_showing_login_modal}
    <Modal on:close="{toggle_login_modal}">
        <div class="modal-body">
            <h1>Login</h1>
            <input type="text" bind:value="{login_form.email}" placeholder="Email">
            <input type="text" bind:value="{login_form.email}" placeholder="Password">
            <button class="login" on:click="{request_login}">Login</button>
        </div>
    </Modal>
{/if}

{#if is_showing_register_modal}
    <Modal on:close="{toggle_register_modal}">
        <div class="modal-body">
            <h1>Register</h1>
            <input type="text" bind:value="{register_form.first_name}" placeholder="Given name">
            <input type="text" bind:value="{register_form.last_name}" placeholder="Surname">
            <input type="text" bind:value="{register_form.email}" placeholder="Email">
            <input type="text" bind:value="{register_form.password}" placeholder="Password">
            <input type="checkbox" bind:checked="{register_form.is_admin}">
            <button class="login" on:click="{request_login}">Login</button>
        </div>
    </Modal>
{/if}



<main>
    <header>
        <div class="item" on:click="{toggle_login_modal}">Login</div>
        <div class="item" on:click="{toggle_register_modal}">Register</div>
    </header>
    <slot/>
</main>

<style lang="scss">
    .modal-body {
        display: flex;
        flex-direction: column;
        padding: 20px;

        & > * {
            margin: 10px 0;
        }

        input {
            padding: 8px;
        }
    }
</style>
