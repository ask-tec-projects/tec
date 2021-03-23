import { Request, Response } from "express";
import { Session } from "express-session";

import { HttpStatusCode } from "../../lib/http_status_codes";
import { User } from "../../lib/models";
import { PasswordSalter } from "../../lib/password_salter";

export async function post(request: Request & { session: Session }, response: Response): Promise<void> {
    if (request.body.password !== "") {
        request.body.password = PasswordSalter.salt_password(request.body.password);
    }
    const new_user = await User.create(request.body);
    response.status(HttpStatusCode.CREATED).end(JSON.stringify(new_user));
}
