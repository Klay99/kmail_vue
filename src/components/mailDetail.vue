<template>
  <div id="mailDetail">
    <div class="mui-bar mui-bar-nav" style="background-color: #007AFF;">
    	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color: white;"></a>
      <div style="float: left;width: 34px;margin-top: 5px;margin-left: 5px;">
        <img v-if="mailInfo.senderHeadImg == null || mailInfo.senderHeadImg == '' || mailInfo.senderHeadImg.length == 0" class="round_icon" src="../assets/images/headImg.jpeg">
        <img v-if="mailInfo.senderHeadImg != null && mailInfo.senderHeadImg != '' && mailInfo.senderHeadImg.length != 0" class="round_icon" :src="mailInfo.senderHeadImg">
      </div>
    	<div style="float: left;height: 44px;min-width: 200px;max-width: 250px;margin-left: 5px;line-height: 44px;overflow: hidden;text-overflow: ellipsis;">
        <span style="float: left;color: white;">{{mailInfo.senderMail}}</span>
      </div>
      <div style="width: 10%;float: right;">
        <span @tap="changeStar" v-if="mailInfo.isStar == 1" class="mui-icon mui-icon-star" style="color: white;font-size: 25px;float: right;padding-right: 10px;margin-right: 0px;"></span>
        <span @tap="changeStar" v-if="mailInfo.isStar == 2" class="mui-icon mui-icon-star-filled" style="color: orange;font-size: 25px;float: right;padding-right: 10px;margin-right: 0px;"></span>
      </div>
    </div>
    <div class="mui-content">
			<div class="mui-content-padded" style="margin: 5px;">
        <div class="mui-table-view mui-scroll">
          <div class="mui-table-view-cell" style="height: 100%;">
            <h3 style="text-align: left;margin-bottom: 10px;">{{mailInfo.subject}}</h3>
            <p style="text-align: left;">{{mailInfo.createTime | dateTrans}}</p>
          </div>
          <div class="mui-table-view-cell" style="height: 100%;">
            <p style="text-align: left;">附件：<a href="#middlePopover" v-if="file != null && file != ''">{{file.name}}<span class="mui-icon mui-icon-arrowdown" style="margin: 8px 0px 0px 10px;margin-bottom: auto;"></span></a></p>
          </div>
          <div class="mui-table-view-cell" style="height: 100%;">
            <p style="text-align: left;">收件人：<label style="color: #007AFF;">{{mailInfo.recipientMail}}</label>；</p>
          </div>
          <div class="mui-table-view-cell" style="min-height: 630px;">
            <p style="text-align: left;font-size: 16px;color: #222222;word-break: break-all;">{{mailInfo.content}}</p>
          </div>
        </div>

        <div id="middlePopover" class="mui-popover">
          <div class="mui-popover-arrow"></div>
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-for="(item,i) in files">
                  <div>
                    <div style="width: 80%;float: left;overflow: hidden;white-space: nowrap;">{{item.name}}</div>
                    <div style="width: 20%;float: right;"><a>下载</a></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mailDetail',
    data() {
      return {
        userInfo: {},
        mailInfo: {},
        files: [],
        file: {}
      }
    },
    methods: {
      getMailById: function(id) {
        this.$http('/mail/getMailById/' + id)
        .then(res => {
          console.log(res)
          if(res.data.code == 200) {
            this.mailInfo = res.data.content
            this.getFiles(id)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getFiles: function(mailId) {
        this.$http({
          method: 'post',
          url: '/attachment/getAllAttachment',
          data: {
            model: {
              mailId: mailId
            },
            orderParams: []
          }
        }).then(res => {
          if(res.data.code == 200) {
            var atts = res.data.content.list
            for(var i = 0; i < atts.length; i++) {
              var formdata = new FormData()
              formdata = atts[i];
              if(i == 0) {
                this.file = formdata
              }
              this.files.push(formdata)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      changeStar: function() {
        var val
        if(this.mailInfo.isStar == 1) {
          val = 2
        } else if(this.mailInfo.isStar == 2) {
          val = 1
        }
        var id = this.mailInfo.id
        this.$http({
          method: 'put',
          url: '/mail/updateMail',
          data: {
            id: id,
            isStar: val
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            this.$set(this.mailInfo, 'isStar', val)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    filters: { // 过滤器
      dateTrans: function(val) {
        var date = new Date(val)
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      },
      recipientTrans: function(val) {
        // todo
      }
    },
    mounted: function() {
      var user = this.$route.query.userInfo
      if(user == null || user == '') {
        this.$router.push('/login')
      } else {
        this.userInfo = user
        this.getMailById(this.$route.query.id)
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
  .round_icon{
  width: 34px;
  height: 34px;
  float: left;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  }
</style>
