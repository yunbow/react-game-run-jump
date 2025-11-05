# ランアンドジャンプ (TypeScript + React + Storybook)

React 18とTypeScriptで構築されたプラットフォーマーゲームです。機能別のモジュラーアーキテクチャを採用しています。

## デモプレイ
https://yunbow.github.io/react-game-run-jump/demo/

## 主要機能

### ゲーム操作
- **スペースキー**: ジャンプ
- **矢印キー**: 左右移動
- **プレイヤー**: 青い四角キャラクター

### ゲーム要素
- **コイン**: 金色のコイン（10点）
- **パワーアップ**: 紫の無敵アイテム（★、20点 + 5秒間無敵）
- **障害物**: 赤いトゲ（ダメージ）
- **ライフシステム**: 3ライフ制
- **スコアシステム**: 時間ボーナス + アイテム獲得

### ゲームシステム
- **物理演算**: 重力・ジャンプ・衝突判定
- **カメラ追従**: プレイヤーの移動に合わせてスクロール
- **無敵時間**: ダメージ後の一時的な無敵状態
- **アニメーション**: Canvas APIによる滑らかな描画

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール
- **HTML5 Canvas** - ゲーム描画

## プロジェクト構造

```
src/
├── features/                   # 機能別モジュール
│   └── run-jump-game/          # ランアンドジャンプゲーム機能
│       ├── components/         # 機能専用コンポーネント
│       │   ├── GameUI/         # スコア・ライフ表示
│       │   ├── GameOverDialog/ # ゲームオーバー画面
│       │   └── Instructions/   # 操作説明
│       ├── RunJumpGame/        # 機能ルートコンポーネント
│       ├── useGameLoop.ts      # ゲームループ管理フック
│       ├── useKeyInput.ts      # キー入力管理フック
│       └── types.ts            # 機能固有の型定義
├── components/                 # 共通UIコンポーネント
│   ├── Button/                 # 操作ボタン
│   └── Canvas/                 # HTML5 Canvasラッパー
├── stories/                    # Storybook用ストーリー
├── types/                      # グローバル型定義
│   └── css.d.ts                # CSS Modules型定義
├── Config.ts                   # ゲーム設定値
├── App.tsx                     # メインアプリ
└── main.tsx                    # エントリーポイント
```

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License