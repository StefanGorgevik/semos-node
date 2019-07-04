var fs = require('fs');

var GetAllFood = (req, res) => {
    fs.readFile('./food_list.json', 'utf8', (err, data) => {
        if(err){
            res.send('Could not read file');
            return;
        }
       // data = data.sort((a,b) => {return a.id - b.id});
        jData = JSON.parse(data);
        jData = jData.sort((a,b) => {return a.id - b.id});
        res.send(jData);
    });
};

var GetSingleFood = (req, res) => {
    fs.readFile('./food_list.json', 'utf8', (err, data) => {
        if(err){
            res.send('Could not read file');
            return;
        }
        var jData = JSON.parse(data);
        var out = jData.filter((o) => {
            return o.id == req.params.id;
        });
        if(out.length == 0){
            return res.status(404).send('Not found');
        }
        return res.send(out[0]);
    });
}

var CreateNewFood = (req, res) => {
    var check = req.body.id != undefined
        && req.body.name != undefined && req.body.name != "" && req.body.name.length > 0
        && req.body.price != undefined
        && req.body.calories != undefined; //proverka dali ima podatoci

        if(!check){
            return res.status(400).send('Bad request');
        }
        fs.readFile('./food_list.json', 'utf8', (err, data) => {
            if(err){
                res.send('Could not read file');
                return;
            }
            jData = JSON.parse(data);
            jData.push(req.body);
            fs.writeFile('./food_list.json', JSON.stringify(jData), (err) => {
                if(err){
                    return res.status(500).send('Could not save file');
                }
                return res.status(201).send(req.body);
            });
        });
};

var UpdateFood = (req, res) => {
    var check = req.body.id != undefined
    && req.body.name != undefined && req.body.name != "" && req.body.name.length > 0
    && req.body.price != undefined
    && req.body.calories != undefined;

    if(!check){
        return res.status(400).send('Bad request');
    };

    fs.readFile('./food_list.json', 'utf8', (err, data) => {
        if(err){
            return res.send('Could not read file');
        };
        var jData = JSON.parse(data);
        for(let i = 0; i < jData.length; i++) {
            if(jData[i].id === req.params.id ) {
                jData[i] = req.body;
                break;
            };
        };
        fs.writeFile('./food_list.json', JSON.stringify(jData), (err) => {
            if(err){
                return res.status(500).send('Could not save file');
            }
            return res.status(200).send("OK");
        });
    });
};

var PartialUpdateFood = (req, res) => {
    fs.readFile('./food_list.json', 'utf8', (err, data) => {
    var jData = JSON.parse(data);
    if(jData[req.params.id] != undefined){
        if(req.body.name != undefined && req.body.name != "" && req.body.name.length > 0){
            jData[req.params.id].name = req.body.name;
        }
        if(req.body.price != undefined){
            jData[req.params.id].price = req.body.price;
        }
        if(req.body.calories != undefined){
            jData[req.params.id].calories = req.body.calories;
        }
        return res.status(200).send("OK");
    } else {
        return res.status(404).send("Not Found");
    }
});
};

var DeleteFood = (req, res) => {
    fs.readFile('./food_list.json', 'utf8', (err, data) => {
        if(err){
            res.send('Could not read file');
            return;
        };
        jData = JSON.parse(data);
        var index = null;
        for(let i = 0; i < jData.length; i++) {
            if(jData[i].id === req.params.id ) {
                index = i;
                break;
            };
        }
        jData.splice(index,1); 
        fs.writeFile('./food_list.json', JSON.stringify(jData), (err) => {
            if(err){
                return res.status(500).send('Could not delete file');
            }
            return res.status(200).send("OK");
        });
});
};

module.exports = {
    GetAllFood,
    GetSingleFood,
    CreateNewFood,
    UpdateFood,
    PartialUpdateFood,
    DeleteFood,
};