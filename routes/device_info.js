// const express = require('express');
// const router = express.Router();

// const device_infoDAO = require('../data/device_infoDAO');

// const dao = new device_infoDAO();
// /* GET users page. */

// router.get('/', async (req, res, next) => {
//     res.send(await dao.getAll()); 
// });

// router.get('/:id', async(req, res, next) => {
//     const result = await dao.getOne(req.params.id);
//     res.status(result.code).send(result);
// });

// router.get('/user/:id', async(req, res, next) => {
//     const result = await dao.getAllOwnedBy(req.params.id);
//     res.status(result.code).send(result);
// }); 

// router.post('/new', async (req, res, next) => {
//     const result = await dao.create(req.body);
//     console.log(result);
//     res.status(result.code).send(result);
// });

// // router.put('/update/:id', async (req, res) => {
// //     const result = await dao.update(req.body, req.params.id);
// //     res.status(result.code).send(result);
// // });

// // router.delete('/delete/:id', async (req, res) => {
// //     const result = await dao.delete(req.params.id);
// //     res.status(result.code).send(result);
// // });

// module.exports = router;
