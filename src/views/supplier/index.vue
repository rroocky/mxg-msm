<template>
    <div>
        <!-- 上方查询条件 -->
        <el-form :inline="true" ref="searchForm" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="供应商"></el-input>
            </el-form-item>
            <el-form-item prop="linkman">
                <el-input v-model="searchMap.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <el-input v-model="searchMap.mobile" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增供应商</el-button>
                <el-button type="danger" @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 数据主体表格 供应商信息 -->
        <el-table :data="list" height="415" border style="width: 100%" stripe>
            <el-table-column label="索引" type="index" width="80"></el-table-column>
            <el-table-column prop="name" label="供应商名称" width="200"></el-table-column>
            <el-table-column prop="linkman" label="联系人" width="150"></el-table-column>
            <el-table-column prop="mobile" label="联系电话"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
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
        <!-- 对话框--弹出新增窗口 :visible=true 的时候显示 -->
        <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                label-width="120px"
                label-position="right"
                :rules="rules"
                ref="pojoForm"
                :model="pojo"
            >
                <el-form-item label="供应商名称" prop="name">
                    <!-- 当表单的item指定了prop字段名， 那么表单绑定的对象的字段都要有默认值（空也行） -->
                    <el-input v-model="pojo.name" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman">
                    <el-input v-model="pojo.linkman" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input v-model="pojo.mobile" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input
                        v-model="pojo.remark"
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

<script>
import supplierApi from "@/api/supplier.js";
export default {
    data() {
        return {
            list: [],
            //每页数据量
            pageSize: 20,
            //当前页码
            currentPage: 1,
            total: 0,
            //查询条件
            searchMap: {
                name: "",
                linkman: "",
                mobile: "",
                remark: ""
            },
            //新增弹出框显示条件
            dialogFormVisible: false,
            //新增供应商提交信息
            pojo: {
                // 条件查询绑定的条件值
                //当表单的item指定了prop字段名， 那么表单绑定的对象的字段都要有默认值（空也行）
                // 否则指定了prop字段名的表单元素输入不了。
                id: null,
                name: "",
                linkman: "",
                mobile: "",
                remark: ""
            },
            // 新增供应商表单校验规则
            rules: {
                name: [
                    {
                        required: true,
                        message: "供应商名称不能为空",
                        trigger: "blur"
                    }
                ],
                linkman: [
                    {
                        required: true,
                        message: "供应商联系人不能为空",
                        trigger: "blur"
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: "联系电话不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            supplierApi
                .search(this.currentPage, this.pageSize, this.searchMap)
                .then(response => {
                    const resp = response.data;
                    this.list = resp.data.rows;
                    this.total = resp.data.total;
                });
        },
        //新增按钮事件
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
        //新增供应商
        addData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    supplierApi.add(this.pojo).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            //响应成功 重新加载数据
                            this.fetchData();
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
        //编辑供应商按钮
        handleEdit(id) {
            this.handleAdd();
            supplierApi.getById(id).then(response => {
                let resp = response.data;
                //查询到的数据绑定到弹出框------pojo对象的id默认值为null，但是查出来的数据id不为null
                //所以判断id的值类型可以使弹出框的确定按钮执行不同的 事件
                this.pojo = resp.data;
            });
        },
        //更新编辑后的供应商信息
        updateData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    supplierApi.update(this.pojo).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            this.dialogFormVisible = false;
                            this.fetchData();
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
        //删除供应商
        handleDelete(id) {
            supplierApi.delete(id).then(response => {
                const resp = response.data;
                if (resp.flag) {
                    this.fetchData();
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
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        //重置查询条件
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
</style>