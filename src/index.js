import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
// import * as serviceWorker from './serviceWorker';

axios.get('http://api.createmusic.com/search?search=a').then(({ data }) => {
    console.log(data);
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
