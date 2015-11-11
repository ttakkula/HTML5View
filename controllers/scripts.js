//Wait document ready event

//This variable is shown to every function
var g_person_data;

$(document).ready(function(){
  console.log("jquery onload triggered");
    $("#head").css("background-color","lightblue")
    .css("padding","2em").css("border-radius","8px");
    $(".about").css("text-align","center");
    $(".about").html("<em>New text</em>");
    $("[data-dummy]").css("transform","rotate(20deg)");
    $("[data-dummy]").html("<p>Hello World</p>");
    
    $("#search").click(function(){
        var text = $("#search_text").val();
        $.ajax({
            method:"GET",
            url:"http://localhost:3000/persons/nimi=" + text
        }).done(function(data){
            console.log(data);
            $("tbody#no-dyn").children().remove();
        for(i=0; i < data.length; i++){
            var html = "<tr>" +
                       "<td>" + data[i].name + "</td>" +
                       "<td>" + data[i].address + "</td>" +
                       "<td>" + data[i].age + "</td>" +
                       "<td>" + data[i].email + "</td>" +
                       "<td><input type='button' id=" + data[i]._id + " value='Modify' class='btn btn-default btn-sm'></td>" +
                       "</tr>";
            $(html).appendTo("tbody#no-dyn");
        }            
            
        }).error(function(err){
        
        });
    });
    
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
            $("<th>Edit</th>").appendTo(row);
            //Add row to thead element
            $(row).appendTo("table#dyn-table thead");
        }
        // Create table content dynamically
        for(i=0; i < data.length; i++){
            
            var html = "<tr>" +
                       "<td>" + data[i].name + "</td>" +
                       "<td>" + data[i].address + "</td>" +
                       "<td>" + data[i].age + "</td>" +
                       "<td>" + data[i].email + "</td>" +
                       "<td><input type='button' id=" + data[i]._id + " value='Modify' class='btn btn-default btn-sm'></td>" +
                       "</tr>";
            $(html).appendTo("tbody#no-dyn");
        }
        $("[type=button]").click(function(click_data){
            //Loop trough all the values
            for (var i = 0; i < data.length; i++){
                
                //Check if id from button matches one of person id
                if(click_data.currentTarget.id == data[i]._id)
                    {
                        buildModifyUI(data[i]);
                        break;
                    }
            }
        });
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
    });
    
    //Get all elements from DOM where element has attribute 'type' with value 'button'. Then add event handler for click event for each of them
});

function buildModifyUI(person_data){
    var html = "Name <input type='text' id='name' value='" + person_data.name + "'>";
    html += "Address <input type='text' id='address' value='" + person_data.address + "'>";
    html += "Age <input type='text' id='age' value='" + person_data.age + "'>";
    html += "Email <input type='text' id='email' value='" + person_data.email + "'>";
    html += "<input type='button' value='Update' id='update'>";
    html += "<input type='button' value='Delete' id='delete'>";
    
    $("body").html(html);
    
    $("#delete").click(function(){
       $.ajax({
           method:'DELETE',
           url:'http://localhost:3000/persons/id=' + person_data._id
       }).done(function(data){location.reload(true)});
    });
    
    $("#update").click(function(){
        
        var temp = {
            id:person_data._id,
            name:$("#name").val(),
            address:$("#address").val(),
            age:$("#age").val(),
            email:$("#email").val()
        }
        
        //$.ajax({}).done(function(){}); <-- valmis malli
        $.ajax({
            method:'PUT',
            url:'http://localhost:3000/persons',
            dataType:'json',
            data:temp
        }).done(function(){location.reload(true)});
    });
}

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