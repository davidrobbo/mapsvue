// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Event from './Event.js'
import routes from './routes.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});
/* eslint-disable no-new */
window.App = new Vue({
  router,
  mounted(){
    var body = document.getElementsByTagName('body')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCYlHY_Ni6faIZ_cWLDhBqjpoPzG66QdCY&callback=App.initMap';
    body.appendChild(script);
  },
  methods: {
    initMap(){
      Event.$emit('loadMap', {});
    }
  }
}).$mount("#app");
