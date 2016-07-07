import React from 'react';
import { hashHistory, Link } from 'react-router'
import NoticeStore from '../../stores/store';
import AppActions from '../../actions/actions';
import AppConstants from '../../constants/constants';
import Tag from './notice-tags';

export default class Notice extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			description: '',
			tags: [],
			isUpdated: false,
			isNew: true,
			directoryId: props.location.state ? props.location.state.prevPath : ''
		}

		this.showButton = this.showButton.bind(this);
		this.loadNotice = this.loadNotice.bind(this);
		this.addTag = this.addTag.bind(this);
		this.removeTag = this.removeTag.bind(this);
		this.generateData = this.generateData.bind(this);
		this.createUpdateNotice = this.createUpdateNotice.bind(this);
	}

	showButton(event){
		if(!this.state.isNew) this.setState({isUpdated: true});
		if(event.keyCode !== 13) (event.target.id === 'title') ? this.setState({title:event.target.value}) : this.setState({description:event.target.value});
	}

	loadNotice(event){
		this.setState({
			title: event.item.data[0].title,
			description: event.item.data[0].description,
			tags: event.item.data[0].tags,
			isUpdated: false,
			isNew: false,
			id: event.item.data[0].id,
			directoryId: event.item.data[0].directoryId,
		});
		this.refs.title.value = this.state.title;
		this.refs.description.value = this.state.description;
	}

	addTag(event) {
		if (event.keyCode == 13) {
			this.setState({
				tags: [...this.state.tags, event.target.value],
			});
			event.target.value = "";
			this.showButton(event);
		}
	}

	removeTag(event){
		let tags = this.state.tags;
		tags.splice(tags.indexOf(event.item.tagName),1);
		this.setState({tags: tags});
		this.showButton(event);
	}

	generateData(id){
		let data = {
			'directoryId': this.state.directoryId,
			'title': this.state.title,
			'description': this.state.description,
			'tags': this.state.tags
		};
		if(id){
			data.id = this.state.id;
			data.position = 1;
			return data;
		}else{
			return data;
		}
	}

	createUpdateNotice(){
		if(this.props.params.id != 'new')
			AppActions.fireAction.bind(null, 'UPDATE_NOTICE', this.generateData(true))();
		else
			AppActions.fireAction.bind(null, 'ADD_NOTICE', this.generateData(false))();

		hashHistory.push('/');
	}

	componentWillMount(){
		NoticeStore.addChangeListener(AppConstants.LOAD_NOTICE_BY_ID, this.loadNotice);
    NoticeStore.addChangeListener(AppConstants.REMOVE_TAG, this.removeTag);
  }

	componentDidMount(){
		if(this.props.params.id !== 'new')
			AppActions.fireAction.bind(null, 'LOAD_NOTICE_BY_ID', { 'id' : this.props.params.id })();
	}

  componentWillUnmount(){
		NoticeStore.removeChangeListener(AppConstants.LOAD_NOTICE_BY_ID, this.loadNotice);
    NoticeStore.removeChangeListener(AppConstants.REMOVE_TAG, this.removeTag);
  }

	render () {
		return (
			<div className="col-xs-6 col-xs-offset-3">
				<dl className="dl-horizontal">
					<dt> Title </dt>
				  <dd style={{paddingBottom: 5}}>
						<input className="form-control" id="title" type="text" ref="title" defaultValue={this.state.title} onKeyDown={this.showButton}/>
					</dd>

					<dt> Description </dt>
					<dd style={{paddingBottom: 5}}>
						<textarea className="form-control" id="description" type="text" ref="description" rows="8" defaultValue={this.state.description} onKeyDown={this.showButton} />
					</dd>

					<dt> Tags </dt>
					<dd style={{paddingBottom: 5}}>
						{this.state.tags.map((tag, i)=> <Tag id={i} tag={tag} key={i} />)}
						<input type="text" id="newTag" onKeyDown={this.addTag} />
					</dd>

					<dt>
						<Link to="/" className="btn btn-primary"> <i className="glyphicon glyphicon-arrow-left"></i> </Link>
					</dt>
					<dd style={{paddingBottom: 5}}>
						{
							(this.state.isUpdated || this.state.isNew)
								? (<button className="btn btn-success" onClick={this.createUpdateNotice}>{this.state.isNew ? 'Create Notice' : 'Update Notice'}</button>)
									: null
						}
					</dd>
				</dl>
			</div>
		);
	}
};
