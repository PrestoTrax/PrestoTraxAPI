import express from 'express';
import usersDAO from '../data/usersDAO.js';

const router = express.Router();
const userDAO = new usersDAO();
/* GET users page. */

router.get('/', async (req, res, next) => {
    const result = await userDAO.getAll(); 
    //console.log(result);
    res.status(result.code).send(result);
});

router.get('/:id', async(req, res, next) => {
    const result = await userDAO.getOne(req.params.id);
    res.status(result.code).send(result);
});

router.post('/login', async(req, res, next) => {
    const result = await userDAO.authenticate(req.body);
    res.status(result.code).send(result);
});

router.post('/new', async (req, res, next) => {
    const result = await userDAO.create(req.body);
    res.status(result.code).send(result);
});

router.put('/update/:id', async (req, res) => {
    const result = await userDAO.update(req.body, req.params.id);
    res.status(result.code).send(result);
});

router.delete('/delete/:id', async (req, res) => {
    const result = await userDAO.delete(req.params.id);
    res.status(result.code).send(result);
});

export default router;
