<template>
    <div>
        <el-breadcrumb separator="/" >
            <el-breadcrumb-item class="line" :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.el-breadcrumb {
    height: 10px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.line {
    padding-left: 20px;
    border-left: 3px solid #317214;
}
</style>