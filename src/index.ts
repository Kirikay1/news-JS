import App from './components/app/app';
import { queryElement } from './utils/dom';
import schoolLogoUrl from './assets/rs-school.svg';
import './global.css';

queryElement<HTMLImageElement>('#school-logo').src = schoolLogoUrl;
const app: App = new App();
app.start();
