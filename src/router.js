import Vue from 'vue'
import VueRouter from 'vue-router'
import welcome from './views/welcome'
import poll from './views/poll'
import createPoll from './views/createPoll'
import share from './views/share'

Vue.use(VueRouter)

const routes = [
    {
        path: "/welcome",
        component: welcome,
    },
    {
        path:"/poll/:id",
        component: poll,
    },
    {
      path: "/",
      component: createPoll,
    
    },
    {
      name:"share",
      path:"/share/:id",
      component: share,
      props:true
    }
  ]
const router = new VueRouter({
  routes 
})

export default router