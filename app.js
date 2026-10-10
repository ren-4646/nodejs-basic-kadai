const express = require('express');
const app = express();
const PORT = 3000;

const { executeQuery, closePool } = require('./db');

app.use(express.json());

// サーバーエラーを処理する関数
function handleServerError(res, error, message = 'サーバエラー') {
    console.error(error);
    res.status(500).json({ error:message });
}

// タスクの作成
app.post('/todos', async (req, res) => {
    const {title, priority } = req.body;
    try {
        const result = await executeQuery(
            'INSERT INTO todos (title, priority, status) VALUES (?, ?, ?)',
             [title, priority, '未着手']);
        res.status(201).json({ id: result.insertId, title, priority, status: '未着手' });
    } catch (error) {
        handleServerError(res, error, 'タスクの作成に失敗しました');
    }
});

// タスクの読み取り
app.get('/todos', async (req, res) => {
    try {
        const rows = await executeQuery('SELECT * FROM todos');
        res.status(200).json(rows);
    } catch (error) {
        handleServerError(res, error, 'タスクの取得に失敗しました');
    }
});

// タスクの更新
app.put('/todos/:id', async(req, res) =>{
    const { title, priority, status } = req.body;
    try{
        const result = await executeQuery(
            'UPDATE todos SET title = ?, priority = ?, status = ? WHERE id = ?',
            [title, priority, status, req.params.id]
        );
        result.affectedRows === 0
            ? res.status(404).json({ error: 'タスクが見つかりません' })
            : res.status(200).json({ id: req.params.id, title, priority, status });
    } catch (error) {
        handleServerError(res, error, 'Not Found');
    }
});

// タスクの削除
app.delete('/todos/:id', async (req, res) => {
    try{
        const result = await executeQuery('DELETE FROM todos WHERE id = ?', [req.params.id]);
        result.affectedRows === 0
            ? res.status(404).json({ error: 'Not Found' })
            : res.status(200).json({ message: 'タスクを削除しました' });
    }
    catch (error) {
        handleServerError(res, error, 'タスクの削除に失敗しました');
    }
});

['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => {
  process.on(signal, async () => {
    console.log(`\n${signal}を受信。アプリケーションの終了処理中...`);
    await closePool();
    process.exit();
  });
});

// Webサーバーを起動
app.listen(PORT, () => {
  console.log(`${PORT}番ポートでWebサーバーが起動しました。`);
});