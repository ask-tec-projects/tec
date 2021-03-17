/// <reference types="cypress" />

import * as test_objects from "../../../config/test_objects.json";
import { PostgresDatabaseConnection } from "../../../src/lib/database";
import { all_models, DatabaseModelBuilder, Director, Genre, Hall, Movie, Seat } from "../../../src/lib/models";

PostgresDatabaseConnection.initialize("postgres", "postgres", "cinema_test");

module.exports = async (on, _) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    await on("task", {
        "db:seed": () => {
            try {
                return Promise.all([
                    DatabaseModelBuilder.initialize(all_models),
                    Director.create(test_objects.payloads.director),
                    Genre.create(test_objects.payloads.genre),
                    Hall.create(test_objects.payloads.hall),
                    Seat.create(test_objects.payloads.seat),
                    Movie.create(test_objects.payloads.movie),
                ]);
            } catch (error) {
                console.error("Error occurrsed while preapring test datbase");
                console.error(error);
                throw error;
            }
        },
        "db:teardown": () => {
            return Promise.all([
                Director.destroy({ cascade: true, truncate: true }),
                Genre.destroy({ cascade: true, truncate: true }),
            ]);
        },
    });
};
