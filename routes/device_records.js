import express from 'express';
const router = express.Router();

import deviceRecordsDAO from '../data/deviceRecordsDAO.js';

const dao = new deviceRecordsDAO();
/* GET users page. */

router.get('/', async (req, res, next) => {
    res.send(await dao.getAll()); 
});

router.get('/:id', async(req, res, next) => {
    const result = await dao.getOne(req.params.id);
    res.status(result.code).send(result);
});

router.get('/recent/:id', async(req, res, next) => {
    const result = await dao.getRecentLocation(req.params.id);
    res.status(result.code).send(result);
});

router.get('/user/:id', async(req, res, next) => {
    const result = await dao.getRelevantOwnedBy(req.params.id);
    res.status(result.code).send(result);
}); 

router.get('/device/:id', async (req, res, next) => {
    const result = await dao.getAllDeviceRecords(req.params.id);
    res.status(result.code).send(result);
})

router.post('/new', async (req, res, next) => {
    const result = await dao.create(req.body);
    res.status(result.code).send(result);
});

router.delete('/delete/:id', async (req, res, next) => {
    const result = await dao.delete(req.params.id);
    res.status(result.code).send(result);
})


export default router;