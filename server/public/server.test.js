const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server/server'); // Adjust the path to your server file
const { expect } = require('chai');
const { Provider, User, ServiceDetails, BookingHistory, Expenditure, BookingSlot, ServiceHistory } = require('../server/models/model'); // Adjust the path to your models

describe('API Tests', () => {
    before(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        // Clean up the database and close the connection
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    describe('Providers', () => {
        it('should create a new provider', async () => {
            const res = await request(app)
                .post('/providers')
                .send({ name: 'Test Provider', service: 'Test Service' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('_id');
        });

        it('should get all providers', async () => {
            const res = await request(app).get('/providers');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });

        it('should update a provider', async () => {
            const provider = await Provider.create({ name: 'Provider to Update', service: 'Service' });
            const res = await request(app)
                .put(`/providers/${provider._id}`)
                .send({ name: 'Updated Provider' });
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal('Updated Provider');
        });
    });

    describe('Users', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/users')
                .send({ username: 'testuser', email: 'test@example.com' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('_id');
        });
    });

    describe('Service Details', () => {
        it('should create a new service detail', async () => {
            const res = await request(app)
                .post('/serviceDetails')
                .send({ serviceName: 'Test Service', price: 100 });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('_id');
        });
    });

    describe('Booking History', () => {
        it('should create a new booking history', async () => {
            const res = await request(app)
                .post('/bookingHistory')
                .send({ userId: 'someUser Id', serviceId: 'someServiceId', date: new Date() });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('_id');
        });
    });

    describe('Expenditures', () => {
        it('should create a new expenditure', async () => {
            const res = await request(app)
                .post('/expenditure')
                .send({ amount: 50, description: 'Test Expenditure' });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('_id');
        });
    });

    describe('Booking Slots', () => {
        it('should create a new booking slot', async () => {
            const res = await request(app)
                .post('/bookingSlot')
                .send({ date: new Date(), time: '10:00 AM', available: true });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('_id');
        });
    });
});