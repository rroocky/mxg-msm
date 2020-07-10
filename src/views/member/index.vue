<template>
    <div>
        <!-- 上方查询条件 -->
        <el-form :inline="true" ref="searchForm" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="会员"></el-input>
            </el-form-item>
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="卡号"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="searchMap.payType" placeholder="支付类型" style="width:110px;">
                    <el-option label="微信" value="1"></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="银行卡" value="3"></el-option>
                    <el-option label="现金" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <div class="block">
                    <!-- value-format 是指定绑定值的格式 -->
                    <el-date-picker
                        style="width: 200px"
                        value-format="yyyy-MM-dd"
                        v-model="searchMap.birthday"
                        type="date"
                        placeholder="出生日期"
                    ></el-date-picker>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fechData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增会员</el-button>
                <el-button type="danger" @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 数据主体表格 会员信息 -->
        <el-table :data="memberList" height="415" border style="width: 100%" stripe>
            <el-table-column label="索引" type="index" width="50"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="cardNum" label="卡号" width="180"></el-table-column>
            <el-table-column prop="birthday" label="生日"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="integral" label="可用积分" width="80"></el-table-column>
            <el-table-column prop="money" label="开卡金额" width="100"></el-table-column>
            <el-table-column prop="payType" label="支付类型" width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.payType|payTypeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址" width="230"></el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="medium" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <!-- 弹出框--删除对话框 -->
                    <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="handleDelete(scope.row.id)">
                        <el-button slot="reference" type="danger" size="medium">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 对话框--弹出新增窗口 
            :visible=true 的时候显示
        -->
        <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                label-width="120px"
                label-position="right"
                :rules="rules"
                ref="pojoForm"
                :model="pojo"
            >
                <el-form-item label="会员姓名" prop="name">
                    <!-- 当表单的item指定了prop字段名， 那么表单绑定的对象的字段都要有默认值（空也行） -->
                    <el-input v-model="pojo.name" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="pojo.cardNum" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthday">
                    <!-- value-format 是指定绑定值的格式 -->
                    <el-date-picker
                        style="width: 200px"
                        value-format="yyyy-MM-dd"
                        v-model="pojo.birthday"
                        type="date"
                        placeholder="出生日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="pojo.phone" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model="pojo.integral" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money">
                    <el-input v-model="pojo.money" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="payType">
                    <el-select v-model="pojo.payType" placeholder="支付类型">
                        <el-option
                            v-for="options in payTypeOptions"
                            :key="options.type"
                            :label="options.name"
                            :value="options.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input
                        v-model="pojo.address"
                        autocomplete="off"
                        type="textarea"
                        :rows="3"
                        :clearable="true"
                        resize="none"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="pojo.id===null?addData('pojoForm'):updateData('pojoForm')"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
    </div>
</template>

<script>
import member from "@/api/member";
const payTypeOptions = [
    { type: 1, name: "微信" },
    { type: 2, name: "支付宝" },
    { type: 3, name: "银行卡" },
    { type: 4, name: "现金" }
];
export default {
    created() {
        this.fechData();
    },
    filters: {
        payTypeFilter(type) {
            const obj = payTypeOptions.find(obj => obj.type == type);
            return obj ? obj.name : null;
        }
    },
    data() {
        return {
            memberList: [],
            //当前页码
            currentPage: 1,
            //每页数量
            pageSize: 20,
            total: 0,
            searchMap: {
                // 条件查询绑定的条件值
                cardNum: "",
                name: "",
                payType: "",
                birthday: ""
            },
            //新增对话框显示隐藏设置
            dialogFormVisible: false,
            //新增会员提交信息
            pojo: {
                // 条件查询绑定的条件值
                //当表单的item指定了prop字段名， 那么表单绑定的对象的字段都要有默认值（空也行）
                // 否则指定了prop字段名的表单元素输入不了。
                id: null,
                name: "",
                cardNum: "",
                birthday: "",
                phone: "",
                integral: 0,
                money: 0,
                payType: "",
                address: ""
            },
            // 支付类型代码对应中文名称
            payTypeOptions,
            // 新增会员表单校验规则
            rules: {
                name: [
                    {
                        required: true,
                        message: "会员姓名不能为空",
                        trigger: "blur"
                    }
                ],
                cardNum: [
                    {
                        required: true,
                        message: "会员卡号不能为空",
                        trigger: "blur"
                    }
                ],
                payType: [
                    {
                        required: true,
                        message: "支付类型不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        fechData() {
            member
                .search(this.currentPage, this.pageSize, this.searchMap)
                .then(response => {
                    const resp = response.data;
                    this.memberList = resp.data.rows;
                    this.total = resp.data.total;
                });
        },
        handleSizeChange(val) {
            //解决每次 请求的url都是/member/list/1/20
            //先更新pageSize,再请求数据
            this.pageSize = val;
            this.fechData();
        },
        handleCurrentChange(val) {
            //解决每次 请求的url都是/member/list/1/20
            //先更新currentPage,再请求数据
            this.currentPage = val;
            this.fechData();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAdd() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                // 异步事件
                // 弹出窗口 加载dom需要时间
                //表单还未渲染出来重置表单出错
                // $nextTick回调函数在dom加载完成后执行，这时候在重置表单就不会出错了
                this.$refs["pojoForm"].resetFields();
            });
        },
        //提交新增会员表单
        addData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    member.add(this.pojo).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            //响应成功 重新加载数据
                            this.fechData();
                            this.$message({
                                showClose: true,
                                message: `${resp.message}`,
                                type: "success"
                            });
                            this.dialogFormVisible = false;
                        } else {
                            this.$message({
                                showClose: true,
                                message: `${resp.message}`,
                                type: "warnning"
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        handleEdit(id) {
            //将会员编辑弹出框打开，并清空值
            this.handleAdd();
            member.getById(id).then(response => {
                const resp = response.data;
                if (resp.flag) {
                    //处理一下请求来的会员信息的支付类型，数字转汉字
                    const obj = this.payTypeOptions.find(
                        obj => obj.type == resp.data.payType
                    );
                    resp.data.payType = obj.name;
                    //将查询到的数据绑定到弹出框
                    this.pojo = resp.data;
                }
            });
        },
        //提交修改会员表单
        updateData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    member.update(this.pojo).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            this.dialogFormVisible = false;
                            this.fechData();
                            this.$message({
                                message: resp.message,
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: resp.message,
                                type: "warning"
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        handleDelete(id) {
            member.delete(id).then(response => {
                const resp = response.data;
                if (resp.flag) {
                    //刷新列表
                    this.fechData();
                    this.$message({
                        message: resp.message,
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: resp.message,
                        type: "warning"
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>