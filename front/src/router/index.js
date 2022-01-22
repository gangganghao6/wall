import {createRouter, createWebHistory} from 'vue-router'
import NewThing from '../views/NewThing.vue'
import Wall from "@/views/Wall";
import Publish from "@/views/Publish";
import My from "@/views/My";
import Search from "@/views/Search";
import SearchResult from "@/views/SearchResult";
import Register from "@/views/Register";
import Login from "@/views/Login";
import UserData from "@/views/UserData";
import PublishNewThing from "@/views/PublishNewThing";
import ResponseNewThing from "@/views/ResponseNewThing";
import PublishWall from "@/views/PublishWall";
import ResponseWall from "@/views/ResponseWall";
import Settings from "@/views/Settings";

const routes = [
    {
        path: '/newthing',
        name: 'newthing',
        component: NewThing,
        meta: {
            title: '新鲜事'
        }
    },
    {
        path: '/wall',
        name: 'wall',
        component: Wall,
        meta: {
            title: '表白墙'
        }
    },
    {
        path: '/publish',
        name: 'publish',
        component: Publish,
        meta: {
            title: '发布'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/my',
        name: 'my',
        component: My,
        meta: {
            title: '我的'
        }
    },
    {
        path: '/searchresult',
        name: 'searchresult',
        component: SearchResult,
        meta: {
            title: '搜索结果'
        }
    },
    {
        path:'/register',
        name:'register',
        component: Register,
        meta:{
            title:'注册'
        }
    },
    {
        path:'/login',
        name:'login',
        component: Login,
        meta:{
            title:'登录'
        }
    },
    {
        path:'/my/userdata',
        name:'userdata',
        component: UserData,
        meta:{
            title:'用户资料'
        }
    },
    {
        path:'/my/publishnewthing',
        name:'publishnewthing',
        component: PublishNewThing,
        meta:{
            title:'我发布的新鲜事'
        }
    },
    {
        path:'/my/responsenewthing',
        name:'responsenewthing',
        component: ResponseNewThing,
        meta:{
            title:'我回复的新鲜事'
        }
    },
    {
        path:'/my/publishwall',
        name:'publishwall',
        component: PublishWall,
        meta:{
            title:'我发布的表白墙'
        }
    },
    {
        path:'/my/responsewall',
        name:'responsewall',
        component: ResponseWall,
        meta:{
            title:'我回复的表白墙'
        }
    },
    {
        path:'/my/settings',
        name:'settings',
        component: Settings,
        meta:{
            title:'设置'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: {
            name: 'newthing'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to) => {
    if (to.path.includes('/searchresult')) {
        document.title = to.query.searchContent + '_' + to.meta.title;
        return;
    }
    document.title = to.meta.title;

})
export default router
