
import {jest} from '@jest/globals';
import request from 'supertest';
import server from './index.js';

jest.setTimeout(20000);

describe('/users endpoint', () => {
    it('should return code 200', async () => {
        const res = await request(server).get('/users');
        //console.log(res);
        expect(res.status).toBe(200);
    });
});