<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="dialogtrue"><img class="icon" src="../../assets/images/add.png" alt=""><span class="axis">添加类别</span></div>
        <div class="print" @click="edit"><img class="icon" src="../../assets/images/edit.png" alt=""><span class="axis">编辑类别</span></div>
        <div class="print" @click="del()"><img class="icon" src="../../assets/images/delete.png" alt=""><span class="axis">删除类别</span></div>
        <div class="print"><img class="icon" src="../../assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="../../assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
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
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop=bid label="类别编号" align="center" sortable width="190"></el-table-column>
        <el-table-column prop="m" label="商品一级类别" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="p" label="商品二级类别" align="center" sortable width="150"></el-table-column>
        <el-table-column prop="b" label="商品三级类别" sortable width="150"></el-table-column>
        <el-table-column label="商品三级分类图片" align="center" sortable width="160">
          <template v-slot="scope">
            <el-image class="preview-img" style="height: 20px" :src="scope.row.image" :preview-src-list="srcList"  @click="onPre(scope.row)"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="" align="center" width="800" ></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot">
      <div class="search-ipt">
        <span class="ipt-left">类别名称</span>
        <input type="text" placeholder="请输入类别名称" v-model="ruleForm.like">
      </div>
      <div class="search-btn">
        <button @click="submitForm">查询</button>
        <button @click="resetForm" class="reset-btn">重置</button>
      </div>
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
        <el-cascader
            ref="demoCascader"
            v-model="value"
            clearable 
            :options="categoriesCatalog"
            :props="setKesLabel"
            @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="类别名称：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请选择类别名称" autocomplete="off"></el-input>
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

    <el-dialog
      title="编辑类别"
      v-model="centerDialogVisible2"
      width="30%"
      center
      :close-on-click-modal="false"
    >
    <el-form :model="ruleForm">
      <el-form-item label="上级类别：" style="display:flex">
        <el-cascader
            ref="demoCascader"
            v-model="fenlei"
            clearable 
            :disabled="true"
            :options="categoriesCatalog"
            :props="setKesLabel"
            @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="活动名称：" style="display:flex">
        <el-input v-model="ruleForm.b"></el-input>
      </el-form-item>
      <el-form-item label="类别图片：" style="display:flex">
        <el-upload
        action="http://14.29.162.130:6602/image/imageUpload"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :file-list="imgArr" 
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
        <el-button type="primary" @click="edittt"
          >确 定</el-button
        >
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
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
      pageSize: 20,
      pageNum: 1,
      centerDialogVisible: false,  //弹出框开关
      centerDialogVisible2: false,  //弹出框开关
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
        b:"",
        bid:"",
        pid:"",
        mid:"",
        categoryId: "0",
        like: '',
        rank:"",   //三级目录标识
        image:"",   //三级目录图片
        
      },
      // options:[],
      // categoryId:""
      multipleSelection:[],
      imgArr:[],
      fenlei:[],
    };
  },
  components: {
    Page
  },
  mounted(){
    this.getdata()
    this.threedirectories()
    // this.handleSelectionChange()
  },
  methods:{
    dialogtrue(){
      this.centerDialogVisible = true
    },
    edit(){    
      if(this.multipleSelection.length != 1) return this.$message('请选择一个需要编辑的商品')
      this.centerDialogVisible2 = true
      // console.log(this.multipleSelection);
      this.ruleForm.bid = this.multipleSelection[0].bid
      this.ruleForm.pid = this.multipleSelection[0].pid
      this.ruleForm.mid = this.multipleSelection[0].mid
      this.ruleForm.b = this.multipleSelection[0].b
      this.ruleForm.image = this.multipleSelection[0].image
      // console.log(this.ruleForm.bid);
      // console.log(this.ruleForm.pid);
      // console.log(this.ruleForm.mid);
    },
    //联动触发事件
    handleChange(){
      const obj = this.$refs['demoCascader'].getCheckedNodes()
      // console.log(obj[0].data)  // 打印出当前选择的value所对应的对象
      // console.log(obj[0].data.categoryId)  
      this.ruleForm.categoryId = obj[0].data.categoryId
      this.ruleForm.rank = obj[0].data.rank
      this.ruleForm.b = obj[0].data.b
      this.ruleForm.bid = obj[0].data.bid
      this.ruleForm.pid = obj[0].data.pid
      this.ruleForm.mid = obj[0].data.mid
      // this.ruleForm.image = obj[0].data.image
    },
    //获取表格的所有值
    handleSelectionChange(val){
      this.multipleSelection = val
      console.log(this.multipleSelection);
      // console.log(val);
    },  
    del(){
      // if(!id) return this.$message('请选择要删除的分类')
      // let id = []
      // let ip = []
      // let im = []
      // let t = this
      // _.forEach(
      //   JSON.parse(JSON.stringify(this.multipleSelection)),
      //   function (item, key) {
      //     id.push(item.bid);
      //   }
      // )
      // _.forEach(
      //   JSON.parse(JSON.stringify(this.multipleSelection)),
      //   function (item, key) {
      //     ip.push(item.pid);
      //   }
      // )
      // _.forEach(
      //   JSON.parse(JSON.stringify(this.multipleSelection)),
      //   function (item, key) {
      //     im.push(item.mid);
      //   }
      // )
      // id = id.toString()
      // ip = ip.toString()
      // im = im.toString()
      // this.id = id ? id : ip ?ip : im;
      // var params = {
      //   id: id ? id : ip ?ip : im,
      // };
      
      let t = this
      // let id

      let params = {
        id: this.multipleSelection[0].bid ? this.multipleSelection[0].bid : this.multipleSelection[0].pid
      }
      httpreques(
        "post",
        params,
        "/realbrand-management-service/Classify/DeleteClassify"
      ).then((res) => {
        if (res.data.code == "SUCCESS") {
          t.$message({
            message: "删除成功",
            type: "success",
          });
          t.getdata();
        } else {
          t.$message.error(res.data.msg);
        }
      });
    },
    getdata() {
      let len = []
      let t = this;
      httpreques(
        "post",
        {
          pageNum: t.pageNum,
          pageSize: t.pageSize,
          like: this.ruleForm.like
        },
        "/realbrand-management-service/Classify/Catalog"
      ).then((res) => {
        // console.log(res.data.data);
        if (res.data.code == "SUCCESS") {
          let commobj = res.data.data;
          console.log(commobj);
          t.total = res.data.total;
          t.pageSize = res.data.pageSize;
          t.categoryImage = res.data.data.categoryImage;
          // this.fenlei = TextToCode[commobj.m][commobj.p][commobj.b].code; 
          this.imgArr.push({url: commobj.image})
          // 序号倒序排列
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          _.forEach(res.data.data, function (item, key) {
            item.index = len[key]
            // item.bid
          });
          t.tabledata = res.data.data;
          // t.tabledata.reverse()
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    add() {
      if(!this.ruleForm.sortName) return this.$message('分类名字不能为空')
      
      let params = {
        categoryName: this.ruleForm.sortName, //分类名字
        categoryId: this.ruleForm.categoryId,
        categoryImage:this.ruleForm.image,
        rank:this.ruleForm.rank
      }
      // console.log(value);
      if(this.ruleForm.rank!=3){
        httpreques("post", params,"/realbrand-management-service/Classify/InsertClassify")
      .then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          this.$message({
            message:"添加成功",
            type: "success",
          });
          this.getdata()
          this.centerDialogVisible = false
        } else {
          //接口错误处理
          this.$message.error(res.data.msg);
        }
      });
      }else{
         this.$message.error("不能选择最后一级，请选择上一级分类")
      }
      // if(this.ruleForm.rank=3) 
    },
    edittt() {
      let params = {
        name: this.ruleForm.b, //分类名字
        id: this.ruleForm.bid,
        url: this.ruleForm.image, //分类图片
      };
      // console.log(value);
      httpreques("post", params,"/realbrand-management-service/Classify/UpdateClassify")
      .then((res) => {
        // console.log(res.data.data);
        if(!this.ruleForm.bid) return this.$message("清添加三级分类")
        if (res.data.code == "SUCCESS") {
          this.$message({
            message:"编辑成功",
            type: "success",
          });
          this.centerDialogVisible2 = false
          this.getdata()
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
      ).then((res) => {
        // console.log(res.data.data);
        // console.log(res.data.data.categoriesCatalog);
        if (res.data.code === "SUCCESS") {
          this.categoriesCatalog = res.data.data.categoriesCatalog;
          this.getTreeData(this.categoriesCatalog)
          this.getdata()
        } else {
          this.$message.error(res.data.msg);
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
    handleAvatarSuccess(res, file) {
      // console.log(file);
      // console.log(res);
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.ruleForm.image = res.data;
      }
      // console.log(this.ruleForm.image);
      console.log(res);
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    },

    onPre(data){
      this.srcList = []
      let list = `${data.image}`
      this.srcList = list.split(',')
    },
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/reset.scss';
/deep/.el-form-item--small .el-form-item__content{
 margin-left: 0;
}
/deep/.tab-body{
  height: 676px;
}
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
</style>
