<template>
    <div>
        <div class="main">
            <app-link v-show="$route.path!=='/home'" />
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import AppLink from "./link";
export default {
    components: {
        AppLink
    }
};
</script>

<style>
.el-pagination {
    margin-top: 15px;
}

.demo-form-inline {
    margin-top: 10px;
}
</style>

