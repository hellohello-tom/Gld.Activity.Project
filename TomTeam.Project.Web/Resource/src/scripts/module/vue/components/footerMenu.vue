<template>
    <div class="title js-toggle" :class="{'wealthy':menuItem.subMenuList.length>0}">
        <p class="inner">{{menuItem.name}}</p>
    </div>
    <ul class="content menu-l2">
        <li class="item js-toggle" v-for="item2 of menuItem.subMenuList">
            <a href="javascript:;">{{item2.name}}</a>
        </li>
    </ul>
</template>
<script>
export default {
    props: ['menuItem'],
    data() {
        return {
            menu: this.menuItem
        }
    },
    methods: {
        toggle: function() {
            var $t = $(event.target);
            $t.closest('.menu-l1').toggleClass('expanded').siblings('.item').removeClass('expanded');
            $t.addClass('on').siblings('.item').removeClass('on');
            if (!$t.hasClass('wealthy')) {
                $t.closest('.menu-l1').addClass('on').siblings('.item').removeClass('on');
            }
        }
    }
}
</script>
