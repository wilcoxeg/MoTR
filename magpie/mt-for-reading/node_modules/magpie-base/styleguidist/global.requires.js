import Vue from 'vue';
import MagpieVue from '../src/index';
import VueKonva from 'vue-konva';

Vue.use(VueKonva, { prefix: 'Canvas' });

Vue.use(MagpieVue, {
  experimentId: '9',
  serverUrl: 'https://magpie-demo.herokuapp.com/',
  socketUrl: 'wss://magpie-demo.herokuapp.com/socket',
  contactEmail: 'test@random.com'
});

window.MAGPIE_STYLEGUIDIST = true
