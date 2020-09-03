import React from 'react';
import './App.css';
import HomePage from "./page/homepage/homepage.component";
import { Switch, Route } from "react-router-dom";

const HatsPage = (props) => (
	<div>
		<h1>Hats</h1>
	</div>
);

const JacketsPage= () => (
	<div>
		<h1>Hats</h1>
	</div>
);

function App() {
  return (
  	<div>
		<Switch>
			<Route exact path='/' component={HomePage} />
			<Route path='/hats' component={HatsPage} />
			<Route path='/jackets' component={JacketsPage} />
		</Switch>
	</div>
  );
}

export default App;
