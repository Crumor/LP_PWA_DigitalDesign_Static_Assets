/*servicios que controlan todo el funcionamiento del la aplicacion y conexiones ajax*/
( function( ) {
    angular.module('services',['factorys'])
    .service('typeHead',buscadorComplete)
    .service('serviceProducto',producto)
    .service('serviceStorePedidos',serviceStorePedidos)
    .service('serviceModel',serviceModel);
    /*servicio encargado del modelado de datos*/
    function serviceModel() {
       return {
           producto:function(){
                return {
                    id:"0",
                    description:"",
                    imageBg:"",
                    imageSm:"",
                    longDescription:"",
                    images:[]
                };
           }
       }
    }
    /*servicio de autocomplete de buscador componenete inpuBuscar*/
    function buscadorComplete($http,$log,myConfig){
        var mostrar  = false;
        var resultado = [];
        var objResultado = function(){
            var obj = { descripcion:"", totales:"", descripcionClean:"" };
            return obj;
        };
        var filterCoincidence = function ( search, response ) {
                 var change = response;
                 var matches= change.match( new RegExp(search, "gi") );
                 var uniqueMatches = matches.unique() || [];/*funcion unique, personalizada en index.html para quuitar elementos similares*/
                 var newVal = change;
                 uniqueMatches.forEach(function(val){
                     newVal = change.replace( val , "<span class='coincidencia'>"+val+"</span>" );
                 });

                return newVal;
        };
        return {
            //busqueda general del type head
            buscar:function( word, fn ){
                resultado = [];
                mostrar = false;
                if(word !==""){
                    $http.get( myConfig.pathServices+"search/typeAhead.jsp?Dy=1&collection=undefined&N=0&Ntt="+word+"*" )
                    .then( function( data ){

                        if(word !==""){
                            var response = data.data.contents[0].autoSuggest;
                            if(response.length>0)
                                response = data.data.contents[0].autoSuggest[0].dimensionSearchGroups || [];

                            if( response.length > 0 ){
                                var responseValues = response[0].dimensionSearchValues || [];
                                if(responseValues.length >0 ){

                                    responseValues.forEach( function( val ){
                                        var obj = objResultado();
                                        var tempLabel = val.label;
                                        if( tempLabel.indexOf("|", 0) != -1 ){
                                            var inicio = tempLabel.indexOf( "|", 0 ) +1;
                                              var fin = tempLabel.indexOf( "|", inicio+1 );
                                              tempLabel = tempLabel.substring( inicio, fin )
                                         }
                                        obj.descripcionClean =tempLabel;
                                        obj.descripcion =filterCoincidence( word, tempLabel );
                                        obj.totales = val.count;
                                        resultado.push( obj );
                                    });
                                    if( fn )
                                        fn();
                                }else//end responsevalues.length
                                {
                                    mostrar = false;
                                }
                              }else//end response.length
                                {
                                    mostrar = false;
                                }
                            }
                        },function(fail){

                    });
                 }else{
                    mostrar = false;
                }
            },

            setMostrar:function(value){
                mostrar = value;
            },
            getMostrar:function(){
                return mostrar;
            },
            getResultado: function(){
                return resultado;
            }
        }
    };

    function producto($http,myConfig,JsonCategorias,home,serviceModel){
        function filtroDescripcion( obj ){

            var descripcion ={
                defaults:"product.longDescription",
                second:"product.dynamicAttribute"
            };
            var atributos = "";
            if( obj.hasOwnProperty( descripcion.defaults ) ){
                atributos = obj[ descripcion.defaults ][0]
                return atributos;
            }
            else if( obj.hasOwnProperty( descripcion.second ) ){
                  var atributo = obj[ descripcion.second ]|| [];
                  if( atributo.length > 0 ){
                      atributo.forEach(function(val){
                            var aux =  val;
                            aux =  aux.split("|");

                            if( aux.length ===3 ){
                                atributos +="<p>"+aux[1]+": "+aux[2]+"</p>";
                            }else{
                                atributos +="<p>"+aux[1]+"</p>";
                            }
                     });
                      return atributos;
                  };

            }else{
                return atributos;
            }
        }
        function getCategoria(categoryId,fn){
                var categorias = JsonCategorias.getCategorias() || [];
                if( categorias.length===0 ){
                    $http.get( myConfig.jsonCategorias ).then( function( data ){
                        categorias =  data.data.categories.category;
                        JsonCategorias.setCategorias( categorias );
                        getSubCategoria(categorias,categoryId,fn);
                    },function( data ){
                        console.log("error al cargar "+myConfig.jsonCategorias);
                    });
                }else{
                    categorias =  JsonCategorias.getCategorias();
                    getSubCategoria(categorias,categoryId,fn);
                }
        };
        //funcion para optener la subcategoria
        function getSubCategoria(categorias,categoryId,fn){/*funcion para optener el path >JSON de una categoria selccionada*/
                    var pathSubcategoria = "";
                    var info = { success:false,data:[] };
                    categorias.forEach(function(val){

                        if(val.categoryid === categoryId){
                            pathSubcategoria =  val.subCategories;
                         }
                    })
                    if(pathSubcategoria !==""){
                        $http.get( pathSubcategoria ).then(
                            function(data){
                                var principal=data.data["principal-banner"];
                                var respuesta = data.data.categories["category-main"] || [];
                                var newObj = [];
                                respuesta.forEach(function( val ){
                                    var tmpObj = {index:"", label:"",categoryid:"",pathJson:"",navigationState:"",categoria:"",toys:[],info:{} };

                                    tmpObj.index = categoryId;
                                    tmpObj.categoryid = val.info.categoryid;
                                    tmpObj.label = val.info.label;
                                    tmpObj.info = val.info;
                                    var toys  = val.toys;

                                    tmpObj.toys = toys.map(function(val){

                                        var producto =  serviceModel.producto();
                                        producto.id = val.id;
                                        producto.description = val.description;
                                        producto.imageBg = val.image;
                                        producto.imageSm =val.image;
                                        producto.longDescription = val.longDescription;
                                        return producto;

                                    });

                                    tmpObj.navigationState = val.info.navigationState;
                                    newObj.push(tmpObj);
                                });

                                info.success = true;
                                info.data = {principal:principal,subcategorias:newObj};
                                if(fn){
                                    fn(info);
                                }
                               // console.log(info);
                            },function(data){
                                if(fn){
                                    fn(info);
                                }
                            }
                        );
                    }else{
                        if(fn){
                            fn(info);
                        }
                    }

        };
        /*function getSubSubCategoria(categorias,categoryId,categorySubId,fn){
            getSubCategoria(categorias,categoryId,function(data){
                var resultado = data.data || [];
                var info = {label:"",data:[],success:false};
                resultado.forEach(function(val){

                    if(val.categoryid === categorySubId){
                        info.success = true;
                       info.label = val.label;
                        info.data = val.toys;

                       // console.log(info.data);
                    }
                });
                if(fn)
                    fn(info);
            });
        }*/
       return {
           /*optiene el top 10 de productos para mostrarlos en el slider principal del home*/
           getTop10:function(fn){
                var h = home.getHome();
                if( h.length <= 0 ){
                    $http.get( myConfig.pathHome).then(
                    function(data){
                        var dataAux = data.data.categories["category-main"] || [];
                        var dataTemp = [];
                        dataAux.forEach(function(valTemp){
                            var toys = valTemp.toys || [];
                            valTemp.toys =  toys.map(function(valToy){
                                var producto = serviceModel.producto();
                                producto.id = valToy.id,
                                producto.description = valToy.description,
                                producto.imageBg = valToy.image,
                                producto.imageSm = valToy.image,
                                producto.longDescription = valToy.longDescription;
                                return producto;
                            });
                            dataTemp.push( valTemp );
                        })
                        home.setHome( dataTemp );
                        if( fn )
                            fn( home.getTop10() );

                    },function( fail){
                       console.log( "fallo carga "+myConfig.pathJsonLocal+"2015/home/testHome.json" );
                        if( fn )
                            fn( home.getTop10() );
                    });
                }else{
                    if( fn )
                       fn( home.getTop10() );
                }
           },
           /*optiene un producto en especifico al mandarle el folio o id*/
           getProducto:function(folio,fn){
                        var r = {success:false,data:[]}
                        $http.get(myConfig. pathServices+""+folio+"?"+myConfig.formatJson).then(function(data){


                            if( data.data.hasOwnProperty('contents') ){
                                var respuesta =data.data.contents[0].mainContent[0].record.attributes;
                                var producto = serviceModel.producto();
                                producto.id = folio;
                                producto.imageBg = respuesta["sku.thumbnailImage"][0];
                                producto.imageSm = respuesta["sku.smallImage"][0];
                                producto.longDescription = filtroDescripcion(respuesta);
                                producto.description = respuesta["product.displayName"][0];
                                if( respuesta.hasOwnProperty( "sku.galleriaImage" ) ){
                                    producto.images = respuesta["sku.galleriaImage"];
                                }
                                r.success = true;
                                r.data = producto;

                            }
                            if(fn){
                                fn( r );
                            }
                            //console.log(data);
                        },function(data){

                             if(fn){
                                fn( r );
                            }
                        });


                    },
            getCategorias:function( fn ){
                var categorias = JsonCategorias.getCategorias() || [];
                var info={success:false,data:[],code:-1};
                if( categorias.length===0 ){

                    $http.get( myConfig.jsonCategorias ).then( function( data ){
                        categorias =  data.data.categories.category || [];

                        JsonCategorias.setCategorias( categorias );
                        info.success = true;
                        info.data =  categorias;
                        info.code= 0;
                        if(fn)
                            fn(info)

                    },function( data ){
                        console.log("error al cargar "+myConfig.jsonCategorias);
                        info.success = false;
                        info.data =  [];
                        info.code= 1;
                        if(fn)
                            fn(info)
                    });

                }else{
                    categorias =  JsonCategorias.getCategorias();
                        info.success = true;
                        info.data =  categorias;
                        info.code= 0;
                        if(fn)
                            fn(info)
                }

            },

           /*optiene las categoria ejem preescolar,nino,nina etc*/
            getCategoria:function( categoryId, fn ){
                getCategoria(categoryId,fn);
            },
           /*optiene las subcategorias cuando presionen VER TODO*/
           /*se implementa en el controlador subcategoria*/
            getSubCategoria:function(categoryId,categoryIdSub,page,fn){
                var info = {success:false, code:-1,data:{},totalPages:1};
                getCategoria(categoryId,function(data){
                    if( data.data.hasOwnProperty("subcategorias") ){
                       var _subcategorias = data.data.subcategorias || [];
                            _subcategorias.forEach(function(val){
                            if( val.categoryid === categoryIdSub ){
                                info.success = true;
                                info.code = 1;
                                info.data = {principal:val.info,subcategorias:[]};
                            }
                        });

                    }
                   if( fn ){
                        fn( info );
                    }
                });

           },
           /*funcion para traer las subcategorias pero desde el servicio de liverpool para la seccion de subcateg*/
           getSubSubCategoria:function(navigationState,page,fn){
                    var info = { success:false, data:[], code:-1, totalPages:1 };
                    var pathSubCategoria =myConfig.pathServices+navigationState+"/page-"+page+"/?"+myConfig.formatJson;
                    var newObj = [];

                    $http.get( pathSubCategoria ).then( function( data ){

                            if( data.data.hasOwnProperty('contents') ){

                                var contents = data.data.contents[0].mainContent[2].contents[0];
                                var respuesta =contents.records || [];
                                var totalPages = Math.ceil( contents.totalNumRecs / contents.recsPerPage );
                                newObj = respuesta.map( function( val ) {
                                    var obj = serviceModel.producto();
                                    obj.id = val.attributes["sku.repositoryId"][0];
                                    obj.description = val.attributes["product.displayName"][0];
                                    obj.imageBg = val.attributes["sku.thumbnailImage"][0];
                                    obj.imageSm =  val.attributes["sku.largeImage"][0];
                                    return obj;
                                } );
                                info.success = true;
                                info.data = newObj;
                                info.code = 0;
                                info.totalPages = totalPages;
                            }
                        if(fn ){
                            fn(info);
                        }
                      //  categorias =  data.data.categories.category;
                       // JsonCategorias.setCategorias( categorias );
                       // getSubSubCategoria(categorias,categoryId,categoryIdSub,fn);

                    },function( data ){
                        if( fn ){
                            fn( info );
                        }
                        console.log("error al cargar "+pathSubCategoria);
                    });


           },
           getMarcasPopulares:function( fn ){
               var info={ success:false, code:-1, data:[] };
               var marcas = home.getMarcasPopulares();
               if(marcas.length===0){
                    $http.get( myConfig.jsonSliderMarcas ).then(function(data){
                        marcas = data.data.marcas;
                        home.setMarcasPopulares( marcas );
                        info.success = true;
                        info.code = 1;
                        info.data =  marcas;
                        if( fn )
                            fn( info );

                    },function(fail){

                    });
               }else{
                    info.success = true;
                    info.code = 1;
                    info.data =  marcas;
                    if( fn )
                        fn( info );
               }
               /*if( fn ){
                  fn( home.getMarcasPopulares() );
               }*/
           },
           getResultadosBusqueda:function( paginator, word, fn ){
               var info = { success:false, data:[],totalR:0, code:-1,totalPages:1 };
               var resultado = [];
               var path = myConfig. pathServices+"tienda/page-"+paginator+"?s="+word+"&"+myConfig.formatJson;
               var casoEspecial =  /lego/gi;
               var resultadoCasoEspecial = casoEspecial.test(word);
               if(resultadoCasoEspecial ){
                   /*especial caso para lego*/
                   path = myConfig. pathServices+"tienda/"+word+"/N-0Z1z14056/page-"+paginator+"/?"+myConfig.formatJson;
               }
               if( Number.isInteger( paginator ) ){

                     if ( parseInt( paginator ) >=1 ){

                        $http.get( path ).then( function( data ){
                                 console.log(data);
                                var contents = data.data.contents[0].mainContent[2].contents[0];
                                var respuesta =contents.records || [];
                                var totalPages = Math.ceil( contents.totalNumRecs / contents.recsPerPage );
                                var totalR =  contents.totalNumRecs;
                            //var respuesta = data.data.contents[0].mainContent[2].contents[0].records || [];

                                resultado =  respuesta.map( function( val ){

                                    var producto = serviceModel.producto();
                                    producto.id = val.attributes["sku.repositoryId"][0];
                                    producto.description = val.attributes['product.displayName'][0];
                                    producto.longDescription = val.attributes.hasOwnProperty("product.description") ? val.attributes["product.description"][0]:"";
                                    producto.imageBg = val.attributes.hasOwnProperty("sku.thumbnailImage") ? val.attributes["sku.thumbnailImage"][0] : "";
                                    producto.imageSm = val.attributes.hasOwnProperty("sku.smallImage") ? val.attributes["sku.smallImage"][0] : "";
                                    return producto;
                            });
                            info.totalPages = totalPages;
                            info.success = true;
                            info.code = 1;
                            info.data = resultado;
                            info.totalR =  totalR;
                            if( fn ){
                                fn( info );
                            };
                        },function( fail ){
                            if( fn ){
                                fn( info );
                            };
                        });
                    };
               };

        },
        getSliderHome:function(fn){
            var banners = home.getSliderHome();
            var info = {success:false,data:[],code:-1};
            if( banners.length <=0 ){
                $http.get( myConfig.jsonHomeSlider ).then( function( data ) {
                    var tempBanners  = data.data.categories["category-main"];
                    banners = tempBanners;
                    home.setSliderHome(banners);
                    info.success = true;
                    info.data = banners;
                    info.code = 0;
                    if( fn )
                        fn( info );
                },function( data ){
                    console.log( data );
                });
            }else{
                info.success = true;
                info.data = banners;
                info.code = 0;
                if( fn )
                  fn(info);
            }

        },
        getBannerSliderCategoria:function(categoria,index,fn){
            var banners =JsonCategorias.getBannersCategorias() || [];
            var info = { success:false, data:[], code:-1 };
            if(banners.length === 0 ){
              $http.get(myConfig.jsonSliderCategorias).then(function(data){
                  var resultado = data.data;
                  JsonCategorias.setBannersCategorias(resultado);
                  info.success = true;
                  info.data = resultado[index];
                  info.code = 0;
                  if( fn ){
                    fn( info );
                  }
              },function(data){

              });
            }else{
                info.success = true;
                info.data = banners[index];
                info.code = 0;
                if(fn){
                    fn( info );
                }
            }
        }
      }
    };
    /* almacenamiento en localstorage cuando presionene quiero este juguete */
    function serviceStorePedidos( $rootScope,storePedidos,serviceModel,$http ){
        if( !localStorage.hasOwnProperty( 'pedidos' ) ){
            localStorage.pedidos = "";
        }else{
            var productos =  localStorage.pedidos !== "" ?  JSON.parse( localStorage.pedidos ) : [];
            storePedidos.setPedidos( productos );
        }
        function validarEmail( email ) {
            var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if ( !expr.test(email) )
                return false
            else
                return true
        }
        return {
            setPedido:function( pedido ){
                var pedidos = storePedidos.getPedidos() || [];
                var existe = false;
                var guardado = false;
                pedidos.forEach( function( val ){
                   if( val.id === pedido.id ){
                       existe = true;
                   }
                });
                if( !existe ){
                   var producto = serviceModel.producto();
                    producto.id = pedido.id;
                    producto.imageBg = pedido.imageBg;
                    producto.description = pedido.description;
                    producto.longDescription = pedido.longDescription;
                    storePedidos.setPedido( producto );
                    guardado = true;
                    localStorage.pedidos = JSON.stringify( storePedidos.getPedidos() );
                    $rootScope.totalPedidos =storePedidos.getTotal();
                }
                return guardado;
            },
            getPedido:function(){

            },
            getPedidos:function(){
                return storePedidos.getPedidos();
            },
            deletePedido:function(index){
                storePedidos.deletePedido(index);
                //console.log(index);
                localStorage.pedidos = JSON.stringify(storePedidos.getPedidos());
                $rootScope.totalPedidos =storePedidos.getTotal();
            },
            deleteAllPedidos:function(){
                localStorage.pedidos = "";
                storePedidos.setPedidos([]);
                $rootScope.totalPedidos =storePedidos.getTotal();
            },
            enviarPedido:function(data,fn){
                var info = { success:true, code:0,data:[] };
                var sendCarta ={
                    "carta":"",
                    "dirTutor":"",
                    "emailNino":"",
                    "emailTutor":"",
                    "idFrame":"9",
                    "listId":"",
                    "nombreNino":"",
                    "nombreTutor":"",
                    "telTutor":""
                };
                var newPedidos = [];
                var pedidos =  storePedidos.getPedidos() || [];

                if( storePedidos.getTotal()===0 ){
                    info.code = -2;// -2 =  no hay juguetes agregados
                    if( fn )
                        fn( info );
                }else
                  if(!validarEmail(data.email) || data.nombre ==="" || data.mensaje ===""){
                      info.code = -1;//-1 si hay juguetes pero hay campos invalidos
                    if( fn )
                        fn( info );
                  }else{
                      sendCarta.carta = data.mensaje;
                      sendCarta.emailTutor = data.email;
                      sendCarta.nombreNino =data.nombre;
                      pedidos.forEach(function(val){
                        newPedidos.push(val.id);
                      });

                      sendCarta.listId = newPedidos;

                      $http({
                            method  : "POST",
                            url     : "http://morelosmovil.com/lmj/index.php",
                            data    : sendCarta,
                            headers : {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                       }).then(function(data){
                            info.success =  true;
                            info.code = 1;
                            info.data= data;
                            if( fn )
                                fn(info )
                        },function(data){
                            info.code = -3;
                            info.data = data;
                           if( fn )
                                fn(info )
                        });
                        /*$http.post("http://morelosmovil.com/lmj/index.php",sendCarta).then(function(data){
                            info.success =  true;
                            info.code = 1;
                            info.data= data;
                            if( fn )
                                fn(info )
                        },function(data){
                            info.code = -3;
                            info.data = data;
                           if( fn )
                                fn(info )
                        });   */
                  }
            },
            getTotalPedidos:function(){

                return storePedidos.getTotal();
            }

        }
    }
})();
