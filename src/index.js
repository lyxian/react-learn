// import * as React from "react";
// import { hydrateRoot } from "react-dom/client";
// import Game from "./components/App";

// hydrateRoot(document.getElementById('root'), <Game />);

import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./components/App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);