import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () =>
    import ('../views/Index.vue')
const Login = () =>
    import ('../views/Login.vue')
const List = () =>
    import ('../views/List.vue')
const Publish = () =>
    import ('../views/Publish.vue')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Index,
        children: [{
                path: '/',
                component: List
            },
            {
                path: '/publish',
                component: Publish
            }
        ]
    },
    {
        path: '/login',
        component: Login

    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.path === '/login' || token) {
        next()
    } else {
        next('/login')
    }
})

export default router