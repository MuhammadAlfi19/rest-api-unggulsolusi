import express from 'express';
import { deletePenjualan,getDetailPenjualan,getDetailPenjualanById,getPenjualan,postPenjualan,putPenjualan } from '../controllers/penjualanController.js';
import { checkRequiredFields } from '../utils/function.js';

const route = express.Router();

route.get('/penjualan/allPenjualan',getPenjualan);
route.get('/penjualan/detailPenjualan',getDetailPenjualan);
route.get('/penjualan/detailPenjualanById/:id',getDetailPenjualanById);
route.post('/penjualan/simpan',checkRequiredFields(['TGL','KODE_PELANGGAN','SUBTOTAL','KODE_BARANG','Qty']),postPenjualan)
route.put('/penjualan/edit/:id',putPenjualan);
route.delete('/penjualan/hapus/:id',deletePenjualan)

export default route;