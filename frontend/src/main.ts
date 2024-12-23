import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugins } from './plugins';
import mitt from 'mitt';

const app = createApp(App);

registerPlugins(app);

  // Event Emitter
  const eventEmitter = mitt();
  app.config.globalProperties.$eventEmitter = eventEmitter;

app.mount('#app');

export { eventEmitter };

