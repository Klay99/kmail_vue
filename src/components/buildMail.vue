<template>
  <div id="buildMail">
    <div class="mui-bar mui-bar-nav" style="background-color: #007AFF;">
    	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color: white;"></a>
    	<h1 class="mui-title" style="color: white;">写邮件<a @tap="sendMail" class="mui-active" style="float: right;"><span class="mui-icon mui-icon-paperplane" style="font-size: 35px;margin-top: 5px;"></span></a></h1>
    </div>

<div class="mui-content">
			<div class="mui-content-padded" style="margin: 5px;">
    <form class="mui-input-group">
    	<div class="mui-input-row">
    		<label>主题：</label>
    		<input v-model="subject" type="text" class="mui-input-clear" placeholder="请输入邮件主题">
    	</div>
    	<div class="mui-input-row">
    		<label>收件人：</label>
    		<input id="recipients0" style="float: left;width: 200px;" @change="updateRecipients0" v-model="recipient0.value" type="text" placeholder="收件人(可指定多个)">
        <a href="#topPopover"><span style="margin-top: 8px;margin-right: 10px;" class="mui-icon mui-icon-plus-filled"></span></a>
    	</div>
    	<div class="mui-input-row">
        <label>附件：</label>
        <label v-if="files === null || files.length === 0" for="file_input"><a>上传附件</a></label>
        <label v-if="files !== null && files.length !== 0" for="file_input"><a>继续上传</a></label>
        <a href="#middlePopover"><span class="mui-icon mui-icon-arrowdown" style="margin-top: 8px;margin-bottom: auto;"></span></a>

    	</div>
      <input hidden="hidden" id="file_input" @change="addFile" type="file" class="mui-input-clear" multiple="multiple" />
    </form>
 <!-- class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" style="padding: 5px 20px;" -->

    <div id="middlePopover" class="mui-popover">
    	<div class="mui-popover-arrow"></div>
    	<div id="middlePopoverScroll" class="mui-scroll-wrapper">
    		<div class="mui-scroll">
    			<ul class="mui-table-view">
    				<li v-for="(item,i) in files" class="mui-table-view-cell">
              <div>
                <div style="width: 80%;float: left;overflow: hidden;white-space: nowrap;">{{item.name}}</div>
                <div style="width: 20%;float: right;"><a @click="deleteFile(i)">删除</a></div>
              </div>
    				</li>
    			</ul>
    		</div>
    	</div>
    </div>
    <div id="topPopover" class="mui-popover">
    	<div class="mui-popover-arrow"></div>
    	<div id="topPopoverScroll" class="mui-scroll-wrapper">
    		<div class="mui-scroll">
    			<ul class="mui-table-view">
    				<li v-if="recipients != null && recipients != '' && recipients.length != 0" class="mui-table-view-cell">
              <ul class="mui-table-view" v-for="(item2,i2) in recipients">
                <li class="mui-table-view-cell" style="padding: 5px 15px;">
                  <div>
                    <label style="float: left;">{{item2}}</label>
                    <a @tap="removeRecipient(i2)" style="float: right;">删除</a>
                  </div>
                </li>
              </ul>
            </li>
    				<li v-if="recipients != null && recipients != '' && recipients.length != 0" class="mui-table-view-cell" style="height: 40px;padding: 5px 15px;">
              <div>
                <input id="currRecipient" style="float: left;width: 200px;height: 30px;overflow: hidden;text-overflow: inherit;margin-bottom: 0px;padding: 0px;" type="text" placeholder="继续添加收件人">
                <a @tap="addRecipient" style="float: right;margin-top: 3px;"><span class="mui-icon mui-icon-plusempty"></span></a>
                <a @tap="clearRecipient" style="float: right;margin-top: 3px;"><span class="mui-icon mui-icon-closeempty"></span></a>
              </div>
            </li>
    				<li class="mui-table-view-cell mui-collapse">
    					<a class="mui-navigate-right">通讯录好友</a>
              <ul class="mui-table-view" v-for="friend in friends">
                <li class="mui-table-view-cell" style="padding: 5px 15px;">
                  <div>
                    <div style="float: left;width: 200px;height: 30px;overflow: hidden;text-overflow: inherit;">{{friend.friendMail}}</div>
                    <a @tap="addRecipientByFriend(friend.friendMail)" style="float: right;"><span class="mui-icon mui-icon-plusempty" style="color: #007AFF;"></span></a>
                    <a @tap="removeRecipientByFriend(friend.friendMail)" style="float: right;"><span class="mui-icon mui-icon-closeempty" style="color: #007AFF;"></span></a>
                  </div>
                </li>
              </ul>
    				</li>
    				<li class="mui-table-view-cell mui-collapse">
    					<a class="mui-navigate-right">最近联系人</a>
              <ul class="mui-table-view" v-for="unfriend in unFriends">
                <li class="mui-table-view-cell" style="padding: 5px 15px;">
                  <div>
                    <div style="float: left;width: 200px;height: 30px;overflow: hidden;text-overflow: inherit;">{{unfriend.friendMail}}</div>
                    <a @tap="addRecipientByFriend(unfriend.friendMail)" style="float: right;"><span class="mui-icon mui-icon-plusempty" style="color: #007AFF;"></span></a>
                    <a @tap="removeRecipientByFriend(unfriend.friendMail)" style="float: right;"><span class="mui-icon mui-icon-closeempty" style="color: #007AFF;"></span></a>
                  </div>
                </li>
              </ul>
    				</li>
    			</ul>
    		</div>
    	</div>
    </div>
    <div class="mui-input-row" style="height: 100%; top: 8px;">
      <textarea v-model="content" id="textarea" rows="28" placeholder="请输入邮件正文"></textarea>
    </div>

    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buildMail',
    data() {
      return {
        userInfo: {},
        recipients: [],
        recipient0: {
          value: ''
        },
        id: '',
        subject: '',
        files : [],
        content: '',
        friends: [],
        unFriends: [],
        isSent: false
      }
    },
    methods: {
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
          that.getFriends()
          that.getUnfriends()
        }).catch(function(err) {
          that.$mui.toast('获取用户信息失败')
        })
      },
      getUserByEmail: function(email) {
        this.$http('/user/getUserByEmail/' + email).then(res => {
          this.userInfo = res.data.content
          this.getFriends()
          this.getUnfriends()
        }).catch(err =>{
          this.$mui.toast('获取用户信息失败')
        })
      },
      checkEmail: function(email) {
        // 判断邮箱格式是否正确
        var check = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        return check.test(email)
      },
      addRecipient: function() {
        var cr = document.getElementById('currRecipient')
        // console.log(cr.value)
        if(this.checkEmail(cr.value)) {
          // 当收件人列表不为空时，检查是否已添加
          if(this.recipients != null && this.recipients != '' && this.recipients.length != 0) {
            console.log(this.recipients.indexOf(cr.value))
            if(this.recipients.indexOf(cr.value) == -1) {
              this.recipients.push(cr.value)
            } else {
              this.$mui.toast('收件人已添加，请不要重复操作')
            }
          } else {
            this.recipients.push(cr.value)
          }
        } else {
          this.$mui.toast('邮箱格式不正确')
        }
      },
      updateRecipients0: function() {
        if(this.checkEmail(this.recipient0.value)) {
          // 当收件人列表不为空时，检查是否已添加
          if(this.recipients != null && this.recipients != '' && this.recipients.length != 0) {
            if(this.recipients.indexOf(this.recipient0.value) == -1) {
              this.recipients.splice(0,1,this.recipient0.value)
            } else {
              this.$mui.toast('收件人已添加，请不要重复操作')
              this.$set(this.recipient0,'value',this.recipients[0])
            }
          } else { // 收件人列表为空时，直接添加
            this.recipients.splice(0,1,this.recipient0.value)
          }
        } else {
          if(this.recipient0.value != null && this.recipient0.value != '') {
            this.$mui.toast('邮箱格式不正确')
          }
          if(this.recipients != null && this.recipients != '' && this.recipients.length != 0) {
            this.recipients.splice(0,1) // 如果修改后不满足格式要求，同时在列表中删除
          }
          this.$set(this.recipient0,'value','')
        }
      },
      clearRecipient: function() {
        document.getElementById('currRecipient').value = ''
      },
      removeRecipient: function(i) {
        // console.log('before remove')
        // console.log(this.recipients)
        this.recipients.splice(i,1)
        if(this.recipients == null || this.recipients == '' || this.recipients.length == 0) {
          this.$set(this.recipient0,'value','')
        } else {
          this.$set(this.recipient0,'value',this.recipients[0])
        }
        // console.log('after remove')
        // console.log(this.recipients)
      },
      addRecipientByFriend: function(email) {
        if(this.checkEmail(email)) {
          // 当收件人列表不为空时，检查是否已添加
          if(this.recipients != null && this.recipients != '' && this.recipients.length != 0) {
            if(this.recipients.indexOf(email) == -1) {
              this.recipients.push(email)
            } else {
              this.$mui.toast('收件人已添加，请不要重复操作')
            }
          } else {
            this.recipients.push(email)
            this.$set(this.recipient0,'value',email)
          }
        } else {
          this.$mui.toast('邮箱格式不正确')
        }
      },
      removeRecipientByFriend: function(email) {
        if(this.recipients != null && this.recipients != '' && this.recipients.length != 0) {
          if(this.recipients.indexOf(email) == -1) {
            this.$mui.toast('收件人未添加，无法操作')
          } else {
            this.recipients.splice(this.recipients.indexOf(email),1)
            if(this.recipients == null || this.recipients == '' || this.recipients.length == 0) {
              this.$set(this.recipient0,'value','')
            } else {
              this.$set(this.recipient0,'value',this.recipients[0])
            }
          }
        } else {
          this.$mui.toast('收件人未添加，无法操作')
        }
      },
      addFile: function(e) {
        var len = e.target.files.length;
        var l = this.files.length;
        for (var i = 0; i < len; i++) {
          var a = new FormData();
          a = e.target.files[i];
          this.files.push(a);
          l++;
        }
      },
      deleteFile: function(i) {
        this.files.splice(i,1);
      },
      getRecipient: function(recipientMail) {
        this.$http.get('/user/getUserByEmail/' + this.recipientMail)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
              console.log('获取成功');

            } else {
              console.log('获取失败');
            }
          })
          .catch(function(error) {
            console.log(error)
          });
      },
      sendMail: function() { // 当接口包括多个类型不同的参数时，用formdata进行传值
        var formData = new FormData()
        // 添加邮件主体
        if(this.id != null && this.id != '') {
          formData.append('id', this.id)
        }
        formData.append('subject', this.subject)
        formData.append('content', this.content)
        formData.append('senderId', this.userInfo.id)
        formData.append('senderMail', this.userInfo.email)
        formData.append('senderHeadImg', this.userInfo.headImg)
        // 添加收件人
        this.recipients.forEach(i => {
          formData.append('recipients', i)
        })
        if(this.recipients == null || this.recipients == '' || this.recipients.length == 0) {
          this.$mui.toast('收件人不能为空')
          return
        }
        // 添加邮件附件
        this.files.forEach(i => {
          formData.append('files', i)
        })
        // 发送
        this.$http.post('/email/send', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if(res.data.code == 200) {
            this.isSent = true
            var btnArray = ['发回首页', '再写一封'];
            this.$mui.confirm('发送成功', '', btnArray, e => {
            	if (e.index == 0) {
            		this.$router.push('/home')
            	} else {
            		this.subject = ''
                this.content = ''
                this.files.splice(0,this.files.length)
                this.recipients.splice(0,this.recipients.length)
                this.$set(this.recipient0,'value','')
            	}
            })
          }
        }).catch(err => {
          this.$mui.toast('发送失败')
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
              isDeleted: 1,
              isFriend: 2
            },
            orderParams: []
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            this.friends = res.data.content.list
            console.log(this.friends)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getUnfriends: function() {
        var that = this
        this.$http({
          method: 'post',
          url: '/friend/getAllFriend',
          data: {
            model: {
              userId: that.userInfo.id,
              isDeleted: 1,
              isFriend: 1
            },
            orderParams: [
              "createTime desc"
            ]
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            this.unFriends = res.data.content.list
            console.log(this.unFriends)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getMailById: function(id) {
        this.$http('/mail/getMailById/' + id).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            var sub = res.data.content.subject
            var reMail = res.data.content.recipientMail
            var con = res.data.content.content
            if(sub != null && sub != '' && sub != 'null') {
              this.subject = sub
            }
            if(reMail != null && reMail != '' && reMail != 'null') {
              this.recipient0.value = reMail
              this.recipients[0] = reMail
            }
            this.getAttachmentByMailId(id)
            if(con != null && con != '' && con != 'null') {
              this.content = con
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getAttachmentByMailId: function(id) {
        this.$http({
          method: 'post',
          url: '/attachment/getAllAttachment',
          data: {
            model: {
              mailId: id
            },
            orderParams: []
          }
        }).then(res => {
          if(res.data.code == 200) {
            var atts = res.data.content.list
            for(var i = 0; i < atts.length; i++) {
              var formdata = new FormData()
              formdata = atts[i];
              this.files.push(formdata)
            }
          }
        })
      },
      addDraft: function() {
        var formData = new FormData()
        // 添加邮件主体
        formData.append('subject', this.subject)
        formData.append('content', this.content)
        formData.append('senderId', this.userInfo.id)
        formData.append('senderMail', this.userInfo.email)
        formData.append('senderHeadImg', this.userInfo.headImg)
        // 添加收件人
        this.recipients.forEach(i => {
          formData.append('recipients', i)
        })
        if(this.recipients == null || this.recipients == '' || this.recipients.length == 0) {
          formData.append('recipients', null)
        }
        // 添加邮件附件
        this.files.forEach(i => {
          formData.append('files', i)
        })
        // 发送
        this.$http.post('/mail/addDraft', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if(res.data.code == 200) {
            this.$mui.toast('邮件已添加到草稿箱')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted: function() {
      this.$mui('#middlePopoverScroll').scroll()
      this.$mui('#topPopoverScroll').scroll()
      this.checkUserInfo()
      var id = this.$route.query.id
      if(id != null && id != '') {
        this.id = id
        this.getMailById(id)
      }
    },
    destroyed: function() {
      if(!this.isSent) {
        if((this.subject == null || this.subject == '')
        && (this.recipients == null || this.recipients == '' || this.recipients.length == 0)
        // && (this.files == null || this.files == '' || this.files.length == 0)
        && (this.content == null || this.content == '')) {

        } else {
          var that = this
          var btnArray = ['确认', '取消']
          this.$mui.confirm(' ', '邮件未发送，保存到草稿箱？', btnArray, function(e) {
          	if (e.index == 0) {
          		that.addDraft()
          	} else {

            }
          })
        }
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  .mui-popover-arrow {
  	left: auto;
  	right: 6px;
  }
  .mui-popover {
  	height: 300px;
  }

</style>
