import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../lib/http_status_codes";
import { Hall } from "../../../../lib/models";

export async function get(request: Request, response: Response): Promise<void> {
    const hall = await Hall.findByPk(request.params.id);
    const json_hall = JSON.stringify(hall);
    response.status(HttpStatusCode.OK).end(json_hall);
}

export async function del(request: Request, response: Response): Promise<void> {
    const hall_from_id = await Hall.findByPk(request.params.id, { attributes: ["id"] });
    if (hall_from_id) {
        await hall_from_id.destroy();
        response.status(HttpStatusCode.NO_CONTENT).end();
    } else {
        response.status(HttpStatusCode.NOT_FOUND).end();
    }
}
