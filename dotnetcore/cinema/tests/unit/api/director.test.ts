import { Server } from "http";
import { agent, SuperTest } from "supertest";

import test_objects from "../../../config/test_objects.json";
import { PostgresDatabaseConnection } from "../../../src/lib/database";
import { all_models, DatabaseModelBuilder } from "../../../src/lib/models";
import { ServerBuilder } from "../../../src/lib/server_builder";

let request: SuperTest<any>;
let webserver: Server;

function log() {
    return;
}

describe("Director endpoint", () => {
    beforeAll(async () => {
        const development = true;
        PostgresDatabaseConnection.initialize(
            "postgres",
            "postgres",
            development ? "cinema_test" : "cinema",
            "localhost",
            5432,
            log,
        );
        await DatabaseModelBuilder.initialize(all_models, true);
        const express_app = ServerBuilder.make_sapper_express_server("", true, "/");
        webserver = express_app.listen(2900);
        request = agent(webserver);
    });

    it("creates a director", async () => {
        expect(request).toBeDefined();
        expect(test_objects).toBeDefined();
        await request.post("/api/directors").send(test_objects.payloads.director).expect(201);
    });

    afterAll(async (done) => {
        webserver.close(done);
    });
});
