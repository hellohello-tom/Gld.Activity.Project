<template>
  <section class="show title phone">
    <h3 class="title text-ellipsis">
                                易企赢</h3>
    <div class="content">
      <div class="container img">
        <img class="show-img" alt="">
      </div>
      <div class="container site">
        <iframe sandbox class="show-site" frameborder="0"></iframe>
      </div>
    </div>
    <footer class="footer menu dis-flex abs">
      <i class="ico keyboard"></i>
      <div class="item menu-l1" v-for="item of menuList">
        <footer-menu :menu-item="item"></footer-menu>
      </div>
    </footer>
  </section>
  <div class="text-center select">
    <button class="btn btn-primary big like" v-on:click="like">就选这个</button>
    <span class="pl10 text-muted">点击菜单预览效果</span>
  </div>
</template>
<script>
import footerMenu from 'vue/components/footerMenu.vue';
export default {
  props: {
    menuList: Array
  },
  data() {
    return {
      list: []
    }
  },
  components: {
    'footer-menu': footerMenu
  },
  methods: {
    like: function(event) {
      var $t = $(event.target);
      var $container = $t.closest('.item').children('.show').children('.content');

      var $showImg = $container.find('.show-img'),
        $showSite = $container.find('.show-site');

      var spin1 = spinZ($container)
        // var img = new Image(),
        //     spin1 = spinZ($container);

      // img.onload=function(){
      //  spin1.stop();
      //  $container.find('.show-img').attr('src', img.src);
      //  console.log('loaded');
      // }

      var site = 'http://www.uisdc.com/';

      if ($showSite.attr('src') == site) {
        spin1.stop();
        return;
      }

      $container.find('.show-site').on('load', function() {
        spin1.stop();
      }).attr('src', site).show();
      setTimeout(function() {
        // img.src = '/imgs/guaka.png';
      }, 5000);
    }
  }
}
</script>
