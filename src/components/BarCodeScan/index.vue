<template>
  <div>
  </div>
</template>
<script>
let barcodeVue = {
  name: "BarCodeScan",
  props: {
    shopName: {
      type: String
    }
  },
  data() {
    return {
      realBarcode: "",
      keyupLastTime: undefined,
      name: undefined,
      regexRules: [],
      nextCode: '',
      nextTime: '',
      lastTime: '',
      code: '',

    };
  },
  created() {
    let that = this;
    // 监听页面的keyup事件
    document.onkeydown = function (e) {
      that.handleKeyUp1(e);
    };
    this.name = this.shopName;
    this.initRegexRules();
  },
  methods: {
    // 初始化条码规则（自定义）
    initRegexRules() {
        console.log(333)
      this.regexRules = [
        {
          regex: "/^IN(\\w|\\d)+$/",
          value: "putInStorageNumber"
        },
        {
          regex: "/^CH(\\w|\\d)+$/",
          value: "checkNumber"
        },
        {
          regex: "/^AL(\\w|\\d)+$/",
          value: "allocateNumber"
        },
        {
          regex: "/^\\d{12}$/",
          value: "orderNumber"
        },
        {
          regex: "/^SR(\\w|\\d)+$/",
          value: "transferNumber"
        },
        {
          regex: "/^\\d{12}-\\d{3}$/",
          value: "sendNo"
        },
        {
          regex: "/^PL\\d{10}$/",
          value: "wavePickingNumber"
        },
        {
          regex: "/^PL\\d{10}-\\d{3}$/",
          value: "wavePickingGroupNumber"
        },
        {
          regex: "/^(\\w|\\d)*-[\\w|\\d]*-\\d*-[A-Z]-\\d*/",
          value: "location"
        }
      ]
    },
    handleKeyUp1(e) {
        let nextCode,nextTime = '';
        let lastTime = this.lastTime;
        let code = this.code;
        if (window.event) {// IE
            nextCode = e.keyCode
        } else if (e.which) {// Netscape/Firefox/Opera
            nextCode = e.which
        }
        nextTime = new Date().getTime();
        //字母上方 数字键0-9 对应键码值 48-57; 数字键盘 数字键0-9 对应键码值 96-105
        if((nextCode>=48&&this.nextCode<=57) || (this.nextCode>=96&&this.nextCode<=105)){
            console.log(2222)
            let codes = {'48':48,'49':49,'50':50,'51':51,'52':52,'53':53,'54':54,'55':55,'56':56,'57':57,
                '96':48,'97':49,'98':50,'99':51,'100':52,'101':53,'102':54,'103':55,'104':56,'105':57
                };
                nextCode = codes[nextCode];
                nextTime = new Date().getTime();
        }
        // 第二次输入延迟两秒，删除之前的数据重新计算
        if(nextTime && lastTime && nextTime-lastTime>2000){
                code = String.fromCharCode(nextCode);
        }else{
            console.log(6666)
            code += String.fromCharCode(nextCode)
        }
        console.log(nextCode)
        // 保存数据
        this.nextCode = nextCode;
        this.lastTime = nextTime;
        this.code = code;
        // 键入Enter
        if(e.which == 13) {
        // 判断 code 长度（这里就获取到条码值了，以下业务自由发挥）
            // code = $.trim(code)
            console.log(code)
            if (code.length == 13) {
                this.$message('A类条码:' + code);
            } else if (code.length == 23) {
                        this.$message('B类条码:' + code);
            } else if (code.length == 0) {
                        this.$message('请输入条码');
            } else{
                this.$message('条码不合法：' + code);
            }
            //键入回车务必清空code值
            this.code = ''
            return false;
        }
    },
    // 处理keyup事件
    handleKeyUp(e) {
        console.log(111)
      let gap = 0;
      if (this.keyupLastTime) {
        gap = new Date().getTime() - this.keyupLastTime;
        if (gap > 50) {
          gap = 0;
          this.realBarcode = "";
        }
      }
      this.keyupLastTime = new Date().getTime();
      // 输入法会触发keyup事件，key为Process，跳过即可
      if (e.key != "Process" && gap < 50) {
        if (e.key.trim().length == 1) {
          // 输入单个字母或者数字
          this.realBarcode += e.key;
        } else if (e.key.trim() == "Enter") {
            this.realBarcode += String.fromCharCode(e.keyCode)
            console.log(222, this.realBarcode, e)
          // 根据规则，判断barcode类型，返回数据（自定义规则）
        //   if (this.realBarcode) {
            let data = {
            //   type: this.barcodeRule(this.realBarcode),
              code: this.realBarcode,
            //   isLocal: this.isLocal(this.realBarcode)
            };
            this.$emit('handle',data);
            this.realBarcode = "";
        //   }
        }
      }
    },
    // 判断条码类型，如果没找到，则返回类型为barCode
    barcodeRule(barcode) {
        console.log(5555, barcode)
      let value;
      this.regexRules.some((item,index)=>{
         let regex = eval(item.regex);
         if(regex.test(barcode)){
           value = item.value;
           return true;
         }
      })
      console.log(66666,value)
      return value?value:"barCode";
    },
    // 根据条码是否包含门店名，判断是否本地条码
    isLocal(barcode) {
      return this.name?barcode.indexOf(this.name)!=-1:undefined;
    }
  },
};

export default { ...barcodeVue };
</script>