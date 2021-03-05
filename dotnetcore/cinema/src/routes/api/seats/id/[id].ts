import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../lib/http_status_codes";
import { Seat, Hall } from "../../../../lib/models";

export async function get(request: Request, response: Response): Promise<void> {
    const seat = await Seat.findByPk(request.params.id, { include: Hall });
    const json_seat = JSON.stringify(seat);
    response.status(HttpStatusCode.OK).end(json_seat);
}

export async function del(request: Request, response: Response): Promise<void> {
    const seat_from_id = await Seat.findByPk(request.params.id, { attributes: ["id"] });
    if (seat_from_id) {
        await seat_from_id.destroy();
        response.status(HttpStatusCode.NO_CONTENT).end();
    } else {
        response.status(HttpStatusCode.NOT_FOUND).end();
    }
}
