<template>
    <div>
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)">
                <img src="../../assets/images/prev.png" alt="">    
            </a></li>
            <!-- <li v-for="p in grouplist" :class="{'active': current == p.val}"><a href="javascript:;" v-on:click="setCurrent(p.val)"> {{ p.text }} </a></li> -->
            <li class="page-item" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent1">
            <!-- <li class="page-item" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)"> -->
                <img src="../../assets/images/next.png" alt="">
            </a></li>
            <li class="page-item" :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)">
                <img src="../../assets/images/first-page.png" alt="">
            </a></li>
            <li class="page-item" :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)">
                <img src="../../assets/images/last-page.png" alt="">    
            </a></li>
            <li class="current-page"><span> 第 {{ current }} 页 /&nbsp;</span></li>
            <li><span> 共 {{ page }} 页 </span></li>
        </ul>
        <!-- <ul class="pagination pull-right">
            <li><span> 共 {{ total }}  条数据 </span></li>
            <li><span> 每页显示 {{ display }}  条数据 </span></li>
            <li><span> 共 {{ page }} 页 </span></li>
            <li><span> 当前第 {{ current }} 页 </span></li>
        </ul> -->
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        total: {            // 数据总条数
            type: Number,
            default: 0
        },
        display: {            // 每页显示条数
            type: Number,
            default: 15
        },
        current: {            // 当前页码
            type: Number,
            default: 1
        },
        pagegroup: {        // 分页条数 -- 奇数
            type: Number,
            default: 5,
            coerce: function (v) {
                v = v > 0 ? v : 5;
                return v % 2 === 1 ? v : v + 1;
            }
        }
    },
    computed: {
        page: function () { // 总页数
            return Math.ceil(this.total / this.display);
        },
        grouplist: function () { // 获取分页页码
            var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
            if (len <= this.pagegroup) {
                while (len--) { temp.push({ text: this.page - len, val: this.page - len }); };
                return temp;
            }
            while (len--) { temp.push(this.page - len); };
            var idx = temp.indexOf(center);
            (idx < count) && (center = center + count - idx);
            (this.current > this.page - count) && (center = this.page - count);
            temp = temp.splice(center - count - 1, this.pagegroup);
            do {
                var t = temp.shift();
                list.push({
                    text: t,
                    val: t
                });
            } while (temp.length);
            if (this.page > this.pagegroup) {
                (this.current > count + 1) && list.unshift({ text: '...', val: list[0].val - 1 });
                (this.current < this.page - count) && list.push({ text: '...', val: list[list.length - 1].val + 1 });
            }
            return list;
        },
        setCurrent1(idx){
            this.set(this.current, this.current++)
            console.log(this.current)
            this.$emit('pagechange', this.current)
        }
    },
    methods: {
        setCurrent(idx){
            if (this.current != idx && idx > 0 && idx < this.page + 1) {
                console.log(this.page)
                this.current = idx;
                this.$emit('pagechange', this.current);
                // return 
            }
        },
        // setCurrent1(idx){
        //     this.set(this.current, this.current++)
        //     console.log(this.current)
        //     this.$emit('pagechange', this.current)
        // }
    }
}
</script>

<style lang="scss" scoped>
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
        a{
            font-size: 0;
        }
        .page-item{
            margin-left: 15px;
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
</style>