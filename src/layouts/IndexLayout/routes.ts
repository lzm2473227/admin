import { RoutesDataItem } from "@/utils/routes";
import BlankLayout from "@/layouts/BlankLayout.vue";

const IndexLayoutRoutes: Array<RoutesDataItem> = [
  //门店菜单及权限
  {
    icon: "home",
    title: "商品",
    path: "/product",
    roles: ["product"],
    component: () => import("@/views/product/productlist.vue"),
  },
  {
    title: "商品类别设置",
    path: "/commodity1",
    roles: ["commodity1"],
    component: () => import("@/views/product/commodity1.vue"),
  },
  {
    title: "上架中商品列表",
    path: "/commodity2",
    roles: ["commodity2"],
    component: () => import("@/views/product/commodity2.vue"),
  },
  {
    icon: "home",
    title: "新增商品",
    path: "/newproduct",
    roles: ["newproduct"],
    component: () => import("@/views/product/newproduct.vue"),
    hidden: true,
    selectLeftMenu: "/product",
  },
  //内部设置
  {
    title: "设置",
    path: "/setting",
    redirect: "/setting/storelist",
    component: BlankLayout,
    roles: ["setting"],
    children: [
      {
        title: "门店列表",
        path: "/setting/storelist",
        roles: ["storelist"],
        component: () => import("@/views/setting/storelist.vue"),
      },
      {
        title: "新增门店",
        path: "/setting/newstore",
        roles: ["newstore"],
        component: () => import("@/views/setting/newstore.vue"),
        hidden: true,
        selectLeftMenu: "/setting/storelist",
      },
      {
        title: "新增门店",
        path: "/setting/newstore",
        roles: ["newstore"],
        component: () => import("@/views/setting/newstore.vue"),
        hidden: true,
        selectLeftMenu: "/setting/storelist",
      },
      {
        title: "员工管理",
        path: "/setting/clerklist",
        roles: ["clerklist"],
        component: () => import("@/views/setting/clerklist.vue"),
      },
      {
        title: "新增店员",
        path: "/setting/newclerktwo",
        roles: ["newclerktwo"],
        component: () => import("@/views/setting/newclerktwo.vue"),
        selectLeftMenu: "/setting/clerklist",
        hidden: true,
      },
      {
        title: "新增店员",
        path: "/setting/newclerk",
        roles: ["newclerk"],
        component: () => import("@/views/setting/newclerk.vue"),
        selectLeftMenu: "/setting/clerklist",
        hidden: true,
      },
      {
        title: "岗位管理",
        path: "/setting/role",
        roles: ["role"],
        component: import("@/views/setting/rolelist.vue"),
      },
      {
        title: "权限分配",
        path: "/setting/Authority",
        roles: ["Authority"],
        component: () => import("@/views/setting/Authority.vue"),
        hidden: true,
        selectLeftMenu: "/setting/rolelist",
      },
      {
        title: "新增角色",
        path: "/setting/newrole",
        roles: ["newrole"],
        redirect: "/setting/newrole",
        component: import("@/views/setting/newrole.vue"),
      },
      {
        title: "修改密码",
        path: "/setting/editpsw",
        roles: ["editpsw"],
        component: () => import("@/views/setting/editpsw.vue"),
      },
      {
        title: "机具管理",
        path: "/setting/machine",
        roles: ["machine"],
        component: () => import("@/views/setting/machine.vue"),
      },
      {
        title: "新增机具",
        path: "/setting/machinenew",
        roles: ["machinenew"],
        component: () => import("@/views/setting/machinenew.vue"),
        selectLeftMenu: "/setting/machine",
        hidden: true,
      },
      {
        title: "广告管理",
        path: "/setting/advertmentlist",
        roles: ["advertmentlist"],
        component: () => import("@/views/setting/advertmentlist.vue"),
      },
      {
        title: "对公账户",
        path: "/setting/public",
        roles: ["public"],
        component: () => import("@/views/setting/public.vue"),
      },
      {
        title: "文件管理",
        path: "/setting/file",
        roles: ["file"],
        component: () => import("@/views/setting/file.vue"),
      },
      {
        title: "新增广告",
        path: "/setting/newadvertmenttwo",
        roles: ["newadvertmenttwo"],
        component: () => import("@/views/setting/newadvertmenttwo.vue"),
        selectLeftMenu: "/setting/advertmentlist",
        hidden: true,
      },
      {
        title: "活动列表",
        path: "/setting/promotion",
        roles: ["promotion"],
        component: () => import("@/views/setting/promotion.vue"),
        hidden: true,
      },
      {
        title: "新增活动折扣",
        path: "/setting/newactivity",
        roles: ["newactivity"],
        component: () => import("@/views/setting/newactivity.vue"),
        selectLeftMenu: "/setting/newactivity",
        hidden: true,
      },
      {
        title: "活动商品列表",
        path: "/setting/Sellinglist",
        roles: ["Sellinglist"],
        component: () => import("@/views/setting/Sellinglist.vue"),
        hidden: true,
      },
      {
        title: "匹配商品小类",
        path: "/setting/newselling",
        roles: ["newselling"],
        component: () => import("@/views/setting/newselling.vue"),
        hidden: true,
      },
      {
        title: "排除商品",
        path: "/setting/ruleOutGoods",
        roles: ["ruleOutGoods"],
        component: () => import("@/views/setting/ruleOutGoods.vue"),
        hidden: true,
      },
      {
        title: "积分管理",
        path: "/setting/integral",
        redirect: "/setting/integral/integralrule",
        component: BlankLayout,
        roles: ["integral"],
        children: [
          {
            title: "规则设置",
            path: "integralrule",
            roles: ["integralrule"],
            component: () => import("@/views/setting/integral/integralrule.vue"),
            hidden: true,
          },
          {
            title: "积分对象",
            path: "integralobj",
            roles: ["integralobj"],
            component: () => import("@/views/setting/integral/integralobj.vue"),
            selectLeftMenu:"/setting/integral/integralobj",
            hidden: true,
          },
          {
            title: "会员等级设置",
            path: "memberset",
            roles: ["memberset"],
            component: () => import("@/views/setting/integral/memberset.vue"),
            hidden: true,
          },
          {
            title: "新增规则",
            path: "newintegralrule",
            roles: ["newintegralrule"],
            component: () => import("@/views/setting/integral/newintegralrule.vue"),
            hidden: true,
          },
          {
            title: "积分明细",
            path: "newintegralobj",
            roles: ["newintegralobj"],
            component: () => import("@/views/setting/integral/newintegralobj.vue"),
            hidden: true,
          },
          {
            title: "编辑等级",
            path: "newmemberset",
            roles: ["newmemberset"],
            component: () => import("@/views/setting/integral/newmemberset.vue"),
            hidden: true,
          },
        ],
      },
    ],
  },
  //凯华管理员
  {
    title: "凯华系统用户",
    path: "/sysuser",
    redirect: "/sysuser/customer",
    component: BlankLayout,
    roles: ["sysuser"],
    children: [
      {
        title: "消费者",
        path: "customer",
        roles: ["customer"],
        component: () => import("@/views/sysuser/customer.vue"),
      },
      {
        title: "门店",
        path: "store",
        component: () => import("@/views/store/storelist.vue"),
        roles: ["store"],
      },
      {
        title: "物流配送",
        path: "logistics",
        roles: ["logistics"],
        component: () => import("@/views/sysuser/logistics.vue"),
      },
      {
        title: "物流仓库",
        path: "warehouse",
        roles: ["warehouse"],
        component: () => import("@/views/sysuser/warehouse.vue"),
      },
      {
        title: "工厂",
        path: "factory",
        roles: ["factory"],
        component: () => import("@/views/sysuser/factory.vue"),
      },
      {
        title: "保险",
        path: "insurance",
        roles: ["insurance"],
        component: () => import("@/views/sysuser/insurance.vue"),
      },
      {
        title: "银行",
        path: "bank",
        roles: ["bank"],
        component: () => import("@/views/sysuser/bank.vue"),
      },
    ],
  },
  //系统用户管理
  {
    title: "系统用户管理",
    path: "/systemUser",
    redirect: "/systemUser/userlist",
    component: BlankLayout,
    roles: ["systemUser"],
    children: [
      // {
      //   title: "系统用户列表",
      //   path: "/systemUser/userlist",
      //   roles: ["userlist"],
      //   component: () => import("@/views/systemUser/userlist.vue"),
      // },
      {
        title: "新增消费者",
        path: "/systemUser/newconsumerlist",
        roles: ["newconsumerlist"],
        component: () => import("@/views/systemUser/newconsumerlist.vue"),
      },
      {
        title: "新增经销商",
        path: "/systemUser/newdealer",
        roles: ["newdealer"],
        component: () => import("@/views/systemUser/newdealer.vue"),
      },
      {
        title: "新增银行机构",
        path: "/systemUser/newbank",
        roles: ["newbank"],
        component: () => import("@/views/systemUser/newbank.vue"),
      },
      {
        title: "新增物流配送",
        path: "/systemUser/newlogistics",
        roles: ["newlogistics"],
        component: () => import("@/views/systemUser/newlogistics.vue"),
      },
      {
        title: "新增物流仓库",
        path: "/systemUser/newwarehouse",
        roles: ["newwarehouse"],
        component: () => import("@/views/systemUser/newwarehouse.vue"),
      },
      {
        title: "新增工厂",
        path: "/systemUser/newfactory",
        roles: ["newfactory"],
        component: () => import("@/views/systemUser/newfactory.vue"),
      },
      {
        title: "新增保险机构",
        path: "/systemUser/newinsurance",
        roles: ["newinsurance"],
        component: () => import("@/views/systemUser/newinsurance.vue"),
      },
      {
        title: "经销商",
        path: "/systemUser/dealer",
        roles: ["dealer"],
        component: () => import("@/views/systemUser/dealer.vue"),
      },
      {
        title: "消费者",
        path: "/systemUser/consumerlist",
        roles: ["consumerlist"],
        component: () => import("@/views/systemUser/consumerlist.vue"),
      },
      {
        title: "物流配送",
        path: "logistics",
        roles: ["logistics"],
        component: () => import("@/views/systemUser/logistics.vue"),
      },
      {
        title: "物流仓库",
        path: "warehouse",
        roles: ["warehouse"],
        component: () => import("@/views/systemUser/warehouse.vue"),
      },
      {
        title: "工厂",
        path: "factory",
        roles: ["factory"],
        component: () => import("@/views/systemUser/factory.vue"),
      },
      {
        title: "保险机构",
        path: "insurance",
        roles: ["insurance"],
        component: () => import("@/views/systemUser/insurance.vue"),
      },
      {
        title: "银行机构",
        path: "bank",
        roles: ["bank"],
        component: () => import("@/views/systemUser/bank.vue"),
      },
    ],
  },
  // 银行开户管理
  {
    title: "门店店员 ",
    path: "/systembank",
    roles: ["systembank"],
    component: BlankLayout,
    children: [
      {
        title: "盘货",
        path: "commissionrule",
        roles: ["commissionrule"],
        component: BlankLayout,
        children: [
          {
            title: "待盘货",
            path: "set",
            roles: ["set"],
            component: () =>
              import("@/views/systembank/commissionrule/set.vue"),
          },
          {
            title: "待盘货统计",
            path: "noset",
            roles: ["noset"],
            component: () =>
            import("@/views/systembank/commissionrule/noset.vue"),
          },
        ],
      },
      {
        title: "盘货",
        path: "commissionrule",
        roles: ["commissionrule"],
        component: BlankLayout,
        children: [
          {
            title: "待盘货",
            path: "set",
            roles: ["set"],
            component: () =>
              import("@/views/systembank/commissionrule/set.vue"),
          },
          {
            title: "待盘货统计",
            path: "noset",
            roles: ["noset"],
            component: () =>
            import("@/views/systembank/commissionrule/noset.vue"),
          },
        ],
      },
      {
        title: "盘货",
        path: "commissionrule",
        roles: ["commissionrule"],
        component: BlankLayout,
        children: [
          {
            title: "待盘货",
            path: "set",
            roles: ["set"],
            component: () =>
              import("@/views/systembank/commissionrule/set.vue"),
          },
          {
            title: "待盘货统计",
            path: "noset",
            roles: ["noset"],
            component: () =>
            import("@/views/systembank/commissionrule/noset.vue"),
          },
        ],
      },
      {
        title: "盘货",
        path: "commissionrule",
        roles: ["commissionrule"],
        component: BlankLayout,
        children: [
          {
            title: "待盘货",
            path: "set",
            roles: ["set"],
            component: () =>
              import("@/views/systembank/commissionrule/set.vue"),
          },
          {
            title: "待盘货统计",
            path: "noset",
            roles: ["noset"],
            component: () =>
            import("@/views/systembank/commissionrule/noset.vue"),
          },
        ],
      }, 
    ],
  }, 
  //系统内部设置
  {
    title: "系统内部设置",
    path: "/systemset",
    redirect: "/systemset/systemsetrole",
    component: BlankLayout,
    roles: ["systemset"],
    children: [
      {
        title: "角色权限",
        path: "/systemset/systemsetrole",
        roles: ["systemsetrole"],
        component: () => import("@/views/systemset/systemsetrole.vue"),
      },
      {
        title: "新增管理角色",
        path: "/systemset/newsystemsetrole",
        roles: ["newsystemsetrole"],
        component: () => import("@/views/systemset/newsystemsetrole.vue"),
      },
      {
        title: "功能菜单",
        path: "/systemset/systemsetmenu",
        roles: ["systemsetmenu"],
        component: () => import("@/views/systemset/systemsetmenu.vue"),
      },
    ],
  },
  {
    title: "商品详情",
    path: "/productinfo",
    component: () => import("@/views/product/productinfo.vue"),
    roles: ["productinfo"],
    hidden: true,
    selectLeftMenu: "/product",
  },
  {
    title: "审核",
    path: "/storeapproval",
    component: () => import("@/views/store/storeapproval.vue"),
    roles: ["storeapproval"],
    hidden: true,
    selectLeftMenu: "/store",
  },
  {
    icon: "set",
    title: "凯华内部设置",
    path: "/khset",
    redirect: "/khset/rolepower",
    component: BlankLayout,
    roles: ["khset"],
    children: [
      {
        title: "员工管理",
        path: "/rolepower",
        roles: ["rolepower"],
        component: () => import("@/views/khset/rolepower.vue"),
      },
      {
        title: "岗位管理",
        path: "/funcmenu",
        roles: ["funcmenu"],
        component: () => import("@/views/khset/funcmenu.vue"),
      },
    ],
  },
  // 店员，店长，经销商
  {
    title: "用户级别",
    path: "/userlv",
    redirect: "/userlv/clerk/receive/noreceive",
    component: BlankLayout,
    roles: ["userlv"],
    children: [
      {
        title: "门店店员 ",
        path: "/clerk",
        roles: ["clerk"],
        component: BlankLayout,
        children: [
          {
            title: "盘货",
            path: "/clerk/check",
            roles: ["clerkcheck"],
            component: BlankLayout,
            children: [
              {
                title: "待盘货",
                path: "/clerk/check/nocheckproduct",
                roles: ["clerknocheckproduct"],
                component: () =>
                  import("@/views/userlv/clerk/check/nocheckproduct.vue"),
              },
              {
                title: "待盘货统计",
                path: "/clerk/check/nocheckproductStatistics",
                roles: ["clerknocheckproduct"],
                component: () =>
                  import(
                    "@/views/userlv/clerk/check/nocheckproductStatistics.vue"
                  ),
              },
              {
                title: "已盘货",
                path: "/clerk/check/checkproduct",
                roles: ["clerkcheckproduct"],
                component: () =>
                  import("@/views/userlv/clerk/check/checkproduct.vue"),
              },
              {
                title: "已盘货统计",
                path: "/clerk/check/checkproductStatistics",
                roles: ["clerkcheckproduct"],
                component: () =>
                  import(
                    "@/views/userlv/clerk/check/checkproductStatistics.vue"
                  ),
              },
            ],
          },
          {
            title: "收货",
            path: "/clerk/receive",
            roles: ["clerkreceive"],
            component: BlankLayout,
            children: [
              {
                title: "待收货",
                path: "/clerk/receive/noreceive",
                roles: ["clerknoreceive"],
                component: () =>
                  import("@/views/userlv/clerk/receive/noreceive.vue"),
              },
              {
                title: "待收货统计",
                path: "/clerk/receive/noreceiveStatistics",
                roles: ["clerkreceive"],
                component: () =>
                  import(
                    "@/views/userlv/clerk/receive/noreceiveStatistics.vue"
                  ),
              },
              {
                title: "单品编码明细",
                path: "/clerk/receive/codeList",
                roles: ["clerkreceive"],
                component: () => import("@/views/userlv/clerk/receive/codeList.vue"),
              },
              {
                title: "单品编码详情",
                path: "/clerk/receive/codeDetail",
                roles: ["clerkreceive"],
                component: () => import("@/views/userlv/clerk/receive/codeDetail.vue"),
              },
              {
                // icon: "detail",
                title: "已收货",
                path: "/clerk/receive/receive",
                roles: ["clerkreceive"],
                component: () =>
                  import("@/views/userlv/clerk/receive/receive.vue"),
              },
              {
                title: "已收货统计",
                path: "/clerk/receive/receiveStatistics",
                roles: ["clerkreceive"],
                component: () =>
                  import("@/views/userlv/clerk/receive/receiveStatistics.vue"),
              },
            ],
          },
          {
            title: "销售",
            path: "/clerk/sale",
            roles: ["clerksale"],
            component: BlankLayout,
            children: [
              {
                title: "待售出",
                path: "/clerk/sale/nosale",
                roles: ["clerknosale"],
                component: () => import("@/views/userlv/clerk/sale/nosale.vue"),
              },
              {
                title: "待售出订单详情",
                path: "/clerk/sale/noSaleOrderDetail",
                roles: ["clerknosale"],
                component: () => import("@/views/userlv/clerk/sale/noSaleOrderDetail.vue"),
              },
              {
                title: "待售出统计",
                path: "/clerk/sale/nosaleStatistics",
                roles: ["clerknosale"],
                component: () =>
                  import("@/views/userlv/clerk/sale/nosaleStatistics.vue"),
              },
              {
                title: "已售出",
                path: "/clerk/sale/sales",
                roles: ["clerksale"],
                component: () => import("@/views/userlv/clerk/sale/sales.vue"),
              },
              {
                title: "已售出统计",
                path: "/clerk/sale/saleStatistics",
                roles: ["clerksale"],
                component: () =>
                  import("@/views/userlv/clerk/sale/saleStatistics.vue"),
              },
              {
                title: "已售出订单详情",
                path: "/clerk/sale/saleOrderDetail",
                roles: ["clerksale"],
                component: () => import("@/views/userlv/clerk/sale/saleOrderDetail.vue"),
              },
            ],
          },
          {
            title: "银行开户",
            path: "/clerk/bank",
            roles: ["clerkbank"],
            component: BlankLayout,
            children: [
              {
                title: "待开户",
                path: "/clerk/bank/nobank",
                roles: ["clerkbank"],
                component: () => import("@/views/userlv/clerk/bank/nobank.vue"),
              },
              {
                title: "申请开户",
                path: "/clerk/bank/openAccount",
                roles: ["clerkbank"],
                component: () =>
                  import("@/views/userlv/clerk/bank/openAccount.vue"),
              },
              {
                title: "待开户统计",
                path: "/clerk/bank/nobankStatistics",
                roles: ["clerkbankStatistics"],
                component: () =>
                  import("@/views/userlv/clerk/bank/nobankStatistics.vue"),
              },
              {
                title: "已开户",
                path: "/clerk/bank/bank",
                roles: ["clerkbank"],
                component: () => import("@/views/userlv/clerk/bank/bank.vue"),
              },
            ],
          },
          {
            title: "保单推送",
            path: "/clerk/insurance",
            roles: ["clerkguarantee"],
            component: BlankLayout,
            children: [
              {
                title: "待推送",
                path: "/clerk/insurance/noguarantee",
                roles: ["clerkguarantee"],
                component: () =>
                  import("@/views/userlv/clerk/insurance/noguarantee.vue"),
              },
              {
                title: "已推送",
                path: "/clerk/insurance/guarantee",
                roles: ["clerkguarantee"],
                component: () =>
                  import("@/views/userlv/clerk/insurance/guarantee.vue"),
              },
            ],
          },
        ],
      },
      {
        title: "门店店长",
        path: "/userlv/shopowner/noreceive",
        roles: ["shopowner"],
        component: BlankLayout,
        children: [
          {
            title: "待收货",
            path: "/shopowner/noreceive",
            roles: ["shopownernoreceive"],
            component: () => import("@/views/userlv/shopowner/noreceive.vue"),
          },
          {
            title: "已收货",
            path: "/shopowner/receive",
            roles: ["shopownerreceive"],
            component: () => import("@/views/userlv/shopowner/receive.vue"),
          },
          {
            title: "待盘点",
            path: "/shopowner/nocheckproduct",
            roles: ["shopownernocheckproduct"],
            component: () =>
              import("@/views/userlv/shopowner/nocheckproduct.vue"),
          },
          {
            title: "已盘点",
            path: "/shopowner/checkproduct",
            roles: ["shopownercheckproduct"],
            component: () =>
              import("@/views/userlv/shopowner/checkproduct.vue"),
          },
          {
            title: "待出售 ",
            path: "/shopowner/nosale",
            roles: ["shopownernosale"],
            component: () => import("@/views/userlv/shopowner/nosale.vue"),
          },
          {
            title: "已出售",
            path: "/shopowner/sales",
            roles: ["shopownersales"],
            component: () => import("@/views/userlv/shopowner/sales.vue"),
          },
          {
            title: "银行开户",
            path: "/shopowner/bank",
            roles: ["shopownerbank"],
            component: () => import("@/views/userlv/shopowner/bank.vue"),
          },
          {
            title: "保单推送",
            path: "/shopowner/guarantee",
            roles: ["shopownerguarantee"],
            component: () => import("@/views/userlv/shopowner/guarantee.vue"),
          },
        ],
      },
      {
        title: "市级经销商",
        path: "/citydistributor",
        roles: ["citydistributor"],
        component: BlankLayout,
        children: [
          {
            title: "待收货",
            path: "/citydistributor/noreceive",
            roles: ["citydistributornoreceive"],
            component: () =>
              import("@/views/userlv/citydistributor/noreceive.vue"),
          },
          {
            title: "已收货",
            path: "/citydistributor/receive",
            roles: ["citydistributorreceive"],
            component: () =>
              import("@/views/userlv/citydistributor/receive.vue"),
          },
          {
            title: "待盘点",
            path: "/citydistributor/nocheckproduct",
            roles: ["citydistributornocheckproduct"],
            component: () =>
              import("@/views/userlv/citydistributor/nocheckproduct.vue"),
          },
          {
            title: "已盘点",
            path: "/citydistributor/checkproduct",
            roles: ["citydistributorcheckproduct"],
            component: () =>
              import("@/views/userlv/citydistributor/checkproduct.vue"),
          },
          {
            title: "待出售 ",
            path: "/citydistributor/nosale",
            roles: ["citydistributornosale"],
            component: () =>
              import("@/views/userlv/citydistributor/nosale.vue"),
          },
          {
            title: "已出售",
            path: "/citydistributor/sales",
            roles: ["citydistributorsales"],
            component: () => import("@/views/userlv/citydistributor/sales.vue"),
          },
          {
            title: "银行开户",
            path: "/citydistributor/bank",
            roles: ["citydistributorbank"],
            component: () => import("@/views/userlv/citydistributor/bank.vue"),
          },
          {
            title: "保单推送",
            path: "/citydistributor/guarantee",
            roles: ["citydistributorguarantee"],
            component: () =>
              import("@/views/userlv/citydistributor/guarantee.vue"),
          },
        ],
      },
      {
        title: "省级经销商 ",
        path: "/provincedistributor",
        roles: ["provincedistributor"],
        component: BlankLayout,
        children: [
          {
            title: "待收货",
            path: "/provincedistributor/noreceive",
            roles: ["provincedistributornoreceive"],
            component: () =>
              import("@/views/userlv/provincedistributor/noreceive.vue"),
          },
          {
            title: "已收货",
            path: "/provincedistributor/receive",
            roles: ["provincedistributorreceive"],
            component: () =>
              import("@/views/userlv/provincedistributor/receive.vue"),
          },
          {
            title: "待盘点",
            path: "/provincedistributor/nocheckproduct",
            roles: ["provincedistributornocheckproduct"],
            component: () =>
              import("@/views/userlv/provincedistributor/nocheckproduct.vue"),
          },
          {
            title: "已盘点",
            path: "/provincedistributor/checkproduct",
            roles: ["provincedistributorcheckproduct"],
            component: () =>
              import("@/views/userlv/provincedistributor/checkproduct.vue"),
          },
          {
            title: "待出售 ",
            path: "/provincedistributor/nosale",
            roles: ["provincedistributornosale"],
            component: () =>
              import("@/views/userlv/provincedistributor/nosale.vue"),
          },
          {
            title: "已出售",
            path: "/provincedistributor/sales",
            roles: ["provincedistributorsales"],
            component: () =>
              import("@/views/userlv/provincedistributor/sales.vue"),
          },
        ],
      },
      {
        title: "全国经销商 ",
        path: "/countrydistributor",
        roles: ["countrydistributor"],
        component: BlankLayout,
        children: [
          {
            title: "待收货",
            path: "/countrydistributor/noreceive",
            roles: ["countrydistributornoreceive"],
            component: () =>
              import("@/views/userlv/countrydistributor/noreceive.vue"),
          },
          {
            title: "已收货",
            path: "/countrydistributor/receive",
            roles: ["countrydistributorreceive"],
            component: () =>
              import("@/views/userlv/countrydistributor/receive.vue"),
          },
          {
            title: "待盘点",
            path: "/countrydistributor/nocheckproduct",
            roles: ["countrydistributornocheckproduct"],
            component: () =>
              import("@/views/userlv/countrydistributor/nocheckproduct.vue"),
          },
          {
            title: "已盘点",
            path: "/countrydistributor/checkproduct",
            roles: ["countrydistributorcheckproduct"],
            component: () =>
              import("@/views/userlv/countrydistributor/checkproduct.vue"),
          },
          {
            title: "待出售 ",
            path: "/countrydistributor/nosale",
            roles: ["countrydistributornosale"],
            component: () =>
              import("@/views/userlv/countrydistributor/nosale.vue"),
          },
          {
            title: "已出售",
            path: "/countrydistributor/sales",
            roles: ["countrydistributorsales"],
            component: () =>
              import("@/views/userlv/countrydistributor/sales.vue"),
          },
        ],
      },
    ],
  },
];

export default IndexLayoutRoutes;
