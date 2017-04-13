/**
 * Created by 24306 on 2017/4/8.
 */
var vm=new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        checkAllFlag:false,
        productList:[],
        delFlag:false,
        curProduct:[]
    },
    mounted:function(){
       this.$nextTick(function(){
            this.createView();
        })
    },
    filters:{
        formatMoney:function(value){
            // 局部过滤器
            return "￥"+value.toFixed(2);
        },
        money:function(value,type){
            return "￥"+value.toFixed(2)+type;
        }
    },
    methods:{
        createView:function(){
            // 使用箭头函数的好处，保证了this指向的唯一性
            this.$http.get("data/cart.json").then(res=>{
                var response=res.body;
                vm.productList = response.result.productList;
                // vm.totalMoney = response.result.totalMoney;
            });
        },
        changeMoney:function(product,way){
            if(way>0){
                product.productQuentity++;
            }else if(product.productQuentity>1){
                product.productQuentity--;
            }else{
                product.productQuentity=1;
            }
            this.calTotalPrice();
        },
        selectProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, 'checked', true);
            }else{
                item.checked=!item.checked;
            }
            this.calTotalPrice();
        },
        checkAll: function (flag) {
            this.checkAllFlag = flag;
            this.productList.forEach(function (item,index) {
                if (typeof item.checked == 'undefined') {
                    Vue.set(item, 'checked', vm.checkAllFlag);
                } else {
                    item.checked = vm.checkAllFlag;
                }
            });
            this.calTotalPrice();

        },
        calTotalPrice:function() {
            this.totalMoney=0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    vm.totalMoney+=item.productPrice*item.productQuentity;
                    console.log(vm.totalMoney);
                }
            });
        },
        delConfirm:function(item){
            this.delFlag=true;
            this.curProduct=item;

        },
        delProduct:function(){
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
        }
    }
});
// 全局过滤器
// Vue.filter("money",function(value,type){
//     return "￥"+value.toFixed(2)+type;
// })