import { DbConfig } from "@Infrastructure/Database"
import { ExceptionContainer } from "@Infrastructure/Implementations";
import { AppRouter } from "@Infrastructure/Routes";
import { Server } from "@Infrastructure/server";


const main = async () => {
    const db = DbConfig.getInstance();
    await ExceptionContainer.getInstance().loadContainer();

    const app = new Server([db]);
    app.loadMiddlewares();

    app.loadRouter((parentRouter) => {
        new AppRouter(parentRouter).run();
    })

    app.start();
};

main();