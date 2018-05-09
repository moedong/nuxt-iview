<template>
  <div class="container">
    <p class="title">数据展示!</p>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  
  export default {
    middleware: 'auth',  //定义页面中间件
    head () {
      return {
        title: '其他页面'
      }
    },
    data () {
      return {}
    },
    /*async fetch ({ store, params }) {
      let { data } = await axios.get('http://localhost:3000/')
      //console.log( data )
      store.commit('SET_LIST', [1,2,3])
    },*/
    computed: {
      ...mapState([
        // 映射 this.xxx 为 store.state.xxx
        'columns1',
        'data1'
      ])
    },
    created(){
      this.$store.commit('SET_LIST', [{
                        title: 'John Brown',
                        intro: 16,
                        time: '2016-10-03'
                    },
                    {
                        title: 'John Brown',
                        intro: 17,
                        time: '2016-10-03'
                    },
                    {
                        title: 'John Brown',
                        intro: 18,
                        time: '2016-10-03'
                    },
                    {
                        title: 'John Brown',
                        intro: 19,
                        time: '2016-10-03'
                    }])
    }
  }
</script>

