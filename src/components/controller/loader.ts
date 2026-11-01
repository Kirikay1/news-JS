import type { ApiEndpoint, ApiResponse, RequestConfig, RequestOptions, ResponseCallback } from '../../types/news-api';

class Loader {
    public constructor(
        private readonly baseLink: string,
        private readonly options: Readonly<RequestOptions>
    ) {}

    public getResp<T extends ApiResponse>(
        { endpoint, options = {} }: RequestConfig,
        callback: ResponseCallback<T>
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === 401 || response.status === 404) {
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            }
            throw new Error(response.statusText);
        }
        return response;
    }

    private makeUrl(options: RequestOptions, endpoint: ApiEndpoint): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;
        Object.entries(urlOptions).forEach(([key, value]: [string, string | undefined]): void => {
            if (value !== undefined) {
                url += `${key}=${encodeURIComponent(value)}&`;
            }
        });
        return url.slice(0, -1);
    }

    private load<T extends ApiResponse>(
        method: 'GET',
        endpoint: ApiEndpoint,
        callback: ResponseCallback<T>,
        options: RequestOptions
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((response: Response): Promise<T> => response.json() as Promise<T>)
            .then((data: T): void => callback(data))
            .catch((error: unknown): void => console.error(error));
    }
}

export default Loader;
