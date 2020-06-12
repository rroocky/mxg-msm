<template>
    <div>
        <div class="navbar">
            <el-menu
                :router="true"
                default-active="/home"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item index="/home">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/member/">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">会员管理</span>
                </el-menu-item>
                <el-menu-item index="/supplier/">
                    <i class="el-icon-s-cooperation"></i>
                    <span slot="title">供应商管理</span>
                </el-menu-item>
                <el-menu-item index="/goods/">
                    <i class="el-icon-s-shop"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/staff/">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">员工管理</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang="scss" module>
</style>
<style lang="scss">
.el-menu {
    border-right: none;
}
</style>