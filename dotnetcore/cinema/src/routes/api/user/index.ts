import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Booking, User } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_users = await User.findAll({ include: [Booking] });
    const json_users = JSON.stringify(all_users);
    response.status(HttpStatusCode.OK).end(json_users);
}

export async function post(request: Request, response: Response): Promise<void> {
    User.create(request.body)
        .catch((error) => {
            console.error(error);
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        })
        .then(async (user) => {
            response.status(HttpStatusCode.CREATED).end(JSON.stringify(user));
        });
}
