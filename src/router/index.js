import Vue from 'vue'
import Router from 'vue-router'

import Home  from '@/components/Home'
import Testing  from '@/components/Testing'
import Blog from '@/components/Blog'
import Blogger from '@/components/Blogger'
import Article from '@/components/article/Article'
import Board from '@/components/Board'
import Contact from '@/components/Contact'
import Mood from "@/components/Mood"
import Note from "@/components/Note"
import About from "@/components/About"
import Login from '@/components/Login'

import UperCenter from "@/components/Uper"
import CreateArticle from '@/components/uper/CreateArticle'
import CreateArticleQuill from '@/components/uper/CreateArticleQuill'
import UpdateArticle from '@/components/uper/UpdateArticle'
import ManageBoard from "@/components/uper/ManageBoard"
import ManageMood from "@/components/uper/ManageMood"
import ManageNote from "@/components/uper/ManageNote"
import DataCenter from "@/components/uper/DataCenter"


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Testing',
      component:  Testing
    },
    {
      path: '/blog',
      name: 'Blog',
      component:  Blog,
    },
    {
      path: '/blog/:_id',
      name: 'Blogger',
      component:  Blogger,
    },
    {
      path: '/board',
      name: 'Board',
      component:  Board
    },
    {
      path: '/note',
      name: 'Note',
      component:  Note
    },
    {
      path: '/mood',
      name: 'Mood',
      component:  Mood
    },
    {
      path: '/contact',
      name: 'Contact',
      component:  Contact
    },
    {
      path: '/about',
      name: 'About',
      component:  About
    },
    {
      path: '/uper',
      name: 'uper-center',
      component:  UperCenter,
      beforeEnter: (to, from, next) => {
        console.log(to)
        console.log(from)
        // if(this.$store.state.logged_user !== ''){
        //   console.log('用户已经登录');
        //   next();
        // }else{
        //   console.log('用户未登录');
        //   next(false)
        // }
        next()
    }
    },
    {
      path: '/login',
      name: 'Login',
      component:  Login
    },
    {
      path: '/uper/data-center',
      name: 'data-center',
      component:  DataCenter 
    },
    {
      path: '/uper/create-article-tinymce',
      name: 'create-article-tinymce',
      component:  CreateArticle 
    },
    {
      path: '/uper/create-article-quill',
      name: 'create-article-quill',
      component:  CreateArticleQuill 
    },
    {
      path: '/uper/update-article',
      name: 'update-article',
      component:  UpdateArticle 
    },
    {
      path: '/uper/manage-board',
      name: 'manage-board',
      component:  ManageBoard 
    },
    {
      path: '/uper/manage-mood',
      name: 'manage-mood',
      component:  ManageMood 
    },
    {
      path: '/uper/manage-note',
      name: 'manage-note',
      component:  ManageNote 
    },
  ]
})
