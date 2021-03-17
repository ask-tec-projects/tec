import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Director, Genre } from "../../../lib/models";
import { payloads } from "../../../lib/seed_payloads";

export async function post(_request: Request, response: Response): Promise<void> {
    await Genre.create(payloads.genre);
    await Director.create(payloads.director);
    response.status(HttpStatusCode.CREATED).end();
}

export async function del(_request: Request, response: Response): Promise<void> {
    await Genre.destroy({ cascade: true, truncate: true });
    await Director.destroy({ cascade: true, truncate: true });
    response.status(HttpStatusCode.NO_CONTENT).end();
}
