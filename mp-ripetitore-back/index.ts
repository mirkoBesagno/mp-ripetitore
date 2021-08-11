import { Main } from "mpstation";
import { createConnection } from "typeorm";

export let main: Main;

try {
    let esco = false;
    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password:  "postgres",//"DGRmjYyNw38iH5mwsr4qXvZZfgNljw",
        database: "mpripetitore",
        synchronize: true,
        logging: false,
        entities: [
            'src/**/*.ts'
        ],
        migrations: [
            "src/migration/**/*.ts"
        ],
        subscribers: [
            "src/subscriber/**/*.ts"
        ],
        cli: {
            "entitiesDir": "src",
            "migrationsDir": "src",
            "subscribersDir": "src"
        }
    })
        .then(async connection => {
            main = new Main('api');

            main.Inizializza("localhost", 8080, true, true);

            main.StartHttpServer();
        }).catch(err => {
            console.log(err);
        })
    console.log(esco);
} catch (error) {
    console.log(error);
}