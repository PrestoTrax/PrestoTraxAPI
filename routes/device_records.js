// const express = require('express');
// const router = express.Router();

// const device_recordsDAO = require('../data/device_recordsDAO');

// const dao = new device_recordsDAO();
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

// router.get('/device/:id', async (req, res, next) => {
//     const result = await dao.getAllDeviceRecords(req.params.id);
//     res.status(result.code).send(result);
// })

// router.post('/new', async (req, res, next) => {
//     const result = await dao.create(req.body);
//     res.status(result.code).send(result);
// });

// router.put('/update/:id', async (req, res) => {
//     const result = await dao.update(req.body, req.params.id);
//     res.status(result.code).send(result);
// });

// router.delete('/delete/:id', async (req, res) => {
//     const result = await dao.delete(req.params.id);
//     res.status(result.code).send(result);
// });

// module.exports = router;