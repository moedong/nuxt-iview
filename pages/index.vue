<template>
  <div class="main">
    <div class="search">
      <table>
        <tbody>
          <tr>
            <th>统计范围：</th>
            <td>
              <Select v-model="model1" style="width:120px" @on-change="selectType">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="model2" style="width:120px">
                <Option v-for="item in typeItems" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <th>时间：</th>
            <td>
              <RadioGroup v-model="button1" type="button" @on-change="selectTime">
                <Radio v-for="item in timeItems" :value="item.value" :key="item.value" :label="item.label"></Radio>
              </RadioGroup>
              <Col span="12">
              <DatePicker type="daterange" :value="date" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
              </Col>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="brief">
      <h1>销售简报</h1>
      <div class="ant-row">
        <div class="ant-col-3">
          <h2>线索状态</h2>
          <div class="ant-row">
            <div class="ant-col-item">
              <p>已成交</p>
              <a>5</a>
            </div>
            <div class="ant-col-item">
              <p>有意向</p>
              <a>1</a>
            </div>
            <div class="ant-col-item">
              <p>未确认</p>
              <a>2</a>
            </div>
          </div>
        </div>
        <div class="ant-col-3">
          <h2>新增线索</h2>
          <div class="ant-row">
            <div class="ant-col-item">
              <p>转线索（领取）</p>
              <span>0</span>
            </div>
            <div class="ant-col-item">
              <p>转线索（分配）</p>
              <span>0</span>
            </div>
            <div class="ant-col-item">
              <p>转线索（公海）</p>
              <span>0</span>
            </div>
          </div>
        </div>
        <div class="ant-col-3">
          <h2>线索跟进</h2>
          <div class="ant-row">
            <div class="ant-col-item">
              <p>跟进线索</p>
              <span>10</span>
            </div>
            <div class="ant-col-item">
              <p>写跟进次数</p>
              <span>5</span>
            </div>
            <div class="ant-col-item">
              <p>拜访次数</p>
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking">
      <header>
        <h1>销售排行榜</h1>
        <a href="">更多</a>
      </header>
      <div class="ranking-head">
        <RadioGroup v-model="button2" type="button" @on-change="selectRankType">
          <Radio v-for="item in rankItems" :value="item.value" :key="item.value" :label="item.label"></Radio>
        </RadioGroup>
      </div>
      <div class="rank-list">
        <Table :columns="columns1" :data="data1"></Table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return { title: '工作台' }
  },
  validate({ params }) {
    return true
    // return !isNaN(+params.id)
  },
  async asyncData({ params }) {
    // console.log(params);
    // let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    // return { title: data.title }
  },
  data() {
    return {
      typeList: [
        {
          value: '1',
          label: '按部门统计'
        },
        {
          value: '2',
          label: '按人员统计'
        }
      ],
      model1: '2',
      initModel1: '2',
      typeItems: [],
      model2: '',
      timeItems: [
        {
          value: '1',
          label: '本周'
        },
        {
          value: '2',
          label: '本月'
        }
      ],
      button1: '本周',
      date: ['2016-01-01', '2016-02-15'],
      rankItems: [
        {
          value: '1',
          label: '已成交'
        },
        {
          value: '2',
          label: '已注册'
        }
      ],
      button2: '已成交',
      columns1: [
        {
          title: '排名',
          key: 'rank',
          className: 'one'
        },
        {
          title: '销售',
          key: 'name',
          className: 'two'
        },
        {
          title: '单数',
          key: 'num',
          className: 'four'
        },
        {
          title: ' ',
          key: 'progress',
          width: 750,
          render: (h, params) => {
            // console.log(params.row)
            let tipText = params.row.name + '：' + params.row.num
            // 状态判断
            return h('div', [
              h(
                'Tooltip',
                {
                  props: {
                    content: tipText,
                    placement: 'top-start'
                  },
                  style: {
                    width: '100%'
                  }
                },
                [
                  h('Progress', {
                    props: {
                      percent: 25,
                      hideInfo: ''
                    }
                  })
                ]
              )
            ])
          }
        }
      ],
      data1: [
        {
          rank: '1',
          name: '王大锤',
          num: '34'
        },
        {
          rank: '2',
          name: '王大',
          num: '87'
        },
        {
          rank: '3',
          name: '王企鹅',
          num: '112'
        },
        {
          rank: '4',
          name: '老王',
          num: '500'
        }
      ]
    }
  },
  methods: {
    selectType(v) {
      if (this.initModel1 !== v) {
        this.typeItems.push({ value: '1', label: '陈春娜' })
        this.typeItems.push({ value: '2', label: '陈智鹏' })
        this.typeItems.push({ value: '3', label: '王大锤' })
        this.typeItems.push({ value: '4', label: '江小鱼' })
      }
    },
    selectTime(v) {
      console.log(v)
    },
    selectRankType() {},
    formatTime(time, fmt) {
      var timetemp = new Date(time)
      var o = {
        'M+': timetemp.getMonth() + 1, // 月份
        'd+': timetemp.getDate(), // 日
        'h+': timetemp.getHours(), // 小时
        'm+': timetemp.getMinutes(), // 分
        's+': timetemp.getSeconds(), // 秒
        'q+': Math.floor((timetemp.getMonth() + 3) / 3), // 季度
        S: timetemp.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (timetemp.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }
      return fmt
    }
  },
  created() {
    this.date[0] = this.formatTime(
      new Date().getTime() - 86400000,
      'yyyy-MM-dd'
    )
    this.date[1] = this.formatTime(new Date().getTime(), 'yyyy-MM-dd')
  }
}
</script>
<style lang="less" scoped>
.search {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  table {
    width: 100%;
    border: 1px solid #e9e9e9;
    border-collapse: collapse;
  }
  table tr {
    border-bottom: 1px solid #e9e9e9;
  }
  table tr:last-child {
    border-bottom: none;
  }
  table th {
    width: 14%;
    min-width: 150px;
    padding-right: 30px;
    vertical-align: middle;
    line-height: 50px;
    text-align: right;
    font-weight: 400;
    color: #919191;
    background-color: #f7f7f7;
  }
  table td {
    padding: 0 50px;
    vertical-align: middle;
  }
  table td > * {
    margin-right: 10px;
  }
  .ivu-col-span-12 {
    width: auto;
    display: inline-block;
    float: none;
  }
}

.brief {
  background-color: #fff;
  padding: 20px;
  margin: 14px 14px 0;
  overflow: hidden;
  h1 {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 15px;
  }
  h2 {
    font-size: 13px;
    color: #919191;
    margin-bottom: 10px;
  }
  .ant-col-3 {
    display: block;
    width: 33.33333333%;
    float: left;
    flex: 0 0 auto;
    &:not(:first-child) {
      padding-left: 20px;
      border-left: 1px solid #e9e9e9;
    }
    .ant-row {
      position: relative;
      margin-left: 0;
      margin-right: 0;
      height: auto;
      zoom: 1;
      display: block;
      p {
        margin-bottom: 12px;
      }
      a {
        margin-bottom: 10px;
        font-size: 28px;
        color: #08f;
        &:hover {
          color: #3da4ff;
        }
      }
      span {
        margin-bottom: 10px;
        font-size: 28px;
        color: #919191;
      }
    }
    .ant-col-item {
      display: block;
      width: 33.33333333%;
      float: left;
      flex: 0 0 auto;
    }
  }
}

.ranking {
  background-color: #fff;
  padding: 20px;
  margin: 14px 14px 0;
  overflow: hidden;
  header {
    margin-bottom: 20px;
    position: relative;
    a {
      position: absolute;
      right: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    h1 {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    h2 {
      font-size: 13px;
      color: #919191;
      margin-bottom: 10px;
    }
  }
  .rank-list {
    padding-top: 20px;
    width: 100%;
    position: relative;
    & /deep/ .ivu-tooltip-rel {
      width: 100%;
    }
    & /deep/ .ivu-progress-inner {
      background: none;
    }
  }
}
</style>
