const express = require('express');
const router = express.Router();

const Item = require('../models/items');

router.get('/items',(req, res, next)=>{
    Item.find(function(err, items){
        res.send(items);
    })
});

router.post('/item',(req, res, next)=>{
    let newItem = new Item({
        item_name: req.body.item_name,
        category: req.body.category,
        quantity: req.body.quantity
    });

    newItem.save((err, item)=>{
        if(err)
        {
            res.json({msg: 'Failed to add item'});
        }
        else{
            res.json({msg: 'Item added successfully'});
        }
    });
});

router.delete('/item/:id',(req, res, next)=>{
    Item.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    });  
});

module.exports = router;