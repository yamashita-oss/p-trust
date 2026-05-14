import { createClient } from 'microcms-js-sdk';

// microCMS クライアント (遅延初期化 — 環境変数未設定時のビルドエラーを防ぐ)
function getClient() {
  const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = import.meta.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) {
    throw new Error('[microcms] MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定してください');
  }
  return createClient({ serviceDomain, apiKey });
}

// ============================================
// 型定義
// ============================================

export type PropertyType = '売買' | '賃貸' | '投資';

export interface MicroCMSImage {
  url: string;
  height: number;
  width: number;
}

export interface Property {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  /** 物件名 */
  title: string;
  /** 物件種別（セレクト: 売買 / 賃貸 / 投資） */
  type: PropertyType;
  /** 価格テキスト（例: "8,500万円"、"応相談" など自由記述） */
  price: string;
  /** 物件画像 */
  image?: MicroCMSImage;
  /** 物件PDF資料 */
  pdf?: { url: string };
}

export interface NewsArticle {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  category: 'お知らせ' | 'コラム' | 'プレスリリース';
  body: string;
  thumbnail?: MicroCMSImage;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface GetListParams {
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string;
  fields?: string;
  q?: string;
}

// ============================================
// 物件 API
// ============================================

export const getProperties = (params: GetListParams = {}): Promise<MicroCMSListResponse<Property>> =>
  getClient().getList<Property>({
    endpoint: 'properties',
    queries: {
      limit: params.limit ?? 12,
      offset: params.offset ?? 0,
      orders: params.orders ?? '-publishedAt',
      filters: params.filters,
      fields: params.fields,
      q: params.q,
    },
  });

export const getProperty = (id: string): Promise<Property> =>
  getClient().getListDetail<Property>({
    endpoint: 'properties',
    contentId: id,
  });

// ============================================
// お知らせ API
// ============================================

export const getNewsArticles = (params: GetListParams = {}): Promise<MicroCMSListResponse<NewsArticle>> =>
  getClient().getList<NewsArticle>({
    endpoint: 'news',
    queries: {
      limit: params.limit ?? 10,
      offset: params.offset ?? 0,
      orders: params.orders ?? '-publishedAt',
      filters: params.filters,
    },
  });

export const getNewsArticle = (id: string): Promise<NewsArticle> =>
  getClient().getListDetail<NewsArticle>({
    endpoint: 'news',
    contentId: id,
  });
