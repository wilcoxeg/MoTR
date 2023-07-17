(function(e){function t(t){for(var o,s,a=t[0],d=t[1],l=t[2],c=0,h=[];c<a.length;c++)s=a[c],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&h.push(n[s][0]),n[s]=0;for(o in d)Object.prototype.hasOwnProperty.call(d,o)&&(e[o]=d[o]);u&&u(t);while(h.length)h.shift()();return r.push.apply(r,l||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],o=!0,s=1;s<i.length;s++){var d=i[s];0!==n[d]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=i[0]))}return e}var o={},n={app:0},r=[];function s(e){return a.p+"js/"+({}[e]||e)+"."+{"chunk-1335a3e6":"0cd6899b"}[e]+".js"}function a(t){if(o[t])return o[t].exports;var i=o[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.e=function(e){var t=[],i=n[e];if(0!==i)if(i)t.push(i[2]);else{var o=new Promise((function(t,o){i=n[e]=[t,o]}));t.push(i[2]=o);var r,d=document.createElement("script");d.charset="utf-8",d.timeout=120,a.nc&&d.setAttribute("nonce",a.nc),d.src=s(e);var l=new Error;r=function(t){d.onerror=d.onload=null,clearTimeout(c);var i=n[e];if(0!==i){if(i){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",l.name="ChunkLoadError",l.type=o,l.request=r,i[1](l)}n[e]=void 0}};var c=setTimeout((function(){r({type:"timeout",target:d})}),12e4);d.onerror=d.onload=r,document.head.appendChild(d)}return Promise.all(t)},a.m=e,a.c=o,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(i,o,function(t){return e[t]}.bind(null,o));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/MoTR/experiments/motr-provo-list3/",a.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=t,d=d.slice();for(var c=0;c<d.length;c++)t(d[c]);var u=l;r.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},1:function(e,t){},2:function(e,t){},4239:function(e,t,i){"use strict";i("ebeb")},"56d7":function(e,t,i){"use strict";i.r(t);var o=i("2b0e"),n=i("7591"),r=i.n(n),s=i("3665"),a=function(){var e=this,t=e._self._c;return t("Experiment",{attrs:{title:"Mouse tracking for Reading"}},[t("Screen",{staticClass:"instructions",attrs:{title:"Welcome",validations:{SubjectID:{minLength:e.$magpie.v.minLength(2)}}}},[t("div",{staticStyle:{width:"40em",margin:"auto"}},[t("div",{staticStyle:{"background-color":"lightgrey",padding:"10px"}},[t("b",[e._v(" Information About this Study ")])]),t("p",[e._v(" We would like to ask you if you are willing to participate in our research project. Your participation is voluntary. Please read the text below carefully and ask the conducting person about anything you do not understand or would like to know. "),t("br"),t("br"),t("b",[e._v("What is investigated and how?")]),e._v(" You are being asked to take part in a research study being done by Ethan Wilcox, a researcher at the Swiss Federal Institute of Technology. This study will help us learn about how people read. It will take you around 20 minutes to complete. "),t("br"),t("br"),t("b",[e._v("Who can participate?")]),e._v(" You can participate only if you are an adult native speaker of English. "),t("br"),t("br"),t("b",[e._v("What am I supposed to do as a participant?")]),e._v(" If you choose to be in the study, you will use the computer mouse to read sentences in English and answer questions about them. "),t("br"),t("br"),t("b",[e._v("What are my rights during participation?")]),e._v(" Your participation in this study is voluntary. If you choose to participate, you may change your mind and leave the study at any time by closing the web page without specifying reasons and without any disadvantages. "),t("br"),t("br"),t("b",[e._v("What risks and benefits can I expect?")]),e._v(" There are no foreseeable risks for participating in this study. "),t("br"),t("br"),t("b",[e._v("Will I be compensated for participating?")]),e._v(" If you participate you will be compensated for your time following the amount specified on prolific.co. "),t("br"),t("br"),t("b",[e._v("What data is collected from me and how is it used?")]),e._v(" During this study, we will track the position of your mouse on screen. The data from this study may be presented at scientific conferences and published in scientific journals, as well as in online repositories. All data will remain anonymous. Members of the ETH Zurich Ethics Commission may access the original data for examination purposes. Strict confidentiality will be observed at any time. "),t("br"),t("br"),t("b",[e._v(" What are my rights to my personal data? ")]),e._v(" You can request information about the personal data collected from you at any time and without giving reasons. You can also request that it be rectified, handed over to you, barred for processing or erased. To do so, please contact the person indicated below. "),t("br"),t("br"),t("b",[e._v("Who funds this study?")]),e._v(" This study is funded by an ETH Postdoctoral Fellowship grant, awarded to Ethan Wilcox. "),t("br"),t("br"),t("b",[e._v(" How am I insured? ")]),e._v(" Although there are no foreseeable risks for participation, any adverse health effects that are directly caused by a study and can be demonstrated to be attributable to fault on the part of the project team or ETH Zurich are covered by ETH's liability insurance. "),t("br"),t("br"),t("b",[e._v(" Who reviewed this study? ")]),e._v(" This study was examined by the ETH Zurich Ethics Commission as proposal EK 2023-N-03 "),t("br"),t("br"),t("b",[e._v(" Complaints Office:")]),e._v(" The secretariat of the ETH Zurich Ethics Committee is available to help you with complaints in connection with your participation. Contact: ethics@sl.ethz.ch or 0041 44 632 85 72. "),t("br"),t("br"),t("b",[e._v(" General Contact: ")]),e._v(" Ethan Gotlieb Wilcox, Department of Computer Science, ETH Zurich, OAS K.20, Binzmühlestrasse 13, 8050 Zürich, Switzerland, ethan.wilcox@inf.ethz.ch "),t("br")]),t("br"),t("div",{staticStyle:{"background-color":"lightgrey",padding:"10px"}},[t("b",[e._v(" Consent Form ")])]),t("br"),e._v(" I, the participant, confirm by clicking the button below: "),t("br"),t("div",{staticStyle:{"padding-left":"30px"}},[e._v(" • I have read and understood the study information. My questions have been answered completely and to my satisfaction. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I comply with the inclusion and exclusion criteria for participation described above. I am aware of the requirements and restrictions to be observed during the study. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I have had enough time to decide about my participation. ")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I participate in this study voluntarily and consent that my personal data be used as described above.")]),t("div",{staticStyle:{"padding-left":"30px"}},[e._v("• I understand that I can stop participating at any moment.")]),t("br"),t("tr",[t("td",[e._v("Please enter your Worker ID to continue: ")]),t("td",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.$magpie.measurements.SubjectID,expression:"$magpie.measurements.SubjectID"}],staticClass:"obligatory",attrs:{name:"TurkID",type:"text"},domProps:{value:e.$magpie.measurements.SubjectID},on:{input:function(t){t.target.composing||e.$set(e.$magpie.measurements,"SubjectID",t.target.value)}}})])])]),e.$magpie.measurements.SubjectID&&!e.$magpie.validateMeasurements.SubjectID.$invalid?t("div",[t("br"),e._v(" By clicking on the button below you consent to participating in this study: "),t("br"),t("br"),t("br"),t("button",{on:{click:function(t){e.$magpie.addExpData({SubjectId:e.$magpie.measurements.SubjectID}),e.$magpie.nextScreen()}}},[e._v(" Proceed ")])]):e._e()]),t("InstructionScreen",{attrs:{title:"Instruction"}},[t("p",[e._v("In this study, you will read short texts and answer questions about them. However, unlike in normal reading, the texts will be blurred. In order to bring the text into focus move your mouse over it. Take as much time to read the text as you need in order to understand it. When you are done reading, answer the question at the bottom and click “next” to move on.")])]),e._l(e.trials,(function(i,o){return[t("Screen",{key:o,staticClass:"main_screen",attrs:{progress:o/e.trials.length}},[t("Slide",[t("form",[t("input",{staticClass:"item_id",attrs:{type:"hidden"},domProps:{value:i.item_id}}),t("input",{staticClass:"experiment_id",attrs:{type:"hidden"},domProps:{value:i.experiment_id}}),t("input",{staticClass:"condition_id",attrs:{type:"hidden"},domProps:{value:i.condition_id}})]),t("div",{staticClass:"oval-cursor"}),[e.showFirstDiv?t("div",{staticClass:"readingText",on:{mousemove:e.moveCursor,mouseleave:e.changeBack}},[e._l(i.text.split(" "),(function(i,o){return[t("span",{key:o,attrs:{"data-index":o}},[e._v(" "+e._s(i)+" ")])]}))],2):e._e(),t("div",{staticClass:"clear-layer",staticStyle:{opacity:"0.3",filter:"blur(3.5px)",transition:"all 0.3s linear 0s"}},[e._v(" "+e._s(i.text)+" ")])],e.showFirstDiv?t("button",{staticStyle:{bottom:"40%",transform:"translate(-50%, -50%)"},on:{click:e.toggleDivs}},[e._v(" Done ")]):t("div",{staticStyle:{position:"absolute",bottom:"15%","text-align":"center",width:"100%","min-width":"-webkit-fill-available"}},[[t("form",[t("div",[e._v(e._s(i.question.replace(/ ?["]+/g,"")))]),e._l(i.response_options,(function(i,o){return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.$magpie.measurements.response,expression:"$magpie.measurements.response"}],attrs:{id:"opt_"+o,type:"radio",name:"opt"},domProps:{value:i,checked:e._q(e.$magpie.measurements.response,i)},on:{change:function(t){return e.$set(e.$magpie.measurements,"response",i)}}}),e._v(e._s(i)),t("br")]}))],2)]],2),e.$magpie.measurements.response?t("button",{staticStyle:{transform:"translate(-50%, -50%)"},on:{click:function(t){e.toggleDivs(),e.$magpie.saveAndNextScreen()}}},[e._v(" Next ")]):e._e()],2)],1)]})),t("SubmitResultsScreen"),t("Screen",{attrs:{title:"Thanks"}},[e._v(" The study is now complete. Thank you for participating!")])],2)},d=[],l=i("76ae"),c=i.n(l),u=i("c483"),h=i.n(u),p=i("2ef0"),m=i.n(p),f=i("f858"),y=i.n(f);o["default"].use(y.a);var b={name:"App",data(){const e=m.a.shuffle(c.a),t=m.a.concat(h.a,e),i=t.map(e=>({...e,response_options:m.a.shuffle(`${e.response_true}|${e.response_distractors}`.replace(/ ?["]+/g,"").split("|"))}));return{trials:i,currentIndex:null,showFirstDiv:!0,mousePosition:{x:0,y:0}}},computed:{},mounted(){setInterval(this.saveData,50)},methods:{changeBack(){this.$el.querySelector(".oval-cursor").classList.remove("grow"),this.$el.querySelector(".oval-cursor").classList.remove("blank"),this.currentIndex=null},saveData(){if(null!==this.currentIndex){const e=this.$el.querySelector(`span[data-index="${this.currentIndex}"]`);e?$magpie.addTrialData({Experiment:this.$el.querySelector(".experiment_id").value,Condition:this.$el.querySelector(".condition_id").value,ItemId:this.$el.querySelector(".item_id").value,Index:this.currentIndex,Word:e.innerHTML,mousePositionX:this.mousePosition.x,mousePositionY:this.mousePosition.y,wordPositionTop:e.offsetTop,wordPositionLeft:e.offsetLeft,wordPositionBottom:e.offsetHeight+e.offsetTop,wordPositionRight:e.offsetWidth+e.offsetLeft}):$magpie.addTrialData({Experiment:this.$el.querySelector(".experiment_id").value,Condition:this.$el.querySelector(".condition_id").value,ItemId:this.$el.querySelector(".item_id").value,Index:this.currentIndex,mousePositionX:this.mousePosition.x,mousePositionY:this.mousePosition.y})}},moveCursor(e){this.$el.querySelector(".oval-cursor").classList.add("grow");let t=e.clientX,i=e.clientY;const o=document.elementFromPoint(t,i).closest("span");if(o)this.$el.querySelector(".oval-cursor").classList.remove("blank"),this.currentIndex=o.getAttribute("data-index");else{this.$el.querySelector(".oval-cursor").classList.add("blank");const e=document.elementFromPoint(t,i-3).closest("span");this.currentIndex=e?e.getAttribute("data-index"):-1}this.$el.querySelector(".oval-cursor").style.left=t+12+"px",this.$el.querySelector(".oval-cursor").style.top=i-6+"px",this.mousePosition.x=e.offsetX,this.mousePosition.y=e.offsetY},toggleDivs(){this.showFirstDiv=!this.showFirstDiv},getScreenDimensions(){return{window_inner_width:window.innerWidth,window_inner_height:window.innerHeight}}}},v=b,g=(i("4239"),i("2877")),_=Object(g["a"])(v,a,d,!1,null,null,null),w=_.exports,x={experimentId:"4",serverUrl:"https://cui-motr-new.herokuapp.com/",socketUrl:"wss://cui-motr-new.herokuapp.com/socket",completionUrl:"https://app.prolific.co/submissions/complete?cc=CUNCPDA8",contactEmail:"cui.ding@uzh.ch",mode:"prolific",language:"en"};o["default"].config.productionTip=!1,o["default"].use(r.a,{prefix:"Canvas"}),o["default"].use(s["a"],x),new o["default"]({render:e=>e(w)}).$mount("#app")},"76ae":function(e,t){e.exports=[{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:38,text:"All that the brain has to work with are imperfect incoming electrical impulses announcing that things are happening. It is then the job of neurons to rapidly interpret these signals as well as they can, and suggest how to react.",question:"Do neurons rapidly interpret electrical signals?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:39,text:"That's because when immigrants from a particular cultural group move into a new one, they bring genetic diversity that, if the immigrants have children, get mixed around, changing the new population's gene pool. But the new population's culture doesn't necessarily change. ",question:"Is this passage about immigration law?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:40,text:"Police in Georgia have shut down a lemonade stand run by three girls trying to save up for a trip to a water park, saying they didn't have a business license or the required permits. Morningstar says police also didn't know how the lemonade was made.",question:"Did the police shut down a cookie stand?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:41,text:"Research showing that a tiny European river bug called the water boatman may be the loudest animal on earth for its size has some interesting sidebars. The insect is just two millimeters long and yet produces an underwater call that has been measured at 99.2 decibels.",question:"Does the water boatman live in Europe?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:42,text:"There often seems to be more diving in soccer than in the Summer Olympics. Phantom contact, or the slightest collision, can lead to theatrical belly flops and exaggerated somersaults by players deceptively trying to draw fouls on their opponents, kill time or catch a breather when tired.",question:"Can players in soccer be deceptive by exaggerating their falls?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:43,text:"Proper ventilation will make a backdraft less likely. Opening a room or building at the highest point allows heated gases and smoke to be released gradually. However, suddenly breaking a window or opening a door is a mistake, because it allows oxygen to rush in, causing an explosion.",question:"Can opening a door cause an explosion?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:44,text:"The first step to be taken in studying the history of our country is to form some clear and proper conception of the characteristics and condition of the territory which is now occupied by the American people, as it existed when first discovered and explored by Europeans. ",question:"Is this passage about the history of China?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:45,text:"Susan B. Anthony spent nearly sixty years of her life devoted to the cause of social justice and equality for all. Her major contributions were focused on women's rights. Her primary achievement lay in her inspiration and influence of thousands of people promoting the right of women to vote.",question:"Did Susan B. Anthony devote her life to the cause of social justice?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:46,text:"As Earth warms due to the human-caused release of heat-trapping gases into the atmosphere, frozen Arctic soils also warm, thaw and release more carbon dioxide. The added carbon dioxide accelerates Earth's warming, which further accelerates the thawing of Arctic soils and the release of even more carbon dioxide. ",question:"Will frozen Arctic soil release more carbon dioxide?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:47,text:"Unfortunately, for every six water bottles we use, only one makes it to the recycling bin. The rest are sent to landfills or, even worse, they end up as trash on the land and in rivers, lakes, and the ocean. Plastic bottles take many hundreds of years to disintegrate. ",question:"Do only one out of six water bottles get recycled in general?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:48,text:"As in the United States, Colombian legislation requires travelers entering the country to declare cash in excess of ten thousand dollars. Concealing more than that amount to transport it into or out of the country is a crime punishable by up to five years in prison in the United States.",question:"Is this passage about US-Brazil relations?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:49,text:"For centuries, time was measured by the position of the sun with the use of sundials. Noon was recognized when the sun was the highest in the sky, and cities would set their clock by this apparent solar time, even though some cities would often be on a slightly different time. ",question:"In the past, was time measured by the position of the sun using sundials? ",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:50,text:"When the new world was first discovered it was found to be, like the old, well stocked with plants and animals, and inhabited by a great many tribes and nations of men; and yet the plants and animals, if not the men, were all essentially different from those known in the old world. ",question:"Were the plants and animals the same as in the old world?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:51,text:"American industry may not know it, but debate in Congress over reforming the federal government's regulatory apparatus may profoundly improve companies' ability to survive. This week the Senate seems poised to join the House in a massive overhaul of the way in which bureaucrats enact regulations that are strangling the life out of companies.",question:"Will the new regulations affect American industry, according to the passage?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:52,text:"Stress is a risk factor for both depression and anxiety, he says. \"We don't have data on the specific causes of depression and anxiety in this sample, but it does make sense scientifically that the Millennials who report higher levels of stress in their lives are also reporting higher levels of depression and anxiety. ",question:"Is stress a risk factor for both depression and anxiety?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:53,text:"When it comes to having a lasting and fulfilling relationship, common wisdom says that feeling close to your romantic partner is paramount. But a new study finds that it's not how close you feel that matters most, it's whether you are as close as you want to be, even if that's really not close at all.",question:"Was the study about nutrition?",response_true:"No",response_distractors:"Yes"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:54,text:"At the time the French crown secured much of its revenue by issuing government bonds. In 1727, in order to save money, the state cut the bonds interest rate. The market value of these bonds plummeted, and the market became wary of French credit. The French state was left without an easy way of raising money.",question:"Did the French state cut the bonds' interest rate in 1727?",response_true:"Yes",response_distractors:"No"},{experiment:"provo",experiment_id:2,condition:"real",condition_id:1,item_id:55,text:"Voltaire himself probably won around half a million livres, a large fortune, which he then made even larger in a series of canny investments. Soon Voltaire was a very rich man, rich enough to become a moneylender to the powerful and famous, rich enough that he no longer had to stake his financial well-being on that most unreliable and detestable profession, writing.",question:"Did Voltaire become a very rich man?",response_true:"Yes",response_distractors:"No"}]},c483:function(e,t){e.exports=[{experiment:"provo",experiment_id:2,condition:"practice",condition_id:2,item_id:37,text:"John Thornton asked little of man or nature. He was unafraid of the wild. With a handful of salt and a rifle he could plunge into the wilderness and fare wherever he pleased and as long as he pleased. ",question:"Was John Thornton afraid of the wild? ",response_true:"No",response_distractors:"Yes"}]},ebeb:function(e,t,i){}});
//# sourceMappingURL=app.f3f1b10c.js.map