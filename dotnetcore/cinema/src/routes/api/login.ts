import { Request, Response } from "express";
import { Session } from "express-session";
import { Op } from "sequelize";

import { HttpStatusCode } from "../../lib/http_status_codes";
import { AuthenticationToken, User } from "../../lib/models";
import { PasswordSalter } from "../../lib/password_salter";

// eslint-disable-next-line unicorn/no-null
async function get_existing_token(user_id?: string): Promise<AuthenticationToken | null> {
    return AuthenticationToken.findOne({
        where: {
            [Op.and]: {
                expires: {
                    [Op.gt]: new Date(),
                },
                user_id: {
                    [Op.eq]: user_id,
                },
            },
        },
    });
}

// eslint-disable-next-line unicorn/no-null
async function get_user_from_login_details(email: string, password: string): Promise<User | null> {
    const user_candidate = await User.findOne({
        include: [AuthenticationToken],
        where: { email },
    });
    if (!user_candidate) {
        // eslint-disable-next-line unicorn/no-null
        return null;
    }

    const password_match = PasswordSalter.validate_salted_password(password, `${user_candidate.password}`);
    if (password_match) {
        return user_candidate;
    }

    // eslint-disable-next-line unicorn/no-null
    return null;
}

async function send_token(
    request: Request & { session: Session },
    response: Response,
    token?: AuthenticationToken,
    user?: User,
): Promise<void> {
    if (token) {
        await token.refresh();
        request.session.token = token.id;
        request.session.user = user;
        response.status(HttpStatusCode.OK).end(JSON.stringify({ token: token.id }));
    } else {
        response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
}

export async function post(request: Request & { session: Session }, response: Response): Promise<void> {
    const { email, password } = request.body;

    const user = await get_user_from_login_details(email, password);
    if (!user) {
        response.status(HttpStatusCode.BAD_REQUEST).end();
        return;
    }

    const existing_token = await get_existing_token(user.id);
    if (existing_token) {
        return send_token(request, response, existing_token, user);
    }

    await user.purge_auth_tokens();
    await user.assign_new_auth_token();
    const token = await user.get_auth_token();

    send_token(request, response, token, user);
}
