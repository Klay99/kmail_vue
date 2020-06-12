<template>
  <div>
    <div class="index">
      <img src="../assets/logo.png" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: "", // 倒计时
      }
    },
    methods: {
      goHome: function(TIME_COUNT) {
        // const TIME_COUNT = 2;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            console.log('count:' + this.count)
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              //跳转到主页
              this.$router.push({
                path: '/home'
              });
            }
          }, TIME_COUNT * 1000)
        }
      },
      goLogin: function(TIME_COUNT) {
        // const TIME_COUNT = 2;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            console.log('count:' + this.count)
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              //跳转到主页
              this.$router.push({
                path: '/login'
              });
            }
          }, TIME_COUNT * 1000)
        }
      }
    },
    created: function() {
      // 倒计时跳转页面
      // 1秒后进入跳转页面
      if (this.$getCookie('email') != null && this.$getCookie('email') != '' && this.$getCookie('email').length !=
        0) {
        this.goHome(1);
      } else {
        this.goLogin(1);
      }
    },
    beforeDestroy: function() {
      clearInterval(this.timer);
    }
  }
</script>

<style scoped="scoped">
  /* .Index {
    background-color: #2C3E50;
    width: 100%;
    height: 1000px;
  } */
</style>
