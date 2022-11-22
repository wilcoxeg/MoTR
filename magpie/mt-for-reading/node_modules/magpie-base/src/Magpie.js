import EventEmitter from 'events';
import Vue from 'vue';
import Socket, { states } from './Socket';
import * as validators from '../src/validators';
import merge from 'lodash/merge';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import Mousetracking from './Mousetracking';
import packageJSON from '../package.json';
import Eyetracking from './Eyetracking';
import NoopObject from './NoopObject';

/**
 * Magpie specific vue tools exposed as $magpie
 * @class Magpie
 */
export default class Magpie extends EventEmitter {
  /**
   * Gives easy access to validators. Validation is based on [vuelidate](https://vuelidate.js.org).
   *
   *
   * | Name | Meta parameters | Description |
   * |---|---|---|
   * | required | none | Requires non-empty data. Checks for empty arrays and strings containing only whitespaces. |
   * | requiredIf | locator * | Requires non-empty data only if provided property or predicate is true. |
   * | requiredUnless | locator * | Requires non-empty data only if provided property or predicate is false. |
   * | minLength | min length | Requires the input to have a minimum specified length, inclusive. Works with arrays. |
   * | maxLength | max length | Requires the input to have a maximum specified length, inclusive. Works with arrays. |
   * | minValue | min | Requires entry to have a specified minimum numeric value or Date. |
   * | maxValue | max | Requires entry to have a specified maximum numeric value or Date. |
   * | between | min, max | Checks if a number or Date is in specified bounds. Min and max are both inclusive. |
   * | alpha | none | Accepts only alphabet characters. |
   * | alphaNum | none | Accepts only alphanumerics. |
   * | numeric | none | Accepts only numerics. |
   * | integer | none | Accepts positive and negative integers. |
   * | decimal | none | Accepts positive and negative decimal numbers. |
   * | email | none | Accepts valid email addresses. Keep in mind you still have to carefully verify it on your server, as it is impossible to tell if the address is real without sending verification email. |
   * | ipAddress | none | Accepts valid IPv4 addresses in dotted decimal notation like 127.0.0.1. |
   * | macAddress | separator=':' | Accepts valid MAC addresses like 00:ff:11:22:33:44:55. Don't forget to call it macAddress(), as it has optional parameter. You can specify your own separator instead of ':'. Provide empty separator macAddress('') to validate MAC addresses like 00ff1122334455. |
   * | sameAs | locator * | Checks for equality with a given property. |
   * | url | none | Accepts only URLs. |
   * | or | validators... | Passes when at least one of provided validators passes. |
   * | and | validators... | Passes when all of provided validators passes. |
   * | not | validator | Passes when provided validator would not pass, fails otherwise. Can be chained with other validators like not(sameAs('field')). |
   *
   *
   * \* Locator is a sibling property name.
   *
   *
   * @instance
   * @member validators
   * @memberOf Magpie
   * @type {object}
   */
  get validators() {
    return validators;
  }

  /**
   * Shorthand for $magpie.validators
   * @instance
   * @member v
   * @memberOf Magpie
   * @type {object}
   */
  get v() {
    return validators;
  }

  constructor(options) {
    super();

    this.experiment = {};

    // options

    /**
     * The ID of the experiment
     *
     * @instance
     * @member id
     * @memberOf Magpie
     * @type {string}
     */
    this.id = options.experimentId;

    /**
     * @instance
     * @member serverUrl
     * @memberOf Magpie
     * @type {string}
     */
    this.serverUrl = options.serverUrl;

    /**
     * @instance
     * @member submissionUrl
     * @memberOf Magpie
     * @type {string}
     */
    this.submissionUrl =
      this.serverUrl +
      (this.serverUrl[this.serverUrl.length - 1] === '/' ? '' : '/') +
      'api/submit_experiment/' +
      this.id;

    /**
     * @instance
     * @method validateSubmission
     * @methodOf Magpie
     * @param data{Object[]}
     * @returns {boolean}
     */
    // eslint-disable-next-line no-unused-vars
    this.validateSubmission = (data) => true;

    /**
     * @instance
     * @member submissionUrl
     * @memberOf Magpie
     * @type {string}
     */
    this.completionUrl = options.completionUrl;

    /**
     * @instance
     * @member contactEmail
     * @memberOf Magpie
     * @type {string}
     */
    this.contactEmail = options.contactEmail;
    /**
     * @instance
     * @member mode
     * @memberOf Magpie
     * @type {string}
     */
    this.mode = options.mode;
    /**
     * @instance
     * @member debug
     * @memberOf Magpie
     * @type {boolean}
     */
    this.debug = options.mode === 'debug';

    this.socketUrl = options.socketUrl;

    /**
     * @instance
     * @member socket
     * @memberOf Magpie
     * @type {Socket}
     */
    this.socket = options.socketUrl
      ? new Socket(options.experimentId, options.socketUrl, this.onSocketError)
      : NoopObject(
          () =>
            (this.warning =
              'You are making use of Socket functionality, but no socket URL is set in magpie.config.js')
        );

    this.trialData = window.magpie_trial_data = {};
    this.expData = window.magpie_exp_data = {};
    this.progress = -1;

    /**
     * @instance
     * @member mousetracking
     * @memberOf Magpie
     * @type {Mousetracking}
     */
    this.mousetracking = new Mousetracking();

    /**
     * @instance
     * @member eyetracking
     * @memberOf Magpie
     * @type {Eyetracking}
     */
    this.eyetracking = new Eyetracking();

    /**
     * The id of the current screen
     * @instance
     * @member currentScreenIndex
     * @memberOf Magpie
     * @type {number}
     */
    this.currentScreenIndex = 0;

    /**
     * The id of the current slide
     * @instance
     * @member currentSlideIndex
     * @memberOf Magpie
     * @type {number}
     */
    this.currentSlideIndex = 0;

    /**
     * The start time of the responseTime measurement
     * @instance
     * @member responseTimeStart
     * @memberOf Magpie
     * @type {number}
     */
    this.responseTimeStart = Date.now();

    /**
     * The measurements of the current screen. All data in this object
     * can be saved using $magpie.saveMeasurements
     * @instance
     * @member measurements
     * @memberOf Magpie
     * @type {object}
     */
    this.measurements = {};

    /**
     * Validation results on the current measurements
     * @instance
     * @member validateMeasurements
     * @memberOf Magpie
     * @type {object}
     */
    this.validateMeasurements = {};

    /**
     * A hash of timer start points by id
     * @instance
     * @member timers
     * @memberOf Magpie
     * @type {object}
     */
    this.timers = {};

    this.warning = null;

    // Provide debug info
    console.log('magpie ' + packageJSON.version);
    console.log('Experiment id: ' + this.id);
    console.log('Server: ' + this.serverUrl);
    console.log('Submission URL: ' + this.submissionUrl);
    console.log('Mode: ' + this.mode);
    console.log('Completion URL: ' + this.completionUrl);
    console.log('magpie_trial_data = ', this.trialData);
    console.log('magpie_exp_data = ', this.expData);

    Vue.observable(this);

    if (this.mode === 'prolific') {
      this.extractProlificData();
    }

    this.addExpData({ experiment_start_time: Date.now() });

    if (this.mode === 'debug') {
      window.onunhandledrejection = (event) => {
        this.warning = event.reason;
      };

      window.onerror = function (message) {
        this.warning = message;
      };
    }
  }

  /**
   * Go to the next slide.
   * @instance
   * @memberOf Magpie
   * @public
   * @param index{int} the index of the slide to go to (optional; default is next slide)
   */
  nextSlide(index) {
    if (typeof index === 'number') {
      this.currentSlideIndex = index;
      return;
    }
    this.currentSlideIndex++;
  }

  /**
   * Go to the next screen. (Will also reset scroll position.)
   * @instance
   * @memberOf Magpie
   * @public
   * @param index{int|String} the index or label of the screen to go to (optional; default is next screen)
   */
  nextScreen(index) {
    if (typeof index === 'number') {
      this.currentScreenIndex = index;
    } else if (typeof index === 'string') {
      const children = this.experiment.$slots.default;
      const idx = children
        .filter((c) => !!c.componentOptions)
        .findIndex((c) => c.componentOptions.propsData.label === index);
      if (idx === -1) {
        throw new Error('Could not find screen with label "' + index + '"');
      }
      this.currentScreenIndex = idx;
    } else {
      this.currentScreenIndex += 1;
    }
    this.currentSlideIndex = 0;
    this.measurements = {};
    this.currentVarsData = {};
    if (
      this.socket.state === states.CONNECTED ||
      this.socket.state === states.READY
    ) {
      this.socket.setCurrentScreen(this.currentScreenIndex);
    }
    // Start new trial data and restart response timer
    this.responseTimeStart = Date.now();
    this.experiment.scrollToTop();
    this.mousetracking.start();
    this.eyetracking.pause();
  }

  /**
   * SaveMeasurements and go to the next screen. (Will also reset scroll position.)
   * @instance
   * @memberOf Magpie
   * @public
   * @param index{int|String} the index or label of the screen to go to (optional; default is next screen)
   */
  saveAndNextScreen(index) {
    this.saveMeasurements();
    this.nextScreen(index);
  }

  /**
   * Add a result set
   * This method will automatically add a responseTime key to your data with time measured from the start of the current screen
   * @instance
   * @memberOf Magpie
   * @public
   * @param data{Object} a flat object whose data you want to add to the results
   */
  addTrialData(data) {
    if (!this.trialData[this.currentScreenIndex]) {
      this.trialData[this.currentScreenIndex] = [];
    }
    this.trialData[this.currentScreenIndex].push({
      responseTime: Date.now() - this.responseTimeStart,
      ...data
    });
  }

  /**
   * Add global facts that will be added to each result set
   * @instance
   * @memberOf Magpie
   * @public
   * @param data{Object} a flat object whose data you want to add to the facts
   */
  addExpData(data) {
    Object.assign(this.expData, data);
  }

  saveMeasurements() {
    this.addTrialData({
      responseTime: Date.now() - this.responseTimeStart,
      ...this.measurements
    });
  }

  onSocketError(er) {
    console.error(er);
  }

  /**
   * Returns an array of objects with all trial data that has been submitted so far, including experiment-wide data
   * @instance
   * @memberOf Magpie
   * @public
   * @returns {Object[]}
   */
  getAllData() {
    return flattenData({
      ...this.expData,
      experiment_end_time: Date.now(),
      experiment_duration: Date.now() - this.expData.experiment_start_time,
      ...((this.socket.state === states.CONNECTED ||
        this.socket.state === states.READY) && {
        participantId: this.socket.participantId
      }),
      ...((this.socket.state === states.CONNECTED ||
        this.socket.state === states.READY) && {
        groupLabel: this.socket.groupLabel
      }),
      trials: addEmptyColumns(
        flatten(Object.values(this.trialData)).map((o) =>
          Object.assign(
            {},
            Object.fromEntries(
              Object.entries(o).filter(
                ([, value]) => typeof value !== 'function'
              )
            )
          )
        )
      ) // clone the data
    });
  }

  /**
   * Submit all data collected so far
   * @instance
   * @memberOf Magpie
   * @returns {Promise<void>}
   */
  submit() {
    if (!this.submissionUrl) {
      throw new Error('No submission URL set');
    }
    const data = this.getAllData();
    if (!this.validateSubmission(data)) {
      throw new Error('Submission failed validation');
    }
    return this.submitResults(this.submissionUrl, data);
  }

  /**
   * Submit all data collected so far as intermediate results
   * @instance
   * @memberOf Magpie
   * @returns {Promise<void>}
   */
  submitIntermediateResults() {
    if (!this.submissionUrl) {
      throw new Error('No submission URL set');
    }
    return this.submitResults(this.submissionUrl, this.getAllData(), true);
  }

  async submitResults(submissionURL, data, intermediate) {
    if (
      this.socket.state === states.CONNECTED ||
      this.socket.state === states.READY
    ) {
      try {
        const submissionType = intermediate
          ? 'save_intermediate_results'
          : 'submit_results';

        return await new Promise((resolve, reject) =>
          this.socket.participantChannel
            .push(submissionType, {
              results: data
            })
            .receive('ok', resolve)
            .receive('error', reject)
        );
      } catch (e) {
        if (intermediate) {
          throw e;
        } else {
          console.log('Submission via magpie socket failed, trying HTTP');
        }
      }
    }

    const resp = await fetch(submissionURL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!resp.ok) {
      throw new Error('The server says: ' + (await resp.text()));
    }
  }

  /**
   * Set progress bar percentage
   * Will display a progress bar if it's not visible, yet.
   * @public
   * @instance
   * @memberOf Magpie
   * @param percentage{float} the percentage to display as a number between 0 and 1
   */
  setProgress(percentage) {
    this.progress = percentage;
  }

  extractProlificData() {
    const url = new URL(window.location);
    this.addExpData({
      prolific_pid: url.searchParams.get('PROLIFIC_PID'),
      prolific_study_id: url.searchParams.get('STUDY_ID'),
      prolific_session_id: url.searchParams.get('SESSION_ID')
    });
  }
}

// adds columns with NA values
const addEmptyColumns = function (trialData) {
  var columns = [];

  for (var i = 0; i < trialData.length; i++) {
    for (var prop in trialData[i]) {
      if (
        Object.prototype.hasOwnProperty.call(trialData[i], prop) &&
        columns.indexOf(prop) === -1
      ) {
        columns.push(prop);
      }
    }
  }

  for (var j = 0; j < trialData.length; j++) {
    for (var k = 0; k < columns.length; k++) {
      if (
        !Object.prototype.hasOwnProperty.call(trialData[j], columns[k]) ||
        typeof trialData[j] === 'undefined'
      ) {
        trialData[j][columns[k]] = 'NA';
      }
    }
  }

  return trialData;
};

const flattenData = function (data) {
  var trials = data.trials;
  delete data.trials;

  // The easiest way to avoid name clash is just to check the keys one by one and rename them if necessary.
  // Though I think it's also the user's responsibility to avoid such scenarios...
  var sample_trial = trials[0];
  for (var trial_key in sample_trial) {
    if (Object.prototype.hasOwnProperty.call(sample_trial, trial_key)) {
      if (Object.prototype.hasOwnProperty.call(data, trial_key)) {
        // Much easier to just operate it once on the data, since if we also want to operate on the trials we'd need to loop through each one of them.
        var new_data_key = 'glb_' + trial_key;
        data[new_data_key] = data[trial_key];
        delete data[trial_key];
      }
    }
  }

  return map(trials, function (t) {
    for (const key in t) {
      if (Array.isArray(t[key])) {
        // Turn arrays into strings
        t[key] = t[key].join('|');
      }
    }
    // Here the data is the general informatoin besides the trials.
    return merge(t, data);
  });
};
