<template>
  <div class="friend">
    <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable mui-slide-in">
      <!--侧滑菜单部分-->
      <aside id="offCanvasSide" class="mui-off-canvas-left" style="background-color: white;">
        <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <div @tap="toUserCenter" style="background-color: #007AFF;">
              <div style="height: 70px;"></div>
              <div style="position: relative;height: 100px;">
                <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);">
                  <div class="round_background">
                    <img v-if="userInfo.headImg == null || userInfo.headImg == '' || userInfo.headImg.length == 0" class="round_icon" src="../assets/images/headImg.jpeg">
                    <img v-if="userInfo.headImg != null && userInfo.headImg != '' && userInfo.headImg.length != 0" class="round_icon" :src="userInfo.headImg">
                  </div>
                </div>
              </div>
              <h4 style="color: white;">{{userInfo.username}}</h4>
              <h5 style="color: lightgray;padding-top: 5px;">{{userInfo.email}}</h5>
              <div style="height: 10px;"></div>
            </div>
            <ul class="mui-table-view">
              <li class="mui-table-view-cell">
                <a @tap="toAllInBox" style="height: 50px;">
                  <span style="color: #000000;float: left;"><h4 style="font-weight: normal;color: #000000;">所有收件箱</h4></span>
                </a>
              </li>
            </ul>
            <div class="mui-content-padded" style="background-color: lightgray;margin: 0;padding: 10px 25px;height: 40px;">
              <span style="text-align: left;color: #000000;font-size: 15px;float: left;">文件夹</span>
            </div>
            <ul class="mui-table-view">
              <li class="mui-table-view-cell">
                <a @tap="closeMenu" class="mui-navigate-right" style="height: 50px;">
                  <span class="mui-icon-extra mui-icon-extra-peoples" style="color: grey;float: left;margin-left: 10px;"></span>
                  <span style="color: #000000;float: left;margin-left: 20px;"><h4 style="font-weight: normal;color: #000000;">通讯录</h4></span>
                </a>
              </li>
              <li class="mui-table-view-cell" style="height: 50px;">
                <a @tap="toHome" class="mui-navigate-right" style="height: 50px;">
                  <span class="mui-icon mui-icon-email" style="color: grey;float: left;margin-left: 10px;font-size: 28px;padding-right: 0px;"></span>
                  <span style="color: #000000;float: left;margin-left: 20px;"><h4 style="font-weight: normal;color: #000000;">收件箱</h4></span>
                </a>
              </li>
              <li class="mui-table-view-cell" style="height: 50px;">
                <a @tap="toUnread" class="mui-navigate-right" style="height: 50px;">
                  <span class="mui-icon-extra mui-icon-extra-new" style="color: grey;float: left;margin-left: 10px;"></span>
                  <span style="color: #000000;float: left;margin-left: 20px;"><h4 style="font-weight: normal;color: #000000;">未读邮件</h4></span>
                </a>
              </li>
              <li class="mui-table-view-cell" style="height: 50px;">
                <a @tap="toStared" class="mui-navigate-right" style="height: 50px;">
                  <span class="mui-icon mui-icon-star" style="color: grey;float: left;margin-left: 10px;font-size: 28px;padding-right: 0px;"></span>
                  <span style="color: #000000;float: left;margin-left: 20px;"><h4 style="font-weight: normal;color: #000000;">已标星</h4></span>
                </a>
              </li>
              <li class="mui-table-view-cell" style="height: 50px;">
                <a @tap="toDraft" class="mui-navigate-right" style="height: 50px;">
                  <span class="mui-icon-extra mui-icon-extra-order" style="color: grey;float: left;margin-left: 10px;"></span>
                  <span style="color: #000000;float: left;margin-left: 20px;"><h4 style="font-weight: normal;color: #000000;">草稿箱</h4></span>
                </a>
              </li>
              <li class="mui-table-view-cell" style="height: 50px;">
                <a @tap="toSent" class="mui-navigate-right" style="height: 50px;">
                  <span class="mui-icon mui-icon-paperplane" style="color: grey;float: left;margin-left: 10px;font-size: 28px;padding-right: 0px;"></span>
                  <span style="color: #000000;float: left;margin-left: 20px;"><h4 style="font-weight: normal;color: #000000;">已发送</h4></span>
                </a>
              </li>
              <li class="mui-table-view-cell" style="height: 50px;">
                <a @tap="toDeleted" class="mui-navigate-right" style="height: 50px;">
                  <span class="mui-icon mui-icon-trash" style="color: grey;float: left;margin-left: 10px;font-size: 28px;padding-right: 0px;"></span>
                  <span style="color: #000000;float: left;margin-left: 20px;"><h4 style="font-weight: normal;color: #000000;">已删除</h4></span>
                </a>
              </li>
            </ul>
            <div style="margin: 20px;">
              <button @tap="toLogin" type="button" class="mui-btn mui-btn-danger mui-btn-outlined">
                退出登录
              </button>
            </div>
          </div>
        </div>
      </aside>
      <!--主界面部分-->
      <div class="mui-inner-wrap">
        <header class="mui-bar mui-bar-nav" style="background-color: #007AFF;">
          <a href="#offCanvasSide" class="mui-icon mui-action-menu mui-icon-bars mui-pull-left" style="color: white;"></a>
          <h1 class="mui-title" style="color: white;">通讯录</h1>
        </header>
        <div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <div style="height: 50px;width: 100%;padding: 10px 25px 0px 25px;">
              <span style="float: left;font-size: 20px;padding-top: 20px;"><b>通讯录</b></span>
              <a @tap="changeShow" style="float: right;padding-top: 20px;">添加好友</a>
            </div>
            <div style="height: 80px;vertical-align: middle;align-content: center;padding-top: 40px;" v-if="!show && (friends == null || friends == '' || friends.length == 0)">
              <h4 style="color: gray;">没有好友</h4>
            </div>
            <div class="mui-card">
              <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-if="show">
                  <div class="mui-collapse-content">
                    <form class="mui-input-group">
                      <div class="mui-input-row">
                        <label><b style="color: red;">*</b>邮箱：</label>
                        <input v-model="mail" class="mui-input-clear" type="text" placeholder="请输入好友邮箱" />
                      </div>
                      <div class="mui-input-row">
                        <label>姓名：</label>
                        <input v-model="name" class="mui-input-clear" type="text" placeholder="请输入好友姓名" />
                      </div>
                    	<div class="mui-button-row">
                    		<button @tap="addFriend" class="mui-btn mui-btn-primary" type="button" onclick="return false;">确认</button>&nbsp;&nbsp;
                    		<button @tap="reset" class="mui-btn mui-btn-primary" type="button" onclick="return false;">取消</button>
                    	</div>
                    </form>
                  </div>
                </li>
                <li class="mui-table-view-cell" v-for="item in friends">
                  {{item.friendName}}<{{item.friendMail}}>
                </li>
              </ul>
            </div>
            <h4 style="text-align: left;padding: 20px 25px 0px 25px;font-size: 20px;">历史联系人</h4>
            <div class="mui-card">
              <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="item in unFriends">
                  {{item.friendName}}<{{item.friendMail}}>
                </li>
              </ul>
            </div>
            <!-- 解决悬浮按钮遮挡邮件列表 -->
            <div style="height: 100px;width: 100%;"></div>
          </div>
        </div>
        <!-- off-canvas backdrop -->
        <div class="mui-off-canvas-backdrop"></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'friend',
    data() {
      return {
        userInfo: {},
        // 侧滑容器父节点
        offCanvasWrapper: [],
        // 主界面容器
        offCanvasInner: {},
        // 菜单容器
        offCanvasSide: {},
        // 侧滑容器父节点的class
        classList: {},
        friends: [],
        unFriends: [],
        createTime: {},
        show: false,
        mail: '',
        name: ''
      }
    },
    methods: {
      toUserCenter: function() {
        this.closeMenu()
        var that = this
        this.$router.push({
          path: '/userCenter',
          query: {
            userInfo: that.userInfo
          }
        })
      },
      toLogin: function() {
        this.$deleteCookie('email')
        this.$router.push('/login')
      },
      toAllInBox: function() {
        this.closeMenu()
        setTimeout(() => {
          this.$router.push('/allInBox')
        }, 400)
      },
      toHome: function() {
        this.closeMenu()
        setTimeout(() => {
          this.$router.push('/home')
        }, 400)
      },
      toUnread: function() {
        this.closeMenu()
        setTimeout(() => {
          this.$router.push('/unread')
        }, 400)
      },
      toStared: function() {
        this.closeMenu()
        setTimeout(() => {
          this.$router.push('/stared')
        }, 400)
      },
      toDraft: function() {
        this.closeMenu()
        setTimeout(() => {
          this.$router.push('/draft')
        }, 400)
      },
      toSent: function() {
        this.closeMenu()
        setTimeout(() => {
          this.$router.push('/sent')
        }, 400)
      },
      toDeleted: function() {
        this.closeMenu()
        setTimeout(() => {
        this.$router.push('/deleted')
        }, 400)
      },
      toDetail: function(i, item) {
        this.changeRead(i, item)
        var that = this
        this.$router.push({
          path: '/mailDetail',
          query: {
            id: item.id,
            userInfo: that.userInfo
          }
        })
      },
      showMenu: function () {
        this.$mui('.mui-off-canvas-wrap').offCanvas().show();
      },
      closeMenu: function () {
        this.$mui('.mui-off-canvas-wrap').offCanvas().close();
        return true
      },
      checkUserInfo: function() {
        if (this.$getCookie('email') != null && this.$getCookie('email') != '' && this.$getCookie('email').length !=
          0) {
          this.getUserInfo()
        } else {
          var email = this.$route.params.email
          if(email != null) {
            this.getUserByEmail(email)
            this.$setCookie('email', email)
          } else{
            this.$router.push('/login')
          }
        }
      },
      getUserInfo: function() {
        var that = this
        this.$http({
          url: "/user/getAllUser",
          method: 'post',
          data: {
            model: {
              "email": that.$getCookie('email')
            },
            orderParams: [],
            pageNum: 0,
            pageSize: 5
          }
        }).then(function(res) {
          console.log(res)
          that.userInfo = res.data.content.list[0]
          console.log(that.userInfo)
          that.getFriends()
        }).catch(function(err) {
          that.$mui.toast('获取用户信息失败')
          console.log(err)
        })
      },
      getUserByEmail: function(email) {
        this.$http('/user/getUserByEmail/' + email).then(res => {
          this.userInfo = res.data.content
          this.getFriends()
        }).catch(err =>{
          this.$mui.toast('获取用户信息失败')
          console.log(err)
        })
      },
      getFriends: function() {
        var that = this
        this.$http({
          method: 'post',
          url: '/friend/getAllFriend',
          data: {
            model: {
              userId: that.userInfo.id,
              isFriend: 2,
              isDeleted: 1
            },
            orderParams: [
              "friendName desc"
            ]
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            for(var i of res.data.content.list) {
              this.friends.push(i)
            }
            this.getUnFriends()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getUnFriends: function() {
        var that = this
        this.$http({
          method: 'post',
          url: '/friend/getAllFriend',
          data: {
            model: {
            userId: that.userInfo.id,
            isFriend: 1,
            isDeleted: 1
            },
            orderParams: [
              "friendName desc"
            ]
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            for(var i of res.data.content.list) {
              this.unFriends.push(i)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      changeShow: function() {
        this.show = true
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
      addFriend: function() {
        var checkemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        var that = this
        if(this.mail == null || this.mail == '') {
          this.$mui.toast('邮箱不能为空')
        } else if (!checkemail.test(this.mail)) {
          this.$mui.alert('邮箱格式不正确');
        } else {
          this.$http({
            method: 'post',
            url: '/friend/addFriend',
            data: {
              userId: that.userInfo.id,
              userMail: that.userInfo.email,
              username: that.userInfo.username,
              friendMail: that.mail,
              friendName: that.name,
              isFriend: 2
            }
          }).then(res => {
            console.log(res)
            if(res.data.code == 200) {
              this.$mui.toast('添加成功')
              this.mail = ''
              this.name = ''
              this.friends.splice(0,this.friends.length)
              this.unFriends.splice(0,this.unFriends.length)
              this.getFriends()
            } else {
              this.$mui.toast('添加失败')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      reset: function() {
        this.show = false
        this.mail = ''
        this.name = ''
      }
    },
    mounted: function() {
      this.$mui.init();

      this.offCanvasWrapper = this.$mui('#offCanvasWrapper');
      this.offCanvasInner = this.offCanvasWrapper[0].querySelector('.mui-inner-wrap');
      this.offCanvasSide = document.getElementById("offCanvasSide");
      this.classList = this.offCanvasWrapper[0].classList;

      // 主界面和侧滑菜单界面均支持区域滚动；
      this.$mui('#offCanvasSideScroll').scroll();
      this.$mui('#offCanvasContentScroll').scroll();

      //实现ios平台原生侧滑关闭页面；
      if (this.$mui.os.plus && this.$mui.os.ios) {
        this.$mui.plusReady(function() { // 5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该处直接屏蔽popGesture功能
          plus.webview.currentWebview().setStyle({
            'popGesture': 'none'
          });
        });
      }

      this.checkUserInfo();
    }
}
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/icons-extra.css");
  /* @import url("../assets/css/index.css"); */

  /* html,
  body {
    background-color: #efeff4;
  } */

  .friend {
    /* background-color: #efeff4; */
    /* min-width:320px;
    max-width:640px; */
    /* min-height: 400px; */
    width: 100%;
    margin: 0 auto;
    /* padding-bottom: 40px; */
    height: 100%;
    position: absolute;
    /* margin-top: -0px; */
  }

  p {
    text-indent: 22px;
  }

  span.mui-icon {
    font-size: 14px;
    color: #007aff;
    margin-left: -15px;
    padding-right: 10px;
  }

  .mui-off-canvas-left {
    color: #fff;
  }

  .title {
    margin: 35px 15px 10px;
  }

  .title+.content {
    margin: 10px 15px 35px;
    color: #bbb;
    text-indent: 1em;
    font-size: 14px;
    line-height: 24px;
  }

  input {
    color: #000;
  }

  .mui-media {
  	font-size: 14px;
  }

  .mui-table-view .mui-media-object {
  	max-width: initial;
  	width: 90px;
  	height: 70px;
  }

  .meta-info {
  	position: absolute;
  	left: 85px;
  	right: 15px;
  	bottom: 8px;
  	color: #8f8f94;
    margin-left: 10px;
  }

  .meta-info .author,
  .meta-info .time {
  	display: inline-block;
  }

  .meta-info .time {
  	float: right;
  }

  .meta-info .author {
    float: left;
  }

  .mui-table-view:before,
  .mui-table-view:after {
  	height: 0;
  }

  .mui-content>.mui-table-view:first-child {
  	margin-top: 1px;
  }

  .banner {
  	height: 180px;
  	overflow: hidden;
  	position: relative;
  	background-position: center;
  	background-color: #ccc;
  }

  .banner img {
  	width: 100%;
  	height: auto;
  }

  .banner .title {
  	position: absolute;
  	left: 15px;
  	bottom: 15px;
  	width: 90%;
  	font-size: 16px;
  	font-weight: 400;
  	line-height: 21px;
  	color: white;
  	z-index: 11;
  }
  .round_icon{
  width: 70px;
  height: 70px;
  float: left;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  }
  .round_background{
  width: 80px;
  height: 80px;
  background-color: white;
  float: left;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  }
  .addMail {
    width: 100%;
    height: 80px;
    position: fixed;
    right: 10px;
    bottom: 10px;
    padding-bottom: 50px;
    z-index: 2;
  }
</style>
