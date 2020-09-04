import React from 'react'
import App from './App'
import store from './store'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

html {
   font-family: 'Open Sans Condensed', sans-serif;
   font-size: 1.5em;
   background: #fafafa;
   color : #444;
}

button {
   font-family: 'Open Sans Condensed', sans-serif;
   font-size: 1em;
   background : #FDEBD0;
}

button:hover {
   background : orange;
   transform: skew(-20deg)

}

a {
    background : lightcyan;
    color : #444;
    transform: skew(-20deg);

}

a:hover {
    background : cyan;
}

h1,h2 {
    text-transform : uppercase;
}

`

ReactDOM.render(
    <Provider store= {store}>
        <BrowserRouter>
            <GlobalStyle/>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'))
