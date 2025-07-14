# 番号検索システム

番号を入力して、対応する画像と説明を表示するWebアプリケーションです。

## デモ

GitHub Pages: https://hikaru1125.github.io/Unimemochecker

## 機能

- **番号検索**: 入力した番号に対応する項目を検索
- **画像表示**: 各項目に関連する画像を表示
- **詳細情報**: タイトル、カテゴリ、説明文を表示
- **レスポンシブデザイン**: スマートフォン・タブレット対応
- **クイック検索**: 利用可能な番号をクリックして即座に検索

## 技術スタック

- React 19.1.0
- CSS3 (レスポンシブデザイン)
- JSON データファイル
- GitHub Pages (デプロイ)

## セットアップ

### 必要な環境
- Node.js
- npm

### インストール
```bash
# リポジトリをクローン
git clone https://github.com/hikaru1125/Unimemochecker.git
cd Unimemochecker

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start
```

開発サーバーが起動すると、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスできます。

### デプロイ
```bash
# GitHub Pagesにデプロイ
npm run deploy
```

### 本番ビルド
```bash
npm run build
```

## データの追加・編集

`src/data.json` ファイルで項目を管理できます：

```json
{
  "items": [
    {
      "id": "001",
      "title": "項目タイトル",
      "description": "詳細説明",
      "image": "images/001.png",
      "category": "カテゴリ名"
    }
  ]
}
```

## 画像の配置

画像は `public/images/` フォルダに配置し、ファイル名は `{id}.png` 形式にしてください。
例: `001.png`, `100.png`, `999.png`

## モバイル対応

- タッチ操作に最適化
- レスポンシブレイアウト
- 数値入力時にテンキー表示
- 自動キーボード閉じ機能

## プロジェクト構成

```
unimemo_checker/
├── public/
│   ├── images/          # 画像フォルダ
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── App.js          # メインコンポーネント
│   ├── App.css         # スタイルシート
│   ├── data.json       # データファイル
│   └── index.js        # エントリーポイント
├── package.json
└── README.md
```

## ライセンス

このプロジェクトはMITライセンスのもとで公開されています。

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
