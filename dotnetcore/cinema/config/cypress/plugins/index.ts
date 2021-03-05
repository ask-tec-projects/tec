/// <reference types="cypress" />

import * as test_objects from "../../../config/test_objects.json";
import { PostgresDatabaseConnection } from "../../../src/lib/database";
import { all_models, DatabaseModelBuilder, Director, Genre, Hall, Movie, Seat } from "../../../src/lib/models";

module.exports = async (on, _) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    PostgresDatabaseConnection.initialize("postgres", "postgres", "cinema_test");
    await PostgresDatabaseConnection.instance.database.drop();
    await DatabaseModelBuilder.initialize(all_models);

    on("task", {
        async setup_test_database() {
            try {
                await DatabaseModelBuilder.initialize(all_models);
                await Director.create(test_objects.payloads.director);
                await Genre.create(test_objects.payloads.genre);
                //await Hall.create(test_objects.payloads.hall);
                //await Seat.create(test_objects.payloads.seat);
                //await Movie.create(test_objects.payloads.movie);
                return true;
            } catch (error) {
                console.error("Error occurrsed while preapring test datbase");
                console.error(error);
                throw error;
            }
        },
    });
};
