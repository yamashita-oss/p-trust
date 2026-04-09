# P-TRUST ウェブサイト デザイン仕様書

株式会社ピートラスト — Astro + microCMS + Netlify

---

## 1. デザインコンセプト

**キーワード:** 誠実 / 信頼 / 上質 / 透明感

名刺のロゴ（ネイビー × ホワイトのストライプP）から着想を得た、
ミニマルで高品格なデザイン。過度な装飾を排し、余白と質感で「安心感」を表現する。

---

## 2. カラーパレット

| 変数名 | 値 | 用途 |
|---|---|---|
| `--color-navy` | `#1C2B4A` | ブランドカラー・見出し・ボタン |
| `--color-navy-light` | `#2E4070` | ホバー・グラデーション |
| `--color-navy-pale` | `#EEF1F7` | 背景薄色・カードBG |
| `--color-gold` | `#B8965A` | アクセント・信頼感・高級感 |
| `--color-gold-light` | `#D4AF7A` | ゴールドホバー・ハイライト |
| `--color-white` | `#FFFFFF` | 背景・カード |
| `--color-bg` | `#F8F7F4` | セクション背景（オフホワイト） |
| `--color-bg-warm` | `#F3F0EA` | 交互セクション背景 |
| `--color-text` | `#1C2B4A` | 本文テキスト |
| `--color-text-mid` | `#4A5568` | サブテキスト・説明文 |
| `--color-text-light` | `#8C96A8` | キャプション・補足 |
| `--color-border` | `#DDD9D0` | 罫線・カード枠 |

**選定理由:**
- ネイビー → ロゴのメインカラーをそのまま採用。誠実・信頼の色
- ゴールド → 不動産の「資産」「価値」を表現。ネイビーとの対比でシック感
- オフホワイト → 純白より温もりがあり、長時間閲覧でも疲れない

---

## 3. タイポグラフィ

### フォント

| 用途 | フォント | 備考 |
|---|---|---|
| 日本語見出し | Noto Serif JP (weight: 300/400/600) | 信頼感・格調 |
| 日本語本文 | Noto Sans JP (weight: 300/400/500) | 可読性優先 |
| 英語見出し | Playfair Display (Regular/Italic) | 上質感・装飾性 |
| 英語本文・数字 | Inter (weight: 300/400/500) | クリーン・現代的 |

### サイズスケール

```
見出し H1:  clamp(2rem, 4vw, 3.2rem)
見出し H2:  clamp(1.6rem, 3vw, 2.4rem)
本文:       0.9rem / line-height: 1.9
小文字:     0.75–0.8rem
ラベル:     0.7rem / letter-spacing: 0.2em
```

---

## 4. レイアウト

### グリッドシステム
- コンテナ最大幅: `1200px`
- ナロウコンテナ: `800px`
- パディング: `0 2rem`
- グリッド: 主に `3カラム` / モバイルで `1カラム`

### スペーシング
```
xs:  0.5rem
sm:  1rem
md:  2rem
lg:  4rem
xl:  6rem
2xl: 10rem
```

---

## 5. コンポーネント一覧

### ヘッダー
- Fixed/スクロールで背景を半透明にする
- ロゴ左 / ナビ右 / CTAボタン右端
- モバイル: ハンバーガーメニュー

### ヒーローセクション
- 2カラムグリッド (テキスト左 / ビジュアル右)
- モバイル: 1カラム (ビジュアル非表示)
- CTA: 「物件を探す」(ネイビー) + 「無料相談」(アウトライン)

### 信頼指標バー (Trust Bar)
- ネイビー背景に白・ゴールドで数字を強調
- 累計取引件数 / 業界経験 / 顧客満足度 / 対応時間

### サービスカード
- ホバーで左ボーダーゴールドが出現するアニメーション
- アイコン + タイトル + 説明 + リンク

### 物件カード
- 画像エリア(比率 4:3)
- タグ(売買/新着/戸建て)
- 価格は Playfair Display で大きく

### Why P-TRUST
- ネイビー背景 + 水平ストライプのテクスチャ (ロゴのモチーフ)
- 3つのポイントを01/02/03と番号付きで表示
- 右に代表者写真または外観写真

### お問い合わせカード
- 電話 / メール / フォームを3列で並べる
- フォームカードはネイビー背景で目立たせる

### フッター
- ダークネイビー (#111827)
- 4カラム: ブランド情報 / サービス / 会社情報 / お役立ち情報

---

## 6. インタラクション

| 要素 | 挙動 |
|---|---|
| ナビリンク | ホバーでゴールドのアンダーラインが伸びる |
| サービスカード | ホバーで浮き上がり + 左ボーダー出現 |
| 物件カード | ホバーで浮き上がり + シャドウ強調 |
| ボタン | 背景色とボーダーのクロスフェード |
| ページ内遷移 | scroll-behavior: smooth |
| ページロード | fadeInUp アニメーション (0.7s) |

---

## 7. Astro 実装ページ構成

```
src/
├── pages/
│   ├── index.astro           # トップページ
│   ├── properties/
│   │   ├── index.astro       # 物件一覧 (microCMS から取得)
│   │   └── [slug].astro      # 物件詳細
│   ├── services/
│   │   └── index.astro       # サービス詳細
│   ├── about.astro           # 会社案内
│   ├── news/
│   │   ├── index.astro       # お知らせ一覧 (microCMS)
│   │   └── [slug].astro      # お知らせ詳細
│   └── contact.astro         # お問い合わせフォーム
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── TrustBar.astro
│   ├── ServiceCard.astro
│   ├── PropertyCard.astro
│   └── ContactSection.astro
├── layouts/
│   └── BaseLayout.astro
└── styles/
    └── global.css            # デザイントークン + リセット
```

---

## 8. microCMS コンテンツスキーマ

### properties (物件)
```
- id: string
- title: string           物件名
- area: string            エリア (例: 東京都世田谷区)
- type: select            売買 / 賃貸 / 投資
- status: select          販売中 / 成約済み / 新着
- price: number           価格 (万円)
- layout: string          間取り (例: 3LDK)
- area_size: number       専有面積 (m²)
- age: number             築年数
- images: image[]         物件写真
- description: richText   物件説明
- features: string[]      特徴タグ
- published_at: date
```

### news (お知らせ)
```
- id: string
- title: string
- category: select        お知らせ / コラム / プレスリリース
- body: richText
- thumbnail: image
- published_at: date
```

---

## 9. Netlify 設定

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### 環境変数
```
MICROCMS_API_KEY=xxx
MICROCMS_SERVICE_DOMAIN=ptrust
```

---

## 10. フォントの Google Fonts 読み込み

```html
<link href="https://fonts.googleapis.com/css2?
  family=Noto+Serif+JP:wght@300;400;600
  &family=Noto+Sans+JP:wght@300;400;500
  &family=Playfair+Display:ital,wght@0,400;0,600;1,400
  &family=Inter:wght@300;400;500
  &display=swap" rel="stylesheet">
```

---

*このドキュメントはデザイン仕様の参照用です。実装時にコンポーネントの詳細を適宜更新してください。*
