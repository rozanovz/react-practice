import React from 'react';
import Home from './home';

export class Main extends React.Component {
	constructor() {
		super();
	}
	render () {
		return (
			<div className="container-fluid">
				<div className="row">
					<Home />
				</div>
			</div>
		);
	}
}
