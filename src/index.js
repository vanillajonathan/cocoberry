import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { LocalStorage } from './localStorage';
const storage = new LocalStorage();
const tags = ["Fruit", "Vegetable", "Activity"];
ReactDOM.render(React.createElement(App, { storage: storage, tags: tags }), document.getElementById('root'));
serviceWorker.register();
//# sourceMappingURL=index.js.map