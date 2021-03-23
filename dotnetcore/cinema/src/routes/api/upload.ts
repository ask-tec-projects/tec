import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";

import { HttpStatusCode } from "../../lib/http_status_codes";

export async function post(request: Request, response: Response): Promise<void> {
    if (!request.files || Object.keys(request.files).length === 0) {
        response.status(400).send(JSON.stringify({ message: "No files were uploaded" }));
        return;
    }
    const file = request.files.file as UploadedFile;
    const filename = uuidv4();
    const path = `/mnt/hdd/home/doc/src/github.com/kruhlmann/tec/dotnetcore/cinema/static/${filename}`;
    file.mv(path, () => {
        console.log(`Saved ${file.name} as ${path}`);
        response.status(HttpStatusCode.CREATED).end(JSON.stringify({ id: filename }));
    });
}
