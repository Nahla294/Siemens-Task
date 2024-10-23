// test.js
const request = require('supertest');
const express = require('express');
const mockUserAuth = require('mock-user-auth');

const app = express();
app.use(express.json());
app.use(mockUserAuth);

describe('[POST] /api/v1/users specs', () => {

    // Test: Create a user with valid data
    it('Validate that user is registered successfully', async () => {
        const res = await request(app)
            .post('/api/v1/users')
            .send({
                name: 'user',
                email: 'user@gmail.com',
                password: 'user123'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User registered with success');
        expect(res.body).toHaveProperty('token');
    });

    // Test: Create a user with invalid body
    it('Validate that user is not created if there is no email and password', async () => {
        const res = await request(app)
            .post('/api/v1/users')
            .send({
                name: 'test',
                email: '',
                password: ''
            });

        expect(res.status).toBe(400);
    });

    // Test: Create a user with invalid body
    it('Validate that user is not created if there is no email, password and name', async () => {
        const res = await request(app)
            .post('/api/v1/users')
            .send({
                name: '',
                email: '',
                password: ''
            });

        expect(res.status).toBe(400);
    });
});

describe('[POST] /api/v1/auth specs', () => {

    // Test: Authenticate a user with valid data
    it('Validate that user is authenticated and return a token', async () => {
        const res = await request(app)
            .post('/api/v1/auth')
            .send({
                email: 'user@gmail.com',
                password: 'user123'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    // Test: Authenticate a user with invalid data
    it('Validate that if user send wrong email endpoint will return 401', async () => {
        const res = await request(app)
            .post('/api/v1/auth')
            .send({
                email: 'invalid@gmail.com',
                password: 'user123'
            });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'Incorrect email or password');

    });

    // Test: Authenticate with empty body
    it('Validate that if user send empty body endpoiny should return 400', async () => {
        const res = await request(app)
            .post('/api/v1/auth')

        expect(res.status).toBe(400);

    });

});

describe('[GET]	/api/v1/users specs', () => {
    let token;
    before(async () => {
        const res = await request(app)
            .post('/api/v1/auth')
            .send({
                email: 'user@gmail.com',
                password: 'user123'
            });
        token = res.body.token;
    })

    // Test: Get user by invalid token
    it('Validate that endpoint should return 403 for invalid token', async () => {
        const res = await request(app)
            .get('/api/v1/users')
            .set('Authorization', 'Bearer invalid_token');

        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', 'Unauthorized');
    });

    // Test: Get user by token
    it('Validate that endpoint should get user info by token', async () => {
        const res = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('email', 'test2@gmail.com');
        expect(res.body).toHaveProperty('name', 'test2');
    });
});

describe('[PATCH]  /api/v1/users specs', () => {
    let token1;
    before(async () => {
        const res = await request(app)
            .post('/api/v1/auth')
            .send({
                email: 'user@gmail.com',
                password: 'user123'
            });
        token1 = res.body.token;
    })

    // Test: Patch user by token
    it('Validate that endpoint should update user info', async () => {
        const res = await request(app)
            .patch('/api/v1/users')
            .set('Authorization', `Bearer ${token1}`)
            .send({
                name: 'updatedUser',
                email: 'updateduser@gmail.com',
                password: 'newpassword123'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User updated with success!');
    });

    // Test: Patch user by token
    it('Validate that endpoint should return 400 if body is empty', async () => {
        const res = await request(app)
            .patch('/api/v1/users')
            .set('Authorization', `Bearer ${token1}`)

        expect(res.status).toBe(400);
    });
});

describe('[DELETE]  /api/v1/users specs', () => {
    let token2;
    before(async () => {
        const res = await request(app)
            .post('/api/v1/auth')
            .send({
                email: 'user@gmail.com',
                password: 'user123'
            });
        token2 = res.body.token;
    })

    // Test: Delete user by token
    it('Validate that endpoint should delete the user', async () => {
        const res = await request(app)
            .delete('/api/v1/users')
            .set('Authorization', `Bearer ${token2}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'User deleted with success');
    });
});

describe('[DELETE]  /api/v1/users specs', () => {
    // Test: Delete all users
    it('Validate that endpoint should delete all users with admin key', async () => {
        const res = await request(app)
            .delete('/api/v1/all-users')
            .send({
                key_admin: 'keyadmin123'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Users deleted with success');
    });

    // Test: Delete all users
    it('Validate that endpoint should return 403 in admin key is invalid', async () => {
        const res = await request(app)
            .delete('/api/v1/all-users')
            .send({
                key_admin: 'invalid'
            });

        expect(res.status).toBe(403);
        expect(res.body).toHaveProperty('message', 'Unauthorized access');
    });
});
