<style lang="less">
.user-infor{
    height: 135px;
}
.avator-img{
    display: block;
    width: 80%;
    max-width: 100px;
    height: auto;
}
.card-user-infor-name{
    font-size: 2em;
    color: #2d8cf0;
}
.card-title{
    color: #abafbd;
}
.made-child-con-middle{
    height: 100%;
}
.to-do-list-con{
    height: 145px;
    overflow: auto;
}
.to-do-item{
    padding: 2px;
}
.infor-card-con{
    height: 100px;
}
.infor-card-icon-con{
    height: 100%;
    color: white;
    border-radius: 3px 0 0 3px;
}
.map-con{
    height: 305px;
}
.map-incon{
    height: 100%;
}
.data-source-row{
    height: 200px;
}
.line-chart-con{
    height: 150px;
}

@import '../assets/css/common.less';
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
            <Row class-name="home-page-row1" :gutter="10">
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card>
                    <Row type="flex" class="user-infor">
                        <Col span="8">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <img class="avator-img" :src="avatorPath" />
                        </Row>
                        </Col>
                        <Col span="16" style="padding-left:6px;">
                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                            <div>
                                <b class="card-user-infor-name">Admin</b>
                                <p>super admin</p>
                            </div>
                        </Row>
                        </Col>
                    </Row>
                    <div class="line-gray"></div>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">上次登录时间:</p>
                        </Col>
                        <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                    </Row>
                    <Row class="margin-top-8">
                        <Col span="8">
                        <p class="notwrap">上次登录地点:</p>
                        </Col>
                        <Col span="16" class="padding-left-8">北京</Col>
                    </Row>
                </Card>
                </Col>
                <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-checkbox-outline"></Icon>
                        待办事项
                    </p>
                    <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                        <Icon type="plus-round"></Icon>
                    </a>
                    <Modal v-model="showAddNewTodo" title="添加新的待办事项" @on-ok="addNew" @on-cancel="cancelAdd">
                        <Row type="flex" justify="center">
                            <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                        </Row>
                        <Row slot="footer">
                            <Button type="text" @click="cancelAdd">取消</Button>
                            <Button type="primary" @click="addNew">确定</Button>
                        </Row>
                    </Modal>
                    <div class="to-do-list-con">
                        <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                            <to-do-list-item :content="item.title"></to-do-list-item>
                        </div>
                    </div>
                </Card>
                </Col>
            </Row>
            </Col>
            <Col :md="24" :lg="16">
            <Row :gutter="5">
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="user_created_count" :end-val="count.createUser" iconType="android-person-add" color="#2d8cf0" intro-text="今日新增用户"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="visit_count" :end-val="count.visit" iconType="ios-eye" color="#64d572" :iconSize="50" intro-text="今日浏览量"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="collection_count" :end-val="count.collection" iconType="upload" color="#ffd572" intro-text="今日数据采集量"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                <infor-card id-name="transfer_count" :end-val="count.transfer" iconType="shuffle" color="#f25e43" intro-text="今日服务调用量"></infor-card>
                </Col>
            </Row>
            <Row>
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        今日服务调用地理分布
                    </p>
                    <div class="map-con">
                        <Col span="10">
                        <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                        </Col>
                        <Col span="14" class="map-incon">
                        <Row type="flex" justify="center" align="middle">
                            <home-map :city-data="cityData"></home-map>
                        </Row>
                        </Col>
                    </div>
                </Card>
            </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="android-map"></Icon>
                    上周每日来访量统计
                </p>
                <div class="data-source-row">
                    <visite-volume></visite-volume>
                </div>
            </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-pulse-strong"></Icon>
                    数据来源统计
                </p>
                <div class="data-source-row">
                    <data-source-pie></data-source-pie>
                </div>
            </Card>
            </Col>
            <Col :md="24" :lg="8">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="android-wifi"></Icon>
                    各类用户服务调用变化统计
                </p>
                <div class="data-source-row">
                    <user-flow></user-flow>
                </div>
            </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import cityData from '../components/home/map-data/get-city-value.js'
import homeMap from '../components/home/components/map.vue'
import dataSourcePie from '../components/home/components/dataSourcePie.vue'
import visiteVolume from '../components/home/components/visiteVolume.vue'
import serviceRequests from '../components/home/components/serviceRequests.vue'
import userFlow from '../components/home/components/userFlow.vue'
import countUp from '../components/home/components/countUp.vue'
import inforCard from '../components/home/components/inforCard.vue'
import mapDataTable from '../components/home/components/mapDataTable.vue'
import toDoListItem from '../components/home/components/toDoListItem.vue'
import util from '@/libs/util.js'

export default {
  name: 'home',
  components: {
    homeMap,
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      toDoList: [
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        }
      ],
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      cityData: cityData,
      showAddNewTodo: false,
      newToDoItemValue: ''
    }
  },
  computed: {
    avatorPath() {
      return ''
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    }
  },
  methods: {
    addNewToDoItem() {
      this.showAddNewTodo = true
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        })
        setTimeout(() => {
          this.newToDoItemValue = ''
        }, 200)
        this.showAddNewTodo = false
      } else {
        this.$Message.error('请输入待办事项内容')
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false
      this.newToDoItemValue = ''
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
    }
  },
  mounted() {
    this.$store.commit('setOpenedList')
    this.checkTag(this.$route.name)
  },
  created() {
    /**服务端渲染左侧导航条及pannel页面内容**/
    this.currentPageName = this.$route.name
    util.setCurrentPath(this, this.$route.name)
    this.$store.commit('updateMenulist')
    /**服务端渲染左侧导航条及pannel页面内容**/
  }
}
</script>
