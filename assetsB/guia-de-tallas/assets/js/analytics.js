//PA Modified below method modified for the Google tag manager purpose

function gaProductDetail() {

	var price = $("#ga_price").val();
	var prodName = $("#ga_prod_name").val();
	var skuId = $("#ga_skuid").val();
	//START:Added for bugzilla defect#16548
	//Fix for GOOGLE ANALYTICS AUDIT ABACO observation 
	//var skuidSelcted = $("#SkuSelectedSplit").val();
	//var skuColor = $("#SkuColour").val();
	var skuidSelcted = $('#productColor ul li.active a').attr('data-skuattribute');
	if(skuidSelcted == ''){
		var skuidSelcted = skuId;
	}
	var skuColor = $('#productColor ul li.active a').attr('title');
	
	//END:Added for bugzilla defect#16548
	var category = $('#ancestorLbl').text();
	var subCategory = $('#breadCrumbLbl').text();
	var brand = $("#ga_brand").val();
	var color = $("#ga_colour").val();
	
	// START Mirakl 2018 R2 release  	
	var ga_isMarketPlace = $("#isMarketPlace").val(); 
	var prodtype;
	var seller;
	if(ga_isMarketPlace == 'true'){
		price = $("#ga_marketPlacePrice").val();
		seller = $("#buybox_winner").text();
		if(seller != undefined && seller != ""){
		prodtype = 'Market Place - '+seller;
			}
		else{
			prodtype = 'N/A'
		}
	}else{
		prodtype = 'N/A';
	}
	// End Mirakl 2018 R2 release 
	
//changed for bugzilla defect#16548
	try {

		if (!!color) {
			dataLayer.push({
				'event' : 'productDetail',
				'ecommerce' : {
					'detail' : {
						'actionField' : {
							'list' : subCategory
						},
						'products' : [ {
							'name' : prodName,
							'id' : skuidSelcted ,
							'price' : price ,
							'brand' :  brand ,
							'category' :  category ,
							'dimension8' :  subCategory , 
							'variant' : skuColor ,
							'dimension36' : prodtype
						} ]
					}
				}
			});
		} else {
			dataLayer.push({
				'event' : 'productDetail',
				'ecommerce' : {
					'detail' : {
						'actionField' : {
							'list' : subCategory
						},
						'products' : [ {
							'name' : prodName,
							'id' :  skuidSelcted ,
							'price' :  price ,
							'brand' : brand ,
							'category' :  category ,
							'dimension8' : subCategory,
							'dimension36' : prodtype 
						} ]
					}
				}
			});

		}
	} catch (t) {
		console.log(t);
	}

}

// PA Modified below method modified for the Google tag manager purpose
function plpProductInteraction(prodName, prodId, gtmPrice, prodBrand, color,
		position,recordState,contextPath,isMarketPlace) {
	//Bugzilla 13638
	var splitRecordState = recordState.split('?');
	/*jQuery.ajax({
		url : contextPath+"/search/setRequestParam.jsp?recordState="+splitRecordState[0],
		success : function(e) {
			console.log("success");
		},
		error : function() {
			console.log("error");
		}
	})*/
	var category = $('#ancestorLbl').text();
	var tempList = $('#breadCrumbLbl').text();
	var url = window.location.href;
	if (url.toLowerCase().indexOf("s=") >= 0) {
		tempList = 'SearchResults';
	}
	
	// START Mirakl 2018 R2 release  	
	var prodtype;
	var seller;
	if(isMarketPlace){
		seller = $("#gtmSellerName").val();
		prodtype = 'Market Place - '+seller;
	}
	// End Mirakl 2018 R2 release
	
	
	try {
		if (!!color) {
			dataLayer.push({
				'event' : 'productClick',
				'ecommerce' : {
					'click' : {
						'actionField' : {
							'list' : "'" + tempList + "'"
						},
						'products' : [ {
							'name' : "'" + prodName + "'",
							'id' : "'" + prodId + "'",
							'price' : "'" + gtmPrice + "'",
							'brand' : "'" + prodBrand + "'",
							'category' : "'" + category + "'",
							'dimension8' : "'" + tempList + "'",
							'variant' : "'" + color + "'",
							'position' : "'" + position + "'",
							'dimension36' : "'" + prodtype + "'"
						} ]
					}
				}
			});
		}

		else {
			dataLayer.push({
				'event' : 'productClick',
				'ecommerce' : {
					'click' : {
						'actionField' : {
							'list' : "'" + tempList + "'"
						},
						'products' : [ {
							'name' : "'" + prodName + "'",
							'id' : "'" + prodId + "'",
							'price' : "'" + gtmPrice + "'",
							'brand' : "'" + prodBrand + "'",
							'category' : "'" + category + "'",
							'dimension8' : "'" + tempList + "'",
							'position' : "'" + position + "'",
							'dimension36' : "'" + prodtype + "'"
						} ]
					}
				}
			});
		}
	} catch (t) {
		console.log(t);
	}
}

//PA Modified below method modified for the Google tag manager purpose
function macAddToCart(evt){
var category=$('#ancestorLbl').text();
var subCategory=$('#breadCrumbLbl').text();
var items="dataLayer.push({'event': 'addToCart','ecommerce': {'currencyCode': 'MXN','add': { 'products': [";
	$('.list-items li div.item').each(
			function(item) {
				items += "{'name':'" + $(this).attr('data-prodname')
						+ "','id':'" + $(this).attr('data-skuid')
						+ "','price':'" + $(this).attr('data-price')
						+ "','brand':'" + $(this).attr('data-brand')
						+ "','category':'" + $(this).attr('data-category')
						+ "','dimension8':'"
						+ $(this).attr('data-subcategory') + "','variant':'"
						+ $(this).attr('data-color') + "','quantity':"
						+ $(this).find('[id^=mac_quant2]').val() + "}";
if($('.list-items li div.item').length>item+1)
items+=',';

});
items+="]}}});";
$('body').append('\x3Cscript type="text/javascript" >'+items+'\x3C/script>');

	console.log(items);
//**Addto cart PLP**//*
var formId=evt.target.form.id;
var Data = $('#'+formId).serializeArray();
if($('#mac-collection').find('div.alert-container').exists()) {
	$('#mac-collection').find('div.alert-container').remove();
}
		$.ajax({
				url : "/tienda/akamai/confirmationOverlay.jsp",
				type: "POST",
				data : Data,
				success:function(data, textStatus, jqXHR)
				{
			//		Added
					if(data.indexOf('successFlag') > 0){
							$('li#bag').html(data);
					} else {
						$("#mac-collection").prepend(data);
					}
				},
				error:function(data) {
				}
			});
}


// PA Modified below method modified for the Google tag manager purpose
function gtmAddToCart(prodName, prodId, gtmPrice, prodBrand, color, isMarketPlace) {
	var category = $('#ancestorLbl').text();
	var subcategory = $('#breadCrumbLbl').text();
	
	// START Mirakl 2018 R2 release  	
	var prodtype;
	var seller;
	if(isMarketPlace){
		seller = $("#ga_marketPlaceSeller").val();
		prodtype = 'Market Place - '+seller;
	}
	// End Mirakl 2018 R2 release
	
	try {
		if (!!color) {
			dataLayer.push({
				'event' : 'addToCart',
				'ecommerce' : {
					'currencyCode' : 'MXN',
					'add' : {
						'products' : [ {
							'name' : "'" + prodName + "'",
							'id' : "'" + prodId + "'",
							'price' : "'" + gtmPrice + "'",
							'brand' : "'" + prodBrand + "'",
							'category' : "'" + category + "'",
							'dimension8' : "'" + subcategory + "'",
							'variant' : "'" + color + "'",
							'quantity' : "'1'",
							'dimension36' : "'" + prodtype + "'"
						} ]
					}
				}
			});
		} else {
			dataLayer.push({
				'event' : 'addToCart',
				'ecommerce' : {
					'currencyCode' : 'MXN',
					'add' : {
						'products' : [ {
							'name' : "'" + prodName + "'",
							'id' : "'" + prodId + "'",
							'price' : "'" + gtmPrice + "'",
							'brand' : "'" + prodBrand + "'",
							'category' : "'" + category + "'",
							'dimension8' : "'" + subcategory + "'",
							'quantity' : "'1'",
							'dimension36' : "'" + isMarketPlace + "'"
						} ]
					}
				}
			});
		}
	} catch (t) {
		console.log(t);
	}
}

// PA Modified below method modified for the Google tag manager purpose
//Bugzilla Defect #14358
function gtmRemoveFromCart(prodName, prodId, gtmPrice, prodBrand, category,
		subcategory, color, quantity, isMarketPlace) {
	
	// START Mirakl 2018 R2 release  	
	var prodtype = 'N/A';
	var seller;
	if(isMarketPlace == 'true'){
		seller = $("#ga_marketPlaceSeller").val();
		if(seller == undefined || seller == ""){
			seller = $("#pdpMiraklSellerName").val();
		}
		prodtype = 'Market Place - '+seller;
	}
	// End Mirakl 2018 R2 release
	
	try {
		if (!!color) {
			dataLayer.push({
				'event' : 'removeFromCart',
				'ecommerce' : {
					'remove' : {
						'products' : [ {
							'name' : prodName,
							'id' : prodId,
							'price' : gtmPrice,
							'brand' : prodBrand,
							'category' : category,
							'dimension8' : subcategory,
							'variant' : color,
							'quantity':quantity,
							'dimension36' : prodtype
						} ]
					}
				}
			});
		} else {
			dataLayer.push({
				'event' : 'removeFromCart',
				'ecommerce' : {
					'remove' : {
						'products' : [ {
							'name' : prodName,
							'id' : prodId,
							'price' : gtmPrice,
							'brand' : prodBrand,
							'category' : category,
							'dimension8' : subcategory,
							'quantity':quantity,
							'dimension36' : prodtype
						} ]
					}
				}
			});
		}
	} catch (t) {
		console.log(t);
	}
}

// PA Modified below method modified for the Google tag manager purpose
function currentGTMItem(item) {
	var curretntParent = $(item).parent().parent();
	console.log($(curretntParent).find('.gtmSkuId').val());
	dataLayer.push({
		'event' : 'productImpresion',
		'ecommerce' : {
			'currencyCode' : 'MXN',
			'impressions' : [ {
				'name' : $(curretntParent).find('.gtmProdName').val(),
				'id' : $(curretntParent).find('.gtmSkuId').val(),
				'price' : $(curretntParent).find('.gtmPlPrice').val(),
				'brand' : $(curretntParent).find('.gtmPlpBarand').val(),
				'category' : $(curretntParent).find('').val(),
				'dimension8': $('#breadCrumbLbl').text(),
				'list' : $(curretntParent).find('').val(),
				'position' : $(curretntParent).find('.gtmPosition').val()
			}, ]
		}
	});

}
function typeaheadClick(fieldText,itemClick){
	console.log("typeAhead -> "+fieldText+itemClick);

	//Changed bugzilla defect#16548
     // ga('create', 'UA-4668284-1', 'auto');  // Replace with your property ID.
    ga('send', 'event', 'Typeahead', 'clickTypeahead', "'typeahead|"+fieldText+' | '+itemClick+"'");

	//dataLayer.push({'event': 'typeahead','typeaheadClick':[{'id':'Typeahead','field':''+fieldText+'','content':''+itemClick+''}]});
   
    //ga('send', {'hitType': 'event','eventCategory': 'Typeahead','eventAction':'clickTypeahead','eventLabel': ''+fieldText+' - '+itemClick+''});


}

//START Mirakl 2018 R2 release - Added New method for offerListing page add to cart gtm implementation

function gtmMiraklOfferListingAddToCart(gtmPrice,gtmSellerName){

var prodName = $("#gtmproductname").val();
var prodId = $("#gtmproductid").val();
var prodBrand = $("#gtmbrand").val();
var category = $("#gtmcategory").val();
var prodtype = 'Market Place - '+gtmSellerName;
var color = $('#mpOfferSection p.offer-color').html();
var subcategory = null;

try {
if (!!color) {
	dataLayer.push({
		'event' : 'addToCart',
		'ecommerce' : {
			'remove' : {
				'products' : [ {
					'name' : prodName,
					'id' : prodId,
					'price' : gtmPrice,
					'brand' : prodBrand,
					'category' : category,
					'dimension8' : subcategory,
					'variant' : color,
					'quantity': "1",
					'dimension36' : prodtype
				} ]
			}
		}
	});
} else {
	dataLayer.push({
		'event' : 'addToCart',
		'ecommerce' : {
			'remove' : {
				'products' : [ {
					'name' : prodName,
					'id' : prodId,
					'price' : gtmPrice,
					'brand' : prodBrand,
					'category' : category,
					'dimension8' : subcategory,
					'quantity': "1",
					'dimension36' : prodtype
				} ]
			}
		}
	});
}
} catch (t) {
console.log(t);
}
}

//End Mirakl 2018 R2 release - Added New method for offerListing page add to cart gtm implementation


/*function testAddToCart(prodName, prodId, gtmPrice, prodBrand, category,
		subcategory, color, quantity, prodtype){
	
	// START Mirakl 2018 R2 release  	
	//var prodtype;
	//if(isMarketPlace){
		//prodtype = 'Market Place - '+sellerName;
	//}
	// End Mirakl 2018 R2 release
	
	
	try {
		if (!!color) {
			dataLayer.push({
				'event' : 'removeFromCart',
				'ecommerce' : {
					'remove' : {
						'products' : [ {
							'name' : prodName,
							'id' : prodId,
							'price' : gtmPrice,
							'brand' : prodBrand,
							'category' : category,
							'dimension8' : subcategory,
							'variant' : color,
							'quantity':quantity,
							'dimension36' : prodtype
						} ]
					}
				}
			});
		} else {
			dataLayer.push({
				'event' : 'removeFromCart',
				'ecommerce' : {
					'remove' : {
						'products' : [ {
							'name' : prodName,
							'id' : prodId,
							'price' : gtmPrice,
							'brand' : prodBrand,
							'category' : category,
							'dimension8' : subcategory,
							'quantity':quantity,
							'dimension36' : prodtype
						} ]
					}
				}
			});
		}
	} catch (t) {
		console.log(t);
	}*/