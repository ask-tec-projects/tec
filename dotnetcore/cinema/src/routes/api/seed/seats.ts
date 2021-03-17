import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Hall } from "../../../lib/models";
import { payloads } from "../../../lib/seed_payloads";

export async function post(_request: Request, response: Response): Promise<void> {
    await Hall.create(payloads.hall);
    response.status(HttpStatusCode.CREATED).end();
}

export async function del(_request: Request, response: Response): Promise<void> {
    await Hall.destroy({ cascade: true, truncate: true });
    response.status(HttpStatusCode.NO_CONTENT).end();
}
