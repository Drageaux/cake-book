var unirest = require('unirest');
var Cake = require("../models/cake");
var fs = require("fs");
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports.list = function (req, res) {
    Cake.find({"user": req.params.user})
        .sort({
            isFavorite: -1,
            name: 1
        }).exec(function (err, cakes) {
        res.json(cakes);
    });
}

module.exports.get = function (req, res) {
    Cake.findOne({"_id": req.params.id}, function (err, cake) {
        if (cake.user == req.params.user) {
            res.json(cake);
        } else {
            if (cake.isPublic) {
                res.json(cake);
            }
        }
    });
}

module.exports.create = function (req, res) {
    var cake = new Cake();
    cake.isPublic = req.body.isPublic;
    cake.isFavorite = req.body.isFavorite;
    cake.user = req.body.user;
    cake.name = req.body.name;
    cake.description = req.body.description;
    cake.ingredients = req.body.ingredients;
    cake.steps = req.body.steps;
    cake.save(function (err, cake) {
        res.json(cake);
    });
}

module.exports.remove = function (req, res) {
    Cake.remove({"_id": req.params.id, "user": req.params.user}, function (err) {
        res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
    });
}

module.exports.addDetail = function (req, res) {
    Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
        if (req.params.type == "ingr") {
            cake.ingredients.push({"index": cake.ingredients.length, "value": req.body.value});
        } else if (req.params.type == "step") {
            cake.steps.push({"index": cake.steps.length, "value": req.body.value});
        }
        cake.save();
        res.json(cake);
    });
}

module.exports.removeDetail = function (req, res) {
    if (req.params.type == "ingr") {
        Cake.update(
            {"_id": req.params.id, "user": req.params.user},
            {$pull: {"ingredients": {"index": req.params.index}}}, function (err) {
                Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
                    for (var i = 0; i < cake.ingredients.length; i++) {
                        cake.ingredients[i]["index"] = i;
                    }
                    cake.save();
                    res.json(cake);
                });
            });
    } else if (req.params.type == "step") {
        Cake.update(
            {"_id": req.params.id, "user": req.params.user},
            {$pull: {"steps": {"index": req.params.index}}}, function (err) {
                Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
                    for (var i = 0; i < cake.steps.length; i++) {
                        cake.steps[i]["index"] = i;
                    }
                    cake.save();
                    res.json(cake);
                });
            });
    }
}

module.exports.updateDetail = function (req, res) {
    Cake.findOne({"_id": req.params.id, "user": req.params.user}, function (err, cake) {
        if (req.params.type == "image") {
            var path = "image." + req.body.dataType;
            fs.writeFile(path, new Buffer(req.body.data, "base64"), function (result, err) {
                cloudinary.uploader.upload(path, function (result) {
                    cake.image = result.url;
                    cake.croppedImage = cake.image.replace("image/upload/", "image/upload/c_fill,h_480,w_480/");
                    cake.save(function (err, cake) {
                        res.json(cake);
                        fs.unlink(path);
                    });
                });
            });
        } else {
            if (req.params.type == "name") {
                cake.name = req.body.value;
            } else if (req.params.type == "desc") {
                cake.description = req.body.value;
            } else if (req.params.type == "ingr") {
                cake.ingredients = req.body;
            } else if (req.params.type == "step") {
                cake.steps = req.body;
            } else if (req.params.type == "isPublic") {
                if (cake.isPublic != null) {
                    cake.isPublic = !cake.isPublic;
                } else {
                    cake.isPublic = true;
                }
            } else if (req.params.type == "isFavorite") {
                if (cake.isFavorite != null) {
                    cake.isFavorite = !cake.isFavorite;
                } else {
                    cake.isFavorite = true;
                }
            }
            cake.save();
            res.json(cake);
        }
    });
}

module.exports.search = function (req, res) {
    var query = "";
    for (i in req.params.query.split(" ")) {
        query += "+" + req.params.query.split(" ")[i];
    }
    var number = req.params.end - req.params.start + 1;
    number = number.toString();
    var offset = req.params.start - 1;
    offset = offset.toString();
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?" +
            "number=" + number + "&" +
            "offset=" + offset + "&" +
            "query=" + query + "&" +
            "type=dessert")
        .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
        .end(function (result) {
            res.send(result);
        });
}

module.exports.searchBy = function (req, res) {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" +
            req.params.id + "/information?includeNutrition=false")
        .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
        .end(function (result) {
            res.send(result);
        });
}

module.exports.extract = function (req, res) {
    unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url=" +
            req.params.query)
        .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
        .end(function (result) {
            res.send(result)
        });
}