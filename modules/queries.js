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

exports.registerFriend = function(req,res){
    var friend = new db.Friends(req.body);
    friend.save(function(err){
        if(err){
            res.send({status:err.message,class:"alert alert-danger show"});
        } else {
            res.send({status:"Register successful!",class:"alert alert-success show"});
        }
    });
}

exports.loginFriend = function(req,res){
    var searchObject = {
        username:req.body.username,
        password:req.body.password
    }
    db.Friends.find(searchObject,function(err,data){
        if(err){
            res.send({status:err.message})
        } else {
            //=< 0 means wrong username or password
            if(data.length > 0){
                res.send({status:"Ok",class:"alert alert-success show"});
            } else {
                res.send({status:"Wrong username or password",class:"alert alert-danger show"});
            }
        }
    });
}


/**
  *Gets users all the friends from person collection
  */

exports.getFriendsByUsername = function(req,res){
    var usern = req.params.username.split("=")[1];
    db.Friends.find({username:usern}).
    populate('friends').exec(function(err,data){
        console.log(err);
        console.log(data);
        res.send(data.friends);
    });
}