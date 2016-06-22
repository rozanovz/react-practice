import React from 'react';
import Home from '../components/home';
import Main from '../components/main';
import Notice from '../components/notices/notice';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

export var routes = (
	<Router history={ hashHistory }>
		<Route path="/" component={ Main }>
			<IndexRoute component={ Home } />
			<Route path="/notice/:id" component={ Notice }/>
		</Route>
	</Router>
);
