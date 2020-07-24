<template>
    <div>
        <!-- 上方查询条件 -->
        <el-form :inline="true" ref="searchForm" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item prop="linkman">
                <el-input v-model="searchMap.code" placeholder="商品编码"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <!-- el-input是组件  在组件上面绑定原生事件需要用到native关键字  v-on:原生事件.native=""  -->
                <el-input
                    v-model="searchMap.supplierName"
                    placeholder="供应商"
                    @click.native="dialogSupplierVisible=true"
                    readonly
                ></el-input>
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
            <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="code" label="商品编码" width="150"></el-table-column>
            <el-table-column prop="spec" label="商品规格"></el-table-column>
            <el-table-column prop="retailPrice" label="零售价"></el-table-column>
            <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
            <el-table-column prop="storageNum" label="库存数量"></el-table-column>
            <el-table-column prop="supplierName" label="供应商"></el-table-column>
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
        <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                label-width="120px"
                label-position="right"
                :rules="rules"
                ref="pojoForm"
                :model="pojo"
            >
                <el-form-item label="商品名称" prop="name">
                    <!-- 当表单的item指定了prop字段名， 那么表单绑定的对象的字段都要有默认值（空也行） -->
                    <el-input v-model="pojo.name" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="pojo.code" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品规格" prop="spec">
                    <el-input v-model="pojo.spec" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="pojo.retailPrice" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice">
                    <el-input v-model="pojo.purchasePrice" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="storageNum">
                    <el-input v-model="pojo.storageNum" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierName">
                    <el-input v-model="pojo.supplierName" autocomplete="off" clearable></el-input>
                </el-form-item>
                <!-- <el-form-item label="商品规格" prop="remark">
                    <el-input
                        v-model="pojo.remark"
                        autocomplete="off"
                        type="textarea"
                        :rows="3"
                        :clearable="true"
                        resize="none"
                    ></el-input>
                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="pojo.id===null?addData('pojoForm'):updateData('pojoForm')"
                >确 定</el-button>
            </div>
        </el-dialog>

        <!-- 选择供应商对话框 -->
        <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="500px">
            <supplier />
        </el-dialog>
    </div>
</template>

<script>
import goodsApi from "@/api/goods";
import Supplier from "@/views/supplier";
export default {
    components: { Supplier },
    data() {
        return {
            list: [],
            dialogFormVisible: false,
            //选择供应商对话框
            dialogSupplierVisible: false,
            pageSize: 10,
            currentPage: 1,
            total: 0,
            searchMap: {},
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
                        message: "商品名称不能为空",
                        trigger: "blur"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "商品编码不能为空",
                        trigger: "blur"
                    }
                ],
                storageNum: [
                    {
                        required: true,
                        message: "库存数量不可为空",
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
            goodsApi
                .search(this.currentPage, this.pageSize, this.searchMap)
                .then(response => {
                    const resp = response.data.data;
                    this.list = resp.rows;
                    this.total = resp.total;
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
        handleAdd() {
            this.dialogFormVisible = true;
        },
        handleEdit() {},
        handleDelete() {},
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
</style>