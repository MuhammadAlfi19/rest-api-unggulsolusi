import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// EndPoint API
import Pelanggan from './src/routes/pelangganRoutes.js';
import Barang from './src/routes/barangRoutes.js';
import Penjualan from './src/routes/penjualanRoutes.js';


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',Pelanggan);
app.use('/',Barang);
app.use('/',Penjualan);

app.listen(4000,() => {
    console.log("PORT BERJALAN DI SERVER 4000");
})