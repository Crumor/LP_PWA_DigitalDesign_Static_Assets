(function(){

    angular.module("services",["factorysContingency","jsonReader"])
    .service("serviceContenido",serviceContenido)
    .service("serviceMenu", serviceMenu)
    .filter("stringCount",stringCount )
    .filter('unsafe', ['$sce', function ($sce) {
      return function (input) {
        return $sce.trustAsHtml(input);
      }
    }])
    .filter('unsafe_respuesta', ['$sce', function ($sce) {
        return function (input) {
          //valida si es html y retorna el input modificado
            if ( isHTML(input) ){
                return $sce.trustAsHtml(input);
              }else{
                return "<p>"+input+"</p>";
              }          
        }

    }])    
    .filter('responseSearch',function(){
      return function(input){
        if(input != undefined ){
          var quitTags = input.replace(/<(?:.|\n)*?>/gm, '');
          return quitTags.slice(0,80);
        }else{
        return "";
        }
      }

    })
    .filter('oneOptionMenu',function(){
      return function(input){
        
        var idMenu=0;
        var count = 0;
        var nivel = input[0]
        if(nivel.hasOwnProperty("subnivel")){
            if(nivel.subnivel.length > 0){
                var subnivel = nivel.subnivel;  
                return nivel.link+"/"+subnivel[0].link
            }else{
              return nivel.link
            }
        }else{
          return nivel.link
        }
        

      };
    });

    function serviceContenido(Reader, myconfig, Contenido, Contenidos,Preguntas,Pregunta,serviceMenu,PreguntasTop ){

        return {
            //devuelve la informacion del valor contenido mediante un id (key)
            getContenido:function( key, fn ){

                var info = { sucess:false, data:{}, code:-1 };
                Reader.get("contenido",function(data){
                      info.success   = true;
                      info.code      = 1;
                      info.data = Contenido.get(data,key);
                      fn(info);
                });

            },
            //devuelve todas las preguntas relacionadas a una categoria en especifico id(key) 
            getPreguntas:function( key, fn ){
                var info = { sucess:false, data:{}, code:-1 };
                //var data =  new Preguntas( ref.child("preguntas/") );
                Reader.get("preguntas",function(data){

                    info.success   = true;
                    info.code      = 1;
                    info.data      = Preguntas.get(data,key);    
                    fn( info );
                });
            },
            //busca y devuelve un valor dentro del valor contenido, alguna cadena String asociada
            searchContenidos:function( word, fn){

                var info = { sucess:false, data:{}, code:-1 };
                //var data =  new Contenidos( ref.child("contenido") );

                Reader.get("contenido",function(data){
                    info.success    = true;
                    info.code       = 1;
                    info.data       = Contenidos.buscar( data,word );
                    fn( info );
                });

            },
            //busca y devuelve un valor, dentro del valor preguntas, alguna cadena String asociada
            searchPreguntas:function( word, fn ){

                var info = { sucess:false, data:{}, code:-1 };
                //var data =  new Preguntas( ref.child("preguntas") );

                Reader.get("preguntas",function(data){
                    info.success    = true;
                    info.code       = 1;
                    info.data       = Preguntas.buscar(data, word );
                    fn( info );
                });

            },
            searchReduceAndFormated:function( dt, word, dataKey ){
              var reducedText = "";
              var formatedText = "";
              var results = [];
              var dataSet = dt;
              angular.forEach(dataSet,function(ele,index){
                var element = getModelTypeAhead(ele);
                element[dataKey] = dataKey === "contenido" ? element[dataKey].replace(/<(?:.|\n)*?>/gm, '') : element[dataKey];
                reducedText = element[dataKey].slice(0,80);
                formatedText = reducedText.split(word).join("<b>"+word+"</b>");
                element[dataKey] = formatedText.length >= 80 ? formatedText+" ..." : formatedText;
                results.push(element);
              });
              return results;
            },
            //optiene las 10 preguntas mas buscadas
            getPreguntasTop:function(fn){
                var info = { sucess:false, data:{}, code:-1 };
                //var data =  new Preguntas( ref.child("preguntas/") );

                Reader.get("preguntas",function(data){
                    
                    info.success   = true;
                    info.code      = 1;
                    if( PreguntasTop.get().length <= 0){

                        var _data =  Preguntas.getAll(data);

                        _data.sort( function( a ,b ){
                            return b.visitas - a.visitas;
                        });

                        for( var  i = 0; i < 10; i ++){
                            PreguntasTop.set( _data[ i ] );
                        }

                        info.data      = PreguntasTop.get();    

                    }else{

                        info.data = PreguntasTop.get();

                    };
                    // console.log(info);
                    fn( info );
                });
            }
        }
    };
    function getModelTypeAhead(ele){
        var model ={
            breadcrumb:"",
            contenido:"",
            grupo:"",
            icon:"",
            idMenu:"",
            link:"",
            newLink:"",
            tags:"",
            titulo:"",
            visitas:""
        };
        model =  angular.merge(model,ele);
        return model;
    }
    //devuelve el valor de Menu
    function serviceMenu( Reader,myconfig,Menu ){
        return {

            get:function( fn ){

                var info = { sucess:false, data:{}, code:-1 };

                if( Menu.total() <=0 ){

                    Reader.get("menu",function(data){
                        
                        angular.forEach( data, function( value, key ) {
                            var subnivel  = [];    
                            if( value.subnivel ){
                                for( var sm in value.subnivel ){

                                    var subnivelsub = [];
                                    if( value.subnivel[sm].subnivel ){

                                        for( var sms in value.subnivel[sm].subnivel ){
                                            subnivelsub.push( value.subnivel[sm].subnivel[sms] );
                                        }

                                        subnivelsub.sort(function(a,b){
                                            return a.posicion - b.posicion;
                                        });
                                    }
                                    value.subnivel[sm].subnivel = subnivelsub;
                                    subnivel.push(value.subnivel[sm]);

                                }

                                subnivel.sort(function(a,b){
                                    return a.posicion - b.posicion;
                                });
                            };

                            value.subnivel = subnivel;
                            Menu.add( value );
                        });
                        info.sucess     = true;
                        info.code       = 1;
                        info.data       =  Menu.get();
                        fn( info );
                    });

                }else{

                    info.sucess     = true;
                    info.code       = 1;
                    info.data       =  Menu.get();
                    fn( info );

                }
            }

        }
    };
    //filtro para delimitar caracteres
    function stringCount() { 
      return function( text ){
        if( text.length > 200 )
          return text.slice( 0, 200 )+" ...";
        else    
          return text;
      }
    };
    //modelo de respuesta para funciones de promosa
    function info(){
      return { sucess:false, data:{}, code:-1 };
    };
    function isHTML(str) {
        var a = document.createElement('div');
        a.innerHTML = str;
        for (var c = a.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true; 
        }
        return false;
    };
})();