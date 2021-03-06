new Vue({
	el:".container",
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0,
		shippingMethod:1,
		delFlag:false,
		curaddress:'',
		addFlag:false,
		addAddress:{},
		name:'',
		address:'',
		tel:'',
		editFlag:false
	},
	mounted:function(){
		this.$nextTick(function(){
			this.addressView();
		})
	},
	methods:{
		addressView:function(){
			var _this=this;
			this.$http.get("data/address.json").then(function(response){
				var res=response.data;
				if(res.status=="0"){
					_this.addressList=res.result;
				}
			})
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressId){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			});
		},
		delConfirm:function(address){
			this.delFlag=true;
			this.curaddress=address;
		},
		delAddress:function(){
			var index=this.addressList.indexOf(this.curaddress);
			this.addressList.splice(index,1);
			this.delFlag=false;
		},
		save:function(){
			this.addAddress.addressId=Math.ceil(Math.random()*10);
			this.addAddress.userName=this.name;
			this.addAddress.streetName=this.address;
			this.addAddress.tel=this.tel;
			this.addAddress.isDefault=false;
			this.addressList.push(this.addAddress);
			this.limitNum++;
			this.addFlag=false;
			this.name='';
			this.address='';
			this.tel='';
			this.addAddress={};
		}
	},
	computed:{
		filterAddressList:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	}
});