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
			tab2Style: {
				display: 'none',
				classname: '',
			},
			
			tabsState: [
				{name: 'tab-1', style: 'display: "block"'},
				{name: 'tab-2', style: 'display: "none"'},
			],
			buttonsState: [
				{name: 'stopwatch', state: 'active', className: 'active'},
				{name: 'results', state: 'not active', className: ''},
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
	
	changeTab = (value, target) => {
		console.log(value);
		console.log(target);
		let buttonState = this.checkButtonState(value);
		console.log(buttonState);
		
		if(buttonState === 'active'){return;
		}else {
			
				switch(target){
					case 'tab-1':
							//stan tabów
							
								// TAB-1 
								
					const tabsState =  [
	        		{ name: 'tab-1', style: 'display: "block"' },
	        		{ name: 'tab-2', style: 'display: "none"' },];
	        		
	        		
			  		
			  		console.log(mapWork);
			
	 				this.setState({
			 			tabsState: tabsState.map(state => ({...state, style: 'display: "none" '}))
			  			});
					});
					console.log(this.state.tabsState);
				}
		}
	}
	
	/*changeTab = (button, switch_Target ) => {
	console.log(this.state.activeTab);
		let state = this.state.activeTab;
		if(state === 'tab-1'){
			this.state.activeTab = 'tab-2';
			this.setState({
				tab2Style: {
					display: 'block',
					className: 'active'
				}
			});
			this.setState({
				tab1Style: {
					display: 'none',
					className: ''
				}
			});
			console.log(this.state.activeTab);
			console.log(this.state.tab2Style);
			console.log(this.state.tab1Style);
		}else {
			this.state.activeTab = 'tab-1';
			this.setState({
					tab2Style: {
						display: 'none',
					}
			});
			this.setState({
					tab1Style: {
						display: 'block',
					}
			});
		}
	}*/
	
	render = () => {
		
		return (
			<div className = {'app-container'}>
				<div className = {'menu'}>
					<ul id = {'tab-list'}>
						<li className = {'active'}><a className = {'tab-control'} href = {'#tab-1'} onClick = {() => this.checkButtonState('results')}>StopWatch</a></li>
						<li><a className = {'tab-control'} href = {'#tab-2'} onClick = {() => this.changeTab('results', 'tab-1')}>Results</a></li>
					</ul>
				</div>
				<a className = {'toggle-button'} href = {'#tab-list'} type = {'button'}><span>Menu</span></a>
				<div className = {'container'}>
					<div className = {'tab-panel'} id = {'tab-1'} style = {this.state.tab1Style}>
						<nav>
							<a href = {'#'} className = {'button'} id = {'start'} onClick = {() => this.start()}>start</a>
							<a href = {'#'} className = {'button'} id = {'stop'} onClick = {() => {this.stop()}}>stop</a>
							<a href = {'#'} className = {'button'} id = {'clear'} onClick = {() => this.clear()}>Clear</a>
							<a href = {'#'} className = {'button'} id = {'Add'} onClick = {() => this.addTime()}>Add result</a>
							<a href = {'#'} className = {'button'} id = {'clear-results'} onClick = {() => this.clearHistory()}>Clear History</a>
		 				</nav>
						<Display time={this.format()}></Display>
					</div>
					<Results history = {this.state.history} style = {this.state.tab2Style} className = {'tab-panel'} id = {'tab-2'}></Results>
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
		super(props)
	}
	
	static propTypes = {

		history: React.PropTypes.array.isRequired,
		style: React.PropTypes.object.isRequired

	}
	
	render () {
		let tab2style =  this.props.style;
		console.log(tab2style);
		let results = this.props.history.map( ele  => { 
		return React.createElement('li', {key: ele.id}, ele.record)
	});
		return (
			React.createElement('ol', {className: 'results', style: tab2style},
				React.createElement('p', {}, "Results"), 
				results
			)
		);
	} 
}
var element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));

