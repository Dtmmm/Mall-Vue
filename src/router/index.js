import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";
import Login from "../views/Login";
import Home from "../components/Home";
import HomePage from "../views/HomePage";
import CategoryDisplay from "../components/CategoryDisplay";
import CategoryDisplayPage from "../views/CategoryDisplayPage";
import SearchDisplay from "../components/SearchDisplay";
import SearchDisplayPage from "../views/SearchDisplayPage";
import BookDetail from "../components/BookDetail";
import BookDetailPage from "../views/BookDetailPage";
import Backstage from "../views/Backstage";
import Summary from "../components/Summary";
import BookInfo from "../components/BookInfo";
import BookSaleInfo from '../components/BookSaleInfo.vue'
import UserInfo from "../components/UserInfo";
import UserDataInfo from "../components/UserDataInfo";
import CommentManagement from "../components/CommentManagement"
import DealManagement from "../components/DealManagement";

Vue.use(VueRouter)

/*
解决 Vue 重复点击相同路由，出现
Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题
*/
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [

    // 前台系统
    {
        path: "/",
        name: "Index",
        redirect: "/Home",
        component: Index,
        children: [
            // 主页容器
            {
                path: "/HomePage",
                name: "HomePage",
                component: HomePage,
                children: [
                    // 主页
                    {
                        path: "/Home",
                        name: "Home",
                        component: Home
                    }
                ]
            },
            // 分类展示页容器
            {
                path: "/CategoryDisplayPage",
                name: "CategoryDisplayPage",
                component: CategoryDisplayPage,
                children: [
                    // 分类展示页
                    {
                        path: "/CategoryDisplay/:myArg",
                        name: "CategoryDisplay",
                        component: CategoryDisplay
                    }
                ]
            },
            // 搜索展示页容器
            {
                path: "/SearchDisplayPage",
                name: "SearchDisplayPage",
                component: SearchDisplayPage,
                children: [
                    // 搜索展示页
                    {
                        path: "/SearchDisplay",
                        name: "SearchDisplay",
                        component: SearchDisplay
                    }
                ]
            },
            // 图书详情页容器
            {
                path: "/BookDetailPage",
                name: "BookDetailPage",
                component: BookDetailPage,
                children: [
                    {
                        // 图书详情页
                        path: "/BookDetail/:id",
                        name: "BookDetail",
                        component: BookDetail
                    }
                ]
            }

        ]
    },
    // 登录
    {
        path: "/Login",
        name: "LoginPage",
        component: Login
    },
    // 后台系统
    {
        path: "/Backstage",
        name: "Backstage",
        redirect: "/Summary",
        component: Backstage,
        children: [
            // 数据总览
            {
                path: "/Summary",
                component: Summary
            },
            // 图书信息
            {
                path: "/BookInfo",
                component: BookInfo
            },
            // 图书销售情况
            {
                path: '/BookSaleInfo',
                component: BookSaleInfo
            },
            // 用户信息
            {
                path: "/UserInfo",
                component: UserInfo
            },
            // 用户消费明细
            {
                path: "/UserDataInfo",
                component: UserDataInfo
            },
            // 评论管理
            {
                path: "/CommentManagement",
                component: CommentManagement
            },
            // 订单管理
            {
                path: "/DealManagement",
                component: DealManagement
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savePosition) {
        return {x: 0, y: 0};
    }
})

export default router
