import type { Article } from '../../../types/news-api';
import { queryElement } from '../../../utils/dom';
import './news.css';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.slice(0, 10);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = queryElement<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item: Article): void => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            queryElement<HTMLElement>('.news__meta-photo', newsClone).style.backgroundImage = item.urlToImage
                ? `url("${item.urlToImage}")`
                : 'none';
            queryElement<HTMLElement>('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            queryElement<HTMLElement>('.news__meta-date', newsClone).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            queryElement<HTMLElement>('.news__description-title', newsClone).textContent = item.title;
            queryElement<HTMLElement>('.news__description-source', newsClone).textContent = item.source.name;
            queryElement<HTMLElement>('.news__description-content', newsClone).textContent = item.description;
            queryElement<HTMLAnchorElement>('.news__read-more a', newsClone).href = item.url;
            fragment.append(newsClone);
        });
        queryElement<HTMLElement>('.news').replaceChildren(fragment);
    }
}

export default News;
