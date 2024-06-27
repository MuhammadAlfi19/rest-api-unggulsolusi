import db from '../config/koneksi.js';

const allBarang = (callback) => {

    var sql = "SELECT * FROM barang";

    return db.query(sql,(err,result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })
}

const barangById = (id,callback) => {

    var sql = `SELECT * FROM barang WHERE KODE = '${id}' `;

    return db.query(sql,(err,result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })
}

const simpanBarang = (body,callback) => {

    var sql = "SELECT MAX(CONVERT(SUBSTRING_INDEX(KODE, '_', -1),INT)) AS ID FROM barang";

    return db.query(sql,(err,result) => {
        var id = result[0]['ID'] + 1;

        var sqlInsert = "INSERT INTO barang SET ?";
        var data = {
            KODE: `BRG_${id}`,
            NAMA: body.NAMA,
            KATEOGRI: body.KATEOGRI,
            HARGA: body.HARGA
        }

        db.query(sqlInsert,data,(err,result) => {
            if (err) {
                callback(err,null);
            } else {
                callback(null,result);
            }
        })
    })

}

const editBarang = (id,body,callback) => {

    var sql = `SELECT NAMA, KATEOGRI, HARGA FROM barang WHERE KODE = '${id}' `;

    return db.query(sql,(err,result) => {

        var sqlUpdate = `UPDATE barang SET ? WHERE KODE = '${id}'`;
        var data = {
            NAMA: body.NAMA == undefined || body.NAMA == "" ? result[0]['NAMA'] : body.NAMA,
            KATEOGRI: body.KATEOGRI == undefined || body.KATEOGRI == "" ? result[0]['KATEOGRI'] : body.KATEOGRI,
            HARGA: body.HARGA == undefined || body.HARGA == "" ? result[0]['HARGA'] : body.HARGA
        }

        db.query(sqlUpdate,data,(err,result) => {
            if (err) {
                callback(err,null);
            } else {
                callback(null,result);
            }
        })

    })
}

const hapusBarang = (id,callback) => {


    var sql = `SELECT KODE FROM barang WHERE KODE = '${id}' `;

    return db.query(sql,(err,result) => {

        if (result.length > 0) {
            var sqlDelete = `DELETE FROM barang WHERE KODE = '${id}' `;

            db.query(sqlDelete,(err,result) => {
                if (result) {
                    callback(null,result);
                }
            })

        } else {
            callback(err,null);
        }
    })
}

export { allBarang,barangById,simpanBarang,editBarang,hapusBarang }