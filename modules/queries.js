var db = require('./database');

/**
  *This function gets all documents from person collection
  */
exports.getAllPersons = function(req,res){
    
    db.Person.find(function(err,data){
    
        if(err){
           console.log(err.message);
           res.send("Error in database");
       }
        else {
           res.send(data);
       }
    });
}

/**
  *This function saves new person information to our person collection
  */
exports.saveNewPerson = function(req,res){
    var personTemp = new db.Person(req.body);
    //Save it to database
    personTemp.save(function(err,ok){
        //res.send("Database action done");
        //Make a redirect to root context
        res.redirect('/');
    })
}

/**
  *This function deletes one person from our person collection
  */

exports.deletePerson = function(req,res){
    //What happens here is that req.params.id return string "id=38901798141afölsfj" split function splits the string from "=" and creates an array where [0] contains "id" and [1] contains "38901798141afölsfj"
    var id = req.params.id.split("=")[1];
    db.Person.remove({_id:id},function(err){
        if (err){
            res.send(err.message);
        }
        else {
            res.send("Delete ok");
        }
    });
}

/**
  *This function updates one person info in our person collection
  */

exports.updatePerson = function(req,res){
    var updateData = {
        name:req.body.name,
        address:req.body.address,
        age:req.body.age,
        email:req.body.email,
    }
    db.Person.update({_id:req.body.id},updateData,function(err){
        res.send({data:"ok"});
    })
}

/**
  *This function searches database by name or by first letters of name
  */

exports.findPersonsByName = function(req,res){
    var name = req.params.nimi.split("=")[1];
    console.log("name:" + name);
    db.Person.find({name:{'$regex':'^' + name,'$options':'i'}},function(err,data){
        if(err){
            res.send('error');
        }
        else {
            console.log(data);
            res.send(data);
        }
    });
}