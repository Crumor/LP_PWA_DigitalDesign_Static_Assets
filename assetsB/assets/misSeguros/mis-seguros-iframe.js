if(window.location.search.toString()){
  setTimeout(function(){ 
      document.getElementById("my_object").src = "https://miseguroqa.liverpool.com.mx/miseguro_dev/mis-polizas" + window.location.search.toString();
    }, 2000);
  }
