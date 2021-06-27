import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from './views/welcome'
import poll from './views/poll'
import createPoll from './views/createPoll'
import share from './views/share'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: welcome,
        name: welcome
    },
    {
        path:"/poll/:id",
        component: poll,
    },
    {
      path: "/create-poll",
      component: createPoll,
    
    },
    {
      path:"/share/:id",
      component: share
    }
  ]
const router = new VueRouter({
  routes 
})

export default router