class StopWatch extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0,
			},
			history: [],
			
			activeTab: 'tab-1',
			tabStyles: {
				display: 'block',
				className: 'active',
			},
			tabs: [
				{ name: 'tab-1', style: { display: 'block'} },
				{ name: 'tab-2', style: { display: 'none'}}
			]
		};
		
	}

	reset = () => {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}
	pad0 = (value) => {
		let result = value.toString();
		const resultLength = result.length;
		if (resultLength <2){
			result = 0 + result;
		}
		return result;
	}
	
	format = () =>{
		let minutes = this.state.times.minutes;
		let seconds = this.state.times.seconds;
		let miliseconds = this.state.times.miliseconds;
		return `${this.pad0(minutes)}:${this.pad0(seconds)}:${this.pad0(Math.floor(miliseconds))}`;
	}
	
	start = () =>{
		if(!this.state.running){
			this.state.running = 'true';
			this.watch = setInterval(() => this.step(), 10);
		}
	}
	
	step = () =>{
		if(!this.state.running) return;
			this.calculate();
	}
	
	calculate = () => {
		this.setState({
			times: {
				minutes: this.state.times.minutes,
				seconds: this.state.times.seconds,
				miliseconds: this.state.times.miliseconds + 1
			}	
		});
		
		if(this.state.times.miliseconds >= 100){
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds + 1,
					miliseconds: 0
				}
			});
		}
		
		if(this.state.times.seconds >= 60){
			this.setState({
				times: {
					minutes: this.state.times.minutes +1,
					seconds: 0, 
					miliseconds: this.state.times.miliseconds 
				}
			});
		}
	}
	
	stop = () => {
		this.setState({
			running: false
		});
		
		clearInterval(this.watch);
	}
	
	clear = () => {
		this.stop();
		this.reset();
	}
	
	addTime = () => {
			let newRecord = {
			id: this.state.history.length,
			record: this.format()
		};
		
		this.setState({ history: [...this.state.history, newRecord]});
		console.log(this.state.history);
	}
	
	clearHistory = () => {
		this.setState({ history: [] });
	}	
	
	checkButtonState = (value) => {
		const buttonName = value;
		const state = this.state.buttonsState;
		const getButtonState = (state) => {
			return (state.name === buttonName);
		}
		
		const buttonState = state.filter(getButtonState)[0].state;
		console.log(buttonState);
		return `${buttonState}`;
	}
	
	changeTab = (tab) => {
	console.log(tab);
		const tabs = this.state.tabs;
		let activeTabIndex = tabs.findIndex((item) => item.style.display=='block');
		console.log(activeTabIndex);
		let clickedTabIndex = tabs.findIndex((item) => item.name==tab);
		console.log(clickedTabIndex);
		tabs[activeTabIndex].style.display = 'none'
		tabs[clickedTabIndex].style.display = 'block'
		this.setState({ tabs});
	}
	
	
	
	render = () => {
		let tab1Styles = this.state.tabs[0].style;		
	
		console.log(tab1Styles);
		return (
			<div className = {'app-container'}>
				<div className = {'menu'}>
					<ul id = {'tab-list'}>
						<li className = {'active'}><a className = {'tab-control'} href = {'#tab-1'} onClick = {() => this.changeTab('tab-1')}>StopWatch</a></li>
						<li><a className = {'tab-control'} href = {'#tab-2'} onClick = {() => this.changeTab('tab-2')}>Results</a></li>
					</ul>
				</div>
				<a className = {'toggle-button'} href = {'#tab-list'} type = {'button'}><span>Menu</span></a>
				<div className = {'container'}>
					<div className = {'tab-panel'} id = {'tab-1'} style = {tab1Styles}>
						<nav>
							<a href = {'#'} className = {'button'} id = {'start'} onClick = {() => this.start()}>start</a>
							<a href = {'#'} className = {'button'} id = {'stop'} onClick = {() => {this.stop()}}>stop</a>
							<a href = {'#'} className = {'button'} id = {'clear'} onClick = {() => this.clear()}>Clear</a>
							<a href = {'#'} className = {'button'} id = {'Add'} onClick = {() => this.addTime()}>Add result</a>
							<a href = {'#'} className = {'button'} id = {'clear-results'} onClick = {() => this.clearHistory()}>Clear History</a>
		 				</nav>
						<Display time={this.format()}></Display>
					</div>
					<Results history = {this.state.history} styles = {this.state.tabs[1]} className = {'tab-panel'} id = {'tab-2'}></Results>
				</div>
				
			</div>
		);
		
	}
}

class Display extends React.Component{
	constructor(props){
		super(props);
	}
	
	static propTypes = {
		time: React.PropTypes.string.isRequired
	}
	
	render() {
		return (
		React.createElement('div', {className: 'stopWatch' }, this.props.time)
		);
	}
}

class Results extends React.Component{
	constructor(props){
		super(props);
	}
	
	static propTypes = {

		history: React.PropTypes.array.isRequired,
		styles: React.PropTypes.object.isRequired

	}
	
	render () {
		let tab2Styles = this.props.styles.style;
		console.log(tab2Styles);
		let results = this.props.history.map( ele  => { 
		return React.createElement('li', {key: ele.id}, ele.record)
	});
		return (
				React.createElement('ol', {className: 'results',  style: tab2Styles},

				React.createElement('p', {}, "Results"), 

				results

			)
		);
	} 
}
var element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));

