
if(window.location.search.toString()){
        console.log('src ', document.getElementById("my_object").src);
        document.getElementById("my_object").src = "https://miseguroqa.liverpool.com.mx/miseguro_dev/mis-polizas" + window.location.search.toString();
    }
