import VueI18n from 'vue-i18n';
import * as components from './components';
import * as messages from './i18n';
import NoopObject from './NoopObject';

export default function (Vue, config) {
  // Hell of hacky, sadly, but seems to work
  // i18n is not part of magpie's public API
  VueI18n.install(Vue);
  const i18n = new VueI18n({
    locale: config.language || 'en',
    fallbackLocale: 'en',
    messages
  });
  Vue.prototype._i18n = i18n;

  // universal mock to cover up that fact that magpie object is not available from start
  // will always return itself when properties are accessed except for valueOf which returns () => '' to avoid errors
  const magpie = NoopObject();

  // auto-import all components
  Vue.mixin({
    components: { ...components },

    data() {
      return {
        magpie: null
      };
    }, // casting Module to Object

    computed: {
      $magpie() {
        return this.magpie || (this.$parent && this.$parent.$magpie) || magpie;
      },
      $i18n() {
        return i18n;
      }
    },

    magpie: config,

    /**
     * Register all socket events
     */
    mounted() {
      if (this.$options.socket) {
        if (this.$magpie.socket) {
          this.$magpie.socket.setUpSubscriptions(this.$options.socket, this);
        }
      }
    },

    /**
     * unsubscribe when component unmounting
     */
    beforeDestroy() {
      if (this.$options.socket) {
        if (this.$magpie.socket) {
          this.$magpie.socket.tearDownSubscriptions(this.$options.socket);
        }
      }
    }
  });
}
