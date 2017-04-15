/**
 * Created by 24306 on 2017/4/12.
 */
new Vue({
    el: ".container",
    mounted: function () {
        this.$nextTick(function () {
            // 保证加载完成
            this.getAddressList();
        })
    },
    data: {
        limitNum:3,
        currentIndex:0,
        addressList: []
    },
    computed:{
        // 默认显示三条
        fliterAddress:function(){
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods: {
        getAddressList: function () {
            this.$http.get('data/address.json').then(response => {
                var res = response.body;
                console.log(res.status);
                if(res.status=="0"){
                    this.addressList = res.result;
                }
            });
        },
        setDefault:function(addressId){
            console.log(addressId);
            this.addressList.forEach(function(adress,index){
                    if(adress.addressId===addressId){
                        adress.isDefault=true;
                    }else{
                        adress.isDefault=false;
                    }
            })


        }
    }
})