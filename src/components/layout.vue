<template>
    <div>
        <app-header />
        <app-nav />
        <app-main />
    </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppNav from "@/components/AppNav";
import AppMain from "@/components/AppMain";
export default {
    components: {
        AppHeader,
        AppNav,
        AppMain
    }
};
</script>

<style lang="scss" >
.header {
    position: absolute;
    height: 50px;
    line-height: 50px;
    background-color: #2d3a4b;
    top: 0;
    left: 0;
    right: 0;
}
.navbar {
    position: absolute;
    width: 230px;
    background-color: #545c64;
    top: 50px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
}
.main {
    position: absolute;
    left: 230px;
    top: 50px;
    right: 0;
    bottom: 0;
    padding: 10px;
    overflow-y: auto;
}
</style>