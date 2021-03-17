import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Hall, Seat } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_seats = await Seat.findAll({ include: Hall });
    const json_seats = JSON.stringify(all_seats);
    response.status(HttpStatusCode.OK).end(json_seats);
}

export async function post(request: Request, response: Response): Promise<void> {
    Seat.create({ number: request.body["number"], hall_id: request.body["hall_id"] })
        .catch((error) => {
            console.error(error);
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        })
        .then(async (seat) => {
            response.status(HttpStatusCode.CREATED).end(JSON.stringify(seat));
        });
}
