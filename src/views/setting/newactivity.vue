<template>
  <div class="newactivity">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="goBack"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print"><img class="icon" src="@/assets/images/confirm.png" alt=""><span class="axis">保存确认</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div>
      </div>
    </div>
    <div class="table-main">
      <div class="table-title">
        <p>新增折扣活动</p>
      </div>
      <form action="#">
        <table border="1" class="">
          <tr>
            <td class="table-left">大活动名称</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="大活动名称"
                v-model="ruleForm.serialNumber"
              />
            </td>
            <td class="table-left">促销活动</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="促销活动"
                v-model="ruleForm.name"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">起始时间</td>
            <td class="table-right">
              <el-date-picker
                v-model="ruleForm.startTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                prefix-icon=none
                placeholder="请选择起始时间" 
              >
              </el-date-picker>
            </td>
            <td class="table-left">截止时间</td>
            <td class="table-right">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                prefix-icon=none
                placeholder="请选择截至时间"
              >
              </el-date-picker>
            </td>
          </tr>

          <tr>
            <td class="table-left">小活动编号</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="活动编号由系统自动生成"
                v-model="ruleForm.serialNumber"
              />
            </td>
            <td class="table-left">小活动名称</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="小活动名称"
                v-model="ruleForm.name"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left" >活动规则</td>
            <td class="table-right" colspan="3" >
            <div style="display:flex; align-items: center;">
              折扣比例<input type="text"  style="width:90%">
            </div>
          </td>
          </tr>

          <tr>
            <td class="table-left">活动对象</td>
            <td class="table-right" colspan="3">
              <el-radio-group v-model="ruleForm.customer">
                <el-radio label="1" style="margin-right:40px">全部</el-radio>
                <el-radio label="2" style="margin-right:40px" @click="appoint">指定消费者</el-radio>
              </el-radio-group>
            </td>

          </tr>

          <tr>
            <td class="table-left" style="height:620px">活动内容</td>
            <td class="table-right" colspan="3">
              <textarea
                style="height:620px"
                class="table-item"
                placeholder="此段文字是关于五一节活动折扣促销的文字描述"
              ></textarea>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <el-dialog title="" v-model="centerDialogVisible" width="30%" :close-on-click-modal="false">
      <tr>
        <td class="table-left">性别</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1" class="rad">男</el-radio>
            <el-radio label="2" class="rad">女</el-radio>
            <el-radio label="3" class="rad">未知</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="table-left">年龄区间</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.age">
            <el-radio label="1" class="rad">≥18周岁</el-radio>
            <el-radio label="2" class="rad">≥50周岁</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="table-left">生日</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.birthday">
            <el-radio label="1" class="rad">本月生日</el-radio>
            <el-radio label="2" class="rad">本周生日</el-radio>
            <el-radio label="3" class="rad">本日生日</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td class="table-left">职业</td>
        <td class="table-right" style="margin-right:18px">
          <el-radio-group v-model="ruleForm.profession">
            <el-radio label="1" class="rad">医生</el-radio>
            <el-radio label="2" class="rad">教师</el-radio>
            <el-radio label="3" class="rad">其他</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
  name:"newactivity",
  data(){
    return{
      ruleForm:{
        name:"",
        serialNumber:"",
        startTime:"",
        endTime:"",
        customer:[
          {id:1,name:"全部"},
          {id:2,name:"指定消费者"}
        ],
        sex:[
          {nan:"男"},
          {nv:"女"},
          {weizhi:"未知"},
        ]
      },
      centerDialogVisible:false,
    }
  },
  methods:{
    appoint(){
      this.centerDialogVisible = true
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/reset';
/deep/.el-input--small .el-input__inner{
  height: 20px;
  line-height: 20px;
}
 /deep/.el-input__inner,/deep/.el-input{
  line-height: 20px;
  width: 196px;
}
.rad{
  margin-right:40px
}
.table-left{
  width: 80px;
}
/deep/.el-dialog__header{
  padding: 5px;
}

</style>