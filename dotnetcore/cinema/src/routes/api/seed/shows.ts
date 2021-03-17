import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Director, Genre, Hall, Movie, Seat, User } from "../../../lib/models";
import { payloads } from "../../../lib/seed_payloads";

export async function post(_request: Request, response: Response): Promise<void> {
    await Hall.create(payloads.hall);
    await Seat.create(payloads.seat);
    await Genre.create(payloads.genre);
    await Director.create(payloads.director);
    await Movie.create(payloads.movie);
    await User.create(payloads.user);
    response.status(HttpStatusCode.CREATED).end();
}

export async function del(_request: Request, response: Response): Promise<void> {
    await Hall.destroy({ cascade: true, truncate: true });
    await Seat.destroy({ cascade: true, truncate: true });
    await Genre.destroy({ cascade: true, truncate: true });
    await Director.destroy({ cascade: true, truncate: true });
    await Movie.destroy({ cascade: true, truncate: true });
    await User.destroy({ cascade: true, truncate: true });
    response.status(HttpStatusCode.NO_CONTENT).end();
}
