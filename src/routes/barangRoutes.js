import express from 'express';
import { getBarang,postBarang,putBarang,deleteBarang,getBarangById } from '../controllers/barangController.js';
import { checkRequiredFields } from '../utils/function.js';

const route = express.Router();

route.get('/barang/allBarang',getBarang);
route.get('/barang/barangById/:id',getBarangById);
route.post('/barang/simpan',checkRequiredFields(['NAMA','KATEOGRI','HARGA']),postBarang);
route.put('/barang/edit/:id',putBarang);
route.delete('/barang/hapus/:id',deleteBarang);

export default route;

