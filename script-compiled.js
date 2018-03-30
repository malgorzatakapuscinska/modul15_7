'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
	_inherits(StopWatch, _React$Component);

	function StopWatch(props) {
		_classCallCheck(this, StopWatch);

		var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

		_this.reset = function () {
			_this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		};

		_this.pad0 = function (value) {
			var result = value.toString();
			var resultLength = result.length;
			if (resultLength < 2) {
				result = 0 + result;
			}
			return result;
		};

		_this.format = function () {
			var minutes = _this.state.times.minutes;
			var seconds = _this.state.times.seconds;
			var miliseconds = _this.state.times.miliseconds;
			return _this.pad0(minutes) + ':' + _this.pad0(seconds) + ':' + _this.pad0(Math.floor(miliseconds));
		};

		_this.start = function () {
			if (!_this.state.running) {
				_this.state.running = 'true';
				_this.watch = setInterval(function () {
					return _this.step();
				}, 10);
			}
		};

		_this.step = function () {
			if (!_this.state.running) return;
			_this.calculate();
		};

		_this.calculate = function () {
			_this.setState({
				times: {
					minutes: _this.state.times.minutes,
					seconds: _this.state.times.seconds,
					miliseconds: _this.state.times.miliseconds + 1
				}
			});

			if (_this.state.times.miliseconds >= 100) {
				_this.setState({
					times: {
						minutes: _this.state.times.minutes,
						seconds: _this.state.times.seconds + 1,
						miliseconds: 0
					}
				});
			}

			if (_this.state.times.seconds >= 60) {
				_this.setState({
					times: {
						minutes: _this.state.times.minutes + 1,
						seconds: 0,
						miliseconds: _this.state.times.miliseconds
					}
				});
			}
		};

		_this.stop = function () {
			_this.setState({
				running: false
			});

			clearInterval(_this.watch);
		};

		_this.clear = function () {
			_this.stop();
			_this.reset();
		};

		_this.addTime = function () {
			var newRecord = {
				id: _this.state.history.length,
				record: _this.format()
			};

			_this.setState({ history: [].concat(_toConsumableArray(_this.state.history), [newRecord]) });
			console.log(_this.state.history);
		};

		_this.clearHistory = function () {
			_this.setState({ history: [] });
		};

		_this.checkButtonState = function (value) {
			var buttonName = value;
			var state = _this.state.buttonsState;
			var getButtonState = function getButtonState(state) {
				return state.name === buttonName;
			};

			var buttonState = state.filter(getButtonState)[0].state;
			console.log(buttonState);
			return '' + buttonState;
		};

		_this.changeTab = function (value, target) {

			console.log(value);
			console.log(target);
			var tabName = target;
			var buttonName = value;

			var getTab = function getTab(tabsState) {
				return tabsState.name === tabName;
			};

			var getButton = function getButton(buttonsState) {
				return buttonsState.name === buttonName;
			};

			var buttonState = _this.checkButtonState(value);
			console.log(buttonState);

			if (buttonState === 'active') {
				return;
			} else {

				switch (target) {

					case 'tab-1':

						// sets all tabs style property to display: none and after that changes tab-1 style value to block

						var tabsState = _this.state.tabsState.map(function (state) {
							return _extends({}, state, { style: { display: "none" } });
						});

						var variable1 = tabsState.filter(getTab); // tablica będzie zawierać obiekt tab-1 display: none
						console.log(variable1);
						variable1[0].style = { display: "block" }; //tablica  z obiektem tab-1 display: block
						tabsState[0] = variable1[0]; // tablica zawierająca dwa indeksy, w kazdym obiekt

						console.log(tabsState);

						_this.setState({ tabsState: tabsState }, function () {
							return console.log(_this.state.tabsState);
						});

						//

						var buttonsState = _this.state.buttonsState.map(function (state) {
							return _extends({}, state, { state: '', className: '' });
						}); //zeruje state i className obu tabów

						console.log('Wartość początkowa zmiennej buttonsState');
						console.log(buttonsState);

						var variable2 = buttonsState.filter(getButton);

						console.log('Wartość zmiennej variable2:');
						console.log(variable2); // tabela zawierająca obiekt stopwatch state '' className ''

						variable2[0].state = 'active';
						variable2[0].className = 'active';

						buttonsState[0] = variable2[0];

						_this.setState({ buttonsState: buttonsState }, function () {
							return console.log(_this.state.buttonsState);
						});

						break;

					case 'tab-2':
						console.log(buttonName);
						tabsState = _this.state.tabsState.map(function (state) {
							return _extends({}, state, { style: { display: "none" } });
						});
						console.log(tabsState);

						variable1 = tabsState.filter(getTab);
						console.log(variable1);
						variable1[0].style = { display: "block" };
						tabsState[1] = variable1[0];

						console.log(tabsState);

						_this.setState({ tabsState: tabsState }, function () {
							return console.log(_this.state.tabsState);
						});

						buttonsState = _this.state.buttonsState.map(function (state) {
							return _extends({}, state, { state: '', className: '' });
						});

						console.log('Wartość początkowa zmiennej buttonsState');
						console.log(buttonsState);

						console.log(buttonName);
						variable2 = buttonsState.filter(getButton);

						console.log('Wartość zmiennej variable2:');
						console.log(variable2);

						variable2[0].state = 'active';
						variable2[0].className = 'active';

						buttonsState[1] = variable2[0];

						_this.setState({ buttonsState: buttonsState }, function () {
							return console.log(_this.state.buttonsState);
						});

						break;

				}
			}
		};

		_this.render = function () {
			var tab1Styles = _this.state.tabsState[0].style;

			console.log(tab1Styles);
			return React.createElement(
				'div',
				{ className: 'app-container' },
				React.createElement(
					'div',
					{ className: 'menu' },
					React.createElement(
						'ul',
						{ id: 'tab-list' },
						React.createElement(
							'li',
							{ className: 'active' },
							React.createElement(
								'a',
								{ className: 'tab-control', href: '#tab-1', onClick: function onClick() {
										return _this.changeTab('stopwatch', 'tab-1');
									} },
								'StopWatch'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ className: 'tab-control', href: '#tab-2', onClick: function onClick() {
										return _this.changeTab('results', 'tab-2');
									} },
								'Results'
							)
						)
					)
				),
				React.createElement(
					'a',
					{ className: 'toggle-button', href: '#tab-list', type: 'button' },
					React.createElement(
						'span',
						null,
						'Menu'
					)
				),
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement(
						'div',
						{ className: 'tab-panel', id: 'tab-1', style: tab1Styles },
						React.createElement(
							'nav',
							null,
							React.createElement(
								'a',
								{ href: '#', className: 'button', id: 'start', onClick: function onClick() {
										return _this.start();
									} },
								'start'
							),
							React.createElement(
								'a',
								{ href: '#', className: 'button', id: 'stop', onClick: function onClick() {
										_this.stop();
									} },
								'stop'
							),
							React.createElement(
								'a',
								{ href: '#', className: 'button', id: 'clear', onClick: function onClick() {
										return _this.clear();
									} },
								'Clear'
							),
							React.createElement(
								'a',
								{ href: '#', className: 'button', id: 'Add', onClick: function onClick() {
										return _this.addTime();
									} },
								'Add result'
							),
							React.createElement(
								'a',
								{ href: '#', className: 'button', id: 'clear-results', onClick: function onClick() {
										return _this.clearHistory();
									} },
								'Clear History'
							)
						),
						React.createElement(Display, { time: _this.format() })
					),
					React.createElement(Results, { history: _this.state.history, styles: _this.state.tabsState[1], className: 'tab-panel', id: 'tab-2' })
				)
			);
		};

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			history: [],

			activeTab: 'tab-1',
			tabStyles: {
				display: 'block',
				className: 'active'
			},
			tab2Style: {
				display: 'none',
				classname: ''
			},

			tabsState: [{ name: 'tab-1', style: { display: "block" } }, { name: 'tab-2', style: { display: "none" } }],
			buttonsState: [{ name: 'stopwatch', state: 'active', className: 'active' }, { name: 'results', state: '', className: '' }]
		};

		return _this;
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

	return StopWatch;
}(React.Component);

var Display = function (_React$Component2) {
	_inherits(Display, _React$Component2);

	function Display(props) {
		_classCallCheck(this, Display);

		return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
	}

	_createClass(Display, [{
		key: 'render',
		value: function render() {
			return React.createElement('div', { className: 'stopWatch' }, this.props.time);
		}
	}]);

	return Display;
}(React.Component);

Display.propTypes = {
	time: React.PropTypes.string.isRequired
};

var Results = function (_React$Component3) {
	_inherits(Results, _React$Component3);

	function Results(props) {
		_classCallCheck(this, Results);

		return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
	}

	_createClass(Results, [{
		key: 'render',
		value: function render() {
			var tab2Styles = this.props.styles.style;
			console.log(tab2Styles);
			var results = this.props.history.map(function (ele) {
				return React.createElement('li', { key: ele.id }, ele.record);
			});
			return React.createElement('ol', { className: 'results', style: tab2Styles }, React.createElement('p', {}, "Results"), results);
		}
	}]);

	return Results;
}(React.Component);

Results.propTypes = {

	history: React.PropTypes.array.isRequired,
	styles: React.PropTypes.object.isRequired

};

var element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));
