//Wait document ready event
$(document).ready(function(){
  console.log("jquery onload triggered");
    $("#head").css("background-color","lightblue")
    .css("padding","2em").css("border-radius","8px");
    $(".about").css("text-align","center");
    $(".about").html("<em>New text</em>");
    $("[data-dummy]").css("transform","rotate(20deg)");
    $("[data-dummy]").html("<p>Hello World</p>");
    
    var setting = {
        method:"GET",
        url:"http://localhost:28017/oma/person/",
        dataType:"jsonp",
        jsonp:"jsonp"
    }
    $.ajax(setting).done(function(data){
        console.log(data);
        for(i=2; i < data.rows.length; i++){
            
            var html = "<tr>" +
                       "<td>" + data.rows[i].name + "</td>" +
                       "<td>" + data.rows[i].address + "</td>" +
                       "<td>" + data.rows[i].age + "</td>" +
                       "</tr>";
            $(html).appendTo("tbody");
        }
        for(i=0; i < data.rows.length; i++){
            
            var html = "<h3>Name <span class='label label-primary'>" + data.rows[i].name + "</span></h3>" +
                       "<h3>Address <span class='label label-primary'>" + data.rows[i].address + "</span></h3>" +
                       "<h3>Age <span class='label label-primary'>" + data.rows[i].age + "</span></h3><hr>";
            $(html).appendTo("#otsikot");
        }
        var i = 0;
        while(i < 3){
            var top3 = "<h3>Name <span class='label label-primary'>" + data.rows[i].name + "</span></h3>" +
            "<h3>Address <span class='label label-primary'>" + data.rows[i].address + "</span></h3>" +
            "<h3>Age <span class='label label-primary'>" + data.rows[i].age + "</span></h3><hr>";
            i++;
            $(top3).appendTo("#topthree");
        }            
    }
    );
});

//Sama kuin edellä, mutta nimetyn funktion kanssa - edellä oleva anonyymi tapa on lyhyempi ja useimmin käytetty
/*
$(document).ready(domReady);
function domReady(){
    
}
*/

/*
console.log("Here we go!");

window.onload = function(event){
    console.log(event);
    para1.innerHTML = "Changed from JS";
    para1.style.backgroundColor = "yellow";
}

window.onload = domReady;

function domReady(event){
    return 2;
}

function someFunction(nimi){
    console.log(nimi);
}

someFunction();
someFunction("Timo");
*/