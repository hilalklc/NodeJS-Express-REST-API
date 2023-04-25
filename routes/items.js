const express = require('express');
const router = express.Router();

let data = [
    { id: 1, title: 'Create a project', order: 1, completed: true },
    { id: 2, title: 'Take a coffee', order: 2, completed: false },
    { id: 3, title: 'Write new Article', order: 3, completed: false }
];

router.get('/', (req, res) => {
    res.status(200).json(data);
});

router.get('/:id', (req, res) => {
    // #swagger.tags = ['Items']
    // #swagger.description = 'Endpoint to obtain certain Item on the DB'
    let found = data.find((item) => item.id === parseInt(req.params.id));
    if (found) {
        res.status(200).json(found);
        /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/Item" },
                description: 'Item encontrado.' 
        } */
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    let itemIds = data.map(item => item.id);
    let orderNums = data.map(item => item.order);

    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
    let newItem = {
        id: newId,
        title: req.body.title,
        order: newOrderNum,
        completed: false,
        createdOn: new Date()
    };

    data.push(newItem);

    res.status(200).json(newItem);

});

router.put('/:id', (req, res) => {
    let found = data.find((item) => item.id === parseInt(req.params.id));
    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title,
            order: req.body.order,
            completed: req.body.completed
        };
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1, updated);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', (req, res) => {
    let found = data.find((item) => (item.id === parseInt(req.params.id)));

    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});

module.exports = router;