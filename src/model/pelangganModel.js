import db from '../config/koneksi.js';

const allPelanggan = (callback) => {

    var sql = "SELECT * FROM pelanggan";

    return db.query(sql,(err,result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })
};

const pelangganById = (id,callback) => {

    var sql = `SELECT * FROM pelanggan WHERE ID_PELANGGAN = '${id}' `;

    return db.query(sql,(err,result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })
}

const simpanPelanggan = (body,callback) => {

    var sql = "SELECT MAX(CONVERT(SUBSTRING_INDEX(ID_PELANGGAN, '_', -1),INT)) AS ID FROM pelanggan";

    return db.query(sql,(err,result) => {
        var id = result[0]['ID'] + 1;

        var sqlInsert = "INSERT INTO pelanggan SET ? ";
        var data = {
            ID_PELANGGAN: `PELANGAN_${id}`,
            NAMA: body.NAMA.toUpperCase(),
            DOMISILI: body.DOMISILI,
            JENIS_KELAMIN: body.JENIS_KELAMIN
        }

        db.query(sqlInsert,data,(err,result) => {
            if (err) {
                callback(err,null);
            } else {
                callback(null,result);
            }
        })
    });
}

const editPelanggan = (id,body,callback) => {

    var sql = `SELECT NAMA, DOMISILI, JENIS_KELAMIN FROM pelanggan WHERE ID_PELANGGAN = '${id}' `;


    return db.query(sql,(err,result) => {

        var sqlUpdate = `UPDATE pelanggan SET ? WHERE ID_PELANGGAN = '${id}'`;
        var data = {
            NAMA: body.NAMA == undefined || body.NAMA == "" ? result[0]['NAMA'] : body.NAMA,
            DOMISILI: body.DOMISILI == undefined || body.DOMISILI == "" ? result[0]['DOMISILI'] : body.DOMISILI,
            JENIS_KELAMIN: body.JENIS_KELAMIN == undefined || body.JENIS_KELAMIN == "" ? result[0]['JENIS_KELAMIN'] : body.JENIS_KELAMIN
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

const hapusPelanggan = (id,callback) => {

    var sql = `SELECT ID_PELANGGAN FROM pelanggan WHERE ID_PELANGGAN = '${id}' `;


    return db.query(sql,(err,result) => {
        if (result.length > 0) {

            var sqlDelete = `DELETE FROM pelanggan WHERE ID_PELANGGAN = '${id}'`;

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

export { allPelanggan,pelangganById,simpanPelanggan,editPelanggan,hapusPelanggan }