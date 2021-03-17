<script lang="typescript">
    import { onMount } from "svelte";
    import { post_json } from "../lib/http";

    const example_genre = { name: "Action" };
    const example_director = {
        first_name: "Markus",
        last_name: "Hamilton",
        date_of_birth: "1987-04-03",
        thumbnail: "https://www.rmk.com.au/wp-content/uploads/MARKUS2012-220x262.jpg",
    };
    const example_hall_1 = { name: "Hall #1" }
    const example_hall_2 = { name: "Hall #2" }
    const example_seat = { number: 1 }
    const example_movie = {
        title: "Avengers: Endgame",
        description: "Lorem Ipsum",
        release_date: "2000-01-01 00:00:00",
        minimum_age: 13,
        thumbnail:
            "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    };



    onMount(async () => {
        const genre = await post_json<unknown, {id: string}>("/api/genres", example_genre);
        const director = await post_json<unknown, {id: string}>("/api/directors", example_director);
        const hall1 = await post_json<unknown, {id: string}>("/api/halls", example_hall_1);
        const hall2 = await post_json<unknown, {id: string}>("/api/halls", example_hall_2);
        const seat1 = await post_json<unknown, {id: string}>("/api/seats", { ...example_seat, hall_id: hall1.id});
        const movie = await post_json<unknown, {id: string}>("/api/movies", { ...example_movie, director_id: director.id, genres: [genre.id]});
        const show_1 = post_json<unknown, {id: string}>("/api/shows", { date: new Date().toISOString(), movie_id: movie.id, hall_id: hall1.id});
        const show_2 = post_json<unknown, {id: string}>("/api/shows", { date: new Date().toISOString(), movie_id: movie.id, hall_id: hall2.id});
        const booking = post_json<unknown, {id: string}>()
        fetch("/api/movies").then(r => r.json()).then(console.log);
    });
</script>

<main>
</main>

<style>
    main {
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }
</style>
