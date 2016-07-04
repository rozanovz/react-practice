import React from 'react';
import { hashHistory, Link } from 'react-router'
import NoticeStore from '../../stores/store';
import AppActions from '../../actions/actions';
import AppConstants from '../../constants/constants';
import Tag from './notice-tags';

export default class Notice extends React.Component {
	constructor(props){
		super(props);
		this.notice = (this.props.params.id != 'new') ? NoticeStore.getNoticesById(this.props.params.id)[0] : {};

		this.state = {
			title: this.notice.title ? this.notice.title : '',
			description: this.notice.description ? this.notice.description : '',
			tags: this.notice.tags ? this.notice.tags : [],
			isUpdated: false,
			isNew: (this.props.params.id != 'new') ? false : true,
			id: this.props.params.id,
		}

		this.hasBeenUpdated = this.hasBeenUpdated.bind(this);
		this.addTag = this.addTag.bind(this);
		this.logNotice = this.logNotice.bind(this);
		this.removeTag = this.removeTag.bind(this);
	}

	hasBeenUpdated(event){
		if(!this.state.isNew) this.setState({isUpdated: true});
		if(event.keyCode !== 13) (event.target.id === 'title') ? this.setState({title:event.target.value}) : this.setState({description:event.target.value});
	}

	addTag(event) {
		if (event.keyCode == 13) {
			this.setState({
				tags: [...this.state.tags, event.target.value],
			});
			event.target.value = "";
			this.hasBeenUpdated(event);
		}
	}

	componentWillMount(){
    NoticeStore.addChangeListener(AppConstants.REMOVE_TAG, this.removeTag);
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(AppConstants.REMOVE_TAG, this.removeTag);
  }

	removeTag(event){
		let tags = this.state.tags;
		tags.splice(tags.indexOf(event.item.tagName),1);
		this.setState({tags: tags});
		this.hasBeenUpdated(event);
	}

	logNotice(){
		if(this.props.params.id != 'new')
			AppActions.fireAction.bind(null, 'UPDATE_NOTICE', {notice: this.state})();
		else
			AppActions.fireAction.bind(null, 'ADD_NOTICE', {
				'directoryId': 1,
		        'title': this.state.title,
		        'description': this.state.description,
		        'tags': this.state.tags
			})();
		hashHistory.push('/');
	}

	render () {
		return (
			<div className="col-xs-6 col-xs-offset-3">
				<dl className="dl-horizontal">
					<dt> Title </dt>
				  <dd>
						<input className="form-control" id="title" type="text" defaultValue={this.state.title} onKeyDown={this.hasBeenUpdated}/>
					</dd>

					<dt> Description </dt>
					<dd>
						<textarea className="form-control" id="description" type="text" rows="8" defaultValue={this.state.description} onKeyDown={this.hasBeenUpdated}/>
					</dd>

					<dt> Tags </dt>
					<dd>
						{this.state.tags.map((tag, i)=> <Tag id={i} tag={tag} key={i}/>)}
						<input type="text" id="newTag" onKeyDown={this.addTag}/>
					</dd>

					<dt>
						<Link to="/">
							<i className="glyphicon glyphicon-arrow-left"></i>
						</Link>
					</dt>
					<dd>
						{
							(this.state.isUpdated || this.state.isNew)
								? (<button className="btn btn-success" onClick={this.logNotice}>{this.state.isNew ? 'Create Notice' : 'Update Notice'}</button>)
									: null
						}
					</dd>
				</dl>
			</div>
		);
	}
};
