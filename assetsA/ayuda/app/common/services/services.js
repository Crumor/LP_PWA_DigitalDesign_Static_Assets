(function() {

    angular.module("services", ["factorys"])
        .service("serviceContenido", serviceContenido)
        .service("serviceMenu", serviceMenu)
        .service("Device", device)
        .service("serviceStorage", serviceStorage)
        .service("serviceUpdateVisit", serviceUpdateVisit)
        .filter("stringCount", stringCount)
        .filter('unsafe', ['$sce', function($sce) {
            return function(input) {
                return $sce.trustAsHtml(input);
            }
        }])
        .filter('unsafe_respuesta', ['$sce', function($sce) {

            return function(input) {

                //valida si es html y retorna el input modificado
                if (isHTML(input)) {
                    return $sce.trustAsHtml(input);
                } else {
                    return "<p>" + input + "</p>";
                }
            }

        }])
        .filter('responseSearch', function() {

            return function(input) {
                if (input != undefined) {
                    var quitTags = input.replace(/<(?:.|\n)*?>/gm, '');
                    return quitTags.slice(0, 80);
                } else {
                    return "";
                }
            }

        })
        .filter('oneOptionMenu', function() {
            return function(input) {

                var idMenu = 0;
                var count = 0;
                var nivel = input[0] != undefined ? input[0] : {};


                if (nivel.hasOwnProperty("subnivel")) {
                    if (nivel.subnivel.length > 0) {
                        var subnivel = nivel.subnivel;
                        return nivel.link + "/" + subnivel[0].link
                    } else {
                        return nivel.link
                    }
                } else {
                    return nivel.link
                }


            };
        });

    function serviceContenido($firebaseObject, $firebaseArray, myconfig, Contenido, Contenidos, Preguntas, Pregunta, serviceMenu, PreguntasTop) {

        var ref = new Firebase(myconfig.database);
        return {
            //devuelve la informacion del valor contenido mediante un id (key)
            getContenido: function(key, fn) {

                var info = { sucess: false, data: {}, code: -1 };
                var data = new Contenido(ref.child("contenido/"));

                data.$loaded().then(function(response) {
                    info.success = true;
                    info.code = 1;
                    info.data = data.get(key);
                    fn(info);
                }).catch(function(error) {
                    fn(info);
                });

            },
            //devuelve todas las preguntas relacionadas a una categoria en especifico id(key) 
            getPreguntas: function(key, fn) {
                var info = { sucess: false, data: {}, code: -1 };
                var data = new Preguntas(ref.child("preguntas/"));

                data.$loaded().then(function(response) {
                    info.success = true;
                    info.code = 1;
                    info.data = data.get(key);
                    fn(info);
                }).catch(function(error) {
                    fn(info);
                });
            },
            //busca y devuelve un valor dentro del valor contenido, alguna cadena String asociada
            searchContenidos: function(word, fn) {

                var info = { sucess: false, data: {}, code: -1 };
                var data = new Contenidos(ref.child("contenido"));

                data.$loaded().then(function() {
                    info.success = true;
                    info.code = 1;
                    info.data = data.buscar(word);
                    fn(info);
                }).catch(function(error) {
                    fn(info);
                });

            },
            //busca y devuelve un valor, dentro del valor preguntas, alguna cadena String asociada
            searchPreguntas: function(word, fn) {

                var info = { sucess: false, data: {}, code: -1 };
                var data = new Preguntas(ref.child("preguntas"));

                data.$loaded().then(function() {
                    info.success = true;
                    info.code = 1;
                    info.data = data.buscar(word);
                    fn(info);
                }).catch(function(error) {
                    fn(info);
                });

            },
            searchReduceAndFormated: function(dataSet, word, dataKey) {
                var reducedText = "";
                var formatedText = "";
                angular.forEach(dataSet, function(element, index) {
                    element[dataKey] = dataKey === "contenido" ? element[dataKey].replace(/<(?:.|\n)*?>/gm, '') : element[dataKey];
                    reducedText = element[dataKey].slice(0, 80);
                    formatedText = reducedText.split(word).join("<b>" + word + "</b>");
                    element[dataKey] = formatedText.length >= 80 ? formatedText + " ..." : formatedText;
                });
                return dataSet;
            },
            //optiene las 10 preguntas mas buscadas
            getPreguntasTop: function(fn) {
                var info = { sucess: false, data: {}, code: -1 };
                var data = new Preguntas(ref.child("preguntas/"));

                data.$loaded().then(function(response) {

                    info.success = true;
                    info.code = 1;
                    if (PreguntasTop.get().length <= 0) {

                        var _data = data.getAll();

                        _data.sort(function(a, b) {
                            return b.visitas - a.visitas;
                        });

                        for (var i = 0; i < 10; i++) {
                            PreguntasTop.set(_data[i]);
                        }

                        info.data = PreguntasTop.get();

                    } else {

                        info.data = PreguntasTop.get();

                    };
                    // console.log(info);
                    fn(info);
                }).catch(function(error) {
                    fn(info);
                });
            }
        }
    };
    //devuelve el valor de Menu
    function serviceMenu($firebaseArray, myconfig, Menu) {

        var ref = new Firebase(myconfig.database + "menu/");
        var list = $firebaseArray(ref);

        return {

            get: function(fn) {

                var info = { sucess: false, data: {}, code: -1 };

                if (Menu.total() <= 0) {

                    list.$loaded().then(function(data) {

                        angular.forEach(data, function(value, key) {
                            var subnivel = [];
                            if (value.subnivel) {
                                for (var sm in value.subnivel) {

                                    var subnivelsub = [];
                                    if (value.subnivel[sm].subnivel) {

                                        for (var sms in value.subnivel[sm].subnivel) {
                                            subnivelsub.push(value.subnivel[sm].subnivel[sms]);
                                        }

                                        subnivelsub.sort(function(a, b) {
                                            return a.posicion - b.posicion;
                                        });

                                        value.subnivel[sm].subnivel = subnivelsub;
                                    }

                                    subnivel.push(value.subnivel[sm]);

                                }

                                subnivel.sort(function(a, b) {
                                    return a.posicion - b.posicion;
                                });
                            };

                            value.subnivel = subnivel;
                            Menu.add(value);
                        });
                        info.sucess = true;
                        info.code = 1;
                        info.data = Menu.get();
                        fn(info);
                    }).catch(function(error) {
                        fn(info);
                    });

                } else {

                    info.sucess = true;
                    info.code = 1;
                    info.data = Menu.get();
                    fn(info);

                }
            }

        }
    };

    function serviceUpdateVisit($firebaseArray, myconfig, Menu) {
        var ref = new Firebase(myconfig.database + "preguntas/");
        var list = $firebaseArray(ref);
        return {
            update: function(idQuestion, fn) {
                var status = false;
                list.$loaded().then(
                    function(data) {
                        var index = data.$indexFor(idQuestion);
                        var obj = list[index];
                        obj.visitas += 1;
                        list.$save(index).then(
                            function(data) {
                                fn(true);
                            },
                            function(error) {
                                fn(false);
                                console.log("ERROR AL ACTUALIZAR EL NUMERO DE VISITAS");
                            }
                        );
                    },
                    function(error) {
                        console.log("ERROR DE CARGA");
                        fn("ERROR DE CARGA");
                    }
                )
            }
        }
    };

    function serviceStorage() {
        return {
            isEmptyJSON: function(obj) {
                for (var i in obj) { return false; }
                return true;
            },
            storageAvailable: function(type) {
                try {
                    var storage = window[type],
                        x = '__storage_test__';
                    storage.setItem(x, x);
                    storage.removeItem(x);
                    return true;
                } catch (e) {
                    return e instanceof DOMException && (
                            // everything except Firefox
                            e.code === 22 ||
                            // Firefox
                            e.code === 1014 ||
                            // test name field too, because code might not be present
                            // everything except Firefox
                            e.name === 'QuotaExceededError' ||
                            // Firefox
                            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                        // acknowledge QuotaExceededError only if there's something already stored
                        storage.length !== 0;
                }
            }
        }
    };
    //filtro para delimitar caracteres
    function stringCount() {
        return function(text) {
            if (text.length > 200)
                return text.slice(0, 200) + " ...";
            else
                return text;
        }
    };
    //modelo de respuesta para funciones de promosa
    function info() {
        return { sucess: false, data: {}, code: -1 };
    };

    function device($location) {
        return {
            redirect: function(weborwap) {
                $(document).ready(function() {


                    var device = navigator.userAgent;
                    var data = sessionStorage.getItem('first');
                    if (device.match(/Iphone/i) || device.match(/Ipod/i) || device.match(/Android/i) || device.match(/J2ME/i) || device.match(/BlackBerry/i) || device.match(/iPhone|iPad|iPod/i) || device.match(/Opera Mini/i) || device.match(/IEMobile/i) || device.match(/Mobile/i) || device.match(/Windows Phone/i) || device.match(/windows mobile/i) || device.match(/windows ce/i) || device.match(/webOS/i) || device.match(/palm/i) || device.match(/bada/i) || device.match(/series60/i) || device.match(/nokia/i) || device.match(/symbian/i) || device.match(/HTC/i)) {
                        if (weborwap === "WAP") {
                            window.location.href = "index-wap.html";
                        }
                    } else {
                        if (weborwap === "WEB") {
                            window.location.href = "index.html";
                        }
                    }
                });
            }
        };
    };

    function isHTML(str) {
        var a = document.createElement('div');
        a.innerHTML = str;
        for (var c = a.childNodes, i = c.length; i--;) {
            if (c[i].nodeType == 1) return true;
        }
        return false;
    };
})();
(function() {

    angular.module("servicesContingency", ["factorysContingency", "jsonReader"])
        .service("serviceContenido", serviceContenido)
        .service("serviceMenu", serviceMenu)
        .service("Device", device)
        .service("serviceStorage", serviceStorage)
        .service("serviceUpdateVisit", serviceUpdateVisit)
        .filter("stringCount", stringCount)
        .filter('unsafe', ['$sce', function($sce) {
            return function(input) {
                return $sce.trustAsHtml(input);
            }
        }])
        .filter('unsafe_respuesta', ['$sce', function($sce) {

            return function(input) {

                //valida si es html y retorna el input modificado
                if (isHTML(input)) {
                    return $sce.trustAsHtml(input);
                } else {
                    return "<p>" + input + "</p>";
                }


            }

        }])
        .filter('responseSearch', function() {

            return function(input) {
                if (input != undefined) {
                    var quitTags = input.replace(/<(?:.|\n)*?>/gm, '');
                    return quitTags.slice(0, 80);
                } else {
                    return "";
                }
            }

        })
        .filter('oneOptionMenu', function() {
            return function(input) {

                var idMenu = 0;
                var count = 0;
                var nivel = input[0]
                if (nivel.hasOwnProperty("subnivel")) {
                    if (nivel.subnivel.length > 0) {
                        var subnivel = nivel.subnivel;
                        return nivel.link + "/" + subnivel[0].link
                    } else {
                        return nivel.link
                    }
                } else {
                    return nivel.link
                }


            };
        });

    function serviceContenido(Reader, myconfig, Contenido, Contenidos, Preguntas, Pregunta, serviceMenu, PreguntasTop) {

        var ref = new Firebase(myconfig.database);

        return {
            //devuelve la informacion del valor contenido mediante un id (key)
            getContenido: function(key, fn) {

                var info = { sucess: false, data: {}, code: -1 };
                Reader.get("contenido", function(data) {
                    info.success = true;
                    info.code = 1;
                    info.data = Contenido.get(data, key);
                    fn(info);
                });

            },
            //devuelve todas las preguntas relacionadas a una categoria en especifico id(key) 
            getPreguntas: function(key, fn) {
                var info = { sucess: false, data: {}, code: -1 };
                //var data =  new Preguntas( ref.child("preguntas/") );
                Reader.get("preguntas", function(data) {

                    info.success = true;
                    info.code = 1;
                    info.data = Preguntas.get(data, key);
                    fn(info);
                });
            },
            //busca y devuelve un valor dentro del valor contenido, alguna cadena String asociada
            searchContenidos: function(word, fn) {

                var info = { sucess: false, data: {}, code: -1 };
                //var data =  new Contenidos( ref.child("contenido") );

                Reader.get("contenido", function(data) {
                    info.success = true;
                    info.code = 1;
                    info.data = Contenidos.buscar(data, word);
                    fn(info);
                });

            },
            //busca y devuelve un valor, dentro del valor preguntas, alguna cadena String asociada
            searchPreguntas: function(word, fn) {

                var info = { sucess: false, data: {}, code: -1 };
                //var data =  new Preguntas( ref.child("preguntas") );

                Reader.get("preguntas", function(data) {
                    info.success = true;
                    info.code = 1;
                    info.data = Preguntas.buscar(data, word);
                    fn(info);
                });

            },
            searchReduceAndFormated: function(dataSet, word, dataKey) {
                var reducedText = "";
                var formatedText = "";
                angular.forEach(dataSet, function(element, index) {
                    element[dataKey] = dataKey === "contenido" ? element[dataKey].replace(/<(?:.|\n)*?>/gm, '') : element[dataKey];
                    reducedText = element[dataKey].slice(0, 80);
                    formatedText = reducedText.split(word).join("<b>" + word + "</b>");
                    element[dataKey] = formatedText.length >= 80 ? formatedText + " ..." : formatedText;
                });
                return dataSet;
            },
            //optiene las 10 preguntas mas buscadas
            getPreguntasTop: function(fn) {
                var info = { sucess: false, data: {}, code: -1 };
                //var data =  new Preguntas( ref.child("preguntas/") );

                Reader.get("preguntas", function(data) {

                    info.success = true;
                    info.code = 1;
                    if (PreguntasTop.get().length <= 0) {

                        var _data = Preguntas.getAll(data);

                        _data.sort(function(a, b) {
                            return b.visitas - a.visitas;
                        });

                        for (var i = 0; i < 10; i++) {
                            PreguntasTop.set(_data[i]);
                        }

                        info.data = PreguntasTop.get();

                    } else {

                        info.data = PreguntasTop.get();

                    };
                    // console.log(info);
                    fn(info);
                });
            }
        }
    };
    //devuelve el valor de Menu
    function serviceMenu(Reader, myconfig, Menu) {

        //var ref   = new Firebase( myconfig.database+"menu/" );
        //var list  = $firebaseArray( ref );

        return {

            get: function(fn) {

                var info = { sucess: false, data: {}, code: -1 };

                if (Menu.total() <= 0) {

                    Reader.get("menu", function(data) {

                        angular.forEach(data, function(value, key) {
                            var subnivel = [];
                            if (value.subnivel) {
                                for (var sm in value.subnivel) {

                                    var subnivelsub = [];
                                    if (value.subnivel[sm].subnivel) {

                                        for (var sms in value.subnivel[sm].subnivel) {
                                            subnivelsub.push(value.subnivel[sm].subnivel[sms]);
                                        }

                                        subnivelsub.sort(function(a, b) {
                                            return a.posicion - b.posicion;
                                        });

                                        value.subnivel[sm].subnivel = subnivelsub;
                                    }

                                    subnivel.push(value.subnivel[sm]);

                                }

                                subnivel.sort(function(a, b) {
                                    return a.posicion - b.posicion;
                                });
                            };

                            value.subnivel = subnivel;
                            Menu.add(value);
                        });
                        info.sucess = true;
                        info.code = 1;
                        info.data = Menu.get();
                        fn(info);
                    });

                } else {

                    info.sucess = true;
                    info.code = 1;
                    info.data = Menu.get();
                    fn(info);

                }
            }

        }
    };

    function serviceUpdateVisit(myconfig, Menu) {
        //var ref   = new Firebase( myconfig.database +"preguntas/" );
        //var list  = $firebaseArray( ref );
        return {
            update: function(idQuestion, fn) {
                var status = false;
                /*list.$loaded().then(
                    function(data){
                      var index     = data.$indexFor(idQuestion);
                      var obj = list[index];
                      obj.visitas += 1;
                      list.$save( index ).then(
                        function(data){
                          fn(true);
                        },
                        function(error){
                          fn(false);
                          console.log("ERROR AL ACTUALIZAR EL NUMERO DE VISITAS");
                        }
                      );
                    },
                    function(error){
                      console.log("ERROR DE CARGA");
                      fn("ERROR DE CARGA");
                    }
                  )*/
            }
        }
    };

    function serviceStorage() {
        return {
            isEmptyJSON: function(obj) {
                for (var i in obj) { return false; }
                return true;
            },
            storageAvailable: function(type) {
                try {
                    var storage = window[type],
                        x = '__storage_test__';
                    storage.setItem(x, x);
                    storage.removeItem(x);
                    return true;
                } catch (e) {
                    return e instanceof DOMException && (
                            // everything except Firefox
                            e.code === 22 ||
                            // Firefox
                            e.code === 1014 ||
                            // test name field too, because code might not be present
                            // everything except Firefox
                            e.name === 'QuotaExceededError' ||
                            // Firefox
                            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                        // acknowledge QuotaExceededError only if there's something already stored
                        storage.length !== 0;
                }
            }
        }
    };
    //filtro para delimitar caracteres
    function stringCount() {
        return function(text) {
            if (text.length > 200)
                return text.slice(0, 200) + " ...";
            else
                return text;
        }
    };
    //modelo de respuesta para funciones de promosa
    function info() {
        return { sucess: false, data: {}, code: -1 };
    };

    function device($location) {
        return {
            redirect: function(weborwap) {
                $(document).ready(function() {


                    var device = navigator.userAgent;
                    var data = sessionStorage.getItem('first');
                    if (device.match(/Iphone/i) || device.match(/Ipod/i) || device.match(/Android/i) || device.match(/J2ME/i) || device.match(/BlackBerry/i) || device.match(/iPhone|iPad|iPod/i) || device.match(/Opera Mini/i) || device.match(/IEMobile/i) || device.match(/Mobile/i) || device.match(/Windows Phone/i) || device.match(/windows mobile/i) || device.match(/windows ce/i) || device.match(/webOS/i) || device.match(/palm/i) || device.match(/bada/i) || device.match(/series60/i) || device.match(/nokia/i) || device.match(/symbian/i) || device.match(/HTC/i)) {
                        if (weborwap === "WAP") {
                            window.location.href = "index-wap.html";
                        }
                    } else {
                        if (weborwap === "WEB") {
                            window.location.href = "index.html";
                        }
                    }
                });
            }
        };
    };

    function isHTML(str) {
        var a = document.createElement('div');
        a.innerHTML = str;
        for (var c = a.childNodes, i = c.length; i--;) {
            if (c[i].nodeType == 1) return true;
        }
        return false;
    };
})();