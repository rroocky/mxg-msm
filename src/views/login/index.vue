<template>
    <div :class="$style['login-container']">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :rules="rules"
            :class="$style['login-form']"
        >
            <h2>梦学谷会员管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    login(this.form.username, this.form.password).then(
                        response => {
                            //console.log(response);
                            const resp = response.data;
                            if (resp.flag) {
                                //验证成功 --》通过token获取用户信息
                                getUserInfo(resp.data.token).then(response => {
                                    const userInfo = response.data;
                                    if (userInfo.flag) {
                                        //将用户信息和token保存到本地localstorage
                                        localStorage.setItem(
                                            "mxg-msm-user",
                                            JSON.stringify(userInfo.data)
                                        );
                                        localStorage.setItem(
                                            "mxg-msm-token",
                                            resp.data.token
                                        );
                                        //前往首页
                                        this.$router.push("/");
                                    } else {
                                        //没有获取到用户信息
                                        this.$message({
                                            message: userInfo.message,
                                            type: "warning"
                                        });
                                    }
                                });
                            } else {
                                //后台验证错误
                                this.$message({
                                    message: resp.message,
                                    type: "warning"
                                });
                            }
                        }
                    );
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" module>
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/login.jpg");
    h2 {
        font-size: 24px;
        text-align: center;
    }
}
.login-form {
    width: 350px;
    margin: 160px auto;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
}
</style>