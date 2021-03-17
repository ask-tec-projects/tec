const director_id = "472f8a99-986a-45a5-ac0b-7c69db4147c0";
const genre_id = "472f8a99-986a-45a5-ac0b-7c69db4147c2";
const show_id = "472f8a99-986a-45a5-ac0b-7c69db4147c3";
const hall_id = "472f8a99-986a-45a5-ac0b-7c69db4147c4";
const movie_id = "472f8a99-986a-45a5-ac0b-7c69db4147c1";
const user_id = "472f8a99-086a-45a5-ac0b-7c69db4147c5";
const admin_id = "472f8a99-086c-45a5-ac0b-7c69db4147c5";
const seat_id = "472f8a99-986a-45a5-ac0b-7c69db4147c5";

export const payloads = {
    director: {
        id: director_id,
        first_name: "Steven",
        last_name: "Spielberg",
        date_of_birth: "1967-04-03",
        thumbnail: "/dev/tty1",
    },
    movie: {
        id: movie_id,
        title: "Taken",
        description: "Lorem Ipsum",
        release_date: "2000-01-01T00:00:00.000Z",
        minimum_age: 13,
        thumbnail: "/dev/tty1",
        director_id,
        genres: [genre_id],
    },
    genre: {
        id: genre_id,
        name: "Action",
    },
    show: {
        id: show_id,
        date: "2000-01-01T00:00:00.000Z",
        seat_id: seat_id,
        movie_id: movie_id,
        user_id: user_id,
    },
    hall: {
        id: hall_id,
        name: "Hall one",
    },
    seat: {
        id: seat_id,
        hall_id: hall_id,
        number: 1,
    },
    user: {
        id: user_id,
        first_name: "Non-admin",
        last_name: "User",
        date_of_birth: "01-01-1970",
        email: "test@user.dev",
        is_administrator: false,
        password: "$2b$10$TeScNXSi/smFMp1KPSegfuLmRlHCLUg7PrvW3hyxAAGIWqQq04fpS",
    },
    admin: {
        id: admin_id,
        first_name: "Admin",
        last_name: "User",
        date_of_birth: "01-01-1970",
        email: "admin@user.dev",
        is_administrator: false,
    },
};
