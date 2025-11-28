import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

const PORT = config.PORT || 5000;

const server = http.createServer(app);

async function bootstrap() {
    try {
        const db = await mongoose.connect(config.DB_URI as string);
        console.log(`DB connected ${db.connection.host}`);

        server.listen(PORT, () => {
            console.log(`Server is listening on PORt : ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

bootstrap();
