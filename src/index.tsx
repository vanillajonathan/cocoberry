import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();