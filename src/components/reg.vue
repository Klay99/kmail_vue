<template>
  <div>


    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">注册</h1>
    </header>
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input id='account' @change="checkUsername" v-model="username" type="text" class="mui-input-clear mui-input"
            placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' @change="checkPassword" v-model="password" type="password" class="mui-input-clear mui-input"
            placeholder="请输入密码">
        </div>
        <div class="mui-input-row">
          <label>确认</label>
          <input id='password_confirm' @change="pwIsSame" v-model="password_confirm" type="password" class="mui-input-clear mui-input"
            placeholder="请确认密码">
        </div>
        <div class="mui-input-row">
          <label>邮箱</label>
          <input id='email' @change="checkEmail" v-model="email" type="email" class="mui-input-clear mui-input"
            placeholder="请输入邮箱">
        </div>
        <div class="mui-input-row">
          <label>授权码</label>
          <input id='authCode' @change="checkAuthCode" v-model="authCode" type="authCode" class="mui-input-clear mui-input"
            placeholder="请输入授权码">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='reg' @click="reg" class="mui-btn mui-btn-block mui-btn-primary">注册</button>
      </div>
      <div class="mui-content-padded">
        <p>注册真实可用，注册成功后的用户可用于登录。</br>请输入正确的邮箱，以便于密码找回。</p>
      </div>
    </div>


  </div>


</template>

<script>
  export default {
    name: 'reg',
    data() {
      return {
        username: '',
        password: '',
        password_confirm: '',
        email: '',
        authCode: ''
      }
    },
    methods: {
      emailIsReged: function() { // 邮箱是否被注册
        var isReged = false;
        var that = this;
        this.$http('/user/getUserByEmail/' + that.email)
          .then(function(res) {
            console.log(res);
            if (res.data.code == 200) {
              that.$mui.alert('邮箱已被注册');
              that.email = '';
              isReged = true;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        return isReged
      },
      checkUsername: function() {
        // 判断用户名格式是否正确，6-12位
        console.log(this.username.length)
        if (this.username.length < 6 || this.username.length > 12) {
          this.$mui.alert('用户名长度必须是6-12位');
          return false
        }
        // 未被注册
        return true
      },
      checkPassword: function() {
        // 判断密码格式是否正确，密码必须是包含数字和字母的8到16位
        var checkpw = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/
        if (!checkpw.test(this.password)) {
          this.$mui.alert('密码必须是包含数字和字母的8到16位')
          return false
        }
        return true
      },
      pwIsSame: function() {
        if (this.password != this.password_confirm) {
          this.$mui.alert('两次密码不相同')
          this.password_confirm = ''
          return false // 不符合时不执行下面操作
        }
        return true
      },
      checkEmail: function() {
        // 判断密码格式是否正确，密码必须是包含数字和字母的8到16位
        var checkemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (!checkemail.test(this.email)) {
          this.$mui.alert('邮箱格式不正确');
          return false // 不符合时不执行下面操作
        } else if (this.emailIsReged()) {
          this.$mui.alert('邮箱已注册');
          return false; // 已被注册
        }
        return true;
      },
      checkAuthCode: function() {
        var flag = false;
        if(this.checkEmail()) {
          var that = this;
          this.$http({
            method: 'post',
            url: '/email/checkAuthCode',
            data: {
              model: {
                "authCode": that.authCode,
                "email": that.email
              }
            }
          }).then(res => {
            console.log(res);
            if(res.data.code == 200) {
              console.log('authCode可用')
              flag = true
              console.log(flag)
            }
          }).catch(function(error) {
            console.log(error);
          })
        }
        console.log("最后的结果："+flag)
        return flag
      },
      reg: function() {

        // 点击注册时判断是否有空值
        if(this.username==null || this.username==='' || this.username.length==0){
          this.$mui.alert('用户名不能为空')
          return
        }
        if(this.password==null || this.password==='' || this.password.length==0){
          this.$mui.alert('密码不能为空')
          return
        }
        if(this.password_confirm==null || this.password_confirm==='' || this.password_confirm.length==0){
          this.$mui.alert('请输入确认密码')
          return
        }
        if(this.email==null || this.email==='' || this.email.length==0){
          this.$mui.alert('邮箱不能为空')
          return
        }
        if(this.authCode==null || this.authCode==='' || this.authCode.length==0){
          this.$mui.alert('授权码不能为空')
          return
        }

        // 注册时判断用户名，密码，邮箱等格式是否符合，只有都符合时才发送ajax请求执行注册
        if (this.checkUsername() && this.checkPassword() && this.checkEmail() && this.pwIsSame() && this.checkAuthCode()) {
          console.log("\n====================come in======================")
          var that = this
          this.$http({
              method: 'post',
              url: '/user/addUser',
              data: {
                username: that.username,
                password: that.password,
                email: that.email,
                authCode: that.authCode
              }
            }).then(function(res) {
              console.log(res);
              if (res.data.code == 200) {
                that.$mui.toast('注册成功，请登录')
                that.$router.push('/user/login')
              } else {
                that.$mui.alert('注册失败，原因：' + res.data.msg)
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        }

      }
    }


  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/style.css");
  @import url("../assets/css/reg.css");
</style>
