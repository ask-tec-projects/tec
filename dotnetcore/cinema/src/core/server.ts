import { PostgresDatabaseConnection } from "../lib/database";
import { Logger } from "../lib/log";
import { all_models, DatabaseModelBuilder } from "../lib/models";
import { ServerBuilder } from "../lib/server_builder";

const { PORT, NODE_ENV, BASEPATH } = process.env;
const development = NODE_ENV === "development";

try {
    PostgresDatabaseConnection.initialize("postgres", "postgres", development ? "cinema_test" : "cinema");
    DatabaseModelBuilder.initialize(all_models, true);

    const webserver = ServerBuilder.make_sapper_express_server("d79n1meaz9Xz71m00yf7b", development, BASEPATH);
    webserver.listen(PORT, console.error);
} catch (error) {
    Logger.log(error);
}
