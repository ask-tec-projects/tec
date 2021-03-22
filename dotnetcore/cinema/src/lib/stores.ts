import { readable, Writable, writable } from "svelte/store";

import { Notification } from "./notifications";

export const notifications: Writable<Notification[]> = writable([]);
export const time = readable(new Date().getTime(), (set) => {
    const interval = setInterval(() => {
        set(new Date().getTime());
    }, 50);

    return function stop() {
        clearInterval(interval);
    };
});
