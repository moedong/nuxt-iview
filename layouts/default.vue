<style lang="less">
@import '../assets/css/main.less';
</style>

<template>
  <div id="app">
    <div class="main">
      <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
          <shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr" :accordion="accordion" :menu-list="menuList">
            <div slot="top" class="logo-con">
              <img v-show="!shrink" src="../assets/images/logo.jpg" key="max-logo" />
              <img v-show="shrink" src="../assets/images/logo-min.jpg" key="min-logo" />
            </div>
          </shrinkable-menu>
      </div>

      <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
        <div class="main-header">
          <div class="navicon-con">
            <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
            </Button>
          </div>
          <div class="header-middle-con">
            <div class="main-breadcrumb">
              <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
            </div>
          </div>
          <div class="header-avator-con">
            <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
            <lock-screen></lock-screen>
            <message-tip v-model="mesCount"></message-tip>
            <theme-switch></theme-switch>
            <div class="user-dropdown-menu-con">
              <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                  <a href="javascript:void(0)">
                    <span class="main-user-name">{{ userName }}</span>
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
              </Row>
            </div>
          </div>
        </div>
        <div class="tags-con">
          <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
        </div>
      </div>
      <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
        <div class="single-page">
          <!-- nuxt -->
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shrinkableMenu from '../components/main-components/shrinkable-menu/shrinkable-menu.vue'
import tagsPageOpened from '../components/main-components/tags-page-opened.vue'
import breadcrumbNav from '../components/main-components/breadcrumb-nav.vue'
import lockScreen from '../components/main-components/lockscreen/lockscreen.vue'
import messageTip from '../components/main-components/message-tip.vue'
import themeSwitch from '../components/main-components/theme-switch/theme-switch.vue'
import util from '@/libs/util.js'
import fullScreen from '../components/main-components/fullscreen.vue'
// 这里特别提示，登陆和退出，以及需要koa2端请求接口的，使用axios2插件
import axios from '~/plugins/axios2'

export default {
  middleware: 'auth', // 定义页面中间件
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    lockScreen,
    messageTip,
    themeSwitch,
    fullScreen
  },
  head() {
    return {
      title: '首页'
    }
  },
  data() {
    return {
      shrink: false,
      userName: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    }
  },
  methods: {
    init() {
      this.$store.commit('setAccordion', true)
      this.userName = Cookies.get('user')
      let messageCount = 3
      this.messageCount = messageCount.toString()
      this.$store.commit('setMessageCount', 3)
    },
    link() {
      this.$router.push({ name: 'other' })
    },
    toggleClick() {
      this.shrink = !this.shrink
    },
    async handleClickUserDropdown(name) {
      if (name === 'ownSpace') {
        util.openNewPage(this, 'ownspace_index')
        this.$router.push({
          name: 'ownspace_index'
        })
      } else if (name === 'loginout') {
        // 退出登录
        let req = await axios.get('/api/logout')
        if (req.data.data.code !== 0) {
          let msg = req.data.data.message || '退出失败'
          this.$Message.error({ content: msg, duration: 2, closable: true })
          return false
        }
        this.$Message.success('退出成功')
        this.$store.commit('LOGOUT')
        //window.location.href = 'login'
        this.$store
          .dispatch('LOGOUT')
          .then(() => this.$router.go({ path: 'login' }))
      }
    },
    checkTag(name) {
      // console.log('pageTagsList--------', this.pageTagsList)
      let openpageHasTag = this.pageTagsList.some(item => {
        // console.log('openpageHasTag--------', item.name)
        if (item.name === name) {
          return true
        }
      })
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        // console.log('openNewPage--------', name)
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        )
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      if (name === 'index') {
        return false
      } else {
        return true
      }
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    }
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    },
    menuTheme() {
      return this.$store.state.app.menuTheme
    },
    currentPath() {
      return this.$store.state.app.currentPath // 当前面包屑数组
    },
    avatorPath() {
      return this.$store.state.app.avatorImgPath
    },
    cachePage() {
      return this.$store.state.app.cachePage
    },
    lang() {
      return this.$store.state.app.lang
    },
    mesCount() {
      return this.$store.state.app.messageCount
    },
    accordion() {
      return this.$store.state.app.accordion
    }
  },
  watch: {
    $route(to) {
      this.$store.commit('setCurrentPageName', to.name)
      let pathArr = util.setCurrentPath(this, to.name)
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.checkTag(to.name)
      localStorage.currentPageName = to.name
      this.$store.commit('setAccordion', true)
    },
    openedSubmenuArr() {
      setTimeout(() => {
        this.scrollBarResize()
      }, 300)
    }
  },
  mounted() {
    // this.init()
    //this.$store.commit('setOpenedList')
    this.checkTag(this.$route.name)
    //刷新页面时，重新获取头像
    this.userName = this.$store.state.user.info.name
    this.$store.commit('setAvator', '')
  },
  created() {
    /**服务端渲染左侧导航条及pannel页面内容**/
    this.currentPageName = this.$route.name
    util.setCurrentPath(this, this.$route.name)
    this.$store.commit('updateMenulist')
    /**服务端渲染左侧导航条及pannel页面内容**/
  },
  dispatch() {

  }
}
</script>


