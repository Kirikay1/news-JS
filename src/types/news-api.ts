export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: Pick<NewsSource, 'name'> & { id: string | null };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: 'ok';
    sources: NewsSource[];
}

export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export interface QueryOptions {
    apiKey: string;
    sources: string;
}

export type RequestOptions = Partial<QueryOptions>;
export type RequestConfig = Readonly<{ endpoint: ApiEndpoint; options?: RequestOptions }>;
export type ApiResponse = SourcesResponse | ArticlesResponse;
export type ResponseCallback<T extends ApiResponse> = (data: T) => void;
