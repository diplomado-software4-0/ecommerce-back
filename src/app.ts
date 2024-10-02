import { DbConfig } from "@Infrastructure/Database"
import { Server } from "@Infrastructure/server";


const main = async () => {
    const db = DbConfig.getInstance();

    const app = new Server([db]);
    app.loadMiddlewares();

    app.start();
};

main();