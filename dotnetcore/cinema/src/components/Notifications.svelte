<script lang="ts">
    import { fade } from "svelte/transition";
    import { notifications, time } from "../lib/stores";
    import type { Notification } from "../types";
    import { onMount } from "svelte";
    import { remove_notification } from "../lib/notifications";
    onMount(() => {
        setInterval(() => {
            notifications.update((notifications) => {
                return notifications.map((notification) => {
                    notification.time_spent_alive += 10;
                    if (notification.time_spent_alive > notification.timeout) {
                        notification.time_spent_alive = notification.timeout;
                    }
                    return notification;
                });
            });
        }, 10);
    });
</script>

<main>
    {#each $notifications as notification}
        <div transition:fade class="notification level-{notification.type}">
            <span class="message">{notification.message}</span>
            <span class="close" on:click="{remove_notification(notification)}">&#x2716;</span>
            <div class="timers">
                <div
                    class="timer"
                    style="width: {100 - (notification.time_spent_alive / notification.timeout) * 100}%;"
                ></div>

                <div
                    class="timer weak"
                    style="width: {(notification.time_spent_alive / notification.timeout) * 100}%;"
                ></div>
            </div>
        </div>
    {/each}
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 15px;
        left: 15px;
        .notification {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            min-width: 250px;
            background-color: gray;
            padding-bottom: 0;
            color: white;
            &.level-0 {
                background-color: #156ae5;
            }
            &.level-1 {
                background-color: #555555;
            }
            &.level-2 {
                background-color: green;
            }
            &.level-3 {
                background-color: orange;
            }
            &.level-4 {
                background-color: red;
            }
            span {
                padding-top: 8px;
                &.message {
                    padding-left: 15px;
                    padding-right: 15px;
                }
                &.close {
                    padding-right: 15px;
                    cursor: pointer;
                }
            }
            &:not(:last-child) {
                margin-bottom: 10px;
            }
            .timers {
                grid-column: span 2;
                display: flex;
                .timer {
                    background-color: black;
                    opacity: 0.5;
                    height: 4px;
                    width: 100%;
                    margin-top: 4px;
                    &.weak {
                        opacity: 0.3;
                    }
                }
            }
        }
    }
</style>
