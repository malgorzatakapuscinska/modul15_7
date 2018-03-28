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
			history: []
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
	a
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
	
	render = () => {
		return (
			<div className = {'container'}>
				<ul className = {'tab-list'}>
					<li className = {'active'}> <a className = {'tab-control'} href = {'tab-1'}>StopWatch</a></li>
					<li><a className = {'tab-control'} href = {'tab-2'}>Results</a></li>
					
				</ul>
				<div className = {'tab-panel active'} id = {'tab-1'}>
					<nav>
						<a href = {'#'} className = {'button'} id = {'start'} onClick = {() => this.start()}>start</a>
						<a href = {'#'} className = {'button'} id = {'stop'} onClick = {() => {this.stop()}}>stop</a>
						<a href = {'#'} className = {'button'} id = {'clear'} onClick = {() => this.clear()}>Clear</a>
						<a href = {'#'} className = {'button'} id = {'Add'} onClick = {() => this.addTime()}>Add result</a>
						<a href = {'#'} className = {'button'} id = {'clear-results'} onClick = {() => this.clearHistory()}>Clear History</a>
	 				</nav>
					<Display time={this.format()}></Display>
				</div>
				<Results history = {this.state.history} className = {'tab-panel'} id = {'tab-2'}></Results>
				
			</div>
		);
		
	}
}


class Display extends React.Component{
	constructor(props){
		super(props)
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

		history: React.PropTypes.array.isRequired

	}
	
	render () {
		let results = this.props.history.map( ele  => { 
		return React.createElement('li', {key: ele.id}, ele.record)
	});
		return (
			React.createElement('ol', {className: 'results'},
				React.createElement('p', {}, "Results"), 
				results
			)
		);
	} 
}
var element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));

