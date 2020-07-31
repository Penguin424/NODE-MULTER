import express from 'express';
import morgan from 'morgan';
import { resolve } from 'path';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { router } from './routes/routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rutas
app.use('/api', cors({origin: '*'}), router);

// Garda las imagenes de salida del servidor
app.use('/uploads', express.static(resolve('uploads')))

const main = async() => 
{
    await app.listen(4000);
    console.log(`sever on port: ${4000}`);

    await connect(`mongodb+srv://cosbiome:Ac03901582@pruebas.2rdch.mongodb.net/tsPruebas?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('base de datos conectada');
}

main();