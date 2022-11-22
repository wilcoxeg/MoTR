let webgazer;
try {
  if (!window.MAGPIE_STYLEGUIDIST) {
    webgazer = require('webgazer/src/index.mjs').default;
  }
} catch (e) {
  console.log('Optional webgazer dependency not found. Eyetracking disabled.');
}

/**
 * @class Eyetracking
 */
export default class Eyetracking {
  constructor() {
    this.time = [0];
    this.x = [0];
    this.y = [0];
    this.startTime = 0;
    this.originX = 0;
    this.originY = 0;

    this.deaf = false;
  }

  async initialize() {
    try {
      if (window.MAGPIE_STYLEGUIDIST) {
        webgazer = require('webgazer/src/index.mjs').default;
      }
    } catch (e) {
      console.log(
        'Optional webgazer dependency not found. Eyetracking disabled.'
      );
    }
    if (!webgazer) {
      throw new Error('Could not find webgazer');
    }
    webgazer.setRegression('ridge');
    webgazer.setGazeListener((data) => data && this.onGaze(data));
    return webgazer.begin();
  }

  onGaze(data) {
    if (this.deaf) {
      return;
    }
    this.time.push(Date.now() - this.startTime);
    this.x.push(data.x - this.originX);
    this.y.push(data.y - this.originY);
  }

  /**
   * (re)start eye tracking for the current screen
   *
   * @param x{Number} Relative Origin x coordinate
   * @param y{Number} Relative Origin y coordinate
   * @instance
   * @memberOf Eyetracking
   * @public
   */
  start(x, y) {
    if (x && y) {
      this.originX = x;
      this.originY = y;
    }
    this.time = [];
    this.x = [];
    this.y = [];
    this.startTime = Date.now();
    this.resume();
  }

  pause() {
    if (webgazer) {
      webgazer.pause();
    }
  }

  resume() {
    if (!webgazer) {
      throw new Error('Could not find webgazer');
    }
    webgazer.resume();
  }

  /**
   * set debugging status
   *
   * @param debugging{Boolean} Whether to display debugging information
   * @instance
   * @memberOf Eyetracking
   * @public
   */
  setDebug(debugging) {
    webgazer.showVideoPreview(debugging);
    webgazer.showPredictionPoints(debugging);
  }

  setDeaf(deaf) {
    this.deaf = deaf;
  }

  /**
   * Get the eye gaze track since the appearance of the current screen
   * @public
   * @instance
   * @memberOf Eyetracking
   * @param rate{int} Time resolution in ms (optional; defaults to 15ms)
   * @returns {{et_x: array, et_y: array, et_time: array}}
   */
  getEyeTrack(rate = 15) {
    const interpolated = {
      et_time: [],
      et_x: [],
      et_y: [],
      et_start_time: this.startTime
    };
    for (let i = 0; i < this.time.length; i++) {
      interpolated.et_time.push(this.time[i]);
      interpolated.et_x.push(this.x[i]);
      interpolated.et_y.push(this.y[i]);
      if (i < this.time.length - 1 && this.time[i + 1] - this.time[i] > rate) {
        const steps = (this.time[i + 1] - this.time[i]) / rate - 1;
        const xDelta = (this.x[i + 1] - this.x[i]) / (steps + 1);
        const yDelta = (this.y[i + 1] - this.y[i]) / (steps + 1);
        const index = interpolated.et_time.length - 1;
        for (let j = 0; j < steps; j++) {
          interpolated.et_time.push(interpolated.et_time[index + j] + rate);
          interpolated.et_x.push(
            Math.round(interpolated.et_x[index + j] + xDelta)
          );
          interpolated.et_y.push(
            Math.round(interpolated.et_y[index + j] + yDelta)
          );
        }
      }
    }
    return interpolated;
  }
}
