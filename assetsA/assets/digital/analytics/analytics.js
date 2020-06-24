function showBlp(){
var catExcludeList = [{catId:"cat7180011",validate:"true",id:"cat-0001", action:'showPLP'},
                 {catId:"catst11034202",validate:"true",id:"cat-0002", action:'showPLP'},
                 {catId:"cat6910000",validate:"true",id:"cat-0003", action:'showPLP'},
                 {catId:"cat6600048",validate:"true",id:"cat-0004", action:'showPLP'},
                 {catId:"cat7230028",validate:"true",id:"cat-0005", action:'showPLP'},
                 {catId:"cat7530016",validate:"true",id:"cat-0006", action:'showPLP'},
                 {catId:"catst12274633",validate:"true",id:"cat-0007", action:'showPLP'}];
    var subnav;
    var catElements = (document.getElementById("target0")) ? document.getElementById("target0").children[0].children[0].children : '';
    if(catElements){
    var nav = document.getElementsByClassName('card nav-item');
    for (var i = 0; i < nav.length; i++) {
      subnav = nav[i].children[1].children[0];
      var arrSubnav = Array.from(subnav.children[0].children);
      for (var p = 0; p < arrSubnav.length; p++) {
            var arrSubnavChild = Array.from(arrSubnav[p].children);
              var catRefTitle = arrSubnavChild[0].getAttribute('href').substring(arrSubnavChild[0].getAttribute("href").lastIndexOf("/") + 1).split("?showPLP")[0];
              var catGetAttribute = arrSubnavChild[0].getAttribute('href');
              var catRefArray= arrSubnavChild[0];
              for (var o = 0; o < catExcludeList.length; o++) {
                  var catExcludeId = catExcludeList[o].catId;
                  if(catExcludeId != catRefTitle){
                      var catRef = catRefArray.getAttribute("href").split("?showPLP")[0]+"?showPLP";
                      catRefArray.setAttribute("href",catRef);
                }
              }
           }
        }
    }

}
function countDownBuenFin(){
	try {
                var endDate = new Date("November 14, 2019 21:00:00").getTime();
                var elDays = document.querySelectorAll(".cdh_days");
                var elHours = document.querySelectorAll(".cdh_hours");
                var elMinutes = document.querySelectorAll(".cdh_minutes");
                var elSeconds = document.querySelectorAll(".cdh_seconds");
                  var days = 0;
                    var hours = 0;
                    var minutes = 0;
                    var seconds = 0;
                    var nowaday = 0;
                    var distanceBetweenDays = 0;
                var operationsTime =function() {
                  
                    nowaday = new Date().getTime();
                    distanceBetweenDays = endDate - nowaday;
                     days = Math.floor(distanceBetweenDays / (1000 * 60 * 60 * 24));
                     hours = Math.floor((distanceBetweenDays % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                     minutes = Math.floor((distanceBetweenDays % (1000 * 60 * 60)) / (1000 * 60));
                     seconds = Math.floor((distanceBetweenDays % (1000 * 60)) / 1000);
                    if (distanceBetweenDays < 0) {
                        clearInterval(engineTime);
                        days = 0;
                        hours = 0;
                        minutes = 0;
                        seconds = 0;
                    }
                    return {
                        "days": days,
                        "hours": hours,
                        "minutes": minutes,
                        "seconds": seconds
                    }
                }
                var setElements = function(el,val){
                    if(el.length > 0){
                        for(var i = 0; i<el.length;i++){
                            el[i].innerHTML = val < 10 ? "0" + val : val;
                        }
                    }
                }
                var setDataTime = function(d, h, m, s) {
                    setElements(elDays ,d);
                     setElements(elHours,h);
                      setElements(elMinutes,m);
                       setElements(elSeconds,s);

               
                }
                var runTime = function() {
                    var dataTime = operationsTime();
                    setDataTime(dataTime.days, dataTime.hours, dataTime.minutes, dataTime.seconds);
                }
                var engineTime = setInterval(runTime, 0);
            } catch (Exception) {
                console.log("time__fail");
            }
}


function myOnloadFunction(pageName,path) {
        showBlp();
        switch(pageName){

            case '/tienda/home':
                dataLayer.push({
                'event': 'impresionCampaign',
                'ecommerce': {
                    'promoView': {
                        'promotions': [// Array of promoFieldObjects.
 
		{
               'id':'covid19_010420',
               'name':'Comunicado COVID-19',
               'creative':'h_banner_central',
               'position':'A'
                    },
               {
                'id':'mujer_240620',
                'name':'Mujer hasta 40% de desc',
                'creative':'h_banner_central',
                'position':'1'
               },
               
                    {
                'id':'hombre_240620',
                'name':'Hombre hasta 40% de desc',
                'creative':'h_banner_central',
                'position':'2'
               },
                     
               {
               'id':'ninas_y_ninos_240620',
            'name':'Niñas y Niños hasta 40% de desc',
                'creative':'h_banner_secun',
                'position':'3'
               },
               {
                'id':'bebes_240620',
            'name':'Bebes hasta 40% de desc',
                'creative':'h_banner_secun',
                'position':'4'
               },
               {
                 'id':'zapatos_240620',
       'name':'Zapatos hasta 40% de desc',
                'creative':'h_banner_secun',
                'position':'5'
               },
               {
               'id':'muebles_de_jardin_150620',
       'name':'Muebles de jardín hasta 30% de desc',
               'creative':'h_banner_secun',
               'position':'6'
                    },
               {
                'id':'cocina_220620',
            'name':'Cocina hasta 25% de desc',
               'creative':'h_banner_secun',
               'position':'7'
                    },
               {
               'id':'aires_acondicionados_220620',
       'name':'Aires Acondicionados hasta 40% de desc',
               'creative':'h_banner_secun',
               'position':'8'
                    },
               {
               'id':'deportes_240620',
       'name':'Deportes hasta 40% de desc',
               'creative':'h_banner_secun',
               'position':'9'
                    },
               {
              'id':'relojes_220620',
            'name':'Relojes hasta 25% de desc',
               'creative':'h_banner_secun',
               'position':'10'
                    },
               {
               'id':'pandora_220620',
        'name':'Pandora hasta 40% de desc',
               'creative':'h_banner_secun',
               'position':'11'
                    },
               {
              'id':'k_beauty_020620',
            'name':'K-Beauty',
               'creative':'h_banner_secun',
               'position':'12'
                    }  
                        ]
                    }
                }
            });
            
            
 /*AQUÍ INICIA LANDING*/    
 
 
  /*PRIMER NIVEL EL*/ 
       
            break;
            case '/tienda/él/cat5020003':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'blazers_060320',
    'name': 'Blazers Él',
    'creative': 'blp_el_blazers',
    'position': '01'
},
{
    'id': 'camisas_060320',
    'name': 'Camisas Él',
    'creative': 'blp_el_camisas',
    'position': '02'
},
{
    'id': 'pantalones_060320',
    'name': 'Pantalones Él',
    'creative': 'blp_el_pantalones',
    'position': '03'
},
{
    'id': 'jeans_060320',
    'name': 'Jeans Él',
    'creative': 'blp_el_jeans',
    'position': '04'
},
{
    'id': 'zapatos_060320',
    'name': 'Zapatos Él',
    'creative': 'blp_el_zapatos',
    'position': '05'
},
{
    'id': 'polos_060320',
    'name': 'Polos Él',
    'creative': 'blp_el_polos',
    'position': '06'
},
{
    'id': 'trajesbano_060320',
    'name': 'Trajes Bano Él',
    'creative': 'blp_el_trajesbano',
    'position': '07'
},
{
    'id': 'solares_060320',
    'name': 'Solares Él',
    'creative': 'blp_el_solares',
    'position': '08'
},
{
    'id': 'sudaderas_060320',
    'name': 'Sudaderas Él',
    'creative': 'blp_el_sudaderas',
    'position': '09'
},
{
    'id': 'joggers_060320',
    'name': 'Joggers Él',
    'creative': 'blp_el_joggers',
    'position': '10'
},
{
    'id': 'sneakers_060320',
    'name': 'Sneakers Él',
    'creative': 'blp_el_sneakers',
    'position': '11'
},
{
    'id': 'accesorios_060320',
    'name': 'Accesorios Él',
    'creative': 'blp_el_accesorios',
    'position': '12'
},
{
    'id': 'hugo_060320',
    'name': 'Hugo Él',
    'creative': 'blp_el_hugo',
    'position': '13'
},
{
    'id': 'banana_060320',
    'name': 'Banana Él',
    'creative': 'blp_el_banana',
    'position': '14'
},
{
    'id': 'american_060320',
    'name': 'American Él',
    'creative': 'blp_el_american',
    'position': '15'
},
{
    'id': 'psycho_060320',
    'name': 'Psycho Él',
    'creative': 'blp_el_psycho',
    'position': '16'
},
{
    'id': 'gap_060320',
    'name': 'GAP Él',
    'creative': 'blp_el_gap',
    'position': '17'
},
{
    'id': 'ralph_060320',
    'name': 'Ralph Él',
    'creative': 'blp_el_ralph',
    'position': '18'
}
]
}
}
});


 /*PRIMER NIVEL BELLEZA*/ 

            break;
            case '/tienda/belleza/cat5020010':
 dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'regalo_main_040619',
'name': 'Regalo Compra',
'creative': 'blp_belleza_regalo',
'position': '01'
},
{
'id': 'palettes_300719',
'name': 'Palettes Belleza',
'creative': 'blp_belleza_palettes',
'position': '02'
},
{
'id': 'mac_love_120819',
'name': 'Mac Love',
'creative': 'blp_belleza_mac_love',
'position': '03'
},
{
'id': 'hair_care_040619',
'name': 'Hair Care',
'creative': 'blp_belleza_hair_care',
'position': '04'
},
{
'id': 'make_up_040619',
'name': 'Make Up',
'creative': 'blp_belleza_make_up',
'position': '05'
},
{
'id': 'perfumes_040619',
'name': 'Perfumes',
'creative': 'blp_belleza_perfumes',
'position': '06'
},
{
'id': 'skin_care_040619',
'name': 'Skin Care',
'creative': 'blp_belleza_skin_care',
'position': '07'
},
{
'id': 'hombres_040619',
'name': 'Hombres Belleza',
'creative': 'blp_belleza_hombres',
'position': '08'
},
{
'id': 'pickbox_040619',
'name': 'Pickbox Belleza',
'creative': 'blp_belleza_pickbox',
'position': '09'
},
{
'id': 'crema_ojos_040619',
'name': 'Crema ojos',
'creative': 'blp_belleza_crema_ojos',
'position': '10'
},
{
'id': 'mascarillas_040619',
'name': 'Mascarillas',
'creative': 'blp_belleza_mascarillas',
'position': '11'
},
{
'id': 'corporales_040619',
'name': 'Corporales',
'creative': 'blp_belleza_corporales',
'position': '12'
},
{
'id': 'faciales_040619',
'name': 'Faciales',
'creative': 'blp_belleza_faciales',
'position': '13'
},
{
'id': 'ladeco_120819',
'name': 'Ladeco Video',
'creative': 'blp_belleza_ladeco',
'position': '14'
},
{
'id': 'anastasia_040619',
'name': 'Anastasia',
'creative': 'blp_belleza_anastasia',
'position': '15'
},
{
'id': 'dior_040619',
'name': 'Dior',
'creative': 'blp_belleza_dior',
'position': '16'
},
{
'id': 'estee_040619',
'name': 'Estee',
'creative': 'blp_belleza_estee',
'position': '17'
},
{
'id': 'giorgio_040619',
'name': 'Giorgio',
'creative': 'blp_belleza_giorgio',
'position': '18'
},
{
'id': 'guerlain_040619',
'name': 'Guerlain',
'creative': 'blp_belleza_guerlain',
'position': '19'
},
{
'id': 'givenchy_040619',
'name': 'Givenchy',
'creative': 'blp_belleza_givenchy',
'position': '20'
},
{
'id': 'kiehls_040619',
'name': 'Kiehls',
'creative': 'blp_belleza_kiehls',
'position': '21'
},
{
'id': 'lancome_040619',
'name': 'Lancome',
'creative': 'blp_belleza_lancome',
'position': '22'
},
{
'id': 'mac_040619',
'name': 'Mac',
'creative': 'blp_belleza_mac',
'position': '23'
},
{
'id': 'urban_decay_040619',
'name': 'Urban Decay',
'creative': 'blp_belleza_urban_decay',
'position': '24'
},
{
'id': 'bx_040619',
'name': 'BX',
'creative': 'blp_belleza_bx',
'position': '25'
}
]
}
}
});

/*PRIMER NIVEL DEPORTES*/ 

            break;
            case '/tienda/deportes/cat480332':
 dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'aire_libre_061119',
    'name': 'Aire Libre',
    'creative': 'blp_deportes_airelibre',
    'position': '01'
},
{
    'id': 'acuaticos_061119',
    'name': 'Acuaticos',
    'creative': 'blp_deportes_acuaticos',
    'position': '02'
},
{
    'id': 'ballet_061119',
    'name': 'Ballet',
    'creative': 'blp_deportes_ballet',
    'position': '03'
},
{
    'id': 'beisbol_061119',
    'name': 'Beisbol',
    'creative': 'blp_deportes_beisbol',
    'position': '04'
},
{
    'id': 'basquet_061119',
    'name': 'Basquet',
    'creative': 'blp_deportes_basquet',
    'position': '05'
},
{
    'id': 'box_061119',
    'name': 'Box',
    'creative': 'blp_deportes_box',
    'position': '06'
},
{
    'id': 'campismo_061119',
    'name': 'Campismo',
    'creative': 'blp_deportes_campismo',
    'position': '07'
},
{
    'id': 'ciclismo_061119',
    'name': 'Ciclismo',
    'creative': 'blp_deportes_ciclismo',
    'position': '08'
},
{
    'id': 'caza_061119',
    'name': 'Caza',
    'creative': 'blp_deportes_caza',
    'position': '09'
},
{
    'id': 'correr_061119',
    'name': 'Correr',
    'creative': 'blp_deportes_correr',
    'position': '10'
},
{
    'id': 'entrenamiento_061119',
    'name': 'Entrenamiento',
    'creative': 'blp_deportes_entrenamiento',
    'position': '11'
},
{
    'id': 'americano_061119',
    'name': 'Americano',
    'creative': 'blp_deportes_americano',
    'position': '12'
},
{
    'id': 'futbol_061119',
    'name': 'Futbol',
    'creative': 'blp_deportes_futbol',
    'position': '13'
},
{
    'id': 'golf_061119',
    'name': 'Golf',
    'creative': 'blp_deportes_golf',
    'position': '14'
},
{
    'id': 'moto_061119',
    'name': 'Moto',
    'creative': 'blp_deportes_moto',
    'position': '15'
},
{
    'id': 'pesca_061119',
    'name': 'Pesca',
    'creative': 'blp_deportes_pesca',
    'position': '16'
},
{
    'id': 'raqueta_061119',
    'name': 'Raqueta',
    'creative': 'blp_deportes_pesca',
    'position': '17'
},
{
    'id': 'voleibol_061119',
    'name': 'Voleibol',
    'creative': 'blp_deportes_voleibol',
    'position': '18'
},
{
    'id': 'yoga_061119',
    'name': 'Yoga',
    'creative': 'blp_deportes_yoga',
    'position': '19'
},
{
    'id': 'entrenacasa_010420',
    'name': 'Entrenamiento en casa',
    'creative': 'blp_deportes_entrenacasa',
    'position': '20'
},
{
    'id': 'monitores_010420',
    'name': 'Monitores',
    'creative': 'blp_deportes_monitores',
    'position': '21'
},
{
    'id': 'ropa_010420',
    'name': 'Ropa',
    'creative': 'blp_deportes_ropa',
    'position': '22'
},
{
    'id': 'aparatos_010420',
    'name': 'Aparatos',
    'creative': 'blp_deportes_aparatos',
    'position': '23'
},
{
    'id': 'suplementos_010420',
    'name': 'Suplementos',
    'creative': 'blp_deportes_suplementos',
    'position': '24'
},
{
    'id': 'deportes_acuaticos_010420',
    'name': 'Deportes Acuaticos',
    'creative': 'blp_deportes_deportesacuaticos',
    'position': '25'
},
{
    'id': 'tenis_el130220',
    'name': 'Tenis El',
    'creative': 'blp_deportes_tenis_el',
    'position': '26'
},
{
    'id': 'tenis_ella130220',
    'name': 'Tenis Ella',
    'creative': 'blp_deportes_tenis_ella',
    'position': '27'
},
{
    'id': 'tenis_ninos130220',
    'name': 'Tenis Ninos',
    'creative': 'blp_deportes_tenis_ninos',
    'position': '28'
},
{
    'id': 'tenis_ninas130220',
    'name': 'Tenis Ninas',
    'creative': 'blp_deportes_tenis_ninas',
    'position': '29'
},
{
    'id': 'nike_010420',
    'name': 'Nike',
    'creative': 'blp_deportes_nike',
    'position': '30'
},
{
    'id': 'adidas_010420',
    'name': 'Adidas',
    'creative': 'blp_deportes_adidas',
    'position': '31'
},
{
    'id': 'puma_010420',
    'name': 'Puma',
    'creative': 'blp_deportes_puma',
    'position': '32'
},
{
    'id': 'coleccionables130220',
    'name': 'Coleccionables',
    'creative': 'blp_deportes_coleccionables',
    'position': '33'
}
]
}
}
});


/*PRIMER NIVEL LINEA BLANCA*/ 

            break;
            case '/tienda/línea-blanca/cat610025':
 dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'conectividad_180320',
    'name': 'Conectividad Hogar',
    'creative': 'blp_lineablanca_conectividad',
    'position': '01'
},
{
    'id': 'lavadosecado_180320',
    'name': 'Lavado y secado',
    'creative': 'blp_lineablanca_lavado',
    'position': '02'
},
{
    'id': 'cocinas_180320',
    'name': 'Cocinas',
    'creative': 'blp_lineablanca_cocinas',
    'position': '03'
},
{
    'id': 'refrigeradores_180320',
    'name': 'Refrigeradores',
    'creative': 'blp_lineablanca_refrigeradores',
    'position': '04'
},
{
    'id': 'aires_180320',
    'name': 'Aires',
    'creative': 'blp_lineablanca_aires',
    'position': '05'
},
{
    'id': 'purificador_180320',
    'name': 'Purificador',
    'creative': 'blp_lineablanca_cafe',
    'position': '06'
},
{
    'id': 'parrillas_180320',
    'name': 'Parrillas',
    'creative': 'blp_lineablanca_parrillas',
    'position': '07'
},
{
    'id': 'microondas_180320',
    'name': 'Microondas',
    'creative': 'blp_lineablanca_microondas',
    'position': '08'
},
{
    'id': 'cafe_180320',
    'name': 'Café',
    'creative': 'blp_lineablanca_cafe',
    'position': '09'
},
{
    'id': 'campanas_180320',
    'name': 'Campanas',
    'creative': 'blp_lineablanca_campanas',
    'position': '10'
},
{
    'id': 'estufas_180320',
    'name': 'Estufas',
    'creative': 'blp_lineablanca_estufas',
    'position': '11'
}
]
}
}
});


/*PRIMER NIVEL VINOS*/ 

            break;
            case '/tienda/vinos-y-gourmet/cat4370401':
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
        'id': 'cerveza_clara_300120',
        'name': 'Cervez Clara',
        'creative': 'blp_vinos_cervezac',
        'position': '01'
},
{
        'id': 'cerveza_obs_300120',
        'name': 'Cervez Obscura',
        'creative': 'blp_vinos_cervezaob',
        'position': '02'
},
{
    'id': 'rosado_210619',
    'name': 'Vino Rosado',
    'creative': 'blp_vinos_rosado',
    'position': '03'
},
{
    'id': 'blanco_210619',
    'name': 'Vino Blanco',
    'creative': 'blp_vinos_blanco',
    'position': '04'
},
{
    'id': 'tinto_210619',
    'name': 'Vino Tinto',
    'creative': 'blp_vinos_tinto',
    'position': '05'
},
{
    'id': 'espumoso_210619',
    'name': 'Vino Espumoso',
    'creative': 'blp_vinos_espumoso',
    'position': '06'
},
{
    'id': 'champagne_210619',
    'name': 'Vino Champagne',
    'creative': 'blp_vinos_champagne',
    'position': '07'
},
{
    'id': 'buchanans_140819',
    'name': 'Buchanans Soul',
    'creative': 'blp_vinos_buchanans',
    'position': '08'
},
{
    'id': 'donjulio_140819',
    'name': 'Don Julio',
    'creative': 'blp_vinos_donjulio',
    'position': '09'
},
{
    'id': 'tequila_210619',
    'name': 'Vinos Tequila',
    'creative': 'blp_vinos_tequila',
    'position': '10'
},
{
    'id': 'ron_210619',
    'name': 'Vinos Ron',
    'creative': 'blp_vinos_ron',
    'position': '11'
},
{
    'id': 'whisky_210619',
    'name': 'Vinos Whisky',
    'creative': 'blp_vinos_whisky',
    'position': '12'
},
{
    'id': 'brandy_210619',
    'name': 'Vinos Brandy',
    'creative': 'blp_vinos_brandy',
    'position': '13'
},
{
    'id': 'licores_210619',
    'name': 'Vinos Licores',
    'creative': 'blp_vinos_licores',
    'position': '14'
},
{
    'id': 'vodka_210619',
    'name': 'Vinos vodka',
    'creative': 'blp_vinos_vodka',
    'position': '15'
},
{
    'id': 'copas_210619',
    'name': 'Vinos copas',
    'creative': 'blp_vinos_copas',
    'position': '16'
},
{
    'id': 'accesorios_210619',
    'name': 'Vinos accesorios',
    'creative': 'blp_vinos_accesorios',
    'position': '17'
},
{
    'id': 'cavas_210619',
    'name': 'Vinos cavas',
    'creative': 'blp_vinos_cavas',
    'position': '18'
},
{
    'id': 'hieleras_210619',
    'name': 'Vinos hieleras',
    'creative': 'blp_vinos_hieleras',
    'position': '19'
},
{
    'id': 'experiencia_210619',
    'name': 'Vinos experiencia',
    'creative': 'blp_vinos_experiencia',
    'position': '20'
},
{
    'id': 'curados_210619',
    'name': 'Vinos curados',
    'creative': 'blp_vinos_curados',
    'position': '21'
},
{
    'id': 'bebidas_210619',
    'name': 'Vinos bebidas',
    'creative': 'blp_vinos_bebidas',
    'position': '22'
},
{
    'id': 'aceite_210619',
    'name': 'Vinos aceiete',
    'creative': 'blp_vinos_aceite',
    'position': '23'
}
]
}
}
});



/*PRIMER NIVEL COCINA*/ 

            break;
            case '/tienda/cocina/cat480186':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'licuadoras_230320',
    'name': 'Licuadoras Cocina',
    'creative': 'blp_cocina_licuadoras',
    'position': '01'
},
{
    'id': 'microondas_230320',
    'name': 'Microondas Cocina',
    'creative': 'blp_cocina_microondas',
    'position': '02'
},
{
    'id': 'cafeteras_230320',
    'name': 'Cafeteras Cocina',
    'creative': 'blp_cocina_cafeteras',
    'position': '03'
},
{
    'id': 'batidoras_230320',
    'name': 'Batidoras Cocina',
    'creative': 'blp_cocina_batidoras',
    'position': '04'
},
{
    'id': 'frigbares_230320',
    'name': 'Frigobares Cocina',
    'creative': 'blp_cocina_frigobares',
    'position': '05'
},
{
    'id': 'ollas_230320',
    'name': 'Ollas Cocina',
    'creative': 'blp_cocina_ollas',
    'position': '06'
},
{
    'id': 'vajillas_230320',
    'name': 'Vajillas Cocina',
    'creative': 'blp_cocina_frigobares',
    'position': '07'
},
{
    'id': 'baterias_230320',
    'name': 'Baterias Cocina',
    'creative': 'blp_cocina_baterias',
    'position': '08'
},
{
    'id': 'refrigeradores_230320',
    'name': 'Refrigeradores Cocina',
    'creative': 'blp_cocina_refrigeradores',
    'position': '09'
},
{
    'id': 'campanas_230320',
    'name': 'Campanas Cocina',
    'creative': 'blp_cocina_campanas',
    'position': '10'
},
{
    'id': 'estufas_230320',
    'name': 'Estufas Cocina',
    'creative': 'blp_cocina_estufas',
    'position': '11'
}
]
}
}
});


/*PRIMER NIVEL MUEBLES*/ 

            break;
            case '/tienda/muebles/cat860739':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'jardin_180320',
    'name': 'Jardines',
    'creative': 'blp_muebles_jardines',
    'position': '01'
},
{
    'id': 'oficina_180320',
    'name': 'Oficina',
    'creative': 'blp_muebles_oficina',
    'position': '02'
},
{
    'id': 'salas_180320',
    'name': 'Salas',
    'creative': 'blp_muebles_salas',
    'position': '03'
},
{
    'id': 'colchones_180320',
    'name': 'Colchones',
    'creative': 'blp_muebles_colchones',
    'position': '04'
},
{
    'id': 'infantiles_180320',
    'name': 'Infantiles',
    'creative': 'blp_muebles_infantiles',
    'position': '05'
},
{
    'id': 'bebe_180320',
    'name': 'Bebe',
    'creative': 'blp_muebles_bebe',
    'position': '06'
},
{
    'id': 'sillas_180320',
    'name': 'Sillas',
    'creative': 'blp_muebles_sillas',
    'position': '07'
},
{
    'id': 'iluminacion_180320',
    'name': 'Iluminacion',
    'creative': 'blp_muebles_iluminacion',
    'position': '08'
},
{
    'id': 'portaretratos_180320',
    'name': 'Portaretratos',
    'creative': 'blp_muebles_portaretratos',
    'position': '09'
},
{
    'id': 'tapetes_180320',
    'name': 'Tapetes',
    'creative': 'blp_muebles_tapetes',
    'position': '10'
},
{
    'id': 'cuadros_180320',
    'name': 'Cuadros',
    'creative': 'blp_muebles_cuadros',
    'position': '11'
},
{
    'id': 'espejos_180320',
    'name': 'Espejos',
    'creative': 'blp_muebles_espejos',
    'position': '12'
},
{
    'id': 'cdi_210619',
    'name': 'CDI',
    'creative': 'blp_muebles_cdi',
    'position': '13'
}
]
}
}
});



                
/*PRIMER NIVEL OTRAS CATEGORÍAS*/ 

            break;
            case '/tienda/otras-categorias/catst16656479':
 dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'automotriz_301019',
'name': 'OC Automotriz',
'creative': 'blp_oc_automotriz',
'position': '01'
},
{
'id': 'motodeportiva_301019',
'name': 'OC Moto Deportiva',
'creative': 'blp_oc_deportiva',
'position': '02'
},
{
'id': 'motourbana_301019',
'name': 'OC Moto Urbana',
'creative': 'blp_oc_urbana',
'position': '03'
},
{
'id': 'chopper_301019',
'name': 'OC Moto Chopper',
'creative': 'blp_oc_chopper',
'position': '04'
},
{
'id': 'multi_301019',
'name': 'OC Moto Multi',
'creative': 'blp_oc_multi',
'position': '05'
},
{
'id': 'proteinas_301019',
'name': 'OC Proteinas',
'creative': 'blp_oc_proteinas',
'position': '06'
},
{
'id': 'superfoood_301019',
'name': 'OC SuperFood',
'creative': 'blp_oc_superfood',
'position': '07'
},
{
'id': 'personalcare_301019',
'name': 'OC Personal',
'creative': 'blp_oc_personal',
'position': '08'
},
{
'id': 'yoga_301019',
'name': 'OC Yoga',
'creative': 'blp_oc_yoga',
'position': '09'
},
{
'id': 'WellnessTodo_301019',
'name': 'OC Wellness Todo',
'creative': 'blp_oc_wellnesstodo',
'position': '10'
},
{
'id': 'electricas_301019',
'name': 'OC Electricas',
'creative': 'blp_oc_electricas',
'position': '11'
},
{
'id': 'manuales_301019',
'name': 'OC Manuales',
'creative': 'blp_oc_manuales',
'position': '12'
},
{
'id': 'hidrolavadoras_301019',
'name': 'OC Hidrolavadoras',
'creative': 'blp_oc_hidrolavadoras',
'position': '13'
},
{
'id': 'aspiradoras_301019',
'name': 'OC Aspiradoras',
'creative': 'blp_oc_aspiradoras',
'position': '14'
},
{
'id': 'TodoFerreteria_301019',
'name': 'OC Todo Ferreteria',
'creative': 'blp_oc_Ferreteria',
'position': '15'
},
{
'id': 'alimentos_301019',
'name': 'OC Alimentos',
'creative': 'blp_oc_alimentos',
'position': '16'
},
{
'id': 'platos_301019',
'name': 'OC Platos',
'creative': 'blp_oc_platos',
'position': '17'
},
{
'id': 'estetica_301019',
'name': 'OC Estetica',
'creative': 'blp_oc_estetica',
'position': '18'
},
{
'id': 'juguetes_301019',
'name': 'OC Juguetes',
'creative': 'blp_oc_juguetes',
'position': '19'
},
{
'id': 'salud_301019',
'name': 'OC Salud',
'creative': 'blp_oc_salud',
'position': '20'
},
{
'id': 'higiene_301019',
'name': 'OC Higiene',
'creative': 'blp_oc_higiene',
'position': '21'
},
{
'id': 'TodoMascota_301019',
'name': 'OC Todo Mascota',
'creative': 'blp_oc_todomascota',
'position': '22'
}
]
}
}
});

                
                
                
                
                


/*PRIMER NIVEL VIDEOJUEGOS*/ 

            break;
            case '/tienda/videojuegos/cat670055':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'consola_acm_270220',
    'name': 'Animal Crossing Consola m',
    'creative': 'blp_videojuegos_consola_ac_m',
    'position': '01'
},
{
    'id': 'nintendo_marca_090819',
    'name': 'Marca Nintendo',
    'creative': 'blp_videojuegos_marca_nintendo',
    'position': '02'
},
{
    'id': 'playstation_marca_090819',
    'name': 'Marca Playstation',
    'creative': 'blp_videojuegos_marca_playstation',
    'position': '03'
},
{
    'id': 'xbox_marca_090819',
    'name': 'Marca Xbox',
    'creative': 'blp_videojuegos_marca_xbox',
    'position': '04'
},
{
    'id': 'animalcrossing_270220',
    'name': 'Animal Crossing',
    'creative': 'blp_videojuegos_animalcrossing',
    'position': '05'
},
{
    'id': 'consolas_090819',
    'name': 'Consolas',
    'creative': 'blp_videojuegos_consolas',
    'position': '06'
},
{
    'id': 'juegos_090819',
    'name': 'Juegos',
    'creative': 'blp_videojuegos_juegos',
    'position': '07'
},
{
    'id': 'accesorios_090819',
    'name': 'Accesorios',
    'creative': 'blp_videojuegos_accesorios',
    'position': '08'
},
{
    'id': 'animalcrossing2_060220',
    'name': 'Animal Crossing2',
    'creative': 'blp_videojuegos_animalcrossing2',
    'position': '09'
},
{
    'id': 'ps4pro_270220',
    'name': 'PS4 PRO',
    'creative': 'blp_videojuegos_ps4pro',
    'position': '10'
},
{
    'id': 'greatest_hits_090819',
    'name': 'Greatest Hits',
    'creative': 'blp_videojuegos_greatest_hits',
    'position': '11'
},
{
    'id': 'doom_060220',
    'name': 'Doom',
    'creative': 'blp_videojuegos_doom',
    'position': '12'
},   
{
    'id': 'RE3_060220',
    'name': 'Resident Evil 3',
    'creative': 'blp_videojuegos_re3',
    'position': '13'
},   
{
    'id': 'pokemon_060220',
    'name': 'Pokemon',
    'creative': 'blp_videojuegos_pokemon',
    'position': '14'
},
{
    'id': 'starwars_090819',
    'name': 'Star Wars',
    'creative': 'blp_videojuegos_starwars',
    'position': '15'
},
{
    'id': 'finalfantasy_060220',
    'name': 'Final Fantasy',
    'creative': 'blp_videojuegos_finalfantasy',
    'position': '16'
},
{
    'id': 'aventura_090819',
    'name': 'Filtros Aventura',
    'creative': 'blp_videojuegos_aventura',
    'position': '17'
},
{
    'id': 'deportes_090819',
    'name': 'Filtros Deportes',
    'creative': 'blp_videojuegos_deportes',
    'position': '18'
},
{
    'id': 'disparos_090819',
    'name': 'Filtros Disparos',
    'creative': 'blp_videojuegos_disparos',
    'position': '19'
},
{
    'id': 'peleas_090819',
    'name': 'Filtros Peleas',
    'creative': 'blp_videojuegos_peleas',
    'position': '20'
},
{
    'id': 'terror_090819',
    'name': 'Filtros Terror',
    'creative': 'blp_videojuegos_terror',
    'position': '21'
},
{
    'id': 'carreras_090819',
    'name': 'Filtros Carreras',
    'creative': 'blp_videojuegos_carreras',
    'position': '22'
},
{
    'id': 'pcgamer_090819',
    'name': 'Pc Gamer',
    'creative': 'blp_videojuegos_pcgamer',
    'position': '23'
}
]
}
}
});




/*PRIMER NIVEL BEBÉS*/ 

            break;
            case '/tienda/bebés-y-niños/catst5620308':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
        'id': 'carriola_120220',
        'name': 'Carriolas Bebes',
        'creative': 'blp_bebes_carriolas',
        'position': '01'
},
{
        'id': 'autoasientos_120220',
        'name': 'Autoasientos Bebes',
        'creative': 'blp_bebes_autoasientos',
        'position': '02'
},
{

        'id': 'panaleras_120220',
        'name': 'Panaleras Bebes',
        'creative': 'blp_bebes_panaleras',
        'position': '03'
                                                
},
{
        'id': 'cuna_120220',
        'name': 'Cuna Bebes',
        'creative': 'blp_bebes_cuna',
        'position': '04'
},
{
        'id': 'juegocuna_120220',
        'name': 'Juego Cuna Bebes',
        'creative': 'blp_bebes_juegocuna',
        'position': '05'
},
{
        'id': 'moda_120220',
        'name': 'Moda Bebes',
        'creative': 'blp_bebes_moda',
        'position': '06'
},
{
        'id': 'zapatos_120220',
        'name': 'Zapatos Bebes',
        'creative': 'blp_bebes_zapatos',
        'position': '07'
},
{
        'id': 'biberones_120220',
        'name': 'Biberones Bebes',
        'creative': 'blp_bebes_biberones',
        'position': '08'
},
{
        'id': 'chupones_120220',
        'name': 'Chupones Bebes',
        'creative': 'blp_bebes_chupones',
        'position': '09'
},
{
        'id': 'esterilizadores_120220',
        'name': 'Esterilizadores Bebes',
        'creative': 'blp_bebes_esterilizadores',
        'position': '10'
},
{
        'id': 'monitores_120220',
        'name': 'Monitores Bebes',
        'creative': 'blp_bebes_monitores',
        'position': '11'
},
{
        'id': 'bano_120220',
        'name': 'Bano Bebes',
        'creative': 'blp_bebes_bano',
        'position': '12'

},
{
        'id': 'gimnasio_120220',
        'name': 'Gimnasio Bebes',
        'creative': 'blp_bebes_gimnasio',
        'position': '13'

},
{
        'id': 'juguetes_120220',
        'name': 'Juguetes Bebes',
        'creative': 'blp_bebes_juguetes',
        'position': '14'

}
]
}
}
});				
		
	/*PRIMER NIVEL BEBÉS QA*/ 

            break;
            case '/tienda/bebés/cat4120003':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school',
    'position': '01'
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_nina',
    'position': '02'
},
{

    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_nino',
    'position': '03'
                                                
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_principal',
    'position': '04'
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_zap_nina',
    'position': '05'
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_zap_nino',
    'position': '06'
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_accesorios',
    'position': '07'
},
{
   'id': 'bebes_main_230719',
   'name': 'Back to school - Liverpool',
   'creative': 'blp_el_bebes_back_to_school_fisher_nina',
   'position': '08'
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_fisher_nino',
    'position': '09'
},
{
   'id': 'bebes_main_230719',
   'name': 'Back to school - Liverpool',
   'creative': 'blp_el_bebes_back_to_school_carriolas',
   'position': '10'
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_cuna',
    'position': '11'
},
{
    'id': 'bebes_main_230719',
    'name': 'Back to school - Liverpool',
    'creative': 'blp_el_bebes_back_to_school_autoasientos',
    'position': '12'

}
]
}
}
});				
				
				
				
				
				
/*PRIMER NIVEL CASA*/ 

            break;
            case '/tienda/casa/catst8233783':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'blancos_230320',
    'name': 'Casa Blancos',
    'creative': 'blp_casa_blancos',
    'position': '01'
},
{
    'id': 'colchones_230320',
    'name': 'Casa Colchones',
    'creative': 'blp_casa_colchones',
    'position': '02'
},
{
    'id': 'ventilacion_230320',
    'name': 'Casa Ventilacion',
    'creative': 'blp_casa_ventilacion',
    'position': '03'
                                                
},
{
    'id': 'aspiradoras_230320',
    'name': 'Casa Aspiradoras',
    'creative': 'blp_casa_aspiradoras',
    'position': '04'
},
{
    'id': 'purificadores_230320',
    'name': 'Casa Purificadores',
    'creative': 'blp_casa_purificadores',
    'position': '05'
},
{
    'id': 'planchas_230320',
    'name': 'Casa Planchas',
    'creative': 'blp_casa_planchas',
    'position': '06'
},
{
    'id': 'flores_230320',
    'name': 'Casa Flores',
    'creative': 'blp_casa_flores',
    'position': '07'
},
{
    'id': 'esencias_230320',
    'name': 'Casa Esencias',
    'creative': 'blp_casa_esencias',
    'position': '08'
},
{
    'id': 'casa_mascotas_230320',
    'name': 'Casa Mascotas',
    'creative': 'blp_casa_mascotas',
    'position': '09'
},
{
    'id': 'casa_maletas_230320',
    'name': 'Casa Maletas',
    'creative': 'blp_casa_maletas',
    'position': '10'

},
{
    'id': 'casa_entretenimiento_230320',
    'name': 'Casa Entretenimiento',
    'creative': 'blp_casa_entretenimiento',
    'position': '11'

},
{
    'id': 'casa_libros_230320',
    'name': 'Casa Libros',
    'creative': 'blp_casa_libros',
    'position': '12'

},
{
    'id': 'casa_automotriz_230320',
    'name': 'Casa Automotriz',
    'creative': 'blp_casa_automotriz',
    'position': '13'

},
{
    'id': 'casa_ferreteria_230320',
    'name': 'Casa Ferreteria',
    'creative': 'blp_casa_ferreteria',
    'position': '14'

},
{
    'id': 'casa_asadores_230320',
    'name': 'Casa Asadores',
    'creative': 'blp_casa_asadores',
    'position': '15'

}
]
}
}
});	
				
                
                
                
/*HOT SALE LANDING*/ 

            break;
            case '/tienda/paginas/hot-sale':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'el_200520',
    'name': 'Hot Sale El',
    'creative': 'blp_hs_el',
    'position': '01'
},
{
    'id': 'ella_200520',
    'name': 'Hot Sale Ella',
    'creative': 'blp_hs_ella',
    'position': '02'
},
{
    'id': 'zapatos_200520',
    'name': 'Hot Sale Zapatos',
    'creative': 'blp_hs_zapatos',
    'position': '03'
                                                
},
{
    'id': 'lb_200520',
    'name': 'Hot Sale lb',
    'creative': 'blp_hs_lb',
    'position': '04'
},
{
    'id': 'computo_200520',
    'name': 'Hot Sale Computo',
    'creative': 'blp_hs_computo',
    'position': '05'                                           
},
{
    'id': 'muebles_200520',
    'name': 'Hot Sale Muebles',
    'creative': 'blp_hs_muebles',
    'position': '06'

},
{
    'id': 'casa_200520',
    'name': 'Hot Sale Casa',
    'creative': 'blp_hs_casa',
    'position': '07'

},
{
     'id': 'videojuegos_200520',
     'name': 'Hot Sale Videojuegos',
     'creative': 'blp_hs_videojuegos',
     'position': '08'

},
{
     'id': 'deportes_200520',
     'name': 'Hot Sale Deportes',
     'creative': 'blp_hs_deportes',
     'position': '09'
},
{
     'id': 'cocina_200520',
     'name': 'Hot Sale Cocina',
     'creative': 'blp_hs_cocina',
     'position': '10'
},
{
     'id': 'belleza_200520',
     'name': 'Hot Sale Belleza',
     'creative': 'blp_hs_belleza',
     'position': '11'
},
{
     'id': 'ninos_200520',
     'name': 'Hot Sale Ninos',
     'creative': 'blp_hs_ninos',
     'position': '12'
},
{
     'id': 'bebes_200520',
     'name': 'Hot Sale Bebes',
     'creative': 'blp_hs_bebes',
     'position': '13'
}
]
}
}
});					

		
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
				
/*PRIMER NIVEL CELULARES*/ 

            break;
            case '/tienda/celulares/cat4450173':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'hs_mayo_200520',
    'name': 'Hot Sale Celulares',
    'creative': 'blp_celulares_hs',
    'position': '01'
},
{
    'id': 'cyber_motorola_071119',
    'name': 'Cyber Motorola',
    'creative': 'blp_celulares_cyber_motorola',
    'position': '02'
},
{

    'id': 'cyber_apple_071119',
    'name': 'Cyber Apple',
    'creative': 'blp_celulares_cyber_apple',
    'position': '02'
                                                
},
{

    'id': 'bf_main_071119',
    'name': 'BF Main',
    'creative': 'blp_celulares_bf_main',
    'position': '01'
                                                
},
{

    'id': 'bfriday_motorola_071119',
    'name': 'BFriday Motorola',
    'creative': 'blp_celulares_bfriday_motorola',
    'position': '02'
                                                
},
{
    'id': 'samsung_fold_071119',
    'name': 'Samsung Fold',
    'creative': 'blp_celulares_fold',
    'position': '04'

},
{
    'id': 'accesorios_071119',
    'name': 'Accesorios',
    'creative': 'blp_celulares_accesorios',
    'position': '05'

},
{
    'id': 'conectado_071119',
    'name': 'Conectado',
    'creative': 'blp_celulares_conectado',
    'position': '06'

}
]
}
}
});					

				
				
				
		/*PRIMER NIVEL COMPUTO*/ 

            break;
            case '/tienda/cómputo-y-electrónica/cat5150041':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'computo_camaras_200619',
'name': 'Cómputo_Cámaras',
'creative': 'blpmob_Cómputo_Cámaras',
'position': '01'
},
{
'id': 'computo_computadoras_200619',
'name': 'Cómputo_Computadoras',
'creative': 'blp_Cómputo_Computadoras',
'position': '02'
},
{

'id': 'computo_pantallas_200619',
'name': 'Cómputo_Pantallas',
'creative': 'blp_Cómputo_Pantallas',
'position': '03'
                                                
},
{
'id': 'computo_fotocine_200619',
'name': 'Cómputo_Fotocine',
'creative': 'blp_Cómputo_Fotocine',
'position': '04'
},
{	

'id': 'computo_instrumentos_musicales_200619',
'name': 'Cómputo_Instrumentos_Musicales',
'creative': 'blp_Cómputo_Instrumentos_Musicales',
'position': '05'

}
]
}
}
});					
		
				
		
						/*PRIMER NIVEL JUGUETES*/ 

            break;
            case '/tienda/juguetes/cat1080656':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'blpmob_mejores_juguetes_200619',
'name': 'Juguetes_Mejores_Juguetes',
'creative': 'blpmob_Mejores_Juguetes',
'position': '01'
},
{
'id': 'blp_juguetes_construccion_200619',
'name': 'Juguetes_Construcción',
'creative': 'blp_Juguetes_Construcción',
'position': '02'
},
{

'id': 'blp_juguetes_lanzadores_200619',
'name': 'Juguetes_Lanzadores',
'creative': 'blp_juguetes_Lanzadores',
'position': '03'
                                                
},
{
'id': 'blp_juguetes_videojuegos_200619',
'name': 'Juguetes_Videojuegos',
'creative': 'blp_Juguetes_Videojuegos',
'position': '04'
},
{	

'id': 'blp_juguetes_disney_200619',
'name': 'Juguetes_Disney',
'creative': 'blp_Juguetes_Disney',
'position': '05'
},
{	
'id': 'blp_juguetes_munecas_200619',
'name': 'Juguetes_Munecas',
'creative': 'blp_Juguetes_Munecas',
'position': '06'

},
{
	
'id': 'blp_juguetes_airelibre_200619',
'name': 'Juguetes_Aire_Libre',
'creative': 'blp_Juguetes_Aire_Libre',
'position': '07'
},
{
	
'id': 'blp_juguetes_figurasaccion_200619',
'name': 'Juguetes_Figuras_Acción',
'creative': 'blp_Juguetes_Figuras_Acción',
'position': '08'
}
]
}
}
});	
				
				
						/*PRIMER NIVEL Relojes*/ 

            break;
            case '/tienda/relojes-lentes-y-joyería/cat4570008':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'relojes_principal_080520',
    'name': 'Relojes Principal',
    'creative': 'blp_relojes_principal',
    'position': '01'
},
{
    'id': 'relojes_ella_080520',
    'name': 'Relojes Ella',
    'creative': 'blp_relojes_ella',
    'position': '02'
},
{

    'id': 'relojes_el_080520',
    'name': 'Relojes El',
    'creative': 'blp_relojes_el',
    'position': '03'
                                                
},
{
    'id': 'relojes_luxury_080520',
    'name': 'Relojes Luxury',
    'creative': 'blp_relojes_luxury',
    'position': '04'
},
{	

    'id': 'relojes_alta_080520',
    'name': 'Relojes Alta',
    'creative': 'blp_relojes_alta',
    'position': '05'
},
{	
    'id': 'armazones_080520',
    'name': 'Relojes Armazones',
    'creative': 'blp_relojes_armazones',
    'position': '06'

},
{
	
    'id': 'solares_080520',
    'name': 'Relojes Solares',
    'creative': 'blp_relojes_solares',
    'position': '07'
},
{
	
    'id': 'parael_080520',
    'name': 'Relojes para el',
    'creative': 'blp_relojes_parael',
    'position': '08'
},
{
    'id': 'paraella_080520',
    'name': 'Relojes para ella',
    'creative': 'blp_relojes_paraella',
    'position': '09'
},
{

    'id': 'pulseras_080520',
    'name': 'Relojes Pulseras',
    'creative': 'blp_relojes_pulseras',
    'position': '10'
                                                
},
{
    'id': 'aretes_080520',
    'name': 'Relojes Aretes',
    'creative': 'blp_relojes_aretes',
    'position': '11'
},
{	

    'id': 'collares_080520',
    'name': 'Relojes Collares',
    'creative': 'blp_relojes_collares',
    'position': '12'
},
{	
    'id': 'todo_080520',
    'name': 'Relojes Todo',
    'creative': 'blp_relojes_todo',
    'position': '13'

},
{
	
    'id': 'bomberg_080520',
    'name': 'Relojes Bomberg',
    'creative': 'blp_relojes_bomberg',
    'position': '14'
},
{
	
    'id': 'longines_080520',
    'name': 'Relojes Longines',
    'creative': 'blp_relojes_longines',
    'position': '15'
},
{	
    'id': 'mk_080520',
    'name': 'Relojes mk',
    'creative': 'blp_relojes_mk',
    'position': '16'
},
{		
    'id': 'mido_080520',
    'name': 'Relojes mido',
    'creative': 'blp_relojes_mido',
    'position': '17'
},
{		
    'id': 'mont_080520',
    'name': 'Relojes Mont',
    'creative': 'blp_relojes_mont',
    'position': '18'
},
{		
    'id': 'rado_080520',
    'name': 'Relojes Rado',
    'creative': 'blp_relojes_rado',
    'position': '19'
},
{		
    'id': 'rayban_080520',
    'name': 'Relojes Rayban',
    'creative': 'blp_relojes_rayban',
    'position': '20'
},
{		
    'id': 'swarovski_080520',
    'name': 'Relojes Swarovski',
    'creative': 'blp_relojes_swarovski',
    'position': '21'
},
{		
    'id': 'tag_080520',
    'name': 'Relojes Tag',
    'creative': 'blp_relojes_tag',
    'position': '22'
},
{		
    'id': 'tisso_080520',
    'name': 'Relojes Tisso',
    'creative': 'blp_relojes_tisso',
    'position': '23'
}
]
}
}
});		
				
				
/*PRIMER NIVEL ELLA*/ 

break;
case '/tienda/ella/cat5040494':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_principal',
'position': '01'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_lenceria',
'position': '02'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_zapatos',
'position': '03'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_bolsas',
'position': '04'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_accesorios',
'position': '05'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_zap_makeup',
'position': '06'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_zap_skincare',
'position': '07'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_curvy',
'position': '08'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_jeans',
'position': '09'
},
{
'id': 'ella_main_230719',
'name': 'Ella - Liverpool',
'creative': 'blp_ella_maternidad',
'position': '10'
},

]
}
}
});



 /*PRIMER NIVEL ZAPATOS*/ 
break;
case '/tienda/zapatos/cat5040494':
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'zapatos_main',
    'name': 'Zapatos Main',
    'creative': 'blp_zapatos_main',
    'position': '01'
},
{
    'id': 'zapatos_tacones',
    'name': 'Zapatos Tacones',
    'creative': 'blp_zapatos_tacones',
    'position': '02'
},
{
    'id': 'zapatos_sandalias',
    'name': 'Zapatos Sandalias',
    'creative': 'blp_zapatos_sandalias',
    'position': '03'
},
{
    'id': 'zapatos_sneakers_ella',
    'name': 'Zapatos Sneakers Ella',
    'creative': 'blp_zapatos_sneakers_ella',
    'position': '04'
},
{
    'id': 'zapatos_botas_ella',
    'name': 'Zapatos Botas Ella',
    'creative': 'blp_zapatos_botas_ella',
    'position': '05'
},
{
    'id': 'zapatos_ella_todo',
    'name': 'Zapatos Ella Todo',
    'creative': 'blp_zapatos_ella_todo',
    'position': '06'
},
{
    'id': 'zapatos_deportivo_el',
    'name': 'Zapatos Deportivo El',
    'creative': 'blp_zapatos_deportivo_el',
    'position': '07'
},
{
    'id': 'zapatos_deportivo_ella',
    'name': 'Zapatos Deportivo Ella',
    'creative': 'blp_zapatos_deportivo_ella',
    'position': '08'
},
{
    'id': 'zapatos_deportivo_ninos',
    'name': 'Zapatos Deportivo Ninos',
    'creative': 'blp_zapatos_deportivo_ninos',
    'position': '09'
},
{
    'id': 'zapatos_deportivo_ninas',
    'name': 'Zapatos Deportivo Ninas',
    'creative': 'blp_zapatos_deportivo_ninas',
    'position': '10'
},
{
    'id': 'zapatos_el_todo',
    'name': 'Zapatos El Todo',
    'creative': 'blp_zapatos_el_todo',
    'position': '11'
},
{
    'id': 'zapatos_casual_el',
    'name': 'Zapatos Casual El',
    'creative': 'blp_zapatos_casual_el',
    'position': '12'
},
{
    'id': 'zapatos_formal_el',
    'name': 'Zapatos Formal El',
    'creative': 'blp_zapatos_formal_el',
    'position': '13'
},
{
    'id': 'zapatos_sneaker_el',
    'name': 'Zapatos Sneaker El',
    'creative': 'blp_zapatos_sneaker_el',
    'position': '14'
},
{
    'id': 'zapatos_bota_el',
    'name': 'Zapatos Bota El',
    'creative': 'blp_zapatos_bota_el',
    'position': '15'
},
{
    'id': 'zapatos_nina',
    'name': 'Zapatos Nina',
    'creative': 'blp_zapatos_nina',
    'position': '16'
},
{
    'id': 'zapatos_bebes',
    'name': 'Zapatos Bebes',
    'creative': 'blp_zapatos_bebes',
    'position': '17'
},
{
    'id': 'zapatos_ninos',
    'name': 'Zapatos Ninos',
    'creative': 'blp_zapatos_ninos',
    'position': '18'
}
]
}
}
});			


// PRIMER NIVEL Halloween
break;
case '/tienda/halloween/catst1718701':

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.


{
'id': 'halloween_270819',
'name': 'Halloween',
'creative': 'blp_Halloween_disfraces',
'position': '02'
},
{
'id': 'halloween_270819',
'name': 'Halloween',
'creative': 'blp_Halloween_decoracion',
'position': '03'
},
{
'id': 'halloween_270819',
'name': 'Halloween',
'creative': 'blp_Halloween_accesorios',
'position': '04'
},
{
'id': 'halloween_270819',
'name': 'Halloween',
'creative': 'blp_Halloween_tradiciones',
'position': '06'
}

]
}
}
});



		
				
	// Brand Etam
break;
case '/tienda/etam/cat1200649':

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.


{
'id': 'blp_etam_main_200619',
'name': 'etam_Principal',
'creative': 'blp_etam_main',
'position': '01'
},
{
'id': 'blp_etam_bra_200519',
'name': 'Etam Bra',
'creative': 'blp_etam_bra',
'position': '02'
},
{
'id': 'blp_etam_bodys_200519',
'name': 'Etam Bodys',
'creative': 'blp_etam_pantys',
'position': '03'
},
{
'id': 'etam_200519',
'name': 'etam',
'creative': 'blp_etam_bodys',
'position': '04'
},
{
'id': 'blp_etam_pijamas_200519',
'name': 'Etam Pijamas',
'creative': 'blp_etam_pijamas',
'position': '05'
},
{
'id': 'blp_etam_trajebanio_200519',
'name': 'Etam Trajes de Baño',
'creative': 'blp_etam_trajebano',
'position': '06'
},
{
'id': 'blp_etam_novias_200519',
'name': 'Etam Novias',
'creative': 'blp_etam_novias',
'position': '07'
}
]
}
}
});


// Brand Raíces
break;
case '/tienda/raíces-mx/catst9673334':

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.


{
'id': 'blp_raices_ropa_200519',
'name': 'raices ropa',
'creative': 'blp_raices_ropa',
'position': '01'
},
{
'id': 'blp_raices_bolsas_200519',
'name': 'raices bolsas',
'creative': 'blp_raices_bolsas',
'position': '02'
},
{
'id': 'blp_raices_zapatos_200519',
'name': 'raices zapatos',
'creative': 'blp_raices_zapatos',
'position': '03'
},
{
'id': 'blp_raices_accesorios_200519',
'name': 'raices accesorios',
'creative': 'blp_raices_accesorios',
'position': '04'
},
{
'id': 'blp_raices_maquillaje_200519',
'name': 'raices maquillaje',
'creative': 'blp_raices_maquillaje',
'position': '05'
},
]
}
}
});


// Nine West
break;
case '//tienda/nine-west/cat4260003':

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.

{
'id': 'ninewest_200519',
'name': 'ninewest',
'creative': 'blp_ninewest_zapatos',
'position': '01'
},
{
'id': 'ninewest_200519',
'name': 'ninewest',
'creative': 'blp_ninewest_coleccion',
'position': '02'
},
{
'id': 'ninewest_200519',
'name': 'ninewest',
'creative': 'blp_ninewest_bolsas',
'position': '03'
},
{
'id': 'ninewest_200519',
'name': 'ninewest',
'creative': 'blp_ninewest_kids',
'position': '04'
},

]
}
}
});
				

// Punt Roma
				
break;
case '/tienda/punt-roma/cat1200686':

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.

{
'id': 'punto_roma_180619',
'name': 'punto_roma',
'creative': 'blp_punto_roma_banner_principal',
'position': '01'
},
{
'id': 'punto_roma_180619',
'name': 'punto_roma',
'creative': 'blp_punto_roma_look',
'position': '02'
},
{
'id': 'punto_roma_180619',
'name': 'punto_roma',
'creative': 'blp_punto_roma_bolsas',
'position': '03'
},
{
'id': 'punto_roma_180619',
'name': 'punto_roma',
'creative': 'blp_punto_roma_exclusivos',
'position': '04'
},
{
'id': 'punto_roma_180619',
'name': 'punto_roma',
'creative': 'blp_punto_roma_video',
'position': '05'
},

]
}
}
});

/* That´s it */ 

break;
case '/tienda/that-s-it/cat21010228':

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_principal_thats_it',
'position': '01'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_vestidos_thats_it',
'position': '02'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_playeras_thats_it',
'position': '03'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_blusas_thats_it',
'position': '04'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_accesorios_thats_it',
'position': '05'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_trajes_bano_thats_it',
'position': '06'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_pantalones_thats_it',
'position': '07'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_shorts_thats_it',
'position': '08'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_trajes_ninas_thats_it',
'position': '09'
},
{
'id': 'thats_it_200619',
'name': 'thats_it',
'creative': 'blp_banner_ninos_thats_it',
'position': '10'
},
]
}
}
});
                
                
                
/*BLP MABE*/ 

            break;
            case '/tienda/mabe/cat5300107':
            
dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'main_mabe_111119',
    'name': 'Main Mabe',
    'creative': 'blp_mabe_main',
    'position': '01'
},
{
    'id': 'hornos_111119',
    'name': 'Hornos y estufas',
    'creative': 'blp_mabe_hornos',
    'position': '02'
},
{
    'id': 'lavavajillas_111119',
    'name': 'Lavavajillas',
    'creative': 'blp_mabe_lavavajillas',
    'position': '03'
},
{
    'id': 'mabeio_111119',
    'name': 'IO Mabe',
    'creative': 'blp_mabe_mabeio',
    'position': '04'
},
{
    'id': 'geprofile_111119',
    'name': 'GE Profile',
    'creative': 'blp_mabe_geprofile',
    'position': '05'
}
]
}
}
});

                
                
                
                
                
                
                
                
                
                


/* Michael Kors*/ 

break;
case '/tienda/michael-kors/cat4980014':

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.

{
'id': 'Michael_Kors_200619',
'name': 'Michael_Kors',
'creative': 'blp_michael_banner_wap_kors',
'position': '01'
},
{
'id': 'Michael_Kors_200619',
'name': 'Michael_Kors',
'creative': 'blp_banner_michael_kors_smart',
'position': '02'
},
{
'id': 'Michael_Kors_200619',
'name': 'Michael_Kors',
'creative': 'blp_banner_lentes_michael_kors',
'position': '03'
},
{
'id': 'Michael_Kors_200619',
'name': 'Michael_Kors',
'creative': 'blp_banner_smartwatch_michael_kors',
'position': '04'
},
{
'id': 'Michael_Kors_200619',
'name': 'Michael_Kors',
'creative': 'blp_banner_joyeria_michael_kors',
'position': '05'
},
{
'id': 'Michael_Kors_200619',
'name': 'Michael_Kors',
'creative': 'blp_banner_wonderlust_michael_kors',
'position': '06'
},
]
}
}
});


/* GAP */ 

break;
case '/tienda/gap/catst1312370':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'gap_main_130220',
'name': 'gap_Principal',
'creative': 'blp_gap_main',
'position': '01'
},
{
'id': 'gap_ella_130220',
'name': 'gap_ella',
'creative': 'blp_gap_ella',
'position': '02'
},
{
'id': 'gap_el_130220',
'name': 'gap_el',
'creative': 'blp_gap_el',
'position': '03'
},
{
'id': 'gap_ninos_130220',
'name': 'gap_ninos',
'creative': 'blp_gap_ninos',
'position': '04'
},
{
'id': 'gap_bebes_130220',
'name': 'gap_bebes',
'creative': 'blp_gap_bebes',
'position': '05'
},
{
'id': 'gap_mejordenim_130220',
'name': 'gap_mejordenim',
'creative': 'blp_gap_mejordenim',
'position': '06'
},
{
'id': 'gap_khaki_el_170330',
'name': 'gap_khaki_el',
'creative': 'blp_gap_khaki_el',
'position': '07'
},
{
'id': 'gap_khaki_ella_170330',
'name': 'gap_khaki_ella',
'creative': 'blp_gap_khaki_ella',
'position': '08'
},
{
'id': 'gap_anorak_020320',
'name': 'gap_anorak',
'creative': 'blp_gap_anorak',
'position': '09'
}
]
}
}
});		
				

/* BLP west elm*/
				
				
			break;
            case '/tienda/west-elm/cat6600048':	
				
				
				

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'main_210619',
    'name': 'West Elm Main',
    'creative': 'blp_we_main',
    'position': '01'
},
{
    'id': 'comedores_210619',
    'name': 'West Elm Comedores',
    'creative': 'blp_we_comedores',
    'position': '02'
},
{
    'id': 'salas_210619',
    'name': 'West Elm Salas',
    'creative': 'blp_we_salas',
    'position': '03'
},
{
    'id': 'tapetes_210619',
    'name': 'West Elm Tapetes',
    'creative': 'blp_we_tapetes',
    'position': '04'
},
{
    'id': 'articulos_210619',
    'name': 'West Elm Articulos',
    'creative': 'blp_we_articulos',
    'position': '05'
},
{
    'id': 'cojines_210619',
    'name': 'West Elm Cojines',
    'creative': 'blp_we_cojines',
    'position': '06'
}
]
}
}
});

                
                
/*BLP AMERICAN EAGLE*/ 
       
            break;
            case '/tienda/american-eagle/catst9485126':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'curvy_jeans_180220',
    'name': 'AE Curvy Jeans',
    'creative': 'blp_ae_curvy_jeans',
    'position': '01'
},
{
    'id': 'airflex_180220',
    'name': 'AE AirFlex',
    'creative': 'blp_ae_airflex',
    'position': '02'
},
{
    'id': 'playeras_ella_180220',
    'name': 'AE Playeras Ella',
    'creative': 'blp_ae_playeras_ella',
    'position': '03'
},
{
    'id': 'playeras_el_180220',
    'name': 'AE Playeras El',
    'creative': 'blp_ae_playeras_el',
    'position': '04'
},
{
    'id': 'vestidos_180220',
    'name': 'AE Vestidos',
    'creative': 'blp_ae_vestidos',
    'position': '05'
},
{
    'id': 'polos_180220',
    'name': 'AE Polos',
    'creative': 'blp_ae_polos',
    'position': '06'
}
]
}
}
});            
     
 
/* BLP PUMA*/ 
       
            break;
            case '/tienda/puma/cat4190004':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'puma_cabeza_210619',
    'name': 'Cabeza Puma',
    'creative': 'blp_puma_cabeza',
    'position': '01'
},
{
    'id': 'sportstyle_210619',
    'name': 'SportStyle Puma',
    'creative': 'blp_puma_sportstyle',
    'position': '02'
},
{
    'id': 'futbol_210619',
    'name': 'Futbol Puma',
    'creative': 'blp_puma_futbol',
    'position': '03'
},
{
    'id': 'training_210619',
    'name': 'Training Puma',
    'creative': 'blp_puma_training',
    'position': '04'
},
{
    'id': 'woman_210619',
    'name': 'Woman Puma',
    'creative': 'blp_puma_woman',
    'position': '05'
},
{
    'id': 'accesorios_210619',
    'name': 'Accesorios Puma',
    'creative': 'blp_puma_accesorios',
    'position': '06'
},
{
    'id': 'motosport_210619',
    'name': 'Motosport Puma',
    'creative': 'blp_puma_motosport',
    'position': '07'
},
{
    'id': 'kids_210619',
    'name': 'Kids Puma',
    'creative': 'blp_puma_kids',
    'position': '08'
}
]
}
}
});       
                
                
/* BLP ADIDAS*/ 
       
            break;
            case '/tienda/adidas/cat4190005':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'adidas_cabeza_210619',
    'name': 'Cabeza Adidas',
    'creative': 'blp_adidas_cabeza',
    'position': '01'
},
{
    'id': 'mujer_210619',
    'name': 'Adidas Mujer',
    'creative': 'blp_adidas_mujer',
    'position': '02'
},
{
    'id': 'hombre_210619',
    'name': 'Adidas Hombre',
    'creative': 'blp_adidas_hombre',
    'position': '03'
},
{
    'id': 'nino_210619',
    'name': 'Adidas Niño',
    'creative': 'blp_adidas_niño',
    'position': '04'
},
{
    'id': 'nina_210619',
    'name': 'Adidas Niña',
    'creative': 'blp_adidas_niña',
    'position': '05'
},
{
    'id': 'mujer_210619',
    'name': 'Adidas Mujer',
    'creative': 'blp_adidas_mujer',
    'position': '02'
},
{
    'id': 'hombre_210619',
    'name': 'Adidas Hombre',
    'creative': 'blp_adidas_hombre',
    'position': '03'
},
{
    'id': 'nina_210619',
    'name': 'Adidas Niña',
    'creative': 'blp_adidas_niña',
    'position': '05'
},
{
    'id': 'nino_210619',
    'name': 'Adidas Niño',
    'creative': 'blp_adidas_niño',
    'position': '04'
}
]
}
}
});    
      
                
/* BLP NIKE*/ 
       
            break;
            case '/tienda/nike/cat4190003':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
'id': 'nike_woman_240619',
'name': 'Nike Woman Main',
'creative': 'blp_nike_woman_main',
'position': '01'
},
{
'id': 'correr_woman_240619',
'name': 'Nike Woman Correr',
'creative': 'blp_nike_woman_correr',
'position': '02'
},
{
'id': 'entrenamiento_woman_240619',
'name': 'Nike Woman Entrenamiento',
'creative': 'blp_nike_woman_entrenamiento',
'position': '03'
},
{
'id': 'lifestyle_woman_240619',
'name': 'Nike Woman Lifestyle',
'creative': 'blp_nike_woman_lifestyle',
'position': '04'
},
{
'id': 'endit_240619',
'name': 'Nike End It',
'creative': 'blp_nike_endit',
'position': '05'
},
{
'id': 'correr_man_240619',
'name': 'Nike Man Correr',
'creative': 'blp_nike_man_correr',
'position': '06'
},
{
'id': 'entrenamiento_man_240619',
'name': 'Nike Man Entrenamiento',
'creative': 'blp_nike_man_entrenamiento',
'position': '07'
},
{
'id': 'lifestyle_man_240619',
'name': 'Nike Man Lifestyle',
'creative': 'blp_nike_man_lifestyle',
'position': '08'
},
{
'id': 'allforone_240619',
'name': 'Nike All for One',
'creative': 'blp_nike_man_allforone',
'position': '09'
},
{
'id': 'nina_240619',
'name': 'Nike Niña',
'creative': 'blp_nike_nina',
'position': '10'
},
{
'id': 'nino_240619',
'name': 'Nike Niño',
'creative': 'blp_nike_nino',
'position': '11'
}
]
}
}
});                
      
/* BLP URBAN DECAY*/ 
       
            break;
            case '/tienda/urban-decay/cat5190059':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'ud_main_210619',
    'name': 'UD Cabeza',
    'creative': 'blp_ud_cabeza',
    'position': '01'
},
{
    'id': 'naked_210619',
    'name': 'UD Naked',
    'creative': 'blp_ud_naked',
    'position': '02'
},
{
    'id': 'staynaked_090819',
    'name': 'UD Stay Naked',
    'creative': 'blp_ud_staynaked',
    'position': '03'
},
{
    'id': 'eyes_210619',
    'name': 'UD Eyes',
    'creative': 'blp_ud_eyes',
    'position': '04'
},
{
    'id': 'brush_210619',
    'name': 'UD Brush',
    'creative': 'blp_ud_brush',
    'position': '05'
},
{
    'id': 'labios_210619',
    'name': 'UD Labios',
    'creative': 'blp_ud_labios',
    'position': '06'
},
{
    'id': 'labios_210619',
    'name': 'UD Skin',
    'creative': 'blp_ud_skin',
    'position': '07'
}
]
}
}
});
       
      
/* BLP PICKBOX*/ 
       
            break;
            case '/tienda/pick-box/catst11034202':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'main_121219',
    'name': 'Main PB',
    'creative': 'blp_pickbox_main',
    'position': '01'
},
{
    'id': 'cleanser_121219',
    'name': 'Cleanser PB',
    'creative': 'blp_pickbox_cleanser',
    'position': '02'
},
{
    'id': 'DG_121219',
    'name': 'DG PB',
    'creative': 'blp_pickbox_dg',
    'position': '03'
},
{
    'id': 'fem_121219',
    'name': 'Fem Florarl PB',
    'creative': 'blp_pickbox_fem',
    'position': '04'
},
{
    'id': 'makeup_121219',
    'name': 'Make Up PB',
    'creative': 'blp_pickbox_makeup',
    'position': '05'
},
{
    'id': 'skincare_121219',
    'name': 'SkinCare PB',
    'creative': 'blp_pickbox_skincare',
    'position': '06'
},
{
    'id': 'lanzamientonew_121219',
    'name': 'Lanzamiento New PB',
    'creative': 'blp_pickbox_lanzamientonew',
    'position': '07'
},
{
    'id': 'new_121219',
    'name': 'New PB',
    'creative': 'blp_pickbox_new',
    'position': '08'
}
]
}
}
});
        
                
                
                
/* PBK Pottery Barn Kids BLP*/
                
                
            break;
            case '/tienda/pottery-barn-kids/catst15791801':    
                
                
                

dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'main_300919',
    'name': 'PBK Main',
    'creative': 'blp_pbk_main',
    'position': '01'
},
{
    'id': 'ropacama_300919',
    'name': 'PBK Ropa Cama',
    'creative': 'blp_pbk_ropacama',
    'position': '02'
},
{
    'id': 'bebes_300919',
    'name': 'PBK Bebes',
    'creative': 'blp_pbk_bebes',
    'position': '03'
},
{
    'id': 'decoracion_300919',
    'name': 'PBK Decoracion',
    'creative': 'blp_pbk_decoracion',
    'position': '04'
},
{
    'id': 'escolares_300919',
    'name': 'PBK Escolares',
    'creative': 'blp_pbk_escolares',
    'position': '05'
},
{
    'id': 'estudio_300919',
    'name': 'PBK Estudio',
    'creative': 'blp_pbk_estudio',
    'position': '06'
},
{
    'id': 'williams_sonoma_300719',
    'name': 'Williams Sonoma Cintillo',
    'creative': 'blp_pbk_ws',
    'position': '07'
},
{
    'id': 'west_elm_300719',
    'name': 'West Elm Cintillo',
    'creative': 'blp_pbk_we',
    'position': '09'
},
{
    'id': 'pottery_barn_teen_300719',
    'name': 'Pottery Barn Teen Cintillo',
    'creative': 'blp_pbk_pbt',
    'position': '10'
}
]
}
}
});
                       
                
                
                
                
                
                
                
                
                
                
                
                
/* BLP MAC*/ 
       
            break;
            case '/tienda/mac/cat4450237':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
 'id': 'loveme_090819',
    'name': 'Mac Love me',
    'creative': 'blpmov_mac_loveme',
    'position': '01'
},
{
    'id': 'loveme_090819',
    'name': 'Mac Love me',
    'creative': 'blp_mac_loveme',
    'position': '01'
},
{

    'id': 'extradimension_090819',
    'name': 'Mac Extra Dimension',
    'creative': 'blp_mac_extradimension',
    'position': '02'
},
{
    'id': 'electricwonder_210619',
    'name': 'Mac Electricwonder',
    'creative': 'blp_mac_electricwonder',
    'position': '03'
},
{
    'id': 'bases_210619',
    'name': 'Mac Bases',
    'creative': 'blp_mac_bases',
    'position': '04'
},
{
    'id': 'lipstick_210619',
    'name': 'Mac Lipstick',
    'creative': 'blp_mac_lipstick',
    'position': '05'
},
{
    'id': 'primer_210619',
    'name': 'Mac Primer',
    'creative': 'blp_mac_primer',
    'position': '06'
},
{
    'id': 'sombras_210619',
    'name': 'Mac Sombras',
    'creative': 'blp_mac_sombras',
    'position': '07'
}
]
}
}
});


                
/* BLP ANASTASIA*/ 
       
            break;
            case '/tienda/anastasia-beverly-hills/catst11447465':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'anastasia_main_210619',
    'name': 'Anastasia Cabeza',
    'creative': 'blp_anastasia_cabeza',
    'position': '01'
},
{
    'id': 'cejas_210619',
    'name': 'Anastasia Cejas',
    'creative': 'blp_anastasia_cejas',
    'position': '02'
},
{
    'id': 'powerduo_210619',
    'name': 'Anastasia Powerduo',
    'creative': 'blp_anastasia_power',
    'position': '03'
},
{
    'id': 'brows_210619',
    'name': 'Anastasia Brows',
    'creative': 'blp_anastasia_brows',
    'position': '04'
},
{
    'id': 'eyes_210619',
    'name': 'Anastasia Eyes',
    'creative': 'blp_anastasia_eyes',
    'position': '05'
},
{
    'id': 'face_210619',
    'name': 'Anastasia Face',
    'creative': 'blp_anastasia_face',
    'position': '06'
},
{
    'id': 'lipstcik_210619',
    'name': 'Anastasia Lipstick',
    'creative': 'blp_anastasia_lipstick',
    'position': '07'
}
]
}
}
});
                
/* BLP THE NORTH FACE TNF*/ 
       
            break;
            case '/tienda/the-north-face/catst16668517':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'chamarras_171019',
    'name': 'TNF Chamarras',
    'creative': 'blp_tnf_chamarras',
    'position': '01'
},
{
    'id': 'chamarras_rosa_171019',
    'name': 'TNF Chamarras Rosa',
    'creative': 'blp_tnf_chamarras',
    'position': '02'
},
{
    'id': 'chamarras_tercero_171019',
    'name': 'TNF Chamarras Tercero',
    'creative': 'blp_tnf_chamarras_tercero',
    'position': '03'
},
{
    'id': 'ropa_171019',
    'name': 'TNF Ropa',
    'creative': 'blp_tnf_ropa',
    'position': '04'
},
{
    'id': 'zapatos_171019',
    'name': 'TNF Zapatos',
    'creative': 'blp_tnf_zapatos',
    'position': '05'
},
{
    'id': 'accesorios_171019',
    'name': 'TNF Accesorios',
    'creative': 'blp_tnf_accesorios',
    'position': '06'
}
]
}
}
});
                
                
/* BLP LEVIS*/ 
       
            break;
            case '/tienda/levi-s/cat910605':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'levis_main_210619',
    'name': 'Levis Main',
    'creative': 'blp_levis_main',
    'position': '01'
},
{
    'id': 'el_210619',
    'name': 'Levis El',
    'creative': 'blp_levis_el',
    'position': '02'
},
{
    'id': 'ella_210619',
    'name': 'Levis Ella',
    'creative': 'blp_levis_ella',
    'position': '03'
},
{
    'id': 'plus_210619',
    'name': 'Levis Plus',
    'creative': 'blp_levis_plus',
    'position': '04'
},
{
    'id': 'chamarras_210619',
    'name': 'Levis Chamarras',
    'creative': 'blp_levis_chamarras',
    'position': '05'
},
{
    'id': 'camisas_210619',
    'name': 'Levis Camisas',
    'creative': 'blp_levis_camisas',
    'position': '06'
},
{
    'id': 'accesorios_210619',
    'name': 'Levis Accesorios',
    'creative': 'blp_levis_accesorios',
    'position': '07'
},
{
    'id': 'zapatos_210619',
    'name': 'Levis Zapatos',
    'creative': 'blp_levis_zapatos',
    'position': '08'
},
{
    'id': 'kids_210619',
    'name': 'Levis Kids',
    'creative': 'blp_levis_kids',
    'position': '09'
}
]
}
}
});
                
/* BLP HUGO BOSS*/ 
       
            break;
            case '/tienda/hugo/catst12694505':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'principal_171219',
    'name': 'Hugo Main Movil',
    'creative': 'blp_hugo_main_movil',
    'position': '01'
},
{
    'id': 'el_171219',
    'name': 'Hugo El',
    'creative': 'blp_hugo_el',
    'position': '02'
},
{
    'id': 'ella_171219',
    'name': 'Hugo Ella',
    'creative': 'blp_hugo_ella',
    'position': '03'
},
{
    'id': 'playeras_171219',
    'name': 'Hugo Playeras',
    'creative': 'blp_hugo_playeras',
    'position': '04'
},
{
    'id': 'calzado_171219',
    'name': 'Hugo Calzado',
    'creative': 'blp_hugo_calzado',
    'position': '05'
},
{
    'id': 'ropa_interior_171219',
    'name': 'Hugo Ropa Interior',
    'creative': 'blp_hugo_ropa_interior',
    'position': '06'
}
]
}
}
});
                
/* BLP CALVIN KLEIN CK*/ 
       
            break;
            case '/tienda/calvin-klein/cat4990262':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'ck_main_220819',
    'name': 'CK Main',
    'creative': 'blp_ck_main',
    'position': '01'
},
{
    'id': 'ck_main_ella_220819',
    'name': 'CK Main Ella',
    'creative': 'blp_ck_main_ella',
    'position': '02'
},
{
    'id': 'ck_main_el_220819',
    'name': 'CK Main El',
    'creative': 'blp_ck_main_el',
    'position': '03'
},
{
    'id': 'ck_ropa_ella_220819',
    'name': 'CK Ropa Ella',
    'creative': 'blp_ck_ropa_ella',
    'position': '04'
},
{
    'id': 'ck_ropa_el_220819',
    'name': 'CK Ropa El',
    'creative': 'blp_ck_ropa_el',
    'position': '05'
},
{
    'id': 'ck_footwear_ella_220819',
    'name': 'CK Footwear Ella',
    'creative': 'blp_ck_footwear_ella',
    'position': '06'
},
{
    'id': 'ck_footwear_el_220819',
    'name': 'CK Footwear El',
    'creative': 'blp_ck_footwear_el',
    'position': '07'
},
{
    'id': 'ck_relojes_220819',
    'name': 'CK Relojes',
    'creative': 'blp_ck_relojes',
    'position': '08'
},
{
    'id': 'ck_fragancias_220819',
    'name': 'CK Fragancias',
    'creative': 'blp_ck_fragancias',
    'position': '09'
},
{
    'id': 'ck_lentes_220819',
    'name': 'CK Lentes',
    'creative': 'blp_ck_lentes',
    'position': '10'
}
]
}
}
});
                
      
/* BLP APPLE*/ 
       
            break;
            case '/tienda/apple/catst2145072':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'especiales_270120',
    'name': 'Apple Especiales',
    'creative': 'blp_apple_especiales',
    'position': '01'
},
{
    'id': 'watch_131119',
    'name': 'Apple Watch',
    'creative': 'blp_apple_watch',
    'position': '02'
},
{
    'id': 'macbook_131119',
    'name': 'Apple Macbook',
    'creative': 'blp_apple_macbook',
    'position': '03'
},
{
    'id': 'homepod_131119',
    'name': 'Apple Homepedo',
    'creative': 'blp_apple_homepod',
    'position': '04'
},
{
    'id': 'accesorios_131119',
    'name': 'Apple Accesorios',
    'creative': 'blp_apple_accesorios',
    'position': '05'
},
{
    'id': 'ipad_131119',
    'name': 'Apple Ipad',
    'creative': 'blp_apple_ipad',
    'position': '06'
},
{
    'id': 'imac_131119',
    'name': 'Apple Imac',
    'creative': 'blp_apple_imac',
    'position': '07'
}
]
}
}
});
                
                
/* BLP MONTBLANC*/ 
       
            break;
            case '/tienda/montblanc/cat4470002':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'main_021019',
    'name': 'MontBlanc Main',
    'creative': 'blp_mont_main',
    'position': '01'
},
{
    'id': 'precioespecial_021019',
    'name': 'MontBlanc Precio Especial',
    'creative': 'blp_mont_precio_especial',
    'position': '02'
},
{
    'id': 'accesorios_021019',
    'name': 'MontBlanc Accesorios',
    'creative': 'blp_mont_accesorios',
    'position': '03'
},
{
    'id': 'escritura_021019',
    'name': 'MontBlanc Escritura',
    'creative': 'blp_mont_escritura',
    'position': '04'
},
{
    'id': 'piel_021019',
    'name': 'MontBlanc Piel',
    'creative': 'blp_mont_piel',
    'position': '05'
},
{
    'id': 'cinturones_021019',
    'name': 'MontBlanc Cinturones',
    'creative': 'blp_mont_cinturones',
    'position': '06'
}
]
}
}
});
     
                
/* BLP URBAN ZONE*/ 
       
            break;
            case '/tienda/urban-zone/catst6806801':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'ella_210619',
    'name': 'UZ Ella',
    'creative': 'blp_uz_ella',
    'position': '01'
},
{
    'id': 'topsella_210619',
    'name': 'UZ Tops Ella',
    'creative': 'blp_uz_tops_ella',
    'position': '02'
},
{
    'id': 'topsel_210619',
    'name': 'UZ Tops El',
    'creative': 'blp_uz_tops_el',
    'position': '03'
},
{
    'id': 'bottomsella_210619',
    'name': 'UZ Bottoms Ella',
    'creative': 'blp_uz_bottoms_ella',
    'position': '04'
},
{
    'id': 'bottomsel_210619',
    'name': 'UZ Bottoms El',
    'creative': 'blp_uz_bottoms_el',
    'position': '05'
},
{
    'id': 'el_210619',
    'name': 'UZ El',
    'creative': 'blp_uz_el',
    'position': '06'
},
{
    'id': 'accesorios_ella_210619',
    'name': 'UZ Accesorios Ella',
    'creative': 'blp_uz_accesorios_ella',
    'position': '07'
},
{
    'id': 'tenis_ella_210619',
    'name': 'UZ Tenis Ella',
    'creative': 'blp_uz_tenis_ella',
    'position': '08'
},
{
    'id': 'accesorios_el_210619',
    'name': 'UZ Accesorios El',
    'creative': 'blp_uz_accesorios_el',
    'position': '09'
},
{
    'id': 'tenis_el_210619',
    'name': 'UZ Tenis El',
    'creative': 'blp_uz_tenis_el',
    'position': '10'
}
]
}
}
});
                
/* BLP CATERPILLAR CAT*/ 
       
            break;
            case '/tienda/caterpillar/catst6652931':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'maincat_210619',
    'name': 'Caterpillar Main',
    'creative': 'blp_cat_main',
    'position': '01'
},
{
    'id': 'men_210619',
    'name': 'Caterpillar Men',
    'creative': 'blp_cat_men',
    'position': '02'
},
{
    'id': 'women_210619',
    'name': 'Caterpillar Women',
    'creative': 'blp_cat_women',
    'position': '03'
},
{
    'id': 'equipaje_210619',
    'name': 'Caterpillar Equipaje',
    'creative': 'blp_cat_equipaje',
    'position': '04'
},
{
    'id': 'work_210619',
    'name': 'Caterpillar Work',
    'creative': 'blp_cat_work',
    'position': '05'
},
{
    'id': 'accesorios_210619',
    'name': 'Caterpillar Accesorios',
    'creative': 'blp_cat_accesorios',
    'position': '06'
},
{
    'id': 'video_210619',
    'name': 'Caterpillar Video',
    'creative': 'blp_cat_video',
    'position': '07'
}
]
}
}
});
          
/* BLP DIOR*/ 
       
            break;
            case '/tienda/dior/catst8828070':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'dior_sauvage_210619',
    'name': 'Dior Sauvage',
    'creative': 'blp_dior_sauvage',
    'position': '01'
},
{
    'id': 'dior_expertise_210619',
    'name': 'Dior Expertise',
    'creative': 'blp_dior_expertise',
    'position': '02'
}
]
}
}
});
        
/* BLP DIOR*/ 
       
            break;
            case '/tienda/dior/catst8828070':


dataLayer.push({
'event': 'impresionCampaign',
'ecommerce': {
'promoView': {
'promotions': [ // Array of promoFieldObjects.
{
    'id': 'dior_sauvage_210619',
    'name': 'Dior Sauvage',
    'creative': 'blp_dior_sauvage',
    'position': '01'
},
{
    'id': 'dior_expertise_210619',
    'name': 'Dior Expertise',
    'creative': 'blp_dior_expertise',
    'position': '02'
}
]
}
}
});
 break;  
}
}
