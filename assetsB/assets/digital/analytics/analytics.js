    function myOnloadFunction(pageName,path) {
    	switch(path){

    		case '/tienda/home':
        //IMPRESION CAMPAIGN DE GOOGLE HOME LIVERPOOL
				var objimpression = [// Array of promoFieldObjects.
                            {
           'id':'covid19_010420',
            'name':'Comunicado COVID-19',
           'creative':'h_banner_central',
           'position':'A',
       },{
       'id':'mujer_220620',
                'name':'Mujer hasta 43% de desc',
                'creative':'h_banner_secun',
                'position':'1',
      },{
      'id':'hombre_220620',
                'name':'Hombre hasta 43% de desc',
                'creative':'h_banner_secun',
                'position':'2',
       },
       {
     'id':'ninas_y_ninos_220620',
                'name':'Niñas y Niños hasta 43% de desc',
                'creative':'h_banner_secun',
                'position':'3',
       }, {
    'id':'bebes_220620',
                'name':'Bebes hasta 43% de desc',
                'creative':'h_banner_secun',
                'position':'4',
       },
        {
      'id':'zapatos_220620',
           'name':'Zapatos hasta 43% de desc',
           'creative':'h_banner_secun',
           'position':'5',
       },
       {
     'id':'muebles_de_jardin_150620',
       'name':'Muebles de jardín hasta 30% de desc',
       'creative':'h_banner_secun',
       'position':'6',
       }, {
      'id':'cocina_220620',
            'name':'Cocina hasta 25% de desc',
            'creative':'h_banner_secun',
            'position':'7',
       },
      {
      'id':'aires_acondicionados_220620',
            'name':'Aires Acondicionados hasta 40% de desc',
            'creative':'h_banner_secun',
            'position':'8'
       },
                 {
      'id':'deportes_220620',
       'name':'Deportes hasta 43% de desc',
       'creative':'h_banner_secun',
       'position':'9',
       },
            {
      'id':'relojes_220620',
            'name':'Relojes hasta 25% de desc',
            'creative':'h_banner_secun',
            'position':'10',
       },
           {
      'id':'pandora_220620',
        'name':'Pandora hasta 40% de desc',
        'creative':'h_banner_secun',
        'position':'11',
                 }
                        ];

var objAdobe ={
    eventName: 'Impression Campaign',
    eventAction: 'customImpressionCampaign',
    attributes:{
        'promotions':objimpression
    }
  }
var objGoogle = {
    'event': 'impresionCampaign',
    'ecommerce': {
          'promoView': {
                  'promotions': objimpression
        }
   }
 }
 
dataLayer.push(objGoogle);//google
window.digitalData.event = window.digitalData.event || [];//adobe
window.digitalData.event.push(objAdobe);
    		break;
    		
    	
    	}
    }
