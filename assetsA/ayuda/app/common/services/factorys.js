(function(){
    angular.module( "factorys", []  ).
    factory( "Contenidos", contenidos ).
    factory( "Contenido", contenido ).
    factory("Preguntas",preguntas).
    factory("Pregunta",pregunta).
    factory("InfoContenido",infoContenido).
    factory("PreguntasTop",preguntasTop).
    factory( "Menu", menu );
    //factory de tipo firebaseArray, especifica para el valor contenido
    function contenidos( $firebaseArray ){

        return $firebaseArray.$extend({
            //devulve el resultado de concidencia de una expresion String especifica para el valor Contenido(firebase)
            buscar:function(word){

                var coincidencia    = new RegExp( "("+word.replace(/[aeiouáéíóú]/gi,"[aeiouáéíóú]+")+")", "gi" );
                var resultados      = [];

                angular.forEach( this.$list, function( data ){
                    if( coincidencia.test( data.contenido+" "+data.titulo+" "+data.tags ) )
                        resultados.push( data );
                });

                return resultados;

            }

        });
    };
    
    function contenido( $firebaseArray ){

        return $firebaseArray.$extend({
            //devuelve el resultado de concidencia de la propidad idMenu dentro del valor Contenido
            get:function(link){

                var resultado=null;

                angular.forEach(this.$list,function(data){

                    if(data.link === link ){
                        resultado = data;
                    }
                    
                });

                return resultado;
            }

        });
    };
    function preguntas( $firebaseArray ){

        return $firebaseArray.$extend({
            //devuelve el resultado de concidencia de una expresion String, especifica para el valor Preguntas(firebase)
            buscar:function(word){

                var coincidencia    = new RegExp( "("+word.replace(/[aeiouáéíóú]/gi,"[aeiouáéíóú]+")+")", "gi" );
                var resultados      = [];

                angular.forEach( this.$list, function( data ){
                    if( coincidencia.test( data.pregunta+" "+data.respuesta+" "+data.tags ) ){
                        resultados.push( data );
                    }
                });

                return resultados;

            },get:function(idMenu){

                var _preguntas = [];

                angular.forEach(this.$list,function(data){

                    if(data.menu === idMenu)
                        _preguntas.push(data);
                });
                return _preguntas;

            },
            //devuelve tolas las preguntas almacenadas
            getAll:function(){
                var _preguntas = [];
                
                angular.forEach(this.$list,function( data ){
                    _preguntas.push(data);

                });
                return _preguntas;
            }

        });
    };

    function pregunta($firebaseObject){

        return $firebaseObject.$extend({

            get:function(){
                //console.log(this);
            }

        });  
    };
    //modelo factory para almacenar la informacion del valor contenido
    function infoContenido(){

        var contenido = "";

        return {
            set:function( c ){
                contenido = c
            },
            get:function(){
                return contenido;
            }
        }

    };
    function preguntasTop (){
        var preguntas = [];
        return {
            set:function(c){
                preguntas.push(c)
            },
            get:function(){
                return preguntas;
            }
        }
    }
//modelo factory para almacenar la informacion del valor menu
    function menu(){
 
        var _menu = [];

        return {
            add:function(m){
                _menu.push( m );

                _menu.sort(function(a,b){
                    return a.posicion - b.posicion;
                })
            },
            set:function( m ){

                _menu = m;
            },
            get:function(){
                return _menu;
            },
            total:function(){
                return _menu.length;
            },
            //operacion que altera y devuelve los datos del menu cuando la coincidencia del idMenu ha sido pasada
            reset:function(idMenu){
         
                var _data = _menu;

                var _category = {};
                var _val = {};
                var _beforeCategory = {};
                var nivel = 0;
                _data.forEach( function( val ){
                    val.open    = false;
                    val.active  = false;
                    if( val.idMenu === idMenu ){

                        val.open    = true;
                        val.active  = true;
                        _val = val;
                        _category = val;
                        _beforeCategory = val;
                        nivel = 0;
                    }

                    if( val.subnivel ){

                        for( nivel2 in val.subnivel ){

                            val.subnivel[ nivel2 ].open     = false;
                            val.subnivel[ nivel2 ].active   = false;

                            if( val.subnivel[ nivel2 ].idMenu === idMenu ){

                                val.open = true;
                                val.subnivel[ nivel2 ].open     =  true;
                                val.subnivel[ nivel2 ].active   =  true;
                                _val = val.subnivel[ nivel2 ];
                                _category = val;
                                _beforeCategory = val;
                                nivel = 1;

                            }

                            if( val.subnivel[ nivel2 ].subnivel ){

                                for(nivel3 in val.subnivel[ nivel2 ].subnivel){

                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = false;
                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = false;

                                    if( val.subnivel[ nivel2 ].subnivel[ nivel3 ].idMenu === idMenu){

                                        val.open = true;
                                        val.subnivel[ nivel2 ].open = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = true;

                                        _val = val.subnivel[ nivel2 ].subnivel[ nivel3 ];
                                        _category = val;
                                        _beforeCategory = val.subnivel[ nivel2 ];
                                        nivel = 3;
                                    }
                                }

                            }
                        }
                    }
                });
                
                return {data:_data,category:_category,actualCategory:_val,beforeCategory:_beforeCategory,nivel:nivel};

            },
            resetLink:function(linkMenu){
                var _data = _menu;

                var _category = {};
                var _val = {};
                var _beforeCategory = {};
                var nivel = 0;
                _data.forEach( function( val ){

                    val.open    = false;
                    val.active  = false;
                    if( val.link === linkMenu ){

                        val.open    = true;
                        val.active  = true;
                        _val = val;
                        _category = val;
                        _beforeCategory = val;
                        nivel = 0;
                    }

                    if( val.subnivel ){

                        for( nivel2 in val.subnivel ){

                            val.subnivel[ nivel2 ].open     = false;
                            val.subnivel[ nivel2 ].active   = false;

                            if( val.subnivel[ nivel2 ].link === linkMenu ){

                                val.open = true;
                                val.subnivel[ nivel2 ].open     =  true;
                                val.subnivel[ nivel2 ].active   =  true;
                                _val = val.subnivel[ nivel2 ];
                                _category = val;
                                _beforeCategory = val;
                                nivel = 1;

                            }

                            if( val.subnivel[ nivel2 ].subnivel ){

                                for(nivel3 in val.subnivel[ nivel2 ].subnivel){

                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = false;
                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = false;

                                    if( val.subnivel[ nivel2 ].subnivel[ nivel3 ].link === linkMenu){

                                        val.open = true;
                                        val.subnivel[ nivel2 ].open = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = true;

                                        _val = val.subnivel[ nivel2 ].subnivel[ nivel3 ];
                                        _category = val;
                                        _beforeCategory = val.subnivel[ nivel2 ];
                                        nivel = 3;
                                    }
                                }

                            }
                        }
                    }
                });
                
                return {data:_data,category:_category,actualCategory:_val,beforeCategory:_beforeCategory,nivel:nivel};

            }

        }

    }
    
})();
(function(){
    angular.module( "factorysContingency", ["jsonReader"] ).
    factory( "Contenidos", contenidos ).
    factory( "Contenido", contenido ).
    factory("Preguntas",preguntas).
    factory("Pregunta",pregunta).
    factory("InfoContenido",infoContenido).
    factory("PreguntasTop",preguntasTop).
    factory( "Menu", menu );
    //factory de tipo firebaseArray, especifica para el valor contenido
    function contenidos( Reader ){

        return {
            //devulve el resultado de concidencia de una expresion String especifica para el valor Contenido(firebase)
            buscar:function(data,word){

                var coincidencia    = new RegExp( "("+word.replace(/[aeiouáéíóú]/gi,"[aeiouáéíóú]+")+")", "gi" );
                var resultados      = [];

                angular.forEach( data, function( data ){
                    if( coincidencia.test( data.contenido+" "+data.titulo+" "+data.tags ) )
                        resultados.push( data );
                });

                return resultados;

            }

        };
    };
    
    function contenido( Reader ){

        return {
            //devuelve el resultado de concidencia de la propidad idMenu dentro del valor Contenido
            get:function(data,link){
                var resultado =[];

                    angular.forEach(data,function(val){
                        if(val.link === link ){
                            resultado = val;
                        }
                    });
                    return resultado;
            }

        };
    };
    function preguntas( Reader){

        return {
            //devuelve el resultado de concidencia de una expresion String, especifica para el valor Preguntas(firebase)
            buscar:function(data,word){

                var coincidencia    = new RegExp( "("+word.replace(/[aeiouáéíóú]/gi,"[aeiouáéíóú]+")+")", "gi" );
                var resultados      = [];

                angular.forEach( data, function( data ){
                    if( coincidencia.test( data.pregunta+" "+data.respuesta+" "+data.tags ) ){
                        resultados.push( data );
                    }
                });

                return resultados;

            },get:function(data,idMenu){

                var _preguntas = [];

                angular.forEach(data,function(data){

                    if(data.menu === idMenu)
                        _preguntas.push(data);
                });
                return _preguntas;

            },
            //devuelve tolas las preguntas almacenadas
            getAll:function(data){
                var _preguntas = [];
                
                angular.forEach(data,function( data ){
                    _preguntas.push(data);

                });
                return _preguntas;
            }

        };
    };

    function pregunta($firebaseObject){

        return $firebaseObject.$extend({

            get:function(){
                //console.log(this);
            }

        });  
    };
    //modelo factory para almacenar la informacion del valor contenido
    function infoContenido(){

        var contenido = "";

        return {
            set:function( c ){
                contenido = c
            },
            get:function(){
                return contenido;
            }
        }

    };
    function preguntasTop (){
        var preguntas = [];
        return {
            set:function(c){
                preguntas.push(c)
            },
            get:function(){
                return preguntas;
            }
        }
    }
//modelo factory para almacenar la informacion del valor menu
    function menu(){

        var _menu = [];

        return {
            add:function(m){
                _menu.push( m );

                _menu.sort(function(a,b){
                    return a.posicion - b.posicion;
                })
            },
            set:function( m ){

                _menu = m;
            },
            get:function(){
                return _menu;
            },
            total:function(){
                return _menu.length;
            },
            //operacion que altera y devuelve los datos del menu cuando la coincidencia del idMenu ha sido pasada
            reset:function(idMenu){
                var _data = _menu;

                var _category = {};
                var _val = {};
                var _beforeCategory = {};
                var nivel = 0;
                _data.forEach( function( val ){

                    val.open    = false;
                    val.active  = false;
                    if( val.idMenu === idMenu ){

                        val.open    = true;
                        val.active  = true;
                        _val = val;
                        _category = val;
                        _beforeCategory = val;
                        nivel = 0;
                    }

                    if( val.subnivel ){

                        for( nivel2 in val.subnivel ){

                            val.subnivel[ nivel2 ].open     = false;
                            val.subnivel[ nivel2 ].active   = false;

                            if( val.subnivel[ nivel2 ].idMenu === idMenu ){

                                val.open = true;
                                val.subnivel[ nivel2 ].open     =  true;
                                val.subnivel[ nivel2 ].active   =  true;
                                _val = val.subnivel[ nivel2 ];
                                _category = val;
                                _beforeCategory = val;
                                nivel = 1;

                            }

                            if( val.subnivel[ nivel2 ].subnivel ){

                                for(nivel3 in val.subnivel[ nivel2 ].subnivel){

                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = false;
                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = false;

                                    if( val.subnivel[ nivel2 ].subnivel[ nivel3 ].idMenu === idMenu){

                                        val.open = true;
                                        val.subnivel[ nivel2 ].open = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = true;

                                        _val = val.subnivel[ nivel2 ].subnivel[ nivel3 ];
                                        _category = val;
                                        _beforeCategory = val.subnivel[ nivel2 ];
                                        nivel = 3;
                                    }
                                }

                            }
                        }
                    }
                });
                
                return {data:_data,category:_category,actualCategory:_val,beforeCategory:_beforeCategory,nivel:nivel};

            },
            resetLink:function(linkMenu){
                var _data = _menu;

                var _category = {};
                var _val = {};
                var _beforeCategory = {};
                var nivel = 0;
                _data.forEach( function( val ){

                    val.open    = false;
                    val.active  = false;
                    if( val.link === linkMenu ){

                        val.open    = true;
                        val.active  = true;
                        _val = val;
                        _category = val;
                        _beforeCategory = val;
                        nivel = 0;
                    }

                    if( val.subnivel ){

                        for( nivel2 in val.subnivel ){

                            val.subnivel[ nivel2 ].open     = false;
                            val.subnivel[ nivel2 ].active   = false;

                            if( val.subnivel[ nivel2 ].link === linkMenu ){

                                val.open = true;
                                val.subnivel[ nivel2 ].open     =  true;
                                val.subnivel[ nivel2 ].active   =  true;
                                _val = val.subnivel[ nivel2 ];
                                _category = val;
                                _beforeCategory = val;
                                nivel = 1;

                            }

                            if( val.subnivel[ nivel2 ].subnivel ){

                                for(nivel3 in val.subnivel[ nivel2 ].subnivel){

                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = false;
                                    val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = false;

                                    if( val.subnivel[ nivel2 ].subnivel[ nivel3 ].link === linkMenu){

                                        val.open = true;
                                        val.subnivel[ nivel2 ].open = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].open      = true;
                                        val.subnivel[ nivel2 ].subnivel[ nivel3 ].active    = true;

                                        _val = val.subnivel[ nivel2 ].subnivel[ nivel3 ];
                                        _category = val;
                                        _beforeCategory = val.subnivel[ nivel2 ];
                                        nivel = 3;
                                    }
                                }

                            }
                        }
                    }
                });
                
                return {data:_data,category:_category,actualCategory:_val,beforeCategory:_beforeCategory,nivel:nivel};

            }

        }

    }
    
})();