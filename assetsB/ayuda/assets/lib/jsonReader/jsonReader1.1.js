(function(){

	angular.module("jsonReader",[])
	.service("Reader",reader)
	.factory("ReaderStore",store)
	function reader($http,ReaderStore,myconfig){
		function conexion(promise){
			var json =  myconfig.path+"assets/json/ayuda.json";
			var info ={ success:false, code:-1};
			if( ReaderStore.getJson().length <=0){
				$http.get(json).then(function(data){
					ReaderStore.setJson(data.data);
					info.success = true;
					code = 1;
					promise( info );
				},function(fail){
					promise(info);
				});
			}else{
				info.success = true;
				code = 1;
				promise(info)
			}
		}
		function findPath(path,promise){
			var _data = [];
			conexion(function(data){
			  if( data.success ){
			  	_data = ReaderStore.getJson();
			  	if( _data.hasOwnProperty(path) ){
			  		promise(_data[path]);
			  	}
			  }
			});
		}
		
		return{
			get:function(path,promise){
				findPath(path,promise);
			},
			getIndex:function(index){

			},
			getId:function(id){

			}
		}
	
	}


	function store(){
		var json = [];
		return{
			getJson:function(){
				return json;
			},
			setJson:function(data){
   				json =  data;
			}
		}
	}
})();