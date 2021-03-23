<script lang="ts">
    import { post_json } from "../lib/http";
    import { notify_success, notify_error } from "../lib/notifications";
    import Modal from "../components/Modal.svelte";
    import Notifications from "../components/Notifications.svelte";
    import {version} from "../../package.json";

    type RegisterForm = { first_name: string, last_name: string, email: string, password: string, is_administrator: boolean, date_of_birth: Date};
    type LoginForm ={email: string, password: string} ;

    export let bookings;
    export let directors;
    export let genres;
    export let halls;
    export let movies;
    export let seats
    export let shows;
    export let users;

    let register_form: RegisterForm = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        is_administrator: false,
        date_of_birth: new Date(),
    };
    let login_form: LoginForm = {
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
        post_json<LoginForm, { token: string }>("/api/login", login_form).then(() => {
            notify_success("Login successful");
            login_form = {
                email: "",
                password: "",
            };
        }).catch(() => {
            notify_error("Invalid credentials");
        }).finally(toggle_login_modal)
    }

    async function request_registration(): Promise<void> {
        post_json<RegisterForm, unknown>("/api/signup", register_form).then(() => {
            notify_success("User registered");
            register_form = {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                is_administrator: false,
                date_of_birth: new Date(),
            };
        }).catch(() => {
            notify_error("Unable to register the user");
        }).finally(toggle_register_modal);
    }
</script>

{#if is_showing_login_modal}
    <Modal on:close="{toggle_login_modal}">
        <div class="modal-body">
            <h1>Login</h1>
            <input type="text" name="email" bind:value="{login_form.email}" placeholder="Email">
            <input type="password" name="password" bind:value="{login_form.password}" placeholder="Password">
            <button class="confirm" on:click="{request_login}">Login</button>
        </div>
    </Modal>
{/if}

{#if is_showing_register_modal}
    <Modal on:close="{toggle_register_modal}">
        <div class="modal-body">
            <h1>Register</h1>
            <input type="text" name="first_name" bind:value="{register_form.first_name}" placeholder="Given name">
            <input type="text" name="last_name" bind:value="{register_form.last_name}" placeholder="Surname">
            <input type="text" name="email" bind:value="{register_form.email}" placeholder="Email">
            <input type="password" name="password" bind:value="{register_form.password}" placeholder="Password">
            <input type="date" name="date_of_birth" bind:value="{register_form.date_of_birth}">
            <span>Add as administrator <input name="is_administrator" type="checkbox" bind:checked="{register_form.is_administrator}"></span>
            <button class="confirm" on:click="{request_registration}">Register</button>
        </div>
    </Modal>
{/if}



<main>
    <header>
        <h1>Cinema v{version}</h1>
        <div class="item" on:click="{toggle_login_modal}">Login</div>
        <div class="item" on:click="{toggle_register_modal}">Register</div>
    </header>
    <slot/>
</main>
<Notifications />

<style lang="scss">
    @import "../scss/main";

    :global(body) {
        margin: 0;
        background-color: $bg;
        color: $fg;
        font-family: "Lucida Console", "Courier New", monospace;
    }

    :global(input, button, textarea, option, select) {
        padding: 8px;
        background-color: $bg-hl;
        color: $fg;
        border: none;
    }

    :global(textarea) {
        resize: none;
    }

    :global(button) {
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;

        &.confirm {
            background-color: $main;

            &:hover {
                background-color: $main-hl;
            }
        }
    }

    header {
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        padding: 0 5%;
        box-sizing: border-box;
        width: 100%;
        background-color: $main;

        h1 {
            margin: 0;
        }

        .item {
            font-size: 28px;
            padding:  15px 30px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;

            &:hover {
                background-color: $main-hl;
            }
        }
    }

    .modal-body {
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-color: $bg;

        & > * {
            margin: 10px 0;
        }
    }
</style>
