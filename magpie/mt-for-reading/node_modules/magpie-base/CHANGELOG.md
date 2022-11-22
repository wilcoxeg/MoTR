# Changelog

## 3.4.0

### New

 - Implement PreventCopyPaste helper component
 - Implement HideCursor component

### Fixed
 - Allow setting socketURL in magpie.config.js without connecting socket in experiment
 - TextareaInput: Allow setting width and height styles
 - Fix magpie new command: Do not override package.json edits

## 3.3.0

### New

 - Experiment: Implement validateSubmission
 - Screen: Add jump labels
 - Chat: Only emit message events & add participantLabel

### Fixed

 - Built-in Screens: Fix passing through of progress prop to basic Screen component
 - Chore: Change URL magpie-refactored-2.herokuapp.com -> magpie-demo.herokuapp.com

## 3.2.0

### Fixed

 - Receive groupLabel from backend and add to results
 - Fix collaborator dropout handling

## 3.1.2

### Fixed

 - Handle dropouts in interactive experiments
 - Fix github pages builds in project templates

## 3.1.1

### Fixed

 - Socket: Do not warn when checking for socket existence
 - Socket: Implement heartbeat to avoid session timeout

## 3.1.0

### New

- Extend MultipleChoiceScreen and MultipleChoiceInput with `optionsHtml` and `randomize`

## 3.0.0
This is the first production release of magpie-base.

### New
- Create MazeInput and MazeScreen
- Create abstract serial input component
- Create 'Magpie.warning's upon unhandled rejections
- PostTestScreen: add belowHighschool education level

### Changed
- SelfPacedReading: New interface **BREAKING CHANGE**
- Rename response_timeout to responseTimeout **BREAKING CHANGE**
- Rename response_time to responseTime **BREAKING CHANGE**
- Rename responseTime to responseTimeLimit **BREAKING CHANGE**

### Fixed
- Fix showroom template
- Fix vue.config.js: Find out dynamically whether we're on github actions

## 0.6.0

### New
- Magpie new command: add --template option with 'minimal' as default
- Don't record unset props in built-in screens
- CompletionScreen: Fix result property: "completed_text" => "response"
- Allow displaying debug warnings on screen by setting $magpie.warning
- Implement i18n (set language in magpie.config.js)

### Fixes
- LifecycleScreen: Improve docs for time props
- Test and fix SelfPacedReading
- SliderRangesScreen: Fix submit button
- RatingScreen: Add test and fix submit button
- index: Expose MultipleChoiceMatrixScreen as global
- MultipleChoiceScreen: Add test and fix component
- create.js:README: Add note about updating


## 0.5.3 - 2022-02-04

### Fixes
 - Avoid reusing components across Slide and Screen boundaries
 - Fix SelfPacedReading #prep="{done}" callback
 - Fix Socket#lastIterationResults type docs

## 0.5.2 - 2022-02-02

### Fixes
- Fix iterated experiment functionality

## 0.5.3 - 2022-02-04

### Fixes
 - Avoid reusing components across Slide and Screen boundaries
 - Fix SelfPacedReading #prep="{done}" callback
 - Fix Socket#lastIterationResults type docs

## 0.5.2 - 2022-02-02

### Fixes
- Fix iterated experiment functionality

## 0.5.1 - 2022-02-02

### Fixes

- TextareaScreen: Fix button display condition

## 0.5.0

### New

 - Record component: Add global prop
 - Experiment: Add record prop for declaratively recording expData
 - Lifecycle Screen: Automatically set responseTimeout boolean if responseTime is set
 - KeypressInput: Allow hiding options

### Fixes
 - Magpie: Fall back to HTTP if submission via socket fails
 - PostTestScreen: Fix typos
 - MultipleChoiceInput: Correct test code
 - Fix spelling of 'magpie'
 - npmignore: Don't distribute template/package-lock.json
