"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var play = require("../icons/play.png");
var pause = require("../icons/pause.png");
var highVolume = require("../icons/high-volume.png");
var lowVolume = require("../icons/low-volume.png");
// var Slider = require("@vkontakte/vkui/src/components/Slider/Slider.js");
var vkui = _interopRequireDefault(require("@vkontakte/vkui"))
var Slider = vkui.Slider
console.log(Slider)

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var style = {
  audioPlayerWrapper: function audioPlayerWrapper(hidePlayer) {
    return {
      display: hidePlayer ? 'none' : 'block'
    };
  },
  flexWrapper: {
    boxSizing: 'border-box',
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '15px 0',
    backgroundColor: 'white',
    position: 'relative',
    zIndex: '100',
    boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)'
  },
  pause: {
    height: '30px',
    width: '30px',
    position: 'absolute',
    zIndex: 990,
    marginLeft: '-1px',
    marginTop: '-1px',
  },
  play: {
    height: '30px',
    width: '30px',
    position: 'absolute',
    zIndex: 990,
    marginLeft: '1px',
    marginTop: '-1px',
  },
  togglePlayWrapper: {
    boxSizing: 'border-box',
    flex: '1 0 60px',
    position: 'relative'
  },
  togglePlay: {
    boxSizing: 'border-box',
    position: 'absolute',
    left: '10%',
    border: '1px solid #7d8ca4',
    backgroundColor: 'white',
    color: 'white',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginTop: '4px'
  },
  progressBarWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    position: 'relative',
    flex: '10 0 auto',
    alignSelf: 'center',
    padding: '5px 4% 0 0',
    marginLeft: '10px'
  },
  progressBar: {
    boxSizing: 'border-box',
    width: '100%',
    height: '5px',
    left: '0',
    background: '#e4e4e4'
  },
  drag: function drag(left) {
    return {
      boxSizing: 'border-box',
      position: 'absolute',
      width: '20px',
      height: '20px',
      left: left,
      top: '-3px',
      background: 'skyblue',
      opacity: '0.8',
      borderRadius: '50px',
      boxShadow: '#fff 0 0 5px',
      cursor: 'pointer'
    };
  },
  audioInfo: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  highVolume: {
    height: '20px',
    width: '20px',
    position:'absolute',
    marginLeft: '104%',
    marginTop: '-3%'
  },
  lowVolume: {
    height: '20px',
    width: '20px',
    position:'absolute',
    marginLeft: '-10%',
    marginTop: '-3%'
  },
  time: {},
  volumeControl: {
    zIndex: 20,
    cursor: 'pointer',
    position: 'absolute',
    width: '75%',
    height: '0',
    backgroundColor: 'transparent',
    marginLeft: '10%'
  },
  volume: function volume(currentVolume) {
    var width =  currentVolume * 100;
    return {
      zIndex: 19,
      position: 'absolute',
      // backgroundColor: 'grey',
      width: width + '%',
      height: '2px',
    };
  }
};

var H5AudioPlayer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(H5AudioPlayer, _React$Component);

  function H5AudioPlayer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, H5AudioPlayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];

    }
    // console.log(args)

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(H5AudioPlayer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      duration: 0,
      currentTime: 0,
      currentVolume: 0.5,
      dragLeft: 0,
      isDragging: false,
      isPlaying: false,
      isPrevPlaying: true,
      togglePlayPause: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "togglePlay", function (e) {
      // console.log(e.target.id)
      
      if (_this.audio.paused && _this.audio.src ) {
        _this.audio.play();
      } else if (!_this.audio.paused ) {
        _this.audio.pause();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "volumnControlDrag", function (e) {
      // var currentVolume = parseFloat(e.target.value);
      var currentVolume = parseFloat(e.target.value);
      // console.log(e)

      e.currentTarget.style.cursor = 'pointer';

      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
        // console.log(currentVolume);

        if(isNaN(currentVolume) === true || currentVolume === 0) currentVolume = 0.09
          _this.audio.volume = currentVolume;



      _this.setState({
        currentVolume: currentVolume
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "volumnControlDragOver", function (e) {
      e.dataTransfer.dropEffect = 'move';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "volumnControlDragStart", function (e) {

      // e.target.style.cursor = 'pointer'
      e.dataTransfer.setData('text', 'volume');
      e.dataTransfer.effectAllowed = 'move';

      if (e.dataTransfer.setDragImage) {
        var crt = e.target.cloneNode(true);
        e.dataTransfer.setDragImage(crt, 0, 0);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setListenTrack", function () {
      if (!_this.listenTracker) {
        var listenInterval = _this.props.listenInterval;
        _this.listenTracker = setInterval(function () {
          _this.props.onListen && _this.props.onListen(_this.audio.currentTime);
        }, listenInterval);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearListenTrack", function () {
      if (_this.listenTracker) {
        clearInterval(_this.listenTracker);
        _this.listenTracker = null;
      }
    });

    return _this;
  }

  _createClass(H5AudioPlayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // audio player object
      var audio = this.audio; // progress bar slider object

      var slider = this.slider;
      this.intervalId = setInterval(function () {
        var currentTime = _this2.audio.currentTime;
        var duration = _this2.audio.duration;
        var barWidth = _this2.bar.offsetWidth - 20;
        var left = barWidth * currentTime / duration || 0;

        if (!_this2.audio.paused && !_this2.state.isDragging && !!duration) {
          _this2.setState({
            currentTime: currentTime,
            duration: duration,
            barWidth: barWidth,
            dragLeft: left,
          });
        }
      }, this.props.progressUpdateInterval);
      audio.addEventListener('error', function (e) {
        _this2.props.onError && _this2.props.onError(e);
      }); // When enough of the file has downloaded to start playing

      audio.addEventListener('canplay', function (e) {
        _this2.props.onCanPlay && _this2.props.onCanPlay(e);
      }); // When enough of the file has downloaded to play the entire file

      audio.addEventListener('canplaythrough', function (e) {
        _this2.props.onCanPlayThrough && _this2.props.onCanPlayThrough(e);
      }); // When audio play starts

      audio.addEventListener('play', function (e) {
        _this2.setState({
          isPlaying: _this2.state.isPrevPlaying,
          togglePlayPause: true
        });

        _this2.setListenTrack();
        
        _this2.props.onPlay && _this2.props.onPlay(e);

      }); // When unloading the audio player (switching to another src)

      audio.addEventListener('abort', function (e) {
        _this2.clearListenTrack();

        _this2.props.onAbort && _this2.props.onAbort(e);
      }); // When the file has finished playing to the end

      audio.addEventListener('ended', function (e) {
        _this2.clearListenTrack();

        _this2.props.onEnded && _this2.props.onEnded(e);
      }); // When the user pauses playback

      audio.addEventListener('pause', function (e) {
      // console.log(e)

        _this2.clearListenTrack();

        if (!_this2.audio) return;

        _this2.setState({
          isPlaying: false,
        });

        _this2.props.onPause && _this2.props.onPause(e);
      });
      var dragX;
      slider.addEventListener('dragstart', function (e) {
        if (!_this2.audio.src) {
          return;
        }

        e.dataTransfer.setData('text', 'slider');

        if (e.dataTransfer.setDragImage) {
          var crt = slider.cloneNode(true);
          e.dataTransfer.setDragImage(crt, 0, 0);
        }

        _this2.audio.pause();

        document.addEventListener('dragover', function (event) {
          event = event || window.event;
          dragX = event.pageX;
        });
        _this2.props.onDragStart && _this2.props.onDragStart(e);

        _this2.setState({
          isDragging: true
        });
      });
      slider.addEventListener('touchstart', function (e) {
        _this2.setState({
          isDragging: true
        });

        _this2.props.onDragStart && _this2.props.onDragStart(e);
        setTimeout(function () {
          return _this2.audio.pause();
        }, 0);
      });
      slider.addEventListener('drag', function (e) {
        if (!_this2.audio.src) {
          return;
        }

        if (dragX) {
          var dragLeft = dragX - _this2.bar.getBoundingClientRect().left;

          if (dragLeft < 0) {
            dragLeft = 0;
          } else if (dragLeft > _this2.bar.offsetWidth - 20) {
            dragLeft = _this2.bar.offsetWidth - 21;
          }

          _this2.setState({
            dragLeft: dragLeft
          });

          _this2.props.onDragMove && _this2.props.onDragMove(e);
        }
      });
      slider.addEventListener('touchmove', function (e) {
        var dragLeft = e.touches[0].clientX - _this2.bar.getBoundingClientRect().left;

        if (dragLeft < 0) {
          dragLeft = 0;
        } else if (dragLeft > _this2.bar.offsetWidth - 20) {
          dragLeft = _this2.bar.offsetWidth - 21;
        }

        _this2.setState({
          dragLeft: dragLeft
        });

        _this2.props.onDragMove && _this2.props.onDragMove(e);
      });
      slider.addEventListener('dragend', function (e) {
        if (!_this2.audio.src) {
          return;
        }

        var audio = _this2.audio;
        audio.currentTime = audio.duration * _this2.state.dragLeft / (_this2.bar.offsetWidth - 20) || 0;
        audio.play();

        _this2.setState({
          isDragging: false
        });

        _this2.props.onDragEnd && _this2.props.onDragEnd(e);
      });
      slider.addEventListener('touchend', function (e) {
        _this2.setState({
          isDragging: false
        });

        _this2.props.onDragEnd && _this2.props.onDragEnd(e);
        setTimeout(function () {
          var audio = _this2.audio;
          audio.currentTime = audio.duration * _this2.state.dragLeft / (_this2.bar.offsetWidth - 20);
          audio.play();
        }, 0);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.intervalId);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var audio = this.audio;
      audio.volume = this.state.currentVolume
      
     
     
      // if (src == prevProps.src) {
      //   this.audio.pause()
      //   // this.audio.play();
      // } 
      
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          className = _this$props.className,
          volume = _this$props.volume,
          children = _this$props.children,
          hidePlayer = _this$props.hidePlayer,
          src = _this$props.src,
          preload = _this$props.preload,
          autoPlay = _this$props.autoPlay,
          _this$props$title = _this$props.title,
          title = _this$props$title === void 0 ? src : _this$props$title,
          mute = _this$props.mute,
          loop = _this$props.loop;
      var _this$state = this.state,
          currentTime = _this$state.currentTime,
          currentVolume = _this$state.currentVolume,
          duration = _this$state.duration,
          isPlaying = _this$state.isPlaying,
          dragLeft = _this$state.dragLeft;
          // console.log(isPlaying);

      var incompatibilityMessage = children || _react.default.createElement("p", null, "Your browser does not support the ", _react.default.createElement("code", null, "audio"), " element.");

      var currentTimeMin = Math.floor(currentTime / 60);
      var currentTimeSec = Math.floor(currentTime % 60);
      var durationMin = Math.floor(duration / 60);
      var durationSec = Math.floor(duration % 60);

      var addHeadingZero = function addHeadingZero(num) {
        return num > 9 ? num.toString() : "0".concat(num);
      };

      currentTimeMin = addHeadingZero(currentTimeMin);
      currentTimeSec = addHeadingZero(currentTimeSec);
      durationMin = addHeadingZero(durationMin);
      durationSec = addHeadingZero(durationSec);

      return _react.default.createElement("div", {
        style: style.audioPlayerWrapper(hidePlayer),
        className: "react-h5-audio-player ".concat(className)
      }, _react.default.createElement("div", {
        style: style.flexWrapper,
        className: "flex"
      }, _react.default.createElement("audio", {
        src: src,
        controls: false,
        title: title,
        mute: mute,
        loop: loop,
        volume: volume,
        autoPlay: autoPlay,
        preload: preload,
        ref: function ref(_ref) {
          _this3.audio = _ref;
        }
      }, incompatibilityMessage), _react.default.createElement("div", {
        className: "toggle-play-wrapper",
        style: style.togglePlayWrapper
      }, _react.default.createElement("a", {
        className: "toggle-play-button",
        onClick: function onClick(e) {
          // console.log(e.target)
          return _this3.togglePlay(e);
        },
        style: style.togglePlay
      }, isPlaying ? _react.default.createElement("img", {
        className: "pause-icons",
        style: style.pause,
        src: pause,
        alt: 'sss'

      }) : _react.default.createElement("img", {
        className: "play-icons",
        style: style.play,
        src: play,
      }))), _react.default.createElement("div", {
        className: "progress-bar-wrapper",
        style: style.progressBarWrapper
      }, _react.default.createElement("div", {
        ref: function ref(_ref2) {
          _this3.bar = _ref2;
        },
        style: style.progressBar
      }), _react.default.createElement("div", {
        className: "sought"
      }), _react.default.createElement("div", {
        className: "indicator",
        draggable: "true",
        ref: function ref(_ref3) {
          _this3.slider = _ref3;
        },
        style: style.drag(dragLeft)
      }), _react.default.createElement("div", {
        className: "audio-info",
        style: style.audioInfo
      }, _react.default.createElement("div", {
        className: "time",
        style: style.time
      }, _react.default.createElement("span", {
        className: "current-time"
      }, currentTimeMin, ":", currentTimeSec), _react.default.createElement("span", {
        className: "total-time"
      }, durationMin, ":", durationSec)), _react.default.createElement("div", {
        ref: function ref(_ref4) {
          _this3.volumeControl = _ref4;
        },
        draggable: "true",
        onDragStart: this.volumnControlDragStart,
        onDrag: this.volumnControlDrag,
        onDragOver: this.volumnControlDragOver,
        onMouseDown: this.volumnControlDrag,
        className: "volume-controls",
        style: style.volumeControl
      },
       _react.default.createElement(Slider, {
        className: "volumn",
        style: style.volume(currentVolume),
        value: _this3.state.currentVolume,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: function(currentVolume){_this3.setState({currentVolume: currentVolume})},

      }),
      
      _react.default.createElement("img", {
        src: lowVolume,
        style: style.lowVolume,
        className: 'low-volume',
        onClick: function() {_this3.setState({currentVolume: 0})}

      }), _react.default.createElement("img", {
        src: highVolume,
        style: style.highVolume,
        className: 'high-volume',
        onClick: function() {_this3.setState({currentVolume: 1})}
      })

    )))));
    }
  }]);

  return H5AudioPlayer;
}(_react.default.Component);

_defineProperty(H5AudioPlayer, "propTypes", {
  /**
   * HTML5 Audio tag autoPlay property
   */
  autoPlay: _propTypes.default.bool,

  /**
   * Display message when browser doesn't support
   */
  children: _propTypes.default.element,

  /**
   * custom classNames
   */
  className: _propTypes.default.string,

  /**
   * Set component `display` to none
   */
  hidePlayer: _propTypes.default.bool,

  /**
   * The time interval to trigger onListen
   */
  listenInterval: _propTypes.default.number,
  loop: _propTypes.default.bool,
  muted: _propTypes.default.bool,
  onAbort: _propTypes.default.func,
  onCanPlay: _propTypes.default.func,
  onCanPlayThrough: _propTypes.default.func,
  onEnded: _propTypes.default.func,
  onError: _propTypes.default.func,
  onListen: _propTypes.default.func,
  onPause: _propTypes.default.func,
  onPlay: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDragMove: _propTypes.default.func,
  onDragEnd: _propTypes.default.func,

  /**
   * HTML5 Audio tag preload property
   */
  preload: _propTypes.default.oneOf(['auto', 'metadata', 'none']),

  /**
   * Pregress indicator refresh interval
   */
  progressUpdateInterval: _propTypes.default.number,

  /**
   * HTML5 Audio tag src property
   */
  src: _propTypes.default.string,
  title: _propTypes.default.string,
  volume: _propTypes.default.number
});

_defineProperty(H5AudioPlayer, "defaultProps", {
  autoPlay: false,
  hidePlayer: false,
  listenInterval: 1000,
  loop: false,
  muted: false,
  preload: 'auto',
  progressUpdateInterval: 500,
  src: '',
  volume: 1.0
});

var _default = H5AudioPlayer;
exports.default = _default;
