const mysql = require('mysql2/promise');
// DB接続設定
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'nodejs_db_kadai'
};

// DB接続プールを作成
const pool = mysql.createPool(dbConfig);

// DB接続プールを破棄
async function closePool() {
  try {
    await pool.end();
    console.log('接続プールを破棄。');
  } catch (err) {
    console.error('接続プールの破棄中にエラー発生：', err);
  }
}

// SQLクエリを実行する関数
async function executeQuery(sql, params = []) {
    try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// モジュールとしてエクスポート
module.exports = {
  closePool,
  executeQuery
};