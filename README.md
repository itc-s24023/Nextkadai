# Weather App (天気アプリ)

現在の天気情報と 5 日間の天気予報を表示する Web アプリケーションです。

## 概要

このアプリケーションは、OpenWeatherMap API を使用して世界中の都市の天気情報を取得し、ユーザーフレンドリーなインターフェースで表示します。

## 主な機能

-  現在の天気情報表示（気温、湿度、風速など）
-  5日間の天気予報
-  都市名による検索
-  世界中の都市に対応
-  レスポンシブデザイン

## 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org) (App Router)
- **言語**: TypeScript
- **スタイリング**: CSS Modules / Tailwind CSS
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)

## セットアップ

### 前提条件

- Node.js 18.x 以上
- npm / yarn / pnpm / bun

### インストール手順

1. リポジトリをクローン

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. 依存パッケージをインストール

   ```bash
   npm install
   # or
   yarn install
   ```

3. 環境変数を設定

   `.env.local` ファイルを作成し、OpenWeatherMap API キーを設定:

   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. 開発サーバーを起動

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 使い方

1. 検索バーに都市名を入力
2. 現在の天気と 5 日間の予報が表示されます
3. 気温は摂氏(°C)で表示されます

## プロジェクト構成

```
weather-app/
├── app/
│   ├── page.tsx          # メインページ
│   ├── layout.tsx        # レイアウト
│   └── globals.css       # グローバルスタイル
├── components/           # Reactコンポーネント
├── lib/                  # ユーティリティ関数
├── public/              # 静的ファイル
└── README.md
```

## Learn More

Next.js について詳しく知りたい場合:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js の機能と API
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル

## デプロイ

Vercel を使用した簡単なデプロイが可能です:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

詳細は [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## ライセンス

MIT

## 作成者

課題プロジェクト - Nextkadai
