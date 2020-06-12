<template>
  <div id="userCenter">
    <header class="mui-bar mui-bar-nav" style="background-color: #007AFF;">
      <a @tap="toHome()" class="mui-icon mui-icon-left-nav" style="color: white;float: left;"></a>
      <div style="float: left;height: 44px;min-width: 200px;max-width: 300px;margin-left: 5px;line-height: 44px;overflow: hidden;text-overflow: ellipsis;">
        <span style="float: left;color: white;">{{userInfo.email}}</span>
      </div>
    </header>
    <div class="mui-content">
      <div class="mui-card" style="margin: 5px 5px 0px 5px;">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <a @tap="toHeadImg(userInfo)" class="mui-navigate-right" style="height: 72px;">
              <span style="float: left;margin-top: 11.2px;"><h4 style="font-weight: normal;">头像</h4></span>
              <img v-if="userInfo.headImg == null || userInfo.headImg == '' || userInfo.headImg.length == 0" class="round_icon" src="../assets/images/headImg.jpeg">
              <img v-if="userInfo.headImg != null && userInfo.headImg != '' && userInfo.headImg.length != 0" class="round_icon" :src="userInfo.headImg">
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a @tap="changeName(userInfo.username)" class="mui-navigate-right" style="height: 50px;">
              <span style="float: left;"><h4 style="font-weight: normal;">用户名</h4></span>
              <span style="color: gray;float: right;margin-right: 25px;"><h4 style="font-weight: normal;">{{userInfo.username}}</h4></span>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a @tap="changePassword(userInfo.password)" class="mui-navigate-right" style="height: 50px;">
              <span style="float: left;"><h4 style="font-weight: normal;">密码</h4></span>
              <span style="color: gray;float: right;margin-right: 25px;"><h4 style="font-weight: normal;">{{userInfo.password | castToPass}}</h4></span>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right" style="height: 50px;">
              <span style="float: left;"><h4 style="font-weight: normal;">邮箱</h4></span>
              <span style="color: gray;float: right;margin-right: 25px;"><h4 style="font-weight: normal;">{{userInfo.email}}</h4></span>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a @tap="changeAuthcode(userInfo.authCode)" class="mui-navigate-right" style="height: 50px;">
              <span style="float: left;"><h4 style="font-weight: normal;">授权码</h4></span>
              <span style="color: gray;float: right;margin-right: 25px;"><h4 style="font-weight: normal;">{{userInfo.authCode | castToPass}}</h4></span>
            </a>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'userCenter',
    data() {
      return {
        userInfo: {}
      }
    },
    methods: {
      toHeadImg: function() {
        this.$router.push({
          path: '/headImg',
          query: {
            "userInfo": this.userInfo
          }
        })
      },
      toHome: function() {
        this.$router.push('/home')
      },
      checkAuthcode: function(authCode) {
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
            this.updateAuthcode(authCode)
          } else {
            this.$mui.confirm(' ', '经本系统检测，该授权码不可用，修改后将无法发送邮件，确认修改？', ['确认', '取消'], function(e) {
              if(e.index == 0) {
                that.updateAuthcode(authCode)
              }
            })
          }
        }).catch(function(error) {
          console.log(error);
        })
      },
      getUserByEmail: function(email) {
        this.$http('/user/getUserByEmail/' + email).then(res => {
          this.userInfo = res.data.content
        }).catch(err => {
          this.$mui.toast('获取用户信息失败')
          console.log(err)
        })
      },
      changeName: function(name) {
        var that = this
        this.$mui.prompt('请输入新的用户名：', name, '修改用户名', ['确定', '取消'], function(e) {
        	if (e.index == 0) {
            that.updateUsername(e.value, e.value.length)
        	} else {

        	}
        })
      },
      changePassword: function(password) {
        var that = this
        this.$mui.prompt('请输入新的密码：', password, '修改密码', ['确定', '取消'], function(e) {
        	if (e.index == 0) {
            that.updatePassword(e.value, e.value.length)
        	} else {

        	}
        })
      },
      changeAuthcode: function(authCode) {
        var that = this
        this.$mui.prompt('请输入新的授权码：', authCode, '修改授权码', ['确定', '取消'], function(e) {
        	if (e.index == 0) {
            that.checkAuthcode(authCode)
        	} else {

        	}
        })
      },
      changeHeadimg: function() {
        var that = this
        this.$mui.confirm('是否要上传新的头像？', '修改头像', ['确定', '取消'], function(e) {
        	if (e.index == 0) {
            that.updateHeadimg()
        	} else {

        	}
        })
      },
      updateUsername: function(username, len) {
        if (len < 6 || len > 12) {
          this.$mui.toast('用户名长度必须是6-12位')
        } else {
          this.$http({
            method: 'put',
            url: '/user/updateUser',
            data: {
              username: username
            }
          }).then(res => {
            if(res.data.code == 200) {
              this.$mui.toast('修改成功')
              this.$set(this.userInfo, 'username', username)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      updatePassword: function(password, len) {
        var checkpw = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/
        if (!checkpw.test(this.password)) {
          this.$mui.toast('密码必须是包含数字和字母的8到16位')
        } else {
          this.$http({
            method: 'put',
            url: '/user/updateUser',
            data: {
              password: password
            }
          }).then(res => {
            if(res.data.code == 200) {
              this.$mui.toast('修改成功')
              this.$set(this.userInfo, 'password', password)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      updateAuthcode: function(authCode) {
        this.$http({
          method: 'put',
          url: '/user/updateUser',
          data: {
            authCode: authCode
          }
        }).then(res => {
          if(res.data.code == 200) {
            this.$mui.toast('修改成功')
            this.$set(this.userInfo, 'authCode', authCode)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      logout: function() {
        this.$deleteCookie('email')
        this.$mui.toast('安全退出')
        this.$router.push('/login')
      }
    },
    filters: {
      castToPass: function(value) {
        var res = ''
        for (var i = 0; i < value.length; i++) {
          res += '*'
        }
        return res
      }
    },
    mounted: function() {
      var userInfo = this.$route.query.userInfo
      if (userInfo == null || userInfo == '') {
        if (this.$getCookie('email') != null && this.$getCookie('email') != '' && this.$getCookie('email').length !=
          0) {
          this.getUserByEmail(this.$getCookie('email'))
        } else {
          this.$router.push('/login')
        }
      } else {
        this.userInfo = userInfo
      }
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");

  .round_icon{
  width: 50px;
  height: 50px;
  float: right;
  margin-right: 25px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  }
</style>
