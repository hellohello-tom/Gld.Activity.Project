<template>
  <div>
    <i class="ico keyboard"></i></div>
  <div class="item menu-l1" v-for="item of menuItem" :class="{on:$index==0}">
    <div class="title js-toggle" :class="{'wealthy':item.subMenuList.length>0}" :data-menu-type="item.menuType" :data-name="item.name" :title="item.name" :data-menu-content="item.menuContent" :data-app-demo-url="item.appDemoUrl" :data-app-pic-url="item.appPicUrl" :data-app-type="item.appType" :data-app-type-value="item.appTypeValue" :data-model-type="item.modelType" :data-model-text="item.modelText" :data-app-name="item.appName">
      <p class="inner">{{item.name}}</p>
    </div>
    <ul class="content menu-l2">
      <li class="item js-toggle" v-for="item of item.subMenuList" :data-name="item.name" :data-menu-type="item.menuType" :data-name="item.name" :title="item.name" :data-menu-content="item.menuContent" :data-app-demo-url="item.appDemoUrl" :data-app-pic-url="item.appPicUrl" :data-app-type="item.appType" :data-app-type-value="item.appTypeValue" :data-model-type="item.modelType" :data-model-text="item.modelText" :data-app-name="item.appName"><span class="inner">{{item.name}}</span></li>
      <li class="item add-wrapper" v-show="item.subMenuList.length<5">
        <a href="javascript:;" class="font-bigger add" :data-menu-type="item.menuType" title="添加菜单">+</a>
      </li>
    </ul>
  </div>
  <div class="item menu-l1 add-menu1" v-if="menu1Length<3">
    <p class="item add-wrapper">
      <a href="javascript:;" class="font-bigger add" data-menu-type="MESSAGE">+</a>
    </p>
  </div>
</template>
<script>
export default {
  props: ['menuItem', 'menu1Length'],
  data() {
    return {
      list: [],
    }
  },
  ready: function() {

  },
  methods: {}
}
</script>
