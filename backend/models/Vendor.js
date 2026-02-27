const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: { type: String, required: true },
    contactPerson: { type: String },
    email: { type: String },
    complianceStatus: {
        iso27001: { type: Boolean, default: false },
        pciDSS: { type: Boolean, default: false },
        gdpr: { type: Boolean, default: false },
        soc2: { type: Boolean, default: false },
    },
    riskScore: { type: Number, default: 0 },
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Low' },
    documents: [{
        name: { type: String },
        url: { type: String },
        uploadDate: { type: Date, default: Date.now },
    }],
    lastAssessmentDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Vendor', VendorSchema);
