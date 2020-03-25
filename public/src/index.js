import React from 'react';
import ReactDOM from 'react-dom';
import Container from "./container";
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
import 'styled-components'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
