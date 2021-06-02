<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="centerDialogVisible = true"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">添加类别</span></div>
        <div class="print" @click="edit"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑类别</span></div>
        <div class="print" @click="del"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除类别</span></div>
        <div class="print"><img class="icon" src="../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="tab-body">
      <el-table
        :row-class-name="tableRowClassName"
        ref="multipleTable2"
        :data="tabledata"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="c" label="类别编号" align="center" sortable width="280"></el-table-column>
        <el-table-column prop="m" label="商品一级类别" align="center" sortable width="280"></el-table-column>
        <el-table-column prop="p" label="商品二级类别" align="center" sortable width="280"></el-table-column>
        <el-table-column prop="b" label="商品三级类别" align="center" sortable width="280"></el-table-column>
        <el-table-column prop="categoryImage" label="商品三级分类图片" align="center" sortable width="280"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <el-form
        :inline="true"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="input-with-select"
      >
        <el-form-item label="类别名称:" prop="price">
          <el-input v-model="ruleForm.price" placeholder="请输入类别名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="a" type="primary" @click="submitForm">查询</el-button>
          <el-button class="a" type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="添加类别"
      v-model="centerDialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
    >
    <el-form :model="ruleForm">
      <el-form-item label="上级类别：" style="display:flex">
        <!-- <el-select v-model="categoriesCatalog.id" placeholder="请选择上级类别">
          <el-option v-for="item in categoriesCatalog" :key="item.id" 
            :label="item.categoryName" 
            :value="item.categoryName">
          </el-option>  
        </el-select> -->
        <el-cascader
            v-model="value"
            clearable 
            :options="categoriesCatalog"
            :props="setKesLabel"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="活动名称：" style="display:flex">
        <el-input v-model="ruleForm.sortName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类别图片：" style="display:flex">
        <el-upload
        action="http://14.29.162.130:6602/image/imageUpload"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview" >
        <template #default >
          <div  class="imgs-title">
            <i class="el-icon-plus"></i>
          </div>
        </template>         
      </el-upload>
      </el-form-item>
      
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add"
          >确 定</el-button
        >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Page from '@/components/Pagination/page.vue'
import httpreques from '../../utils/httpreques';
export default {
  name: "commodity1",
  data() {
    return {
      total: 0,
      pageSize: 15,
      pageNum: 1,
      centerDialogVisible: false,  //弹出框开关
      textarea: "",
      tabledata: [],   //列表数据
      categoriesCatalog:[],//三级目录
      setKesLabel:{
              value:'parenId',
              label:'categoryName',
              children:'subItemList',
              checkStrictly: true
      },//自定义  级联选择器value label
      value: [],    /* 选中的标签 */
      total: "",
      ruleForm: {
        commodityName: "",
        price: "",
        sort:"",
        sortName:"",
        categoryImage:"",//图片
        parenId:"23"
      },
      // options:[],
    };
  },
  components: {
    Page
  },
  mounted(){
    this.getdata(),
    this.threedirectories()
  },
  methods:{
    getdata() {
      let t = this;
      httpreques(
        "post",
        {
          pageNum: t.pageNum,
          pageSize: t.pageSize,
        },
        "/realbrand-management-service/Classify/Catalog"
      ).then((res) => {
        console.log(res.data.data);
        if (res.data.code == "SUCCESS") {
          _.forEach(res.data.data, function (item, key) {
            item.index = key + 1; //加入index
          });
          t.total = res.data.total;
          t.pageSize = res.data.pageSize;
          t.tabledata = res.data.data;
          t.categoryImage = res.data.data.categoryImage;
          t.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    add() {
      let params = {
        categoryName: this.ruleForm.sortName, //分类名字
        parenId: this.ruleForm.parenId
      };
      httpreques("post", params,"/realbrand-management-service/Classify/InsertClassify")
      .then((res) => {
        console.log(res.data.data);
        if (res.data.code == "SUCCESS") {
          this.$message({
            message:"添加成功",
            type: "success",
          });
          //  this.ruleForm.parenId =
          console.log(res.data);
          console.log(parenId);
          // this.cancelbtn();
        } else {
          //接口错误处理
          this.$message.error(res.data.msg);
        }
      });
    },
    //三级目录
    threedirectories() {
      httpreques(
        "post",{},"/realbrand-management-service/Classify/queryCategoriesCatalogApi"
      ).then((result) => {
        console.log(result.data.data);
        console.log(result.data.data.categoriesCatalog);
        
        if (result.data.code == "SUCCESS") {
          this.categoriesCatalog = result.data.data.categoriesCatalog;
          this.getTreeData(this.categoriesCatalog)
          
        } else {
          this.$message.error(result.data.msg);
        }
      });
    },
    //解决出现空白选项的bug
    getTreeData(data){
        // 循环遍历json数据
        for(var i=0;i<data.length;i++){
            if(data[i].subItemList== "null"||data[i].subItemList.length<1){
                // children若为空数组，则将children设为undefined
                data[i].subItemList=undefined;
            }else {
                // children若不为空数组，则继续 递归调用 本方法
                this.getTreeData(data[i].subItemList);
            }
        }
        return data;
    },
    //图片
    handleAvatarSuccess(res, file) {
      // console.log(file);
      // console.log(res);
      if (res.code === "Success") {
        this.dialogImageUrl = res.data;
        this.ruleForm.categoryImage = res.data;
      }
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/reset.scss';
/deep/.el-form-item--small .el-form-item__content{
 margin-left: 0;
}
</style>
