
import {describe, jest} from '@jest/globals';
import request from 'supertest';
import server from './index.js';

jest.setTimeout(20000);

describe('User API tests', () => {
    it('Requests a record of all users in the DB', async () => {
        const res = await request(server).get('/users');
        //console.log(res);
        expect(res.status).toBe(200);
    });

    it('Requests a single user from the database with an ID of 8', async () => {
        const res = await request(server).get('/users/8');
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({
            code: 200,
            queryResult: [
                {
                    "Id": 8,
                    "Username": "macks",
                    "Email": "test@test.test",
                    "Password": "test"
                }
            ]
        });
    });

    it('Adds a user to the DB', async() => {
        const newUser = {
            "username": "macks",
            "email": "test@test.test",
            "password": "test"
        };
        const res = await request(server).post('/users/new').send(newUser);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Successfully added user to DB');
    });

    it('Should update the recently created user within the DB', async () => {
        const updatedUser = {
            "username": "newMacks",
            "email": "newtest@newtest.newtest",
            "password": "newtest"
        };
        const res1 = await request(server).get('/users');
        const lastId = res1.body.queryResult.at(-1).Id;
        const res = await request(server).put(`/users/update/${lastId}`).send(updatedUser);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Successfully updated user within DB');
    });

    it('Should delete the recently created user from the DB', async () => {
        const res1 = await request(server).get('/users');
        const lastId = res1.body.queryResult.at(-1).Id;
        const res = await request(server).del(`/users/delete/${lastId}`);
        expect(res.status).toBe(204);
        expect(res.body).toStrictEqual({});
    });
});

describe('Device Info API tests', () => {
    it('Gets info of all devices within the DB', async () => {
        const res = await request(server).get('/devices');
        expect(res.status).toBe(200);
    });

    it('Gets info of a single specified device', async () => {
        const res = await request(server).get('/devices/2');
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({
            code: 200,
            queryResult: [
                {
                    "Id": 2,
                    "OwnerId": 8,
                    "DeviceLatitude": "33.512766 / N 33° 30' 45.956",
                    "DeviceLongitude": "-112.126330 / W 112° 7' 34.786",
                    "PingedAt": "2022-02-24T06:11:51.037Z",
                    "Moving": 0
                }
            ]
        })
    });

    it(`Gets all info of one user's devices`, async () => {
        const res = await request(server).get('/devices');
        expect(res.status).toBe(200);
    });

    it('Adds a device to the DB', async () => {
        const newDevice = {
            "owner_id": 8,
            "location": {
                "latitude": "33.512766 / N 33° 30' 45.956",
                "longitude": "-112.126330 / W 112° 7' 34.786"
            },
            "moving": 0 
        }
        const res = await request(server).post('/devices/new').send(newDevice);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Successfully added device to DB');
    });
    
    it('Should update the recently created device within the DB', async () => {
        const updatedDevice = {
            "owner_id": "8",
            "location": {
                "latitude": "34.512766 / N 33° 30' 45.956",
                "longitude": "-113.126330 / W 112° 7' 34.786"
            },
            "moving": 0 
        };
        const res1 = await request(server).get('/devices');
        const lastId = res1.body.queryResult.at(-1).Id;
        const res = await request(server).put( `/devices/update/${lastId}`).send(updatedDevice);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Successfully updated device within DB');
    });

    it('Should delete the recently created device from the DB', async () => {
        const res1 = await request(server).get('/devices');
        const lastId = res1.body.queryResult.at(-1).Id;
        const res = await request(server).del(`/devices/delete/${lastId}`);
        expect(res.status).toBe(204);
        expect(res.body).toStrictEqual({});
    });
});

// describe('Device Records API tests', () => {

// });
server.close();