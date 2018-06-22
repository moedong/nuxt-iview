<template>
  <div id="main">
    <div class="login">
      <div class="login-form">
        <div class="login-logo">
          <span>欢迎</span>
        </div>
        <Form inline ref="loginFormRef" :model="formData" :rules="rule">
          <FormItem prop="user" class="form-item">
            <Input type="text" icon="person" v-model="formData.user" @on-enter="loginSubmit" placeholder="登录账号"></Input>
          </FormItem>
          <FormItem prop="password" class="form-item">
            <Input type="password" icon="ios-locked" v-model="formData.password" @on-enter="loginSubmit" placeholder="账户密码"></Input>
          </FormItem>
          <FormItem class="form-item" style="margin-bottom:5px;">
            <!-- <Checkbox v-model="record">记住登录</Checkbox> -->
            <!-- <a style="float:right;">忘记密码</a> -->
          </FormItem>
          <FormItem class="form-item">
            <Button class="loginBtn" type="primary" :loading="loading" @click="loginSubmit">
              登 录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from '~/libs/md5'
import axios from '~/plugins/axios2'
export default {
  layout: 'full',
  asyncData({ query }) {
    let jump = query.jump || ''
    return {
      jump: jump,
      record: false,
      loading: false,
      formData: {
        user: '',
        password: ''
      },
      rule: {
        user: [
          { required: true, message: '请填写登录账户', trigger: 'blur' },
          {
            type: 'string',
            min: 2,
            message: '登录账户最少为2个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请填写账户密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            max: 30,
            message: '账户密码必须为6~30字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    loginSubmit() {
      this.loading = true
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          this.loading = false
          this.$Message.error({
            content: '请正确填写登录账户和密码！',
            duration: 2,
            closable: true
          })
        } else {
          let _mobile = this.formData.user
          let _psd = md5(this.formData.password)
          let req = await axios.post('/api/login', {
            mobile: _mobile,
            psd: _psd
          })

          // 网络异常
          if (req.status !== 200) {
            this.$Message.error({
              content: '网络通讯异常',
              duration: 2,
              closable: true
            })
            this.loading = false
            return false
          }
          if (!!req.data && req.data.ret !== 200) {
            let msg = req.data.msg || '失败'
            this.$Message.error({ content: msg, duration: 2, closable: true })
            this.loading = false
            return false
          }
          if (!!req.data && req.data.data.code !== 0) {
            let msg = req.data.data.message || '登录失败'
            this.$Message.error({ content: msg, duration: 2, closable: true })
            this.loading = false
            return false
          }
          console.log('token', req.data.data.token)
          console.log('info', req.data.data.info)
          this.$store.commit('SET_TOKEN', req.data.data.token)
          this.$store.commit('SET_USERINFO', req.data.data.info)
          this.$store.commit('setAvator', 'https://avatars3.githubusercontent.com/u/12723410?s=460&v=4');
          this.$Message.success('恭喜您，登录成功！')
          let route = {
            path: '/'
          }
          if (this.jump !== '' && typeof this.jump !== 'undefined') {
            route.path = this.jump
          }
          setTimeout(() => {
            this.loading = false
            this.$router.push(route)
          }, 1500)
        }
      })
    }
  },
  mounted() {}
}
</script>
<style scoped>
#main {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #f8f8f9;
}

.login {
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  background: #f8f8f9;
}

.login-form {
  width: 350px;
  height: 340px;
  padding: 35px;
  -webkit-box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  background: #fff;
}

.login-logo {
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  margin-bottom: 20px;
}

.login-logo > span {
  vertical-align: text-bottom;
  font-size: 16px;
  text-transform: uppercase;
  display: inline-block;
  color: rgba(0, 0, 0, 0.65);
}

.form-item {
  width: 100%;
}

.item-input > i.ivu-input-icon {
  left: 0;
  right: auto;
}

.loginBtn {
  width: 100%;
}
</style>
