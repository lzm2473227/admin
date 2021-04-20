<template>
    <div>
        <ul class="pagination">
            <!-- <li class="paging-size">
                <select @change="getPageSize">
                    <option v-for="i in sizes" :value="i" :selected="i==pageSize">{{i}}</option>
                </select>
            </li> -->
            <!-- <li class="paging-item" v-if="current-2>0" @click='jump(current-2)'>{{current-2}}</li>
            <li class="paging-item" v-if="current-1>0" @click='jump(current-1)'>{{current-1}}</li>
            <li class="paging-item current" @click='jump(current)'>{{current}}</li>
            <li class="paging-item" v-if="total-current>1" @click='jump(current+1)'>{{current+1}}</li>
            <li class="paging-item" v-if="total-current>2" @click='jump(current+2)'>{{current+2}}</li> -->
            <li class="page-item" :class="{'disabled': current == 1}" @click='jump(current-1)'><img src="../../assets/images/prev.png" alt="">  </li>
            <li class="page-item" :class="{'disabled': current === page}" @click='jump(current+1)'><img src="../../assets/images/next.png" alt=""></li>
            <li class="page-item" :class="{'disabled': current == 1}" @click='jump(1)'><img src="../../assets/images/first-page.png" alt=""></li>
            <li class="page-item" :class="{'disabled': current === page}" @click='jump(page)'><img src="../../assets/images/last-page.png" alt=""></li>
            <!-- <li class="paging-jump">
                <input type="number" v-model="jumpPage" :max="total" min="0"/>
                <input type="button" value="跳转"  @click='jump(jumpPage)'/>
            </li> -->
            <li class="current-page"><span> 第 {{ current }} 页 /&nbsp;</span></li>
            <li><span> 共 {{ page }} 页 </span></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                jumpPage:0
            }
        },
        props:{
            total:Number, // 数据总条数
            current:Number, // 当前页码
            pageSize:Number, // 每页数据条数
            sizes:{
                type:Array,
                default:function(){
                    return [15,25,35]
                }
            }
        },
        computed: {
            page: function () { // 总页数
                return Math.ceil(this.total / this.pageSize);
            },
        },
        mounted(){
            if(this.total-this.current>1){
                this.jumpPage=this.current+1;
            }
            else{
                this.jumpPage=1;
            }
        },
        watch:{
            current(){
                if(this.total-this.current>1){
                    this.jumpPage=this.current+1;
                }
                else{
                    this.jumpPage=1;
                }
            }
        },
        methods:{
            jump(index){
                index=Number(index);
                if (this.current != index && index > 0 && index < this.total + 1) {
                    this.$emit('changeCurrentPage', index);
                }
            },
            getPageSize(e){
                let pageSize=Number(e.target.value);
                this.$emit('getPageSize',pageSize);
            }
        }
    }
</script>

<style lang="scss" scope>
    .pagination{
        list-style: none;
        display: flex;
        align-items: center;
        padding-left: 0;
        margin: 0;
        font-size: 14px;
        li{
            display: flex;
        }
        .page-item{
            margin-left: 15px;
            cursor: pointer;
        }
        .current-page{
            margin-left: 24px;
            padding-left: 24px;
            border-left: 1px solid #D8E8F6;
        }
        span{
            color: #333;
        }
    }

    // .page-wrapper{
    //     padding:20px 10px;
    //     ul{
    //         overflow: hidden;
    //         display: table;
    //         margin: 0 auto;
    //         height: 50px;
    //         list-style: none;
    //         li{
    //             float:left;
    //         }
    //     }
    //     .paging-size{
    //         height:30px;
    //         margin-right:20px;
    //         select{
    //             width:50px;
    //             height:30px;
    //             text-align:center;
    //             border:1px solid #1199F0;
    //         }
    //     }
    //     .paging-item{
    //         height: 30px;
    //         line-height: 30px;
    //         margin: 3px;
    //         padding-left:12px;
    //         padding-right:12px;
    //         border-radius: 5px;
    //         font-size: 12px;
    //         color: #666;
    //         cursor: pointer;
    //         &:hover,&.current{
    //             color:#fff;
    //             background-color: #1199F0;
    //         }
    //     }
    //     .paging-jump{
    //         margin-left:20px;
    //         margin-top:3px;
    //         height:30px;
    //         font-size:0;
    //         overflow: hidden;
    //         input[type="number"]{
    //             float: left;
    //             padding:0 5px;
    //             width:50px;
    //             height:28px;
    //             text-align:center;
    //             border:1px solid #1199F0;
    //         }
    //         input[type="button"]{
    //             float: left;
    //             padding:0 12px;
    //             height:30px;
    //             border:none;
    //             color:#fff;
    //             background-color: #1199F0;
    //         }
    //     }
    // }
</style>