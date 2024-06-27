import { allPelanggan,editPelanggan,hapusPelanggan,pelangganById,simpanPelanggan } from '../model/pelangganModel.js';
import response from '../utils/response.js';

const getPelanggan = (req,res) => {

    allPelanggan((err,result) => {
        if (result) {
            response(200,result,'All Pelanggan',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const getPelangganById = (req,res) => {

    const id = req.params.id;

    pelangganById(id,(err,result) => {
        if (result) {
            response(200,result,'Pelanggan By Id',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const postPelanggan = (req,res) => {

    const data = req.body;

    simpanPelanggan(data,(err,result) => {
        if (result) {

            var callback = {
                NAMA: data.NAMA.toUpperCase(),
                DOMISILI: data.DOMISILI,
                JENIS_KELAMIN: data.JENIS_KELAMIN,
            }

            response(200,callback,'Berhasil Simpan Pelanggan',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })
}

const putPelanggan = (req,res) => {

    const id = req.params.id;
    const data = req.body;

    editPelanggan(id,data,(err,result) => {
        if (result) {
            response(200,data,'Berhasil Edit Pelanggan',res);
        } else {
            response(500,'Invalid','error',res);
        }
    })

}

const deletePelanggan = (req,res) => {

    const id = req.params.id;

    hapusPelanggan(id,(err,result) => {
        if (result) {
            response(200,'Berhasil','Berhasil Hapus Pelanggan',res);
        } else {
            response(500,'ID tidak ditemukan','error',res);
        }
    })
}


export { getPelanggan,getPelangganById,postPelanggan,putPelanggan,deletePelanggan }