<script lang="ts">
    import { onMount } from "svelte";
    import { notify_success, notify_error } from "../lib/notifications";
    import Collapseable from "../components/Collapseable.svelte";

    import { post_json, get_json } from "../lib/http";

    type Movie = { title: string, description: string, release_date: Date, minimum_age: number, thumbnail: string, director_id: string, genre_id: string};
    type Director = { first_name: string, last_name: string, date_of_birth: Date, thumbnail: string };
    type Genre = { name: string };

    let genres: Genre[] = [];
    let directors: Director[] = [];
    let movies: Movie[] = [];
    let director_thumbnail_input: HTMLInputElement;
    let movie_thumbnail_input: HTMLInputElement;
    let movie_thumbnail_filename: string | undefined;

    const genre_form: Genre = {
        name: "",
    }
    const director_form: Director = {
        first_name: "",
        last_name: "",
        date_of_birth: new Date(),
        thumbnail: "",
    };
    const movie_form: Movie = {
        title: "",
        description: "",
        release_date: new Date(),
        minimum_age: 0,
        thumbnail: "",
        director_id: "",
        genre_id: "",
    }

    function movie_thumbnail_changed() {
        if (!movie_thumbnail_input.files || movie_thumbnail_input.files.length === 0) {
            return;
        }
        movie_thumbnail_filename = movie_thumbnail_input.value.split(/(\\|\/)/g).pop()
    }

    async function add_genre() {
        return post_json<Genre, Genre & { id: string }>("/api/genres", genre_form).then((genre) => {
            genres = [genre, ...genres];
            notify_success("Genre added");
            if (movie_form.genre_id === "") {
                movie_form.genre_id = genre.id;
            }
        }).catch(() => {
            notify_error("Unable to add genre");
        });
    }

    async function add_director() {
        if (director_thumbnail_input.files && director_thumbnail_input.files.length > 0) {
            const form = new FormData();
            form.append("file", director_thumbnail_input.files[0]);
            director_form.thumbnail = await fetch("/api/upload", { method: "POST", body: form }).then((response) => {
                if (response.status < 200 || response.status > 299) {
                    throw new Error("Unable to upload file");
                }
                return response.json();
            }).then((response) => {
                return response.id;
            });
        }
        return post_json<Director, Director & { id: string }>("/api/directors", director_form).then((director) => {
            directors = [director, ...directors];
            notify_success("Director added");
            if (movie_form.director_id === "") {
                movie_form.director_id = director.id;
            }
        }).catch(() => {
            notify_error("Unable to add director");
        });
    }

    async function add_movie() {
        if (movie_thumbnail_input.files && movie_thumbnail_input.files.length > 0) {
            const form = new FormData();
            form.append("file", movie_thumbnail_input.files[0]);
            movie_form.thumbnail = await fetch("/api/upload", { method: "POST", body: form }).then((response) => {
                if (response.status < 200 || response.status > 299) {
                    throw new Error("Unable to upload file");
                }
                return response.json();
            }).then((response) => {
                return response.id;
            });
        }
        return post_json<Movie, Movie & { id: string }>("/api/movies", movie_form).then((movie) => {
            movies = [movie, ...movies];
            notify_success("Movie added");
        }).catch(() => {
            notify_error("Unable to add movie");
        });
    }


    onMount(async () => {
        genres = await get_json("/api/genres");
        directors = await get_json("/api/directors");
    })
</script>

<main>
    <Collapseable title="Movies">
        <section>
            <div class="form movie">
                <div class="row">
                    <input name="title" type="text" bind:value="{movie_form.title}" placeholder="Title">
                </div>
                <div class="row">
                    <textarea rows="8" name="desc" type="text" bind:value="{movie_form.description}" placeholder="Description"></textarea>
                </div>
                <div class="row r6">
                    <span>Release date</span>
                    <input type="date" bind:value="{movie_form.release_date}">
                    <span>Minimum age to watch</span>
                    <input type="number" bind:value="{movie_form.minimum_age}">
                    <span>Movie thumbnail</span>
                    <div class="fileinput" on:click="{() => movie_thumbnail_input.click()}">
                        <input type="file" name="file" style="position: absolute; top: -999px; left: -999px" bind:this="{movie_thumbnail_input}" on:change="{movie_thumbnail_changed}">
                        <button class="confirm">{movie_thumbnail_filename || "Select file"}</button>
                    </div>
                </div>
                <div class="row r4">
                    <span>Director</span>
                    <select class="director" bind:value="{movie_form.director_id}">
                        {#each directors as director}
                            <option value="{director.id}">{director.first_name} {director.last_name}</option>
                        {/each}
                    </select>
                    <span>Genre</span>
                    <select class="genre" bind:value="{movie_form.genre_id}">
                        {#each genres as genre}
                            <option value="{genre.id}">{genre.name}</option>
                        {/each}
                    </select>
                </div>
                <div class="row">
                    <button class="confirm" on:click="{add_movie}">Submit</button>
                </div>
            </div>
            <div class="rows">
                {#each movies as movie}
                    <div class="row">
                        <img src="/{movie.thumbnail}" alt="{movie.title}">
                        <span>{movie.title} {movie.description} {movie.release_date} {movie.minimum_age}</span>
                    </div>
                {/each}
            </div>
        </section>
    </Collapseable>

    <section>
        <h1>Halls</h1>
    </section>

    <section>
        <h1>Seats</h1>
    </section>

    <section>
        <h1>Genres</h1>
        <div class="form genre">
            <input name="name" type="text" bind:value="{genre_form.name}" placeholder="Genre name">
            <button class="confirm" on:click="{add_genre}">Submit</button>
        </div>
        <div class="rows">
            {#each genres as genre}
                <div class="row">
                    <span>{genre.name}</span>
                </div>
            {/each}
        </div>
    </section>

    <section>
        <h1>Directors</h1>
        <div class="form director">
            <input name="first_name" type="text" bind:value="{director_form.first_name}" placeholder="First name">
            <input name="last_name" type="text" bind:value="{director_form.last_name}" placeholder="Last name">
            <input type="date" bind:value="{director_form.date_of_birth}">
            <input type="file" name="file" bind:this="{director_thumbnail_input}">
            <button class="confirm" on:click="{add_director}">Submit</button>
        </div>
        <div class="rows">
            {#each directors as director}
                <div class="row">
                    <img src="/{director.thumbnail}" alt="{director.first_name} {director.last_name}">
                    <span>{director.first_name} {director.last_name} {director.date_of_birth}</span>
                </div>
            {/each}
        </div>
    </section>
</main>

<style lang="scss">
    main {
        padding: 20px;
    }

    .rows {
        display: flex;
        flex-direction: column;

        .row {
            display: flex;
            align-items: center;

            img {
                width: 50px;
                height: 50px;
            }
        }
    }

    section {
        display: flex;
        flex-direction: column;

        .form {
            display: grid;
            grid-template-columns: 1fr;
            grid-row-gap: 10px;

            .row {
                display: grid;
                grid-template-columns: 1fr;
                grid-column-gap: 10px;
                align-items: center;

                &.r2 {
                    grid-template-columns: 1fr 1fr;
                }

                &.r3 {
                    grid-template-columns: 1fr 1fr 1fr;
                }

                &.r4 {
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                }

                &.r5 {
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                }

                &.r6 {
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                }
            }

            .fileinput {
                width: 100%;

                button {
                    width: 100%;
                }
            }
        }
    }
</style>
