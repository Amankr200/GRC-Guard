const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Vendor = require('./models/Vendor');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// In-memory fallback
let vendorsMemory = [];
let usersMemory = [];

// Middleware: Verify JWT
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (mongoose.connection.readyState === 1) {
            const userExists = await User.findOne({ email });
            if (userExists) return res.status(400).json({ message: 'User already exists' });
            const user = new User({ name, email, password });
            await user.save();
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
            return res.status(201).json({ token, user: { id: user._id, name, email } });
        }

        // Memory fallback for register
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = { _id: Date.now().toString(), name, email, password: hashedPassword };
        usersMemory.push(user);
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user._id, name, email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (mongoose.connection.readyState === 1) {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });
            const isMatch = await user.comparePassword(password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
            return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
        }

        // Memory fallback for login
        const user = usersMemory.find(u => u.email === email);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Risk Logic
const calculateRisk = (compliance) => {
    let score = 100;
    if (compliance.iso27001) score -= 20;
    if (compliance.pciDSS) score -= 20;
    if (compliance.gdpr) score -= 20;
    if (compliance.soc2) score -= 20;

    let level = 'Low';
    if (score > 80) level = 'Critical';
    else if (score > 50) level = 'High';
    else if (score > 30) level = 'Medium';
    else level = 'Low';

    return { score, level };
};

// Vendor Routes (Protected)
app.get('/api/vendors', authenticate, async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const vendors = await Vendor.find().sort({ createdAt: -1 });
            return res.json(vendors);
        }
        res.json([...vendorsMemory].reverse());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/vendors', authenticate, async (req, res) => {
    try {
        const { name, industry, contactPerson, email, complianceStatus } = req.body;
        const { score, level } = calculateRisk(complianceStatus);

        if (mongoose.connection.readyState === 1) {
            const newVendor = new Vendor({
                name, industry, contactPerson, email, complianceStatus, riskScore: score, riskLevel: level
            });
            const savedVendor = await newVendor.save();
            return res.status(201).json(savedVendor);
        }

        const mockVendor = {
            _id: Date.now().toString(),
            name, industry, contactPerson, email, complianceStatus, riskScore: score, riskLevel: level, createdAt: new Date(),
        };
        vendorsMemory.push(mockVendor);
        res.status(201).json(mockVendor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/vendors/:id', authenticate, async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            await Vendor.findByIdAndDelete(req.params.id);
            return res.json({ message: 'Vendor deleted' });
        }
        vendorsMemory = vendorsMemory.filter(v => v._id !== req.params.id);
        res.json({ message: 'Vendor deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/stats', authenticate, async (req, res) => {
    try {
        const vendors = mongoose.connection.readyState === 1 ? await Vendor.find() : vendorsMemory;
        const stats = {
            total: vendors.length,
            levels: {
                Low: vendors.filter(v => v.riskLevel === 'Low').length,
                Medium: vendors.filter(v => v.riskLevel === 'Medium').length,
                High: vendors.filter(v => v.riskLevel === 'High').length,
                Critical: vendors.filter(v => v.riskLevel === 'Critical').length,
            },
            avgRisk: vendors.reduce((acc, v) => acc + v.riskScore, 0) / (vendors.length || 1)
        };
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB error, using fallback:', err.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
