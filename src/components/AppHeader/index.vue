<template>
    <div>
        <div class="header">
            <a href="#/">
                <img :class="$style.logo" src="@/assets/logo.png" alt width="25px" />
                <span :class="$style.company">梦学谷会员管理系统</span>
            </a>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    下拉菜单
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" command="b">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { logout } from "@/api/login";
export default {
    methods: {
        handleCommand(command) {
            //this.$message("click on item " + command);
            switch (command) {
                case "a":
                    this.$message("click on item " + command);
                    break;
                case "b":
                    //退出登录
                    const token = localStorage.getItem("mxg-msm-user");
                    logout(token).then(response => {
                        const resp = response.data;
                        if (resp) {
                            //退出成功
                            localStorage.removeItem("mxg-msm-user");
                            localStorage.removeItem("mxg-msm-token");
                            //回到登录页
                            this.$router.push("/login");
                        } else {
                            this.$message({
                                message: "退出失败",
                                type: "warnning",
                                duration: 500
                            });
                        }
                    });
                    break;
            }
        }
    }
};
</script>

<style lang="scss" module>
.logo {
    width: 25px;
    vertical-align: middle;
    padding: 0 10px 0 40px;
}
.company {
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1px;
}
</style>
<style lang="scss">
// 下拉菜单
.el-dropdown {
    float: right;
    margin-right: 40px;
    color: #fff;
    cursor: pointer;
}
</style>