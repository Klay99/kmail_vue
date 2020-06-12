<template>

  <div id="headImg">
    <header class="mui-bar mui-bar-nav" style="background-color: #007AFF;">
      <a @tap="toUserCenter()" class="mui-icon mui-icon-left-nav" style="color: white;float: left;"></a>
      <div style="float: left;height: 44px;min-width: 200px;max-width: 300px;margin-left: 5px;line-height: 44px;overflow: hidden;text-overflow: ellipsis;">
        <span style="float: left;color: white;">{{userInfo.email}}</span>
      </div>
    </header>
    <div class="mui-content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <img :src="userInfo.headImg" class="round_icon" />
        </li>
        <li class="mui-table-view-cell mui-collapse">
          <a class="mui-navigate-right">修改头像</a>
          <div class="mui-collapse-content">
          	<form class="mui-input-group">

              <div class="mui-input-row">
                <input id="file_input" @change="addFile" type="file" class="mui-input-clear" multiple="multiple" />
              </div>
          		<div class="mui-button-row">
          			<button @tap="updateHeadImg()" class="mui-btn mui-btn-primary" type="button" onclick="return false;">确认</button>&nbsp;&nbsp;
          			<button @tap="clear()" class="mui-btn mui-btn-primary" type="button" onclick="return false;">取消</button>
          		</div>
          	</form>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'headImg',
    data() {
      return {
        userInfo: {},
				file: {}
      }
    },
    methods: {
      toLogin: function() {
        this.$router.push({
          path: '/login'
        })
      },
      toUserCenter: function() {
        var that = this
        this.$router.push({
          path: '/userCenter',
          query: {
            userInfo: that.userInfo
          }
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
      addFile: function(e) {
        var a = new FormData()
        a = e.target.files[0]
        this.file = a
      },
      clear: function() {
        document.getElementById('file_input').value = ''
        this.file = {}
      },
      updateHeadImg: function() {
        var formData = new FormData()
        formData.append('id', this.userInfo.id)
        formData.append('headImg', this.file)
        this.$http.post('/user/updateHeadImg', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            this.$set(this.userInfo, 'headImg', res.data.content.headImg)
          }
        }).catch(err => {
          console.log(err)
        })
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
  width: 300px;
  height: 300px;
  margin: auto;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  }
</style>
