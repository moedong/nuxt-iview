<style lang="less">
@import '../../assets/css/common.less';
.error-page {
  &-show {
    width: 100%;
    height: 180px;
    transform: scale(0.4);
  }
  &-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  &-intro-con {
    height: 180px;
    p {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}
</style>

<template>
    <div class="error-page">
        <Row>
            <Card>
                <p slot="title">
                    <Icon :size="14" type="ios-navigate-outline"></Icon>
                    404-页面不存在
                </p>
                <Row>
                    <Col span="10">
                    <Card dis-hover>
                        <Row>
                            <div class="error-page-show">
                                <error404></error404>
                            </div>
                            <div class="error-page-cover"></div>
                        </Row>
                    </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                    <Row type="flex" align="middle" class="error-page-intro-con">
                        <p>当访问的页面不存在时会跳转到404页面，您可以在浏览器地址栏中修改url为一个不存在的路径，体验一下效果</p>
                    </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="android-lock"></Icon>
                    403-权限不足
                </p>
                <Row>
                    <Col span="10">
                    <Card dis-hover>
                        <Row>
                            <div class="error-page-show">
                                <error403></error403>
                            </div>
                            <div class="error-page-cover"></div>
                        </Row>
                    </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                    <Row type="flex" align="middle" class="error-page-intro-con">
                        <p>在当前登录用户不具有执行当前操作的权限时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为403时跳转到该页面</p>
                    </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title">
                    <Icon :size="14" type="social-freebsd-devil"></Icon>
                    500-服务端错误
                </p>
                <Row>
                    <Col span="10">
                    <Card dis-hover>
                        <Row>
                            <div class="error-page-show">
                                <error500></error500>
                            </div>
                            <div class="error-page-cover"></div>
                        </Row>
                    </Card>
                    </Col>
                    <Col span="14" class="padding-left-10">
                    <Row type="flex" align="middle" class="error-page-intro-con">
                        <p>当请求之后出现服务端错误时跳转到该页面，您可以在ajax请求方法中判断返回的状态码为500时跳转到该页面</p>
                    </Row>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>
</template>

<script>
import Error404 from '~/components/error-page/404.vue'
import Error500 from '~/components/error-page/500.vue'
import Error403 from '~/components/error-page/403.vue'
export default {
  components: {
    Error404,
    Error500,
    Error403
  }
}
</script>