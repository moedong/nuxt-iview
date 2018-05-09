<style lang="less">
    @import "./main.less";
</style>

<template>
  <div class="main">

    <div class="sidebar-menu-con">
        <no-ssr>
        <shrinkable-menu 
            :shrink="shrink"
            @on-change="handleSubmenuChange"
            :theme="menuTheme" 
            :before-push="beforePush"
            :open-names="openedSubmenuArr"
            :menu-list="menuList">
            <div slot="top" class="logo-con">
                <img v-show="!shrink"  src="../assets/images/logo.jpg" key="max-logo" />
                <img v-show="shrink" src="../assets/images/logo-min.jpg" key="min-logo" />
            </div>
        </shrinkable-menu>
        </no-ssr>
    </div>

    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
        <div class="main-header">
            <div class="navicon-con">
                <no-ssr>
                <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </Button>
                </no-ssr>
            </div>
            <div class="header-middle-con">
                <div class="main-breadcrumb">
                    <no-ssr>
                    <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </no-ssr>
                </div>
            </div>
            <div class="header-avator-con">
                <no-ssr>
                <lock-screen></lock-screen>
                </no-ssr>

                <no-ssr>
                <message-tip v-model="mesCount"></message-tip>
                </no-ssr>

                <div class="user-dropdown-menu-con">
                    <no-ssr>
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
                    </Row>
                    </no-ssr>
                </div>
            </div>
        </div>
        <div class="tags-con">
        <no-ssr>
            <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
        </no-ssr>
        </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
        <div class="single-page">
            <nuxt-child :include="cachePage" />
        </div>
    </div>

  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import a from '../components/loading.vue'
  import shrinkableMenu from '../components/main-components/shrinkable-menu/shrinkable-menu.vue';

  import tagsPageOpened from '../components/main-components/tags-page-opened.vue';
  import breadcrumbNav from '../components/main-components/breadcrumb-nav.vue';

  import lockScreen from '../components/main-components/lockscreen/lockscreen.vue';
  import messageTip from '../components/main-components/message-tip.vue';

  import scrollBar from '../components/my-components/scroll-bar/vue-scroller-bars';
  import Cookies from 'js-cookie';
  import util from '@/libs/util.js';
  
  export default {
    components: {
        shrinkableMenu,
        tagsPageOpened,
        breadcrumbNav,
        lockScreen,
        messageTip,
        scrollBar
    },
    middleware: 'auth',  //定义页面中间件
    head () {
      return {
        title: '首页'
      }
    },
    data () {
            return {
                shrink:false,
                userName: '',
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
    methods: {
        init(){
            this.$store.commit('updateMenulist');
        },
        link () {
            this.$router.push({ name: 'other' })
        },
        toggleClick () {
            this.shrink = !this.shrink;
        },
        handleClickUserDropdown (name) {
            if (name === 'ownSpace') {
                util.openNewPage(this, 'ownspace_index');
                this.$router.push({
                    name: 'ownspace_index'
                });
            } else if (name === 'loginout') {
                // 退出登录
                this.$store.commit('logout', this);
                this.$store.commit('clearOpenedSubmenu');
                this.$router.push({
                    name: 'login'
                });
            }
        },
        checkTag (name) {
            let openpageHasTag = this.pageTagsList.some(item => {
                if (item.name === name) {
                    return true;
                }
            });
            if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
            }
        },
        handleSubmenuChange (val) {
            // console.log(val)
        },
        beforePush (name) {
            // if (name === 'accesstest_index') {
            //     return false;
            // } else {
            //     return true;
            // }
            return true;
        }
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList;
        },
        pageTagsList () {
            return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
        },
        menuTheme () {
            return this.$store.state.app.menuTheme;
        },
        currentPath () {
            return this.$store.state.app.currentPath; // 当前面包屑数组
        },
        cachePage () {
            return this.$store.state.app.cachePage;
        },
        lang () {
            return this.$store.state.app.lang;
        },
        menuTheme () {
            return this.$store.state.app.menuTheme;
        },
        mesCount () {
            return this.$store.state.app.messageCount;
        }
    },
    watch: {
        openedSubmenuArr () {
            setTimeout(() => {
                this.scrollBarResize();
            }, 300);
        }
    },
    mounted () {
        this.init();
        window.addEventListener('resize', this.scrollBarResize);
    },
    created () {
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
    }
    
  }
</script>


