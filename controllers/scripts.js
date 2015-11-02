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
        url:"http://localhost:3000/persons",
        dataType:"json"
    }
    $.ajax(setting).done(function(data){
        console.log(data);
        //Get all keys (attribute names) from json object
        console.log(Object.keys(data[0]));
        
        //Check that there are elements in array
        if (data.length > 0){
            //Create table headers dynamically
            var headers = Object.keys(data[0]);
            
            var row = $("<tr></tr>");
            //Leave id-field out by entering number 1
            for (var i = 1; i < headers.length; i++){
                //Create header and add it to row
                $("<th>" + headers[i] + "</th>").appendTo(row);
            }
            //Add row to thead element
            $(row).appendTo("table#dyn-table thead");
        }
        
        for(i=0; i < data.length; i++){
            
            var html = "<tr>" +
                       "<td>" + data[i].name + "</td>" +
                       "<td>" + data[i].address + "</td>" +
                       "<td>" + data[i].age + "</td>" +
                       "<td>" + data[i].email + "</td>" +
                       "</tr>";
            $(html).appendTo("tbody#no-dyn");
        }
        for(i=0; i < data.length; i++){
            
            var html = "<h3>Name <span class='label label-primary'>" + data[i].name + "</span></h3>" +
                       "<h3>Address <span class='label label-primary'>" + data[i].address + "</span></h3>" +
                       "<h3>Age <span class='label label-primary'>" + data[i].age + "</span></h3><hr>";
            $(html).appendTo("#otsikot");
        }
        var i = 0;
        while(i < 3){
            var top3 = "<h3>Name <span class='label label-primary'>" + data[i].name + "</span></h3>" +
            "<h3>Address <span class='label label-primary'>" + data[i].address + "</span></h3>" +
            "<h3>Age <span class='label label-primary'>" + data[i].age + "</span></h3><hr>";
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