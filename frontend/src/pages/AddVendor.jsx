import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save, X, Shield, FileText, Globe, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const AddVendor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        contactPerson: '',
        email: '',
        complianceStatus: {
            iso27001: false,
            pciDSS: false,
            gdpr: false,
            soc2: false,
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors`, formData);
            navigate('/vendors');
        } catch (err) {
            console.error("Error adding vendor", err);
            alert("Failed to add vendor. Ensure backend is running.");
        }
    };

    const handleComplianceChange = (key) => {
        setFormData({
            ...formData,
            complianceStatus: {
                ...formData.complianceStatus,
                [key]: !formData.complianceStatus[key]
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
        >
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Add New Vendor</h1>
                <p style={{ color: 'var(--text-muted)' }}>Initialize a new third-party risk assessment.</p>
            </header>

            <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <FileText size={16} /> Vendor Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. CloudServices Inc"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Globe size={16} /> Industry
                        </label>
                        <select
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            required
                        >
                            <option value="">Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Retail">Retail</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            Contact Person
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Mail size={16} /> Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="john@vendor.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={18} color="var(--primary)" /> Compliance Certifications
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                        {[
                            { id: 'iso27001', label: 'ISO 27001' },
                            { id: 'pciDSS', label: 'PCI DSS' },
                            { id: 'gdpr', label: 'GDPR' },
                            { id: 'soc2', label: 'SOC2 Type II' },
                        ].map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleComplianceChange(item.id)}
                                style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    background: formData.complianceStatus[item.id] ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                    borderColor: formData.complianceStatus[item.id] ? 'var(--primary)' : 'var(--border)',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <p style={{ fontWeight: 600, color: formData.complianceStatus[item.id] ? 'white' : 'var(--text-muted)' }}>
                                    {item.label}
                                </p>
                                <p style={{ fontSize: '0.7rem', marginTop: '4px' }}>
                                    {formData.complianceStatus[item.id] ? 'Verified' : 'Pending'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                    <button type="submit" className="btn-primary">
                        <Save size={18} /> Save & Assess Risk
                    </button>
                    <button type="button" className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }} onClick={() => navigate('/')}>
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddVendor;
