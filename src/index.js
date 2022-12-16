// import * as React from "react";
// import { hydrateRoot } from "react-dom/client";
// import Game from "./components/App";

// hydrateRoot(document.getElementById('root'), <Game />);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// root.render(<App isLoggedIn={true} />);

// const messages = ['React', 'Re: React', 'Re:Re: React'];
// root.render(<App unreadMessages={messages} />);

// const posts = [
//     { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
//     { id: 2, title: 'Installation', content: 'You can install React from npm.' }
// ];
// root.render(<App posts={posts} />);

// ** LOCKED INPUT AT START **
// root.render(<input value="hi" />);
// setTimeout(function () {
//     root.render(<input value={null} />);
// }, 5000);