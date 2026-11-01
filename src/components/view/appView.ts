import News from './news/news';
import Sources from './sources/sources';
import type { Article, ArticlesResponse, NewsSource, SourcesResponse } from '../../types/news-api';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ArticlesResponse): void {
        const values: Article[] = data?.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: SourcesResponse): void {
        const values: NewsSource[] = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
