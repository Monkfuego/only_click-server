const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a sample schema and model for Providers
const providerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact_info: String,
    service_details_id: String,
});
const Provider = mongoose.model('Provider', providerSchema);

// Routes
app.get('/providers', async (req, res) => {
    try {
        const providers = await Provider.find();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/providers', async (req, res) => {
    try {
        const provider = new Provider(req.body);
        const savedProvider = await provider.save();
        res.status(201).json(savedProvider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/providers/:id', async (req, res) => {
    try {
        const updatedProvider = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProvider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the app for testing
module.exports = app;

// Start the server if not in testing mode
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
