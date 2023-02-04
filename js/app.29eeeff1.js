(function(e){function t(t){for(var n,a,s=t[0],d=t[1],c=t[2],u=0,l=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);h&&h(t);while(l.length)l.shift()();return r.push.apply(r,c||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],n=!0,a=1;a<i.length;a++){var d=i[a];0!==o[d]&&(n=!1)}n&&(r.splice(t--,1),e=s(s.s=i[0]))}return e}var n={},o={app:0},r=[];function a(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-1335a3e6":"0cd6899b"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.e=function(e){var t=[],i=o[e];if(0!==i)if(i)t.push(i[2]);else{var n=new Promise((function(t,n){i=o[e]=[t,n]}));t.push(i[2]=n);var r,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=a(e);var c=new Error;r=function(t){d.onerror=d.onload=null,clearTimeout(u);var i=o[e];if(0!==i){if(i){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",c.name="ChunkLoadError",c.type=n,c.request=r,i[1](c)}o[e]=void 0}};var u=setTimeout((function(){r({type:"timeout",target:d})}),12e4);d.onerror=d.onload=r,document.head.appendChild(d)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/MoTR/",s.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],c=d.push.bind(d);d.push=t,d=d.slice();for(var u=0;u<d.length;u++)t(d[u]);var h=c;r.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},1:function(e,t){},2:function(e,t){},"2ec4":function(e,t,i){"use strict";i("898c")},"56d7":function(e,t,i){"use strict";i.r(t);var n=i("2b0e"),o=i("7591"),r=i.n(o),a=i("3665"),s=function(){var e=this,t=e._self._c;return t("Experiment",{attrs:{title:"Test blur text with mouse tracking "}},[t("Screen",{staticClass:"instructions",attrs:{title:"Welcome",validations:{SubjectID:{minLength:e.$magpie.v.minLength(2)}}}},[t("div",{staticStyle:{width:"40em",margin:"auto"}},[t("div",{staticStyle:{"background-color":"lightgrey",padding:"10px"}},[t("b",[e._v(" Information About this Study ")])]),t("p",[e._v(" We would like to ask you if you are willing to participate in our research project. Your participation is voluntary. Please read the text below carefully and ask the conducting person about anything you do not understand or would like to know. "),t("br"),t("br"),t("b",[e._v("What is investigated and how?")]),e._v(" You are being asked to take part in a research study being done by Ethan Wilcox, a researcher at the Swiss Federal Institute of Technology. This study will help us learn about how people read. It will take you around 20 minutes to complete. "),t("br"),t("br"),t("b",[e._v("Who can participate?")]),e._v(" You can participate only if you are an adult native speaker of English. "),t("br"),t("br"),t("b",[e._v("What am I supposed to do as a participant?")]),e._v(" If you choose to be in the study, you will use the computer mouse to read sentences in English and answer questions about them. "),t("br"),t("br"),t("b",[e._v("What are my rights during participation?")]),e._v(" Your participation in this study is voluntary. If you choose to participate, you may change your mind and leave the study at any time by closing the web page without specifying reasons and without any disadvantages. "),t("br"),t("br"),t("b",[e._v("What risks and benefits can I expect?")]),e._v(" There are no foreseeable risks for participating in this study. "),t("br"),t("br"),t("b",[e._v("Will I be compensated for participating?")]),e._v(" If you participate you will be compensated for your time following the amount specified on prolific.co. "),t("br"),t("br"),t("b",[e._v("What data is collected from me and how is it used?")]),e._v(" During this study, we will track the position of your mouse on screen. The data from this study may be presented at scientific conferences and published in scientific journals, as well as in online repositories. All data will remain anonymous. Members of the ETH Zurich Ethics Commission may access the original data for examination purposes. Strict confidentiality will be observed at any time. "),t("br"),t("br"),t("b",[e._v(" What are my rights to my personal data? ")]),e._v(" You can request information about the personal data collected from you at any time and without giving reasons. You can also request that it be rectified, handed over to you, barred for processing or erased. To do so, please contact the person indicated below. "),t("br"),t("br"),t("b",[e._v("Who funds this study?")]),e._v(" This study is funded by an ETH Postdoctoral Fellowship grant, awarded to Ethan Wilcox. "),t("br"),t("br"),t("b",[e._v(" How am I insured? ")]),e._v(" Although there are no foreseeable risks for participation, any adverse health effects that are directly caused by a study and can be demonstrated to be attributable to fault on the part of the project team or ETH Zurich are covered by ETH's liability insurance. "),t("br"),t("br"),t("b",[e._v(" Who reviewed this study? ")]),e._v(" This study was examined by the ETH Zurich Ethics Commission as proposal EK 2023-N-03 "),t("br"),t("br"),t("b",[e._v(" Complaints Office:")]),e._v(" The secretariat of the ETH Zurich Ethics Committee is available to help you with complaints in connection with your participation. Contact: ethics@sl.ethz.ch or 0041 44 632 85 72. "),t("br"),t("br"),t("b",[e._v(" General Contact: ")]),e._v(" Ethan Gotlieb Wilcox, Department of Computer Science, ETH Zurich, OAS K.20, Binzmühlestrasse 13, 8050 Zürich, Switzerland, ethan.wilcox@inf.ethz.ch "),t("br")]),t("br"),t("div",{staticStyle:{"background-color":"lightgrey",padding:"10px"}},[t("b",[e._v(" Consent Form ")])]),t("br"),e._v(" I, the participant, confirm by clicking the button below: "),t("br"),t("div",{staticStyle:{"padding-left":"30px"}},[e._v(" • I have read and understood the study information. My questions have been answered completely and to my satisfaction. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I comply with the inclusion and exclusion criteria for participation described above. I am aware of the requirements and restrictions to be observed during the study. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I have had enough time to decide about my participation. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I participate in this study voluntarily and consent that my personal data be used as described above.")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I understand that I can stop participating at any moment.")]),t("br"),t("tr",[t("td",[e._v("Please enter your Worker ID to continue: ")]),t("td",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.$magpie.measurements.SubjectID,expression:"$magpie.measurements.SubjectID"}],staticClass:"obligatory",attrs:{name:"TurkID",type:"text"},domProps:{value:e.$magpie.measurements.SubjectID},on:{input:function(t){t.target.composing||e.$set(e.$magpie.measurements,"SubjectID",t.target.value)}}})])])]),e.$magpie.measurements.SubjectID&&!e.$magpie.validateMeasurements.SubjectID.$invalid?t("div",[t("br"),e._v(" By clicking on the button below you consent to participating in this study: "),t("br"),t("br"),t("br"),t("button",{on:{click:function(t){e.$magpie.addExpData({SubjectId:e.$magpie.measurements.SubjectID}),e.$magpie.nextScreen()}}},[e._v(" Proceed ")])]):e._e()]),t("InstructionScreen",{attrs:{title:"Instruction"}},[t("p",[e._v('Please use the "Fullscreen Mode" for the duration of the experiment: '),t("a",{attrs:{href:"javascript:void(0)"},on:{click:e.turnOnFullScreen}},[e._v("Fullscreen Mode")])]),t("p",[e._v("In this study, you will read short texts and answer questions about them. However, unlike in normal reading, the texts will be blurred. In order to bring the text into focus move your mouse over it. Take as much time to read the text as you need in order to understand it. When you are done reading, answer the question at the bottom and click “next” to move on.")])]),e._l(e.trials,(function(i,n){return[t("Screen",{key:n,staticClass:"main_screen"},[t("Slide",[t("form",[t("input",{staticClass:"item_id",attrs:{type:"hidden"},domProps:{value:i.item_id}}),t("input",{staticClass:"experiment",attrs:{type:"hidden"},domProps:{value:i.experiment_id}}),t("input",{staticClass:"condition",attrs:{type:"hidden"},domProps:{value:i.condition_id}})]),t("div",{staticClass:"oval-cursor"}),t("p",{staticClass:"readingText",on:{mousemove:e.moveCursor}},[e._l(i.text.split(" "),(function(i,n){return[t("span",{key:n,class:{bold:e.currentIndex===n},attrs:{"data-index":n},on:{mouseover:function(t){return e.changeCursor(n)},mouseleave:e.changeBack}},[e._v(" "+e._s(i)+" ")])]}))],2),t("div",{staticClass:"clear-layer",staticStyle:{opacity:"0.3",filter:"blur(3.5px)",transition:"all 0.3s linear 0s"}},[e._v(" "+e._s(i.text)+" ")]),t("div",{staticStyle:{position:"absolute",bottom:"15%","text-align":"center","min-width":"-webkit-fill-available"}},[[t("form",[t("p",[e._v(e._s(i.question.replace(/ ?["]+/g,"")))]),e._l(i.response_options,(function(i,n){return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.$magpie.measurements.response,expression:"$magpie.measurements.response"}],attrs:{id:"opt_"+n,type:"radio",name:"opt"},domProps:{value:i,checked:e._q(e.$magpie.measurements.response,i)},on:{change:function(t){return e.$set(e.$magpie.measurements,"response",i)}}}),e._v(e._s(i)),t("br")]}))],2)]],2),e.$magpie.measurements.response?t("button",{on:{click:function(t){return e.$magpie.saveAndNextScreen()}}},[e._v(" Next ")]):e._e()])],1)]})),t("SubmitResultsScreen"),t("Screen",{attrs:{title:"Thanks"}},[e._v(" The study is now complete. Thank you for participating!")])],2)},d=[],c=i("69a3"),u=i.n(c),h=i("b547"),l=i.n(h),p=i("2ef0"),m=i.n(p),_=i("f858"),f=i.n(_);n["default"].use(f.a);var g={name:"App",data(){const e=m.a.shuffle(u.a),t=m.a.shuffle(l.a),i=m.a.concat(t,e),n=i.map(e=>({...e,response_options:m.a.shuffle(`${e.response_true}|${e.response_distractors}`.replace(/ ?["]+/g,"").split("|"))}));return{trials:n,currentIndex:null,mousePosition:{x:0,y:0}}},computed:{},mounted(){setInterval(this.saveData,50)},methods:{changeCursor(e){this.currentIndex=e,this.$el.querySelector(".oval-cursor").classList.add("grow")},changeBack(){this.$el.querySelector(".oval-cursor").classList.remove("grow"),this.currentIndex=null},saveData(){if(null!==this.currentIndex){const e=this.$el.querySelector(`.bold[data-index="${this.currentIndex}"]`);e&&$magpie.addTrialData({Experiment:this.$el.querySelector(".experiment").value,Condition:this.$el.querySelector(".condition").value,ItemId:this.$el.querySelector(".item_id").value,Index:this.currentIndex,Word:e.innerHTML,mousePositionX:this.mousePosition.x,mousePositionY:this.mousePosition.y,wordPositionTop:e.offsetTop,wordPositionLeft:e.offsetLeft,wordPositionBottom:e.offsetHeight+e.offsetTop,wordPositionRight:e.offsetWidth+e.offsetLeft})}},moveCursor(e){let t=e.clientX,i=e.clientY;this.$el.querySelector(".oval-cursor").style.left=t+15+"px",this.$el.querySelector(".oval-cursor").style.top=i+"px",this.mousePosition.x=t,this.mousePosition.y=i},async turnOnFullScreen(){if(!document.fullscreenElement)try{return await document.documentElement.requestFullscreen(),!0}catch(e){return!1}return!0},turnOffFullScreen(){document.exitFullscreen()},getScreenDimensions(){return{window_inner_width:window.innerWidth,window_inner_height:window.innerHeight}}}},b=g,y=(i("2ec4"),i("2877")),v=Object(y["a"])(b,s,d,!1,null,null,null),w=v.exports,x={experimentId:"1",serverUrl:"https://cui-test-3.herokuapp.com/",socketUrl:"wss://cui-test-3.herokuapp.com/socket",completionUrl:"https://...",contactEmail:"cui.ding@uzh.ch",mode:"directLink",language:"en"};n["default"].config.productionTip=!1,n["default"].use(r.a,{prefix:"Canvas"}),n["default"].use(a["a"],x),new n["default"]({render:e=>e(w)}).$mount("#app")},"69a3":function(e,t){e.exports=[{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:1,text:"The witness identified the man and his wife ran away from the police station.",question:"Did the witness run away from the police station?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:2,text:"Jenny talked to the reporter and the photographer took pictures of the scene.",question:"Did Jenny talk to the photographer?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:3,text:"The robber shot the jeweler and the salesman reported the crime to the police.",question:"Did the robber shoot the jeweler?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:4,text:"The journalist criticized Nick and Sam called the newspaper to complain.",question:"Did Sam call the newspaper?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:5,text:"Sam hired the plumber and the carpenter ordered the materials for the house.",question:"Did the carpenter order materials?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:6,text:"The police arrested the burglar and his brother phoned a lawyer for help.",question:"Was the burglar arrested?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:7,text:"The knight greeted the king and the queen waved to her people at the feast.",question:"Did the king wave to people at the feast?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_no_comma",condition_id:1,item_id:8,text:"The customer complained about the waiter and the chef gave him a free dessert.",question:"Did the customer get a free dessert?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:9,text:"The crowd cheered for the model, and the designer took a bow after the show.",question:"Did the designer take a bow?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:10,text:"The juggler entertained the children, and their parents drank wine at the party.",question:"Did the juggler drink wine?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:11,text:"The woman dressed her baby, and her son got his clothes from the dresser.",question:"Did the women dress her son?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:12,text:"Diane hugged her boyfriend, and her friend felt uncomfortable watching them.",question:"Did Diane's friend feel uncomfortable?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:13,text:"The producer replaced the actor, and the actress quit the movie after the fight.",question:"Did the producer replace the actor?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:14,text:"The audience applauded the guitarist, and the band cheered for him very loudly.",question:"Did the audience applaud the guitarist?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:15,text:"Jim listened to the pianist, and the singer watched the organist at the concert.",question:"Did the singer listen to the pianist?",response_true:"Yes",response_distractors:"No"},{experiment:"local_coherence",experiment_id:1,condition:"and_comma",condition_id:2,item_id:16,text:"The ranger gave matches to the camper, and his friend made a fire by the tent.",question:"Did the camper make a fire?",response_true:"Yes",response_distractors:"No"}]},"898c":function(e,t,i){},b547:function(e,t){e.exports=[{experiment:"provo_reading",experiment_id:2,condition:"free_reading",condition_id:1,item_id:1,text:"There are now rumblings that Apple might soon invade the smart watch space, though the company is maintaining its customary silence. The watch doesn't have a microphone or speaker, but you can use it to control the music on your phone. You can glance at the watch face to view the artist and title of a song.",question:"How do people know Apple might make a watch soon?",response_true:"Because of rumors.",response_distractors:"Because Apple made an announcement."},{experiment:"provo_reading",experiment_id:2,condition:"free_reading",condition_id:1,item_id:2,text:'Two days later, the British astronomer Richard Carrington was observing the interesting sunspot group through his telescope when he saw what he described as "two patches of intensely bright and white light" over the sunspots. He jotted a note in his painstaking record. That night there was scarcely a square inch of earth that was not illuminated by aurora.',question:"What was Richard Carrington observing?",response_true:"Spots on the sun.",response_distractors:"A far away planet."},{experiment:"provo_reading",experiment_id:2,condition:"free_reading",condition_id:1,item_id:3,text:"I agree that California's \"three strikes and you're out\" law will be a financial disaster for taxpayers who care about education and other vital services. But it's far from clear that the law can even be credited with a reduction in crime in California. While it's true that crime declined in California last year, crime also dropped nationwide.",question:"Where did crime drop last year?",response_true:"Everywhere in the United States.",response_distractors:"Only in California."},{experiment:"provo_reading",experiment_id:2,condition:"free_reading",condition_id:1,item_id:4,text:"Liza was in a bad temper, for she was mixing the Christmas puddings in the kitchen, and had been drawn from them, with a raisin still on her cheek, by Nana's absurd suspicions. She thought the best way of getting a little quiet was to take Nana to the nursery for a moment, but in custody of course.",question:"Why is Liza in a bad temper?",response_true:"Because her work is interrupted needlessly.",response_distractors:"Because the puddings are not tasty."},{experiment:"provo_reading",experiment_id:2,condition:"free_reading",condition_id:1,item_id:5,text:"Mrs. Darling quivered and went to the window. It was securely fastened. She looked out, and the night was peppered with stars. They were crowding round the house, as if curious to see what was to take place there, but she did not notice this, nor that one or two of the smaller ones winked at her.",question:"Was the window open?",response_true:"No",response_distractors:"Yes"},{experiment:"provo_reading",experiment_id:2,condition:"free_reading",condition_id:1,item_id:6,text:"Seeing Peter slowly advancing upon him through the air with dagger poised, he sprang upon the bulwarks to cast himself into the sea. He did not know that the crocodile was waiting for him; for we purposely stopped the clock that this knowledge might be spared him: a little mark of respect from us at the end.",question:"Why did the villain jump into the sea?",response_true:"He was afraid of Peter and his dagger.",response_distractors:"He couldn’t get over the bulwarks."},{experiment:"provo_reading",experiment_id:2,condition:"free_reading",condition_id:1,item_id:7,text:"Dorothy didn't know. She looked around her anxiously for some familiar landmark; but everything was strange. Between the branches of the many roads were green meadows and a few shrubs and trees, but she couldn't see the farm-house from which she had just come, or anything she had ever seen before, except the shaggy man and Toto.",question:"Where is Dorothy standing?",response_true:"At a crossroads.",response_distractors:"Near a farm-house."}]}});
//# sourceMappingURL=app.29eeeff1.js.map