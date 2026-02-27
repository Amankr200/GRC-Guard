import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { ShieldCheck, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [stats, setStats] = useState({ total: 0, levels: { Low: 0, Medium: 0, High: 0, Critical: 0 }, avgRisk: 0 });
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, vendorsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stats`),
                axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/vendors`)
            ]);
            setStats(statsRes.data);
            setVendors(vendorsRes.data.slice(0, 5));
        } catch (err) {
            console.error("Error fetching dashboard data", err);
        }
    };

    const chartData = [
        { name: 'Low', value: stats.levels.Low, color: '#10b981' },
        { name: 'Medium', value: stats.levels.Medium, color: '#f59e0b' },
        { name: 'High', value: stats.levels.High, color: '#ef4444' },
        { name: 'Critical', value: stats.levels.Critical, color: '#7c3aed' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <header>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Security Dashboard</h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time third-party risk assessment and compliance monitoring.</p>
            </header>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {[
                    { label: 'Total Vendors', value: stats.total, icon: <Users />, color: 'var(--primary)' },
                    { label: 'Avg Risk Score', value: stats.avgRisk.toFixed(1), icon: <TrendingUp />, color: '#10b981' },
                    { label: 'High/Critical Risk', value: stats.levels.High + stats.levels.Critical, icon: <AlertTriangle />, color: '#ef4444' },
                    { label: 'Compliance Rate', value: '84%', icon: <ShieldCheck />, color: '#7c3aed' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</p>
                                <h3 style={{ fontSize: '1.8rem', marginTop: '4px' }}>{stat.value}</h3>
                            </div>
                            <div style={{ color: stat.color, background: `${stat.color}15`, padding: '12px', borderRadius: '12px' }}>
                                {stat.icon}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="glass-card">
                    <h3 style={{ marginBottom: '24px' }}>Risk Distribution</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card">
                    <h3 style={{ marginBottom: '24px' }}>Risk Heatmap</h3>
                    <div className="heatmap-container">
                        {['Critical', 'High', 'Medium', 'Low'].map((level) => (
                            <div
                                key={level}
                                className={`heatmap-cell risk-${level.toLowerCase()}`}
                                style={{ height: '80px', fontSize: '0.8rem' }}
                            >
                                <span>{level}</span>
                                <span style={{ fontSize: '1.2rem' }}>{stats.levels[level]}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <p>● Score 80+ : Critical</p>
                        <p>● Score 50-80 : High</p>
                        <p>● Score 30-50 : Medium</p>
                        <p>● Score &lt; 30 : Low</p>
                    </div>
                </div>
            </div>

            {/* Recent Vendors */}
            <div className="glass-card">
                <h3 style={{ marginBottom: '20px' }}>Recent Assessments</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '12px' }}>Vendor</th>
                            <th style={{ padding: '12px' }}>Industry</th>
                            <th style={{ padding: '12px' }}>Risk Level</th>
                            <th style={{ padding: '12px' }}>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor) => (
                            <tr key={vendor._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '16px' }}>{vendor.name}</td>
                                <td style={{ padding: '16px' }}>{vendor.industry}</td>
                                <td style={{ padding: '16px' }}>
                                    <span className={`risk-badge risk-${vendor.riskLevel.toLowerCase()}`}>
                                        {vendor.riskLevel}
                                    </span>
                                </td>
                                <td style={{ padding: '16px' }}>{vendor.riskScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
