import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { ArticlesResponse, SourcesResponse } from '../../types/news-api';
import { queryElement } from '../../utils/dom';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        queryElement<HTMLElement>('.sources').addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data: ArticlesResponse): void => this.view.drawNews(data));
        });
        this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;
