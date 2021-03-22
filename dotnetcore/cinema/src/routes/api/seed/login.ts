import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { User } from "../../../lib/models";
import { PasswordSalter } from "../../../lib/password_salter";
import { payloads } from "../../../lib/seed_payloads";

export async function post(_request: Request, response: Response): Promise<void> {
    payloads.user.password = PasswordSalter.salt_password(payloads.user.password);
    await User.create(payloads.user);
    response.status(HttpStatusCode.CREATED).end();
}

export async function del(_request: Request, response: Response): Promise<void> {
    await User.destroy({ cascade: true, truncate: true });
    response.status(HttpStatusCode.NO_CONTENT).end();
}
