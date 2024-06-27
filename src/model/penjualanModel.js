import db from '../config/koneksi.js';
import moment from 'moment';

const allPenjualan = (callback) => {

    var sql = 'SELECT ID_NOTA, DATE_FORMAT(TGL,"%Y-%m-%d") AS TGL, KODE_PELANGGAN, SUBTOTAL FROM penjualan';

    return db.query(sql,(err,result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })
}

const detailPenjualan = (callback) => {

    var sql = 'SELECT a.ID_NOTA, DATE_FORMAT(a.TGL,"%Y-%m-%d") AS TGL, a.KODE_PELANGGAN, IFNULL(c.NAMA,"") AS NAMA, b.KODE_BARANG, IFNULL(d.NAMA,"") AS NAMA_BARANG, b.Qty, a.SUBTOTAL FROM penjualan a LEFT JOIN item_penjualan b ON a.ID_NOTA = b.NOTA LEFT JOIN pelanggan c ON a.KODE_PELANGGAN = c.ID_PELANGGAN LEFT JOIN barang d ON b.KODE_BARANG = d.KODE';

    return db.query(sql,(err,result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })

}

const detailPenjualanById = (id,callback) => {

    // var sql = `SELECT a.ID_NOTA, DATE_FORMAT(a.TGL,"%Y-%m-%d") AS TGL, a.KODE_PELANGGAN, c.NAMA, b.KODE_BARANG, d.NAMA AS NAMA_BARANG, d.HARGA, b.Qty, a.SUBTOTAL FROM penjualan a INNER JOIN item_penjualan b ON a.ID_NOTA = b.NOTA INNER JOIN pelanggan c ON a.KODE_PELANGGAN = c.ID_PELANGGAN INNER JOIN barang d ON b.KODE_BARANG = d.KODE WHERE a.ID_NOTA = '${id}'`;
    var sql = `SELECT a.ID_NOTA, DATE_FORMAT(a.TGL,"%Y-%m-%d") AS TGL, a.KODE_PELANGGAN, IFNULL(c.NAMA,"") AS NAMA, b.KODE_BARANG, IFNULL(d.NAMA,"") AS NAMA_BARANG, b.Qty, a.SUBTOTAL FROM penjualan a LEFT JOIN item_penjualan b ON a.ID_NOTA = b.NOTA LEFT JOIN pelanggan c ON a.KODE_PELANGGAN = c.ID_PELANGGAN LEFT JOIN barang d ON b.KODE_BARANG = d.KODE WHERE a.ID_NOTA = '${id}'`;

    return db.query(sql,(err,result) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,result);
        }
    })
}

const simpanPenjualan = (body,callback) => {

    var sql = "SELECT MAX(CONVERT(SUBSTRING_INDEX(ID_NOTA, '_', -1),INT)) AS ID FROM penjualan";

    return db.query(sql,(err,result) => {
        var id = `NOTA_${result[0]['ID'] + 1}`;

        var sqlInsert = 'INSERT INTO penjualan SET ?';
        var data = {
            ID_NOTA: id,
            TGL: body.TGL,
            KODE_PELANGGAN: body.KODE_PELANGGAN,
            SUBTOTAL: body.SUBTOTAL
        }

        db.query(sqlInsert,data,(err,result) => {

            var sqlInsertItem = 'INSERT INTO item_penjualan SET ?';
            var dataItem = {
                NOTA: id,
                KODE_BARANG: body.KODE_BARANG,
                Qty: body.Qty
            }

            db.query(sqlInsertItem,dataItem,(err,result) => {
                if (err) {
                    callback(err,null);
                } else {
                    callback(null,result);
                }
            })
        })
    })
}

const editPenjualan = (id,body,callback) => {

    var sql = `SELECT TGL, KODE_PELANGGAN, SUBTOTAL FROM penjualan WHERE ID_NOTA = '${id}' `;

    return db.query(sql,(err,result) => {

        var sqlUpdate = `UPDATE penjualan SET ? WHERE ID_NOTA = '${id}'`;
        var data = {
            TGL: body.TGL == undefined || body.TGL == "" ? result[0]['TGL'] : body.TGL,
            KODE_PELANGGAN: body.KODE_PELANGGAN == undefined || body.KODE_PELANGGAN == "" ? result[0]['KODE_PELANGGAN'] : body.KODE_PELANGGAN,
            SUBTOTAL: body.SUBTOTAL == undefined || body.SUBTOTAL == "" ? result[0]['SUBTOTAL'] : body.SUBTOTAL
        }

        db.query(sqlUpdate,data,(err,result) => {

            var sqlItem = `SELECT KODE_BARANG, Qty FROM item_penjualan WHERE NOTA = '${id}'`;

            db.query(sqlItem,(err,result) => {

                var sqlUpdateItem = `UPDATE item_penjualan SET ? WHERE NOTA = '${id}'`;
                var dataItem = {
                    KODE_BARANG: body.KODE_BARANG == undefined || body.KODE_BARANG == "" ? result[0]['KODE_BARANG'] : body.KODE_BARANG,
                    Qty: body.Qty == undefined || body.Qty == "" ? result[0]['Qty'] : body.Qty
                }

                db.query(sqlUpdateItem,dataItem,(err,result) => {
                    if (err) {
                        callback(err,null);
                    } else {
                        callback(null,result);
                    }
                })

            })
        })
    })
}


const hapusPenjualan = (id,callback) => {

    var sql = `SELECT ID_NOTA FROM penjualan WHERE ID_NOTA = '${id}' `;

    return db.query(sql,(err,result) => {

        if (result.length > 0) {
            var sqlDelete = `DELETE FROM penjualan WHERE ID_NOTA = '${id}' `;

            db.query(sqlDelete,(err,result) => {

                var sqlItem = `SELECT NOTA FROM item_penjualan WHERE NOTA = '${id}' `;

                db.query(sqlItem,(err,result) => {

                    if (result.length > 0) {

                        var sqlDeleteItem = `DELETE FROM item_penjualan WHERE NOTA = '${id}' `;

                        db.query(sqlDeleteItem,(err,result) => {
                            if (result) {
                                callback(null,result);
                            }
                        })
                    } else {
                        callback(err,null);
                    }
                })
            })

        } else {
            callback(err,null);
        }

    })
}

export { allPenjualan,detailPenjualan,detailPenjualanById,simpanPenjualan,editPenjualan,hapusPenjualan }