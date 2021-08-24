import { Main } from "mpstation";
import { createConnection } from "typeorm";

export let main: Main;

try {
    var modalita = "default";
    if (process.argv.length == 3 && process.argv[2]) {
        //const t1 = process.argv[2].length;
        const t2 = process.argv[2].substring(0, 6);
        if (t2 == "--mod=") {
            modalita = process.argv[2].substring(6);
        }
        else {
            modalita = process.env.NODE_ENV != undefined ? process.env.NODE_ENV : "default";
        }
    }
    else {
        modalita = process.env.NODE_ENV != undefined ? process.env.NODE_ENV : "default";
    }

    let esco = false;
    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
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
            console.log(connection);
            
            main = new Main('api');

            main.Inizializza("localhost", 8080, true, true);

            if (modalita == 'server') {
                main.StartHttpServer();
            }
            else if (modalita == 'console') {
                main.PrintMenu();
            }
            else {
                console.log('Indefinito!!!');
            }

        }).catch(err => {
            console.log(err);
        })
    console.log(esco);
} catch (error) {
    console.log(error);
}