/**
 * @class Mousetracking
 */
export default class Mousetracking {
  constructor() {
    this.time = [0];
    this.x = [0];
    this.y = [0];
    this.startTime = 0;
    this.originX = 0;
    this.originY = 0;
  }

  onMouseMove(e) {
    this.time.push(Date.now() - this.startTime);
    this.x.push(e.clientX - this.originX);
    this.y.push(e.clientY - this.originY);
  }

  /**
   * (re)start mouse tracking for the current screen
   * @instance
   * @memberOf Mousetracking
   * @param x{Number} Relative Origin x coordinate
   * @param y{Number} Relative Origin y coordinate
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
  }

  /**
   * Get the mouse track since the appearance of the current screen
   * @public
   * @instance
   * @memberOf Mousetracking
   * @param rate{int} Time resolution in ms (optional; defaults to 15ms)
   * @returns {{mt_x: array, mt_y: array, mt_time: array}}
   */
  getMouseTrack(rate = 15) {
    const interpolated = {
      mt_time: [],
      mt_x: [],
      mt_y: [],
      mt_start_time: this.startTime
    };
    for (let i = 0; i < this.time.length; i++) {
      interpolated.mt_time.push(this.time[i]);
      interpolated.mt_x.push(this.x[i]);
      interpolated.mt_y.push(this.y[i]);
      if (i < this.time.length - 1 && this.time[i + 1] - this.time[i] > rate) {
        const steps = (this.time[i + 1] - this.time[i]) / rate - 1;
        const xDelta = (this.x[i + 1] - this.x[i]) / (steps + 1);
        const yDelta = (this.y[i + 1] - this.y[i]) / (steps + 1);
        const index = interpolated.mt_time.length - 1;
        for (let j = 0; j < steps; j++) {
          interpolated.mt_time.push(interpolated.mt_time[index + j] + rate);
          interpolated.mt_x.push(
            Math.round(interpolated.mt_x[index + j] + xDelta)
          );
          interpolated.mt_y.push(
            Math.round(interpolated.mt_y[index + j] + yDelta)
          );
        }
      }
    }
    return interpolated;
  }
}
