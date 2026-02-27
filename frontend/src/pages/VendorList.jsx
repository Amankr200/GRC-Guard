import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Trash2, ExternalLink, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VendorList = () => {
    const [vendors, setVendors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors`);
            setVendors(res.data);
        } catch (err) {
            console.error("Error fetching vendors", err);
        }
    };

    const deleteVendor = async (id) => {
        if (window.confirm("Are you sure you want to remove this vendor?")) {
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors/${id}`);
            fetchVendors();
        }
    };

    const filteredVendors = vendors.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem' }}>Vendors</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and monitor all third-party vendors.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Search vendors..."
                            style={{ paddingLeft: '40px', width: '300px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white' }}>
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                <AnimatePresence>
                    {filteredVendors.map((vendor) => (
                        <motion.div
                            key={vendor._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card"
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '4px',
                                height: '100%',
                                background: `var(--risk-${vendor.riskLevel.toLowerCase()})`
                            }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem' }}>{vendor.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{vendor.industry}</p>
                                </div>
                                <span className={`risk-badge risk-${vendor.riskLevel.toLowerCase()}`}>
                                    {vendor.riskLevel}
                                </span>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Risk Score</span>
                                    <span style={{ fontWeight: 700 }}>{vendor.riskScore}/100</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${vendor.riskScore}%`,
                                        height: '100%',
                                        background: `var(--risk-${vendor.riskLevel.toLowerCase()})`
                                    }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '20px' }}>
                                {Object.entries(vendor.complianceStatus).map(([key, val]) => (
                                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                                        <div style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: val ? '#10b981' : '#ef4444'
                                        }} />
                                        <span style={{ color: val ? 'white' : 'var(--text-muted)' }}>{key.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <button
                                    onClick={() => deleteVendor(vendor._id)}
                                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                                    <Download size={18} />
                                </button>
                                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}>
                                    <ExternalLink size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredVendors.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                    <p>No vendors found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default VendorList;
