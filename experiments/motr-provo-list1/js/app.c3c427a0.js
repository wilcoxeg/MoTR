(function(e){function t(t){for(var o,r,a=t[0],d=t[1],l=t[2],c=0,h=[];c<a.length;c++)r=a[c],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&h.push(n[r][0]),n[r]=0;for(o in d)Object.prototype.hasOwnProperty.call(d,o)&&(e[o]=d[o]);u&&u(t);while(h.length)h.shift()();return s.push.apply(s,l||[]),i()}function i(){for(var e,t=0;t<s.length;t++){for(var i=s[t],o=!0,r=1;r<i.length;r++){var d=i[r];0!==n[d]&&(o=!1)}o&&(s.splice(t--,1),e=a(a.s=i[0]))}return e}var o={},n={app:0},s=[];function r(e){return a.p+"js/"+({}[e]||e)+"."+{"chunk-1335a3e6":"0cd6899b"}[e]+".js"}function a(t){if(o[t])return o[t].exports;var i=o[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.e=function(e){var t=[],i=n[e];if(0!==i)if(i)t.push(i[2]);else{var o=new Promise((function(t,o){i=n[e]=[t,o]}));t.push(i[2]=o);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,a.nc&&d.setAttribute("nonce",a.nc),d.src=r(e);var l=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(c);var i=n[e];if(0!==i){if(i){var o=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+o+": "+s+")",l.name="ChunkLoadError",l.type=o,l.request=s,i[1](l)}n[e]=void 0}};var c=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},a.m=e,a.c=o,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(i,o,function(t){return e[t]}.bind(null,o));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/MoTR/experiments/motr-provo-list1/",a.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=t,d=d.slice();for(var c=0;c<d.length;c++)t(d[c]);var u=l;s.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},1:function(e,t){},2:function(e,t){},"4f32":function(e,t,i){"use strict";i("a48d")},"56d7":function(e,t,i){"use strict";i.r(t);var o=i("2b0e"),n=i("7591"),s=i.n(n),r=i("3665"),a=function(){var e=this,t=e._self._c;return t("Experiment",{attrs:{title:"Mouse tracking for Reading"}},[t("Screen",{staticClass:"instructions",attrs:{title:"Welcome",validations:{SubjectID:{minLength:e.$magpie.v.minLength(2)}}}},[t("div",{staticStyle:{width:"40em",margin:"auto"}},[t("div",{staticStyle:{"background-color":"lightgrey",padding:"10px"}},[t("b",[e._v(" Information About this Study ")])]),t("p",[e._v(" We would like to ask you if you are willing to participate in our research project. Your participation is voluntary. Please read the text below carefully and ask the conducting person about anything you do not understand or would like to know. "),t("br"),t("br"),t("b",[e._v("What is investigated and how?")]),e._v(" You are being asked to take part in a research study being done by Ethan Wilcox, a researcher at the Swiss Federal Institute of Technology. This study will help us learn about how people read. It will take you around 20 minutes to complete. "),t("br"),t("br"),t("b",[e._v("Who can participate?")]),e._v(" You can participate only if you are an adult native speaker of English. "),t("br"),t("br"),t("b",[e._v("What am I supposed to do as a participant?")]),e._v(" If you choose to be in the study, you will use the computer mouse to read sentences in English and answer questions about them. "),t("br"),t("br"),t("b",[e._v("What are my rights during participation?")]),e._v(" Your participation in this study is voluntary. If you choose to participate, you may change your mind and leave the study at any time by closing the web page without specifying reasons and without any disadvantages. "),t("br"),t("br"),t("b",[e._v("What risks and benefits can I expect?")]),e._v(" There are no foreseeable risks for participating in this study. "),t("br"),t("br"),t("b",[e._v("Will I be compensated for participating?")]),e._v(" If you participate you will be compensated for your time following the amount specified on prolific.co. "),t("br"),t("br"),t("b",[e._v("What data is collected from me and how is it used?")]),e._v(" During this study, we will track the position of your mouse on screen. The data from this study may be presented at scientific conferences and published in scientific journals, as well as in online repositories. All data will remain anonymous. Members of the ETH Zurich Ethics Commission may access the original data for examination purposes. Strict confidentiality will be observed at any time. "),t("br"),t("br"),t("b",[e._v(" What are my rights to my personal data? ")]),e._v(" You can request information about the personal data collected from you at any time and without giving reasons. You can also request that it be rectified, handed over to you, barred for processing or erased. To do so, please contact the person indicated below. "),t("br"),t("br"),t("b",[e._v("Who funds this study?")]),e._v(" This study is funded by an ETH Postdoctoral Fellowship grant, awarded to Ethan Wilcox. "),t("br"),t("br"),t("b",[e._v(" How am I insured? ")]),e._v(" Although there are no foreseeable risks for participation, any adverse health effects that are directly caused by a study and can be demonstrated to be attributable to fault on the part of the project team or ETH Zurich are covered by ETH's liability insurance. "),t("br"),t("br"),t("b",[e._v(" Who reviewed this study? ")]),e._v(" This study was examined by the ETH Zurich Ethics Commission as proposal EK 2023-N-03 "),t("br"),t("br"),t("b",[e._v(" Complaints Office:")]),e._v(" The secretariat of the ETH Zurich Ethics Committee is available to help you with complaints in connection with your participation. Contact: ethics@sl.ethz.ch or 0041 44 632 85 72. "),t("br"),t("br"),t("b",[e._v(" General Contact: ")]),e._v(" Ethan Gotlieb Wilcox, Department of Computer Science, ETH Zurich, OAS K.20, Binzmühlestrasse 13, 8050 Zürich, Switzerland, ethan.wilcox@inf.ethz.ch "),t("br")]),t("br"),t("div",{staticStyle:{"background-color":"lightgrey",padding:"10px"}},[t("b",[e._v(" Consent Form ")])]),t("br"),e._v(" I, the participant, confirm by clicking the button below: "),t("br"),t("div",{staticStyle:{"padding-left":"30px"}},[e._v(" • I have read and understood the study information. My questions have been answered completely and to my satisfaction. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I comply with the inclusion and exclusion criteria for participation described above. I am aware of the requirements and restrictions to be observed during the study. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I have had enough time to decide about my participation. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I participate in this study voluntarily and consent that my personal data be used as described above.")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I understand that I can stop participating at any moment.")]),t("br"),t("tr",[t("td",[e._v("Please enter your Worker ID to continue: ")]),t("td",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.$magpie.measurements.SubjectID,expression:"$magpie.measurements.SubjectID"}],staticClass:"obligatory",attrs:{name:"TurkID",type:"text"},domProps:{value:e.$magpie.measurements.SubjectID},on:{input:function(t){t.target.composing||e.$set(e.$magpie.measurements,"SubjectID",t.target.value)}}})])])]),e.$magpie.measurements.SubjectID&&!e.$magpie.validateMeasurements.SubjectID.$invalid?t("div",[t("br"),e._v(" By clicking on the button below you consent to participating in this study: "),t("br"),t("br"),t("br"),t("button",{on:{click:function(t){e.$magpie.addExpData({SubjectId:e.$magpie.measurements.SubjectID}),e.$magpie.nextScreen()}}},[e._v(" Proceed ")])]):e._e()]),t("InstructionScreen",{attrs:{title:"Instruction"}},[t("p",[e._v("In this study, you will read short texts and answer questions about them. However, unlike in normal reading, the texts will be blurred. In order to bring the text into focus move your mouse over it. Take as much time to read the text as you need in order to understand it. When you are done reading, answer the question at the bottom and click “next” to move on.")])]),e._l(e.trials,(function(i,o){return[t("Screen",{key:o,staticClass:"main_screen",attrs:{progress:o/e.trials.length}},[t("Slide",[t("form",[t("input",{staticClass:"item_id",attrs:{type:"hidden"},domProps:{value:i.item_id}}),t("input",{staticClass:"experiment_id",attrs:{type:"hidden"},domProps:{value:i.experiment_id}}),t("input",{staticClass:"condition_id",attrs:{type:"hidden"},domProps:{value:i.condition_id}})]),t("div",{staticClass:"oval-cursor"}),[e.showFirstDiv?t("div",{staticClass:"readingText",on:{mousemove:e.moveCursor,mouseleave:e.changeBack}},[e._l(i.text.split(" "),(function(i,o){return[t("span",{key:o,attrs:{"data-index":o}},[e._v(" "+e._s(i)+" ")])]}))],2):e._e(),t("div",{staticClass:"clear-layer",staticStyle:{opacity:"0.3",filter:"blur(3.5px)",transition:"all 0.3s linear 0s"}},[e._v(" "+e._s(i.text)+" ")])],e.showFirstDiv?t("button",{staticStyle:{bottom:"40%",transform:"translate(-50%, -50%)"},on:{click:e.toggleDivs}},[e._v(" Done ")]):t("div",{staticStyle:{position:"absolute",bottom:"15%","text-align":"center",width:"100%","min-width":"-webkit-fill-available"}},[[t("form",[t("div",[e._v(e._s(i.question.replace(/ ?["]+/g,"")))]),e._l(i.response_options,(function(i,o){return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.$magpie.measurements.response,expression:"$magpie.measurements.response"}],attrs:{id:"opt_"+o,type:"radio",name:"opt"},domProps:{value:i,checked:e._q(e.$magpie.measurements.response,i)},on:{change:function(t){return e.$set(e.$magpie.measurements,"response",i)}}}),e._v(e._s(i)),t("br")]}))],2)]],2),e.$magpie.measurements.response?t("button",{staticStyle:{transform:"translate(-50%, -50%)"},on:{click:function(t){e.toggleDivs(),e.$magpie.saveAndNextScreen()}}},[e._v(" Next ")]):e._e()],2)],1)]})),t("SubmitResultsScreen"),t("Screen",{attrs:{title:"Thanks"}},[e._v(" The study is now complete. Thank you for participating!")])],2)},d=[],l=i("aad3"),c=i.n(l),u=i("c483"),h=i.n(u),p=i("2ef0"),m=i.n(p),f=i("f858"),b=i.n(f);o["default"].use(b.a);var y={name:"App",data(){const e=m.a.shuffle(c.a),t=m.a.concat(h.a,e),i=t.map(e=>({...e,response_options:m.a.shuffle(`${e.response_true}|${e.response_distractors}`.replace(/ ?["]+/g,"").split("|"))}));return{trials:i,currentIndex:null,showFirstDiv:!0,mousePosition:{x:0,y:0}}},computed:{},mounted(){setInterval(this.saveData,50)},methods:{changeBack(){this.$el.querySelector(".oval-cursor").classList.remove("grow"),this.$el.querySelector(".oval-cursor").classList.remove("blank"),this.currentIndex=null},saveData(){if(null!==this.currentIndex){const e=this.$el.querySelector(`span[data-index="${this.currentIndex}"]`);e?$magpie.addTrialData({Experiment:this.$el.querySelector(".experiment_id").value,Condition:this.$el.querySelector(".condition_id").value,ItemId:this.$el.querySelector(".item_id").value,Index:this.currentIndex,Word:e.innerHTML,mousePositionX:this.mousePosition.x,mousePositionY:this.mousePosition.y,wordPositionTop:e.offsetTop,wordPositionLeft:e.offsetLeft,wordPositionBottom:e.offsetHeight+e.offsetTop,wordPositionRight:e.offsetWidth+e.offsetLeft}):$magpie.addTrialData({Experiment:this.$el.querySelector(".experiment_id").value,Condition:this.$el.querySelector(".condition_id").value,ItemId:this.$el.querySelector(".item_id").value,Index:this.currentIndex,mousePositionX:this.mousePosition.x,mousePositionY:this.mousePosition.y})}},moveCursor(e){this.$el.querySelector(".oval-cursor").classList.add("grow");let t=e.clientX,i=e.clientY;const o=document.elementFromPoint(t,i).closest("span");if(o)this.$el.querySelector(".oval-cursor").classList.remove("blank"),this.currentIndex=o.getAttribute("data-index");else{this.$el.querySelector(".oval-cursor").classList.add("blank");const e=document.elementFromPoint(t,i-3).closest("span");this.currentIndex=e?e.getAttribute("data-index"):-1}this.$el.querySelector(".oval-cursor").style.left=t+12+"px",this.$el.querySelector(".oval-cursor").style.top=i-6+"px",this.mousePosition.x=e.offsetX,this.mousePosition.y=e.offsetY},toggleDivs(){this.showFirstDiv=!this.showFirstDiv},getScreenDimensions(){return{window_inner_width:window.innerWidth,window_inner_height:window.innerHeight}}}},g=y,v=(i("4f32"),i("2877")),w=Object(v["a"])(g,a,d,!1,null,null,null),_=w.exports,x={experimentId:"2",serverUrl:"https://cui-motr-new.herokuapp.com/",socketUrl:"wss://cui-motr-new.herokuapp.com/socket",completionUrl:"https://app.prolific.co/submissions/complete?cc=C1CFXFA6",contactEmail:"cui.ding@uzh.ch",mode:"prolific",language:"en"};o["default"].config.productionTip=!1,o["default"].use(s.a,{prefix:"Canvas"}),o["default"].use(r["a"],x),new o["default"]({render:e=>e(_)}).$mount("#app")},a48d:function(e,t,i){},aad3:function(e,t){e.exports=[{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:1,text:"There are now rumblings that Apple might soon invade the smart watch space, though the company is maintaining its customary silence. The watch doesn't have a microphone or speaker, but you can use it to control the music on your phone. You can glance at the watch face to view the artist and title of a song. ",question:"Will the new watch include a microphone or speaker?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:2,text:'Two days later, the British astronomer Richard Carrington was observing the interesting sunspot group through his telescope when he saw what he described as "two patches of intensely bright and white light" over the sunspots. He jotted a note in his painstaking record. That night there was scarcely a square inch of earth that was not illuminated by aurora. ',question:"Did Richard Carrington observe moon spots?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:3,text:"I agree that California's \"three strikes and you're out\" law will be a financial disaster for taxpayers who care about education and other vital services. But it's far from clear that the law can even be credited with a reduction in crime in California. While it's true that crime declined in California last year, crime also dropped nationwide.",question:"Was the “Three Strikes Law” enacted in Arizona?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:4,text:"Liza was in a bad temper, for she was mixing the Christmas puddings in the kitchen, and had been drawn from them, with a raisin still on her cheek, by Nana's absurd suspicions. She thought the best way of getting a little quiet was to take Nana to the nursery for a moment, but in custody of course. ",question:"Was Liza preparing for Easter?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:5,text:"Mrs. Darling quivered and went to the window. It was securely fastened. She looked out, and the night was peppered with stars. They were crowding round the house, as if curious to see what was to take place there, but she did not notice this, nor that one or two of the smaller ones winked at her. ",question:"Did Mrs. Darling notice the stars outside her window? ",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:6,text:"Seeing Peter slowly advancing upon him through the air with dagger poised, he sprang upon the bulwarks to cast himself into the sea. He did not know that the crocodile was waiting for him; for we purposely stopped the clock that this knowledge might be spared him: a little mark of respect from us at the end. ",question:"Was Peter carrying a gun?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:7,text:"Dorothy didn't know. She looked around her anxiously for some familiar landmark; but everything was strange. Between the branches of the many roads were green meadows and a few shrubs and trees, but she couldn't see the farm-house from which she had just come, or anything she had ever seen before, except the shaggy man and Toto. ",question:"Did Dorothy recognize where she was?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:8,text:"The human body can tolerate only a small range of temperature, especially when the person is engaged in vigorous activity. Heat reactions usually occur when large amounts of water and/or salt are lost through excessive sweating following strenuous exercise. When the body becomes overheated and cannot eliminate this excess heat, heat exhaustion and heat stroke are possible.",question:"Does heat stroke occur when the body cannot eliminate the excess heat? ",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:9,text:"It was a forbidding challenge, and it says much for Winstanley's persuasive abilities, not to mention his self-confidence, that the admiralty agreed to fund him. No lighthouse had ever been built out to sea on an isolated rock before. The Eddystone is hard enough to avoid, but landing on it is a separate challenge entirely. ",question:"Did Winstanley plan to build a lighthouse?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:10,text:'A clergyman remarked to him, "The Lord is on our side." I am not at all concerned about that, replied Mr. Lincoln; "for I know that the Lord is always on the side of the right. But it is my constant anxiety and prayer that I and this nation should be on the Lord\'s side." ',question:"Is this passage about President Washington?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:11,text:"Known as Rapa Nui to the island's inhabitants, Rongorongo is a writing system comprised of pictographs. It has been found carved into many oblong wooden tablets and other artifacts from the island's history. The art of writing was not known in any nearby islands and the script's mere existence is sufficient to confound anthropologists. ",question:"Is Rongorongo a musical script? ",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:12,text:"Some months later, Michael Larson saw another opportunity to stack the odds in his favor with a dash of ingenuity. He walked into his bank one day and asked to withdraw his entire account balance, but with an unusual stipulation: He wanted as much of the cash as possible in one dollar notes. ",question:"Did Mr. Larson withdraw his account in one dollar notes?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:13,text:"Bob Murphy, the Senior PGA Tour money leader with seven hundred thousand, says heat shouldn't be a factor. \"I don't think you're going to have a heat wave I'm not going to be able to handle,\" he said. \"Everybody treats it differently. My son Ronnie, his caddie, and I won't be riding carts.",question:"Does Bob Murphy play golf?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:14,text:'With schools still closed, cars still buried and streets still blocked by the widespread weekend snowstorm, officials are asking people to pick up a shovel and help out. In Boston, a "snow angel" campaign is using social media to encourage neighbors and friends to be an angel and help dig out the stranded.',question:"Is this passage about the effects of a snowstorm?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:15,text:"Greg Anderson, considered a key witness by the prosecution, vowed he wouldn't testify when served a subpoena last week. His lawyers said he was prepared for a third prison stay to maintain his silence. Anderson was released July 20 after a two-week stay for previously declining to testify before a different grand jury.",question:"Did Greg Anderson resist testifying?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:16,text:"Steam sterilization is limited in the types of medical waste it can treat, but is appropriate for laboratory cultures and substances contaminated with infectious organisms. The waste is subjected to steam in a sealed, pressurized chamber. The liquid that may form is drained off to the sewer or sent for processing. ",question:"Is this passage about alcohol sterilization?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:17,text:"Owls are more flexible than humans because a bird's head is only connected by one socket pivot. People have two, which limits our ability to twist, Forsman added. Owls also have multiple vertebrae, the small bones that make up the neck and spine, helping them achieve a wide range of motion. ",question:"Are owls more flexible than humans? ",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:18,text:"Even in the same animal, not all bites are the same. A new study finds that because the force in a muscle depends on how much it is stretched, an animal's bite force depends on the size of what it is biting. The finding has direct implications for ecology and evolution.",question:"Does the study find that all bites from the same animal are the same?",response_true:"No",response_distractors:"Yes"}]},c483:function(e,t){e.exports=[{experiment:"provo",experiment_id:2,condition:"practice",condition_id:2,item_id:37,text:"John Thornton asked little of man or nature. He was unafraid of the wild. With a handful of salt and a rifle he could plunge into the wilderness and fare wherever he pleased and as long as he pleased. ",question:"Was John Thornton afraid of the wild? ",response_true:"No",response_distractors:"Yes"}]}});
//# sourceMappingURL=app.c3c427a0.js.map