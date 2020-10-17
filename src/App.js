import React from 'react';
import SearchContainer from './Components/SearchContainer';
import ContentContainer from './Components/ContentContainer';
import './style.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './redux/reducer';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

function App() {
    return (
        <Provider store={store}>
            <div className="container-main">
                <SearchContainer />
                <ContentContainer />
            </div>
        </Provider>
    );
}
export default App;
