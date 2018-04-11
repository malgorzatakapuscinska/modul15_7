'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

		_this.changeTab = function (tab) {
			console.log(tab);
			var tabs = _this.state.tabs;
			var activeTabIndex = tabs.findIndex(function (item) {
				return item.style.display == 'block';
			});
			console.log(activeTabIndex);
			var clickedTabIndex = tabs.findIndex(function (item) {
				return item.name == tab;
			});
			console.log(clickedTabIndex);
			tabs[activeTabIndex].style.display = 'none';
			tabs[clickedTabIndex].style.display = 'block';
			_this.setState({ tabs: tabs });
		};

		_this.render = function () {
			var tab1Styles = _this.state.tabs[0].style;

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
										return _this.changeTab('tab-1');
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
										return _this.changeTab('tab-2');
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
					React.createElement(Results, { history: _this.state.history, styles: _this.state.tabs[1], className: 'tab-panel', id: 'tab-2' })
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
			tabs: [{ name: 'tab-1', style: { display: 'block' } }, { name: 'tab-2', style: { display: 'none' } }]
		};

		return _this;
	}

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
