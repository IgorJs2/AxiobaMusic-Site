import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as cookieParser from 'cookie-parser';

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        const corsOptions = {
            credentials: true,
        };
        app.use(cookieParser());
        app.enableCors(corsOptions)
        await app.listen(PORT, () => {
            console.log("App has been started on port " + PORT)
        })

    } catch (e) {
        console.log()
    }
}

start()