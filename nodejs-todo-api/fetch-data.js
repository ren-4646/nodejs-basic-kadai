// データ取得関数を定義する
async function fetchData() {
    try {
        console.log('ユーザーデータの取得を開始します。');
        // fetch()メソッドでhttps://jsonplaceholder.typicode.com/usersにリクエストを送り、ユーザーデータを取得する（await使用）
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // 取得したユーザーデータをresponse.json()メソッドでJSON形式に変換する（await使用）
        const data = await response.json();

        // 件数と各ユーザー名、終了メッセージを以下のようにコンソールログへ出力する
        // （件数はdata.length、ユーザー名はdata[i].nameで参照可能）
        console.log(`データ取得が完了しました。取得件数： ${data.length}`);
        console.log('ユーザー一覧：');
        for (let i = 0; i < data.length; i++) {
            console.log(`ユーザー名: ${data[i].name}`);
        }
        console.log('ユーザーデータの取得が完了しました。');

    } catch (error) {
        // 例外が発生した場合は、エラーメッセージをコンソールログへ出力する
        console.error('エラー発生：', error);
    }
}

// データ取得関数を呼び出す
// 外部データを取得
console.log('fetchData()関数を実行します。');
fetchData();
console.log('fetchData()関数を実行しました。');

// 100ミリ秒ごとにメッセージを表示
let count = 1;
const interval = setInterval(() => {
  console.log(`別の処理を実行中... ${count++}`);
  if (count > 10) clearInterval(interval);
}, 100);