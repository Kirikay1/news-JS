import AppLoader from './appLoader';
import { ApiEndpoint } from '../../types/news-api';
import type { ArticlesResponse, ResponseCallback, SourcesResponse } from '../../types/news-api';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>({ endpoint: ApiEndpoint.Sources }, callback);
    }

    public getNews(event: MouseEvent, callback: ResponseCallback<ArticlesResponse>): void {
        const container: EventTarget | null = event.currentTarget;
        if (!(event.target instanceof Element) || !(container instanceof HTMLElement)) {
            return;
        }
        const target: HTMLElement | null = event.target.closest<HTMLElement>('.source__item');
        const sourceId: string | undefined = target?.dataset.sourceId;
        if (sourceId && container.dataset.source !== sourceId) {
            container.dataset.source = sourceId;
            super.getResp<ArticlesResponse>(
                { endpoint: ApiEndpoint.Everything, options: { sources: sourceId } },
                callback
            );
        }
    }
}

export default AppController;
