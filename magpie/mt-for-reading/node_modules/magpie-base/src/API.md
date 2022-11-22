## Classes

<dl>
<dt><a href="#Magpie">Magpie</a></dt>
<dd></dd>
<dt><a href="#Socket">Socket</a></dt>
<dd></dd>
<dt><a href="#Mousetracking">Mousetracking</a></dt>
<dd></dd>
<dt><a href="#Eyetracking">Eyetracking</a></dt>
<dd></dd>
</dl>

<a name="Magpie"></a>

## Magpie
**Kind**: global class  

* [Magpie](#Magpie)
    * [new Magpie()](#new_Magpie_new)
    * [.validators](#Magpie+validators) : <code>object</code>
    * [.v](#Magpie+v) : <code>object</code>
    * [.id](#Magpie+id) : <code>string</code>
    * [.serverUrl](#Magpie+serverUrl) : <code>string</code>
    * [.submissionUrl](#Magpie+submissionUrl) : <code>string</code>
    * [.submissionUrl](#Magpie+submissionUrl) : <code>string</code>
    * [.contactEmail](#Magpie+contactEmail) : <code>string</code>
    * [.mode](#Magpie+mode) : <code>string</code>
    * [.debug](#Magpie+debug) : <code>boolean</code>
    * [.socket](#Magpie+socket) : [<code>Socket</code>](#Socket)
    * [.mousetracking](#Magpie+mousetracking) : [<code>Mousetracking</code>](#Mousetracking)
    * [.eyetracking](#Magpie+eyetracking) : [<code>Eyetracking</code>](#Eyetracking)
    * [.currentScreenIndex](#Magpie+currentScreenIndex) : <code>number</code>
    * [.currentSlideIndex](#Magpie+currentSlideIndex) : <code>number</code>
    * [.responseTimeStart](#Magpie+responseTimeStart) : <code>number</code>
    * [.measurements](#Magpie+measurements) : <code>object</code>
    * [.validateMeasurements](#Magpie+validateMeasurements) : <code>object</code>
    * [.timers](#Magpie+timers) : <code>object</code>
    * [.nextSlide(index)](#Magpie+nextSlide)
    * [.nextScreen(index)](#Magpie+nextScreen)
    * [.saveAndNextScreen(index)](#Magpie+saveAndNextScreen)
    * [.addTrialData(data)](#Magpie+addTrialData)
    * [.addExpData(data)](#Magpie+addExpData)
    * [.getAllData()](#Magpie+getAllData) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.submit()](#Magpie+submit) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.submitIntermediateResults()](#Magpie+submitIntermediateResults) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.setProgress(percentage)](#Magpie+setProgress)

<a name="new_Magpie_new"></a>

### new Magpie()
Magpie specific vue tools exposed as $magpie

<a name="Magpie+validators"></a>

### magpie.validators : <code>object</code>
Gives easy access to validators. Validation is based on [vuelidate](https://vuelidate.js.org).


| Name | Meta parameters | Description |
|---|---|---|
| required | none | Requires non-empty data. Checks for empty arrays and strings containing only whitespaces. |
| requiredIf | locator * | Requires non-empty data only if provided property or predicate is true. |
| requiredUnless | locator * | Requires non-empty data only if provided property or predicate is false. |
| minLength | min length | Requires the input to have a minimum specified length, inclusive. Works with arrays. |
| maxLength | max length | Requires the input to have a maximum specified length, inclusive. Works with arrays. |
| minValue | min | Requires entry to have a specified minimum numeric value or Date. |
| maxValue | max | Requires entry to have a specified maximum numeric value or Date. |
| between | min, max | Checks if a number or Date is in specified bounds. Min and max are both inclusive. |
| alpha | none | Accepts only alphabet characters. |
| alphaNum | none | Accepts only alphanumerics. |
| numeric | none | Accepts only numerics. |
| integer | none | Accepts positive and negative integers. |
| decimal | none | Accepts positive and negative decimal numbers. |
| email | none | Accepts valid email addresses. Keep in mind you still have to carefully verify it on your server, as it is impossible to tell if the address is real without sending verification email. |
| ipAddress | none | Accepts valid IPv4 addresses in dotted decimal notation like 127.0.0.1. |
| macAddress | separator=':' | Accepts valid MAC addresses like 00:ff:11:22:33:44:55. Don't forget to call it macAddress(), as it has optional parameter. You can specify your own separator instead of ':'. Provide empty separator macAddress('') to validate MAC addresses like 00ff1122334455. |
| sameAs | locator * | Checks for equality with a given property. |
| url | none | Accepts only URLs. |
| or | validators... | Passes when at least one of provided validators passes. |
| and | validators... | Passes when all of provided validators passes. |
| not | validator | Passes when provided validator would not pass, fails otherwise. Can be chained with other validators like not(sameAs('field')). |


\* Locator is a sibling property name.

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+v"></a>

### magpie.v : <code>object</code>
Shorthand for $magpie.validators

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+id"></a>

### magpie.id : <code>string</code>
The ID of the experiment

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+serverUrl"></a>

### magpie.serverUrl : <code>string</code>
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+submissionUrl"></a>

### magpie.submissionUrl : <code>string</code>
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+submissionUrl"></a>

### magpie.submissionUrl : <code>string</code>
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+contactEmail"></a>

### magpie.contactEmail : <code>string</code>
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+mode"></a>

### magpie.mode : <code>string</code>
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+debug"></a>

### magpie.debug : <code>boolean</code>
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+socket"></a>

### magpie.socket : [<code>Socket</code>](#Socket)
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+mousetracking"></a>

### magpie.mousetracking : [<code>Mousetracking</code>](#Mousetracking)
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+eyetracking"></a>

### magpie.eyetracking : [<code>Eyetracking</code>](#Eyetracking)
**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+currentScreenIndex"></a>

### magpie.currentScreenIndex : <code>number</code>
The id of the current screen

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+currentSlideIndex"></a>

### magpie.currentSlideIndex : <code>number</code>
The id of the current slide

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+responseTimeStart"></a>

### magpie.responseTimeStart : <code>number</code>
The start time of the responseTime measurement

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+measurements"></a>

### magpie.measurements : <code>object</code>
The measurements of the current screen. All data in this object
can be saved using $magpie.saveMeasurements

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+validateMeasurements"></a>

### magpie.validateMeasurements : <code>object</code>
Validation results on the current measurements

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+timers"></a>

### magpie.timers : <code>object</code>
A hash of timer start points by id

**Kind**: instance property of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+nextSlide"></a>

### magpie.nextSlide(index)
Go to the next slide.

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>int</code> | the index of the slide to go to (optional; default is next slide) |

<a name="Magpie+nextScreen"></a>

### magpie.nextScreen(index)
Go to the next screen. (Will also reset scroll position.)

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>int</code> \| <code>String</code> | the index or label of the screen to go to (optional; default is next screen) |

<a name="Magpie+saveAndNextScreen"></a>

### magpie.saveAndNextScreen(index)
SaveMeasurements and go to the next screen. (Will also reset scroll position.)

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>int</code> \| <code>String</code> | the index or label of the screen to go to (optional; default is next screen) |

<a name="Magpie+addTrialData"></a>

### magpie.addTrialData(data)
Add a result set
This method will automatically add a responseTime key to your data with time measured from the start of the current screen

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | a flat object whose data you want to add to the results |

<a name="Magpie+addExpData"></a>

### magpie.addExpData(data)
Add global facts that will be added to each result set

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | a flat object whose data you want to add to the facts |

<a name="Magpie+getAllData"></a>

### magpie.getAllData() ⇒ <code>Array.&lt;Object&gt;</code>
Returns an array of objects with all trial data that has been submitted so far, including experiment-wide data

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
**Access**: public  
<a name="Magpie+submit"></a>

### magpie.submit() ⇒ <code>Promise.&lt;void&gt;</code>
Submit all data collected so far

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+submitIntermediateResults"></a>

### magpie.submitIntermediateResults() ⇒ <code>Promise.&lt;void&gt;</code>
Submit all data collected so far as intermediate results

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
<a name="Magpie+setProgress"></a>

### magpie.setProgress(percentage)
Set progress bar percentage
Will display a progress bar if it's not visible, yet.

**Kind**: instance method of [<code>Magpie</code>](#Magpie)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| percentage | <code>float</code> | the percentage to display as a number between 0 and 1 |

<a name="Socket"></a>

## Socket
**Kind**: global class  

* [Socket](#Socket)
    * [.participantId](#Socket+participantId) : <code>string</code>
    * [.experimentId](#Socket+experimentId) : <code>string</code>
    * [.participantId](#Socket+participantId) : <code>&#x27;CONNECTING&#x27;</code> \| <code>&#x27;CONNECTED&#x27;</code> \| <code>&#x27;WAITING&#x27;</code> \| <code>&#x27;READY&#x27;</code> \| <code>&#x27;ERROR&#x27;</code>
    * [.participantId](#Socket+participantId) : <code>&#x27;WAITING&#x27;</code> \| <code>&#x27;READY&#x27;</code> \| <code>&#x27;ERROR&#x27;</code>
    * [.participants](#Socket+participants) : <code>Array.&lt;string&gt;</code>
    * [.active](#Socket+active) : <code>Array.&lt;string&gt;</code>
    * [.variant](#Socket+variant) : <code>Number</code>
    * [.chain](#Socket+chain) : <code>Number</code>
    * [.generation](#Socket+generation) : <code>Number</code>
    * [.player](#Socket+player) : <code>Number</code>
    * [.groupLabel](#Socket+groupLabel) : <code>String</code>
    * [.lastIterationResults](#Socket+lastIterationResults) : <code>Array</code>
    * [.getParticipantName(id)](#Socket+getParticipantName) ⇒ <code>String</code>
    * [.getParticipantColor(id)](#Socket+getParticipantColor) ⇒ <code>String</code>
    * [.initialize()](#Socket+initialize)
    * [.broadcast(event, payload)](#Socket+broadcast)

<a name="Socket+participantId"></a>

### socket.participantId : <code>string</code>
**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+experimentId"></a>

### socket.experimentId : <code>string</code>
**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+participantId"></a>

### socket.participantId : <code>&#x27;CONNECTING&#x27;</code> \| <code>&#x27;CONNECTED&#x27;</code> \| <code>&#x27;WAITING&#x27;</code> \| <code>&#x27;READY&#x27;</code> \| <code>&#x27;ERROR&#x27;</code>
A reactive property with the state of the socket

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+participantId"></a>

### socket.participantId : <code>&#x27;WAITING&#x27;</code> \| <code>&#x27;READY&#x27;</code> \| <code>&#x27;ERROR&#x27;</code>
A reactive property with the state of the socket

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+participants"></a>

### socket.participants : <code>Array.&lt;string&gt;</code>
A reactive list of online participants

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+active"></a>

### socket.active : <code>Array.&lt;string&gt;</code>
A reactive list of participants currently active in the current screen

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+variant"></a>

### socket.variant : <code>Number</code>
The variant number of this session

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+chain"></a>

### socket.chain : <code>Number</code>
The chain number of this session

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+generation"></a>

### socket.generation : <code>Number</code>
The generation number of this session

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+player"></a>

### socket.player : <code>Number</code>
The player id of this session

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+groupLabel"></a>

### socket.groupLabel : <code>String</code>
The group id of this session

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+lastIterationResults"></a>

### socket.lastIterationResults : <code>Array</code>
The results of the last iteration

**Kind**: instance property of [<code>Socket</code>](#Socket)  
<a name="Socket+getParticipantName"></a>

### socket.getParticipantName(id) ⇒ <code>String</code>
**Kind**: instance method of [<code>Socket</code>](#Socket)  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Socket+getParticipantColor"></a>

### socket.getParticipantColor(id) ⇒ <code>String</code>
**Kind**: instance method of [<code>Socket</code>](#Socket)  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 

<a name="Socket+initialize"></a>

### socket.initialize()
Initialize the socket

**Kind**: instance method of [<code>Socket</code>](#Socket)  
<a name="Socket+broadcast"></a>

### socket.broadcast(event, payload)
**Kind**: instance method of [<code>Socket</code>](#Socket)  

| Param | Type |
| --- | --- |
| event | <code>string</code> | 
| payload |  | 

<a name="Mousetracking"></a>

## Mousetracking
**Kind**: global class  

* [Mousetracking](#Mousetracking)
    * [.start(x, y)](#Mousetracking+start)
    * [.getMouseTrack(rate)](#Mousetracking+getMouseTrack) ⇒ <code>Object</code>

<a name="Mousetracking+start"></a>

### mousetracking.start(x, y)
(re)start mouse tracking for the current screen

**Kind**: instance method of [<code>Mousetracking</code>](#Mousetracking)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | Relative Origin x coordinate |
| y | <code>Number</code> | Relative Origin y coordinate |

<a name="Mousetracking+getMouseTrack"></a>

### mousetracking.getMouseTrack(rate) ⇒ <code>Object</code>
Get the mouse track since the appearance of the current screen

**Kind**: instance method of [<code>Mousetracking</code>](#Mousetracking)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rate | <code>int</code> | <code>15</code> | Time resolution in ms (optional; defaults to 15ms) |

<a name="Eyetracking"></a>

## Eyetracking
**Kind**: global class  

* [Eyetracking](#Eyetracking)
    * [.start(x, y)](#Eyetracking+start)
    * [.setDebug(debugging)](#Eyetracking+setDebug)
    * [.getEyeTrack(rate)](#Eyetracking+getEyeTrack) ⇒ <code>Object</code>

<a name="Eyetracking+start"></a>

### eyetracking.start(x, y)
(re)start eye tracking for the current screen

**Kind**: instance method of [<code>Eyetracking</code>](#Eyetracking)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | Relative Origin x coordinate |
| y | <code>Number</code> | Relative Origin y coordinate |

<a name="Eyetracking+setDebug"></a>

### eyetracking.setDebug(debugging)
set debugging status

**Kind**: instance method of [<code>Eyetracking</code>](#Eyetracking)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| debugging | <code>Boolean</code> | Whether to display debugging information |

<a name="Eyetracking+getEyeTrack"></a>

### eyetracking.getEyeTrack(rate) ⇒ <code>Object</code>
Get the eye gaze track since the appearance of the current screen

**Kind**: instance method of [<code>Eyetracking</code>](#Eyetracking)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rate | <code>int</code> | <code>15</code> | Time resolution in ms (optional; defaults to 15ms) |

<a name="validateSubmission"></a>

## .validateSubmission(data) ⇒ <code>boolean</code>
**Kind**: instance function  
**Methodof**: Magpie  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | 

