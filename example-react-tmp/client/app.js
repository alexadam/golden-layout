import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import MyGoldenLayout from './glayout'

// <MyGoldenLayout />
const App = (props) => (
    <div id="app-container">
        <h1>Hello World</h1>
        <MyGoldenLayout />
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
