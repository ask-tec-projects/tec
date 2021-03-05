import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Hall } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_shows = await Hall.findAll();
    const json_shows = JSON.stringify(all_shows);
    response.status(HttpStatusCode.OK).end(json_shows);
}

export async function post(request: Request, response: Response): Promise<void> {
    Hall.create(request.body)
        .catch((error) => {
            console.error(error);
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        })
        .then(async (hall) => {
            response.status(HttpStatusCode.CREATED).end(JSON.stringify(hall));
        });
}
