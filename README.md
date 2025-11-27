# Weather App (天気アプリ)

現在の天気情報と 5 日間の天気予報を表示する Web アプリケーションです。

## 概要

このアプリケーションは、OpenWeatherMap API を使用して沖縄の地域の天気情報を取得し、ユーザーフレンドリーなインターフェースで表示します。

## 主な機能

###  現在の天気情報表示

- **気温**: 現在の気温を摂氏(°C)で表示
- **体感温度**: 実際に感じる温度を表示
- **天候状態**: 晴れ、曇り、雨などの天気アイコンと説明文
- **湿度**: 現在の湿度をパーセンテージで表示
- **風速**: 風の速さ（m/s）と風向きを表示
- **気圧**: 大気圧（hPa）を表示
- **視界**: 視界距離（km）を表示

###  5 日間の天気予報

- 今日から 5 日先までの天気予報を表示
- 各日の最高気温・最低気温
- 日ごとの天気アイコンと天候説明
- 3 時間ごとの詳細予報データに対応

###  都市検索機能

- リアルタイム検索（入力後即座に結果を表示）
- よく使う都市をお気に入り登録可能

###  レスポンシブデザイン

- 高速なページ遷移とスムーズなアニメーション

## 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org) (App Router)
- **言語**: TypeScript
- **スタイリング**: CSS Modules / Tailwind CSS
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)

## プロジェクト構成

```
weather-app/
├── app/                          # Next.js App Router
│   ├── favicon.ico              # ファビコン
│   ├── fonts/                   # フォントファイル
│   ├── globals.css              # グローバルスタイル（全ページ共通のCSS）
│   ├── layout.tsx               # ルートレイアウト（全ページの共通構造）
│   ├── page.module.css          # トップページ専用のCSSモジュール
│   └── page.tsx                 # トップページ（メインの天気アプリUI）
│
├── components/                   # 再利用可能なReactコンポーネント
│   ├── WeatherCard.tsx          # 天気情報を表示するカードコンポーネント
│   ├── SearchBar.tsx            # 都市検索用の入力フォーム
│   └── ForecastList.tsx         # 5日間予報のリストコンポーネント
│
├── lib/                          # ユーティリティ関数とヘルパー
│   ├── weatherApi.ts            # OpenWeatherMap APIとの通信処理
│   └── utils.ts                 # 汎用的なヘルパー関数
│
├── public/                       # 静的ファイル（画像、アイコンなど）
│   ├── next.svg                 # Next.jsロゴ
│   ├── vercel.svg               # Vercelロゴ
│   └── weather-icons/           # 天気アイコン画像
│
├── types/                        # TypeScript型定義
│   └── weather.ts               # 天気データの型定義
│
├── .env.local                    # 環境変数（APIキーなど）※gitignore対象
├── .eslintrc.json               # ESLint設定
├── .gitignore                   # Git管理対象外ファイルの指定
├── next.config.ts               # Next.js設定ファイル
├── package.json                 # プロジェクトの依存関係とスクリプト
├── tsconfig.json                # TypeScript設定
└── README.md                    # このファイル
```

### 主要ファイルの説明

- **app/page.tsx**: アプリのメイン画面。検索フォームと天気情報を表示
- **app/layout.tsx**: 全ページ共通の HTML 構造（ヘッダー、フッターなど）
- **components/**: 画面を構成する部品（コンポーネント）を格納
- **lib/weatherApi.ts**: OpenWeatherMap API からデータを取得する関数
- **.env.local**: API キーなどの機密情報を保存

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

   ※ API キーは [OpenWeatherMap](https://openweathermap.org/api) で無料登録して取得できます

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

1. 検索バーに都市名を入力（例: Tokyo, London, New York）
2. 現在の天気と 5 日間の予報が表示されます
3. 気温は摂氏(°C)で表示されます

## 開発コマンド

```bash
npm run dev      # 開発サーバーを起動
npm run build    # 本番用にビルド
npm run start    # 本番サーバーを起動
npm run lint     # コードの静的解析
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
