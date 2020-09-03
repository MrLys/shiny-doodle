import React from 'react';
import './App.css';
import HomePage from "./page/homepage/homepage.component";
import { Switch, Route, Link, withRouter } from "react-router-dom";

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

const topicsList = (props) => (
        <div>
            <h1>Topics list</h1>
            <Link to={`${props.match.url}/1`}>Topic 1</Link>
            <Link to={`${props.match.url}/2`}>Topic 2</Link>
        </div>
);


const topicDetail = (props) => {
	return(
		<div>
			<h1>{`Topic ${props.match.params.topicId}`}</h1>
		</div>
	)
};
function App() {
  return (
      <div>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/hats' component={HatsPage} />
              <Route path='/jackets' component={JacketsPage} />
              <Route exact path='/topic' component={topicsList} />
              <Route path='/topic/:topicId' component={topicDetail} />
          </Switch>
      </div>
  );
}

export default App;
