
import {describe, jest} from '@jest/globals';
import request from 'supertest';
import server from './index.js';

jest.setTimeout(20000);
//==================================================================================================================
//                                           User Tests
//==================================================================================================================
describe('User API tests', () => {
    it('Requests a record of all users in the DB', async () => {
        const res = await request(server).get('/users');
        //console.log(res);
        expect(res.status).toBe(200);
    });

    it('Requests a single user from the database with an ID of 8', async () => {
        const res = await request(server).get('/users/8');
        expect(res.status).toBe(200);
    });

    it('Fails to add a user to the DB because of a short password', async() => {
        const newUser = {
            "username": "Max1mus7",
            "email": "test@test.test",
            "password": "badtest"
        };
        const res = await request(server).post('/users/new').send(newUser);
        expect(res.status).toBe(401);
        expect(res.body.errorType).toBe('PASSWORD_SHORT');
        expect(res.body.message).toBe('Password must be at least 8 characters long');
    });

    it('Fails to add a user to the DB because of a short username', async() => {
        const newUser = {
            "username": "Macks",
            "email": "test@test.test",
            "password": "G00dP@ssw0rd"
        };
        const res = await request(server).post('/users/new').send(newUser);
        expect(res.status).toBe(401);
        expect(res.body.errorType).toBe('USERNAME_SHORT');
        expect(res.body.message).toBe('Username must be at least 8 characters long');
    });

    it('Fails to add a user to the DB because of no username', async() => {
        const newUser = {
            "email": "test@test.test",
            "password": "G00dP@ssw0rd"
        };
        const res = await request(server).post('/users/new').send(newUser);
        expect(res.status).toBe(401);
        expect(res.body.errorType).toBe('USERNAME_NOT_FOUND');
        expect(res.body.message).toBe('No username input');
    });

    it('Fails to add a user to the DB because of no password', async() => {
        const newUser = {
            "username": "Max1mus7",
            "email": "test@test.test"
        };
        const res = await request(server).post('/users/new').send(newUser);
        expect(res.status).toBe(401);
        expect(res.body.errorType).toBe('PASSWORD_NOT_FOUND');
        expect(res.body.message).toBe('No password input');
    });

    it('Fails to add a user to the DB because the body contains no input', async() => {
        const res = await request(server).post('/users/new');
        expect(res.status).toBe(401);
        expect(res.body.errorType).toBe('NO_USER_INFO');
        expect(res.body.message).toBe('No user input');
    });

    it('Adds a user to the DB', async() => {
        const newUser = {
            "username": "Max1mus7",
            "email": "test@test.test",
            "password": "G00dP@ssw0rd"
        }
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
//==================================================================================================================
//                                           Device Tests
//==================================================================================================================
describe('Device Info API tests', () => {
    it('Gets info of all devices within the DB', async () => {
        const res = await request(server).get('/devices');
        expect(res.status).toBe(200);
        //expect(res.body).toContain(res.body.queryResult);
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
        const res = await request(server).get('/devices/user/8');
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
//==================================================================================================================
//                                           Record Tests
//==================================================================================================================
describe('Device Record API tests', () => {
    it('Gets info of all device records within the DB', async () => {
        const res = await request(server).get('/records');
        expect(res.status).toBe(200);
    });

    it('Gets info of a single specified record', async () => {
        const res = await request(server).get('/records/2');
        expect(res.status).toBe(200);
    });

    it(`Gets all info of one user's devices`, async () => {
        const res = await request(server).get('/records/user/8');
        expect(res.status).toBe(200);
    });
    it(`Gets all of one device's records`, async () => {
        const res = await request(server).get('/records/device/8');
        expect(res.status).toBe(200);
    });

    it('Adds a device record to the DB', async () => {
        const newDevice = {
            "owner_id": 8,
            "parent_device": 1,
            "reported_lost": 0,
            "location": {
                "latitude": "33.512766 / N 33° 30' 45.956",
                "longitude": "-112.126330 / W 112° 7' 34.786"
            }
        }
        const res = await request(server).post('/records/new').send(newDevice);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Successfully added device record to DB');
    });
    
    it('Should delete the recently created device record within the DB', async () => {
        const res1 = await request(server).get('/records');
        const lastId = res1.body.queryResult.at(-1).Id;
        const res = await request(server).del( `/records/delete/${lastId}`);
        expect(res.status).toBe(204);
        expect(res.body).toStrictEqual({});
    });

});
server.close();