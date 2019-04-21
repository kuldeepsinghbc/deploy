

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment'
import { Form, HasError, AlertError } from 'vform';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)

// import Gate from "./Gate";
// Vue.prototype.$gate = new Gate(window.user);

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import Swal from 'sweetalert2'

window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

// window.Toast = Toast;

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143,255,199)',
    failedColor: 'red',
    height:'2px'
})
let routes = [
    {path: '/dashboard', component: require('./components/Dashboard.vue').default},
    // {path: '/developer', component: require('./components/Developer.vue').default},
    {path: '/users', component: require('./components/Users.vue').default},
    {path: '/drivers', component: require('./components/Drivers.vue').default},
    {path: '/profile', component: require('./components/Profile.vue').default },
    // {path: '*', component: require('./components/NotFound.vue').default },
]

const router = new VueRouter({
    mode: 'history',
    routes
})


Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase()+text.slice(1);
});
Vue.filter('myDate', function (created) {
    return moment(created).format('MMMM Do YYYY');
})

window.Fire = new Vue();
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
// Vue.component(
//     'not-found',
//     require('./components/NotFound.vue').default
// );

const app = new Vue({
    el: '#app',
    router,
    data:{
        search: ''
    },
    methods:{
        searchit: _.debounce(() => {
            Fire.$emit('searching');
        }, 1000),
        printme() {
            window.print();
        }
    }
});
