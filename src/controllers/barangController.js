import { allBarang,barangById,editBarang,hapusBarang,simpanBarang } from '../model/barangModel.js';
import response from '../utils/response.js';

const getBarang = (req,res) => {

    allBarang((err,result) => {
        if (result) {
            response(200,result,'All Barang',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const getBarangById = (req,res) => {

    const id = req.params.id;
    barangById(id,(err,result) => {
        if (result) {
            response(200,result,'Barang by id',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const postBarang = (req,res) => {

    const data = req.body;

    simpanBarang(data,(err,result) => {
        if (result) {

            var callback = {
                NAMA: data.NAMA.toUpperCase(),
                KATEOGRI: data.KATEOGRI,
                HARGA: data.HARGA,
            }

            response(200,callback,'Berhasil Simpan Barang',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const putBarang = (req,res) => {

    const id = req.params.id;
    const data = req.body;

    editBarang(id,data,(err,result) => {
        if (result) {
            response(200,data,'Berhasil Edit Barang',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const deleteBarang = (req,res) => {

    const id = req.params.id;

    hapusBarang(id,(err,result) => {
        if (result) {
            response(200,'Berhasil','Berhasil Hapus Barang',res);
        } else {
            response(500,'ID tidak ditemukan','error',res)
        }
    })
}

export { getBarang,getBarangById,postBarang,putBarang,deleteBarang }
