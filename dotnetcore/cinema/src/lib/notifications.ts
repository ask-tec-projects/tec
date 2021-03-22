import { notifications } from "./stores";

let global_index = 0;

export enum NotificationType {
    DEBUG = 0,
    INFO = 1,
    SUCCESS = 2,
    WARNING = 3,
    ERROR = 4,
}

export type Notification = {
    id: number;
    message: string;
    type: NotificationType;
    timeout: number;
    time_spent_alive: number;
};

export function notify(message: string, type: NotificationType = NotificationType.INFO, timeout = 3000): void {
    const notification: Notification = {
        id: global_index,
        message,
        type,
        timeout,
        time_spent_alive: 0,
    };
    add_notification(notification);
    schedule_notification_removal(notification);
}

export function notify_error(message: string): void {
    notify(message, NotificationType.ERROR, 10000);
}

export function notify_success(message: string): void {
    notify(message, NotificationType.SUCCESS, 3000);
}

export function remove_notification(needle: Notification): void {
    notifications.update((haystack) => {
        return haystack.filter((hay_straw) => {
            return hay_straw.id !== needle.id;
        });
    });
}

function add_notification(notification: Notification): void {
    notifications.update((notifications) => {
        return [notification, ...notifications];
    });
    global_index++;
}

function schedule_notification_removal(notification: Notification): void {
    setTimeout(() => {
        remove_notification(notification);
    }, notification.timeout);
}
