import { DataTypes, Model, Sequelize, SyncOptions } from "sequelize";

import { PostgresDatabaseConnection } from "./database";

type InitializeableDatabaseModel = {
    initialize(sequelize: Sequelize): Promise<Model<any, any>>;
    associate(): Promise<void>;
    sync<ModelType extends Model<any, any>>(options?: SyncOptions | undefined): Promise<ModelType>;
};

const default_model_options = { underscored: true, createdAt: "created_at", updatedAt: "updated_at" };

export class User extends Model {
    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return User.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                first_name: { type: DataTypes.STRING, allowNull: false },
                last_name: { type: DataTypes.STRING, allowNull: false },
                email: { type: DataTypes.STRING, allowNull: false, unique: true },
                password: { type: DataTypes.STRING, allowNull: false },
                date_of_birth: { type: DataTypes.DATE, allowNull: false },
                is_administrator: { type: DataTypes.BOOLEAN, allowNull: false },
            },
            { sequelize, modelName: "user", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return new Promise((resolve) => resolve());
    }
}

export class Movie extends Model {
    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return Movie.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                title: { type: DataTypes.STRING, allowNull: false },
                description: { type: DataTypes.STRING, allowNull: false },
                release_date: { type: DataTypes.DATE, allowNull: false },
                minimum_age: { type: DataTypes.INTEGER, allowNull: false },
                thumbnail: { type: DataTypes.STRING, allowNull: false },
            },
            { sequelize, modelName: "movie", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return Promise.all([
            Movie.belongsTo(Director, { foreignKey: { name: "director_id", allowNull: false }, onDelete: "cascade" }),
            Movie.belongsToMany(Genre, { through: "moviegenres", foreignKey: "movie_id", onDelete: "cascade" }),
        ]).then();
    }
}

export class MovieGenre extends Model {
    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return MovieGenre.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
            },
            { sequelize, modelName: "moviegenres", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return new Promise((resolve) => resolve());
    }
}

export class Director extends Model {
    public id: string | undefined;

    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return Director.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                first_name: { type: DataTypes.STRING, allowNull: false },
                last_name: { type: DataTypes.STRING, allowNull: false },
                date_of_birth: { type: DataTypes.DATEONLY, allowNull: false },
                thumbnail: { type: DataTypes.STRING, allowNull: false },
            },
            { sequelize, modelName: "director", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return new Promise((resolve) => resolve());
    }
}

export class Genre extends Model {
    public id: string | undefined;

    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return Genre.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                name: { type: DataTypes.STRING, allowNull: false, unique: true },
            },
            { sequelize, modelName: "genre", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return Promise.all([
            Genre.belongsToMany(Movie, { through: "moviegenres", foreignKey: "genre_id", onDelete: "cascade" }),
        ]).then();
    }
}

export class Hall extends Model {
    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return Hall.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                name: { type: DataTypes.STRING, allowNull: false, unique: true },
            },
            { sequelize, modelName: "hall", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return new Promise((resolve) => resolve());
    }
}

export class Show extends Model {
    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return Show.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                date: { type: DataTypes.DATE, allowNull: false },
            },
            { sequelize, modelName: "show", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return Promise.all([
            Show.belongsTo(Movie, { foreignKey: { name: "movie_id", allowNull: false } }),
            Show.belongsTo(Hall, { foreignKey: { name: "hall_id", allowNull: false } }),
        ]).then();
    }
}

export class Booking extends Model {
    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return Booking.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
            },
            { sequelize, modelName: "booking", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return Promise.all([
            Booking.belongsTo(User, { foreignKey: { name: "user_id", allowNull: false } }),
            Booking.belongsTo(Seat, { foreignKey: { name: "seat_id", allowNull: false } }),
            Booking.belongsTo(Show, { foreignKey: { name: "show_id", allowNull: false } }),
        ]).then();
    }
}

export class Seat extends Model {
    public static async initialize(sequelize: Sequelize): Promise<Model<any, any>> {
        return Seat.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                number: { type: DataTypes.INTEGER, allowNull: false },
            },
            { sequelize, modelName: "seat", ...default_model_options },
        );
    }

    public static async associate(): Promise<void> {
        return Promise.all([Seat.belongsTo(Hall, { foreignKey: { name: "hall_id", allowNull: false } })]).then();
    }
}

export class DatabaseModelBuilder {
    public static async initialize(
        models: InitializeableDatabaseModel[],
        force_override_models = false,
    ): Promise<void> {
        try {
            await this.initialize_models(models);
            await this.create_model_database_associations(models);
            PostgresDatabaseConnection.instance.database.sync({ force: force_override_models });
        } catch (error) {
            console.error("Error while initializing datatbase schema");
            console.error(error);
        }
    }

    private static async initialize_models(models: InitializeableDatabaseModel[]) {
        for (const model of models) {
            await model.initialize(PostgresDatabaseConnection.instance.database);
        }
    }

    private static async create_model_database_associations(models: InitializeableDatabaseModel[]): Promise<void> {
        for (const model of models) {
            await model.associate();
        }
    }
}

export const all_models = [Hall, Director, Seat, Genre, User, MovieGenre, Genre, Movie, Show, Booking];
