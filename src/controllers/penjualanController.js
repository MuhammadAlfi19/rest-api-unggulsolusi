import { allPenjualan,detailPenjualan,detailPenjualanById,editPenjualan,hapusPenjualan,simpanPenjualan } from '../model/penjualanModel.js';
import response from '../utils/response.js';

const getPenjualan = (req,res) => {

    allPenjualan((err,result) => {
        if (result) {
            response(200,result,'All Penjualan',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const getDetailPenjualan = (req,res) => {

    detailPenjualan((err,result) => {
        if (result) {
            response(200,result,'Detail Penjualan',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const getDetailPenjualanById = (req,res) => {

    const id = req.params.id;

    detailPenjualanById(id,(err,result) => {
        if (result) {
            response(200,result,'Detail Penjualan By Id',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}


const postPenjualan = (req,res) => {

    const data = req.body;

    simpanPenjualan(data,(err,result) => {
        if (result) {

            var callback = {
                TGL: data.TGL,
                KODE_PELANGGAN: data.KODE_PELANGGAN,
                SUBTOTAL: data.SUBTOTAL,
                KODE_BARANG: data.KODE_BARANG,
                QTY: data.Qty
            }

            response(200,callback,'Berhasil Simpan Penjualan',res);
        } else {
            response(500,"Invalid",'error',res);
        }
    })
}

const putPenjualan = (req,res) => {

    const id = req.params.id;
    const data = req.body;

    editPenjualan(id,data,(err,result) => {
        if (result) {
            response(200,data,'Berhasil Edit Penjualan',res);
        } else {
            response(500,"Invalid",'error',res);
        }
    })
}

const deletePenjualan = (req,res) => {

    const id = req.params.id;

    hapusPenjualan(id,(err,result) => {
        if (result) {
            response(200,'Berhasil','Berhasil Hapus Penjualan',res);
        } else {
            response(500,'ID tidak ditemukan','error',res)
        }
    })
}


export { getPenjualan,getDetailPenjualan,getDetailPenjualanById,postPenjualan,putPenjualan,deletePenjualan }