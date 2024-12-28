const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Import your Express app

const Provider = require('../models/Provider'); // Import the model to interact with it directly

// Set up a test database
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clean up test database
    await mongoose.connection.close();
});

describe('API Tests', () => {
    // Test the Providers POST endpoint
    test('Should create a new provider', async () => {
        const newProvider = {
            name: "Test Provider",
            address: "Test Address",
            contact_info: "test@example.com",
            service_details_id: "test_service_123",
        };

        const response = await request(app)
            .post('/providers')
            .send(newProvider)
            .expect(201);

        expect(response.body.name).toBe(newProvider.name);
        expect(response.body.address).toBe(newProvider.address);
    });

    // Test the Providers PUT endpoint
    test('Should update a provider', async () => {
        const provider = await Provider.create({
            name: "Old Provider",
            address: "Old Address",
            contact_info: "old@example.com",
            service_details_id: "old_service_123",
        });

        const updatedData = {
            name: "Updated Provider",
            address: "Updated Address",
        };

        const response = await request(app)
            .put(`/providers/${provider._id}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.address).toBe(updatedData.address);
    });

    // Test the Providers GET endpoint
    test('Should fetch all providers', async () => {
        await Provider.create([
            { name: "Provider 1", address: "Address 1", contact_info: "p1@example.com", service_details_id: "s1" },
            { name: "Provider 2", address: "Address 2", contact_info: "p2@example.com", service_details_id: "s2" },
        ]);

        const response = await request(app)
            .get('/providers')
            .expect(200);

        expect(response.body.length).toBeGreaterThanOrEqual(2);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('address');
    });
});
