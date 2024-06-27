import express from 'express';
import { deletePelanggan,getPelanggan,getPelangganById,postPelanggan,putPelanggan } from '../controllers/pelangganController.js';
import { checkRequiredFields } from '../utils/function.js';

const route = express.Router();

route.get('/pelanggan/allPelanggan',getPelanggan);
route.get('/pelanggan/pelangganById/:id',getPelangganById);
route.post('/pelanggan/simpan',checkRequiredFields(['NAMA','DOMISILI','JENIS_KELAMIN']),postPelanggan);
route.put('/pelanggan/edit/:id',putPelanggan);
route.delete('/pelanggan/hapus/:id',deletePelanggan);

export default route;
