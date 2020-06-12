<template>
  <div class="draft">
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
                <a @tap="toFriend" class="mui-navigate-right" style="height: 50px;">
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
                <a @tap="closeMenu" class="mui-navigate-right" style="height: 50px;">
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
          <!-- <a class="mui-action-back mui-btn mui-btn-link mui-pull-right">关闭</a> -->
          <h1 class="mui-title" style="color: white;">草稿箱</h1>
        </header>
        <div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
          <div class="mui-scroll">
            <div v-if="mailList == null || mailList == '' || mailList.length == 0" style="margin-top: 80px;">
              <span class="mui-icon mui-icon-email" style="font-size: 100px;padding-right: 0px;color: #8F8F94;"></span>
              <p style="text-align: center;margin-bottom: 0px;margin-right: 37px;">没有邮件</p>
            </div>
            <ul class="mui-table-view">
            	<li class="mui-table-view-cell mui-media" v-for="(item,i) in mailList" :key="i" ref="parentLi">
                <div class="mui-slider-right mui-disabled">
                	<a @tap="deleteMail(item,i)" class="mui-btn mui-btn-red mui-icon mui-icon-trash"></a>
                </div>
                <div @tap="toBuildMail(item,i)" class="mui-slider-handle">
                  <img v-if="userInfo.headImg == null || userInfo.headImg == '' || userInfo.headImg.length == 0" class="round_icon" src="../assets/images/headImg.jpeg">
                  <img v-if="userInfo.headImg != null && userInfo.headImg != '' && userInfo.headImg.length != 0" class="round_icon" :src="userInfo.headImg">
                  <div class="mui-media-body">
                    <div class="mui-ellipsis" style="overflow: hidden; font-size: 22px;height: 26.8px;margin-left: 10px;">
                      <span style="float: left;">{{item.subject}}</span>
                    </div>
                    <div style="margin-left: 10px;">
                      <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                        <span style="font-size: 18px;float: left;">{{item.content}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="meta-info">
                    <div class="author">{{item.senderMail}}</div>
                    <div class="time">{{item.createTime | dateTrans}}</div>
                  </div>
                </div>
            	</li>
            </ul>
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
    name: 'draft',
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
        mailList: [],
        createTime: {}
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
      toFriend: function() {
        this.closeMenu()
        setTimeout(() => {
          this.$router.push('/friend')
        }, 400)
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
      rebuildMail: function(i, item) {
        var that = this
        this.$router.push({
          path: '/rebuildMail',
          query: {
            id: item.id
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
      toBuildMail: function (item, i) {
        this.$router.push({
          path: '/buildMail',
          query: {
            id: item.id
          }
        })
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
          that.userInfo = res.data.content.list[0]
          that.getMails()
        }).catch(function(err) {
          that.$mui.toast('获取用户信息失败')
          console.log(err)
        })
      },
      getUserByEmail: function(email) {
        this.$http('/user/getUserByEmail/' + email).then(res => {
          this.userInfo = res.data.content
          this.getMails()
        }).catch(err =>{
          this.$mui.toast('获取用户信息失败')
          console.log(err)
        })
      },
      getMails: function() {
        var that = this
        this.$http({
          method: 'post',
          url: '/mail/getAllMail',
          data: {
            model: {
              "senderMail": that.userInfo.email,
              "senderId": that.userInfo.id,
              "isDiscard": 1,
              "isDeleted": 1,
              "isDraft": 2
            },
            orderParams: [
              "createTime desc"
            ]
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            for(var i of res.data.content.list) {
              this.mailList.push(i)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      deleteMail: function(item,i) {
        var that = this
        var curChild = this.$refs.parentLi[i]; // 通过ref获取当前点击的列表
        this.$mui.confirm(' ', '确认删除该草稿？', ['确认', '取消'], function(e) {
          if (e.index == 0) {
            that.$http({
              method: 'put',
              url: '/mail/updateMail',
              data: {
                id: item.id,
                isDiscard: 2
              }
            }).then(res => {
              console.log(res)
              if(res.data.code == 200) {
                that.deleteAttachment(item.id)
                console.log(that.mailList)
                that.mailList.splice(i,1)
                that.$mui.toast('删除成功')
                console.log(that.mailList)
              }
            })
            that.$mui.swipeoutClose(curChild) // 关闭滑动块
          } else {
            setTimeout(function() {
              that.$mui.swipeoutClose(curChild);
            }, 0);
          }
        })
      },
      deleteAttachment: function(mailId) {
        this.$http('/attachment/removeAttachmentByMailId/' + mailId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    filters: { // 过滤器
      dateTrans: function(val) {
        var date = new Date(val)
        var diff = Date.now() - date.getTime();
        var res = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        if(diff < 60000) {
          return '刚刚'
        } else if(diff < 3600000) {
          return Math.floor(diff / 60000) + '分钟前  >'
        } else if(diff < 86400000) {
          return Math.floor(diff / 3600000) + '小时前  >'
        } else if(diff < 604800000) {
          return Math.floor(diff / 86400000) + '天前  >'
        } else if(diff < 2629800000) {
          return date.getDate() + '日 ' + res + '  >'
        } else if(diff < 31557600000) {
          return (date.getMonth() + 1) + '/' + date.getDate() + '  >'
        } else {
          return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '  >'
        }
      },
      recipientTrans: function(val) {
        // todo
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

  .draft {
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
  	/* position: absolute; */
    height: 20px;
  	left: 85px;
  	right: 15px;
  	bottom: 8px;
  	color: #8f8f94;
    margin-left: 80px;
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
