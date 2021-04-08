<script lang="typescript">
    import { onMount } from "svelte";
    import Modal from "../components/Modal.svelte";
    import Collapseable from "../components/Collapseable.svelte";

    let movies = [];

    enum SeatBookingStatus {
        BOOKED_FOREIGN,
        BOOKED_LOCAL,
        AVAILABLE
    }
    const booking_form = {
        seats: [],
    };
    let shows = [{
        datetime: new Date(2021, 1, 1, 8, 30, 0),
        hall: {
            name: "Hall #1",
            seats: [
                { number: 1, booked: SeatBookingStatus.BOOKED_FOREIGN },
                { number: 2, booked: SeatBookingStatus.BOOKED_FOREIGN },
                { number: 3, booked: SeatBookingStatus.AVAILABLE },
                { number: 4, booked: SeatBookingStatus.AVAILABLE },
            ]
        }
    }];
    let movie_being_booked;

    function is_seat_selected_in_booking(seat) {
        return !!booking_form.seats.find((other_seat) => {
            return other_seat.number === seat.number;
        });
    }

    function select_seat_for_booking(seat: { number: number }) {
        booking_form.seats.push(seat.number);
    }

    function deselect_seat_for_booking(seat) {
        booking_form.seats = booking_form.seats.filter((other_seat) => {
            return other_seat.number !== seat.number;
        });
    }

    function is_seat_booked(show, seat) {
        return show.hall.seats.filter((other_seat) => {
            other_seat.number === seat.number;
        }).booked;
    }

    function toggle_seat_selected_status(seat) {
        if (!is_seat_selected_in_booking(seat)) {
            select_seat_for_booking(seat);
        } else {
            deselect_seat_for_booking(seat);
        }
    }

    function book_seats() {
    }

    function show_booking_modal(movie) {
        movie_being_booked = movie;
    }

    onMount(async () => {
        const movies_res = await fetch("/api/movies");
        movies = await movies_res.json();
    });
</script>

{#if movie_being_booked}
    <Modal on:close="{show_booking_modal}">
        <div class="modal-body booking">
            <h1>Booking {movie_being_booked.title}</h1>
            {#each shows as show}
                <Collapseable title="{show.hall.name} @ {show.datetime.toLocaleString('da-DK')}">
                    <div class="seats">
                        {#each show.hall.seats as seat}
                            <div
                                class="seat"
                                class:selected="{is_seat_selected_in_booking(seat)}"
                                class:booked="{is_seat_booked(show, seat)}"
                                on:click="{() => toggle_seat_selected_status(seat)}">
                                {seat.number}
                            </div>
                        {/each}
                    </div>
                    <button on:click="{book_seats}">Book</button>
                </Collapseable>
            {/each}
        </div>
    </Modal>
{/if}

<main>
    <h1>Movies</h1>
    <div class="movies">
        {#each movies as movie}
            <article on:click="{() => show_booking_modal(movie)}">
                <h3>{movie.title}</h3>
                <img src="{movie.thumbnail}" alt="{movie.title} poster">
                <footer>
                    <span class="release">{movie.release_date}</span>
                    <span class="min-age">{movie.minimum_age}</span>
                </footer>
            </article>
        {:else}
            <em>No movies available</em>
        {/each}
    </div>
</main>

<style lang="scss">
    @import "../scss/main";

    main {
        text-align: center;
        width: 100%;
        margin: 0 auto;

        .movies {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            padding: 0 5%;
            margin: 0 auto;

            article {
                background-color: $bg-hl;
            }
        }
    }

    .modal-body.booking {
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 20px;

        .seats {
            display: grid;
            grid-template-columns: repeat(auto-fill, 35px);
            grid-template-rows: repeat(auto-fill, 35px);
            padding: 20px;
            grid-gap: 10px;

            .seat {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                background-color: $bg-hl;

                &:hover {
                    background-color: $main;
                }

                &.selected {
                    background-color: $confirm;
                }

                &.booked {
                    background-color: $cancel;
                    cursor: not-allowed;
                }
            }
        }
    }
</style>
