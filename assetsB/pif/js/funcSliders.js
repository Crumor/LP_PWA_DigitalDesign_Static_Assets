$(document).ready(function(){
                          
                          $('#containerPage').html("");

        $.ajax({

            url: "funcSliders.js",
            dataType: "text",

            success: function (data) {
                 //data.sort(sortJsonName);
               // data.sort();
                var json = $.parseJSON(data);
                var count = 0;
                var numc = 0;
                    
                    //$("#loading").delay(2000).fadeOut();
                /*Variables;*/
                //json.sort();
                //json = json.sort(sortJsonCoordinadoZ);
                $.each(json, function (key, value) {
              

                        if(json[count].articulos == "Dir1"){
                           console.log(json[count].coordinado);
                          
                            //style='text-decoration:none;color:#000000;' width='220' height='220'
                          $('#containerPage').append("<div class="item"> <a href='"+json[count].url+"'> <img src='img/"+json[count].idfoto+".jpg' ><div class="carouselLabel">"+json[count].coordinado+"</div></div></a>");
                        
                        }
                          pop();

                        numc++;
                        count++;
                    });
            }

            });
			
			});