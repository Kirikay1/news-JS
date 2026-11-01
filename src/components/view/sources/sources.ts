import type { NewsSource } from '../../../types/news-api';
import { queryElement } from '../../../utils/dom';
import './sources.css';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = queryElement<HTMLTemplateElement>('#sourceItemTemp');
        data.forEach((item: NewsSource): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            queryElement<HTMLElement>('.source__item-name', sourceClone).textContent = item.name;
            queryElement<HTMLElement>('.source__item', sourceClone).dataset.sourceId = item.id;
            fragment.append(sourceClone);
        });
        queryElement<HTMLElement>('.sources').append(fragment);
    }
}

export default Sources;
