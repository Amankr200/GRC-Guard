import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, BarChart3, Users, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            {/* Navigation */}
            <nav style={{ padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '10px' }}>
                        <ShieldCheck color="white" size={24} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>GRC Guard</h2>
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <Link to="/auth" className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--border)' }}>Log In</Link>
                    <Link to="/auth" className="btn-primary">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ padding: '100px 40px', maxWidth: '1400px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
                {/* Decorative Background Elements */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', zIndex: -1 }}></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                        NEW: PCI DSS 4.0 Assessment Framework
                    </span>
                    <h1 style={{ fontSize: '5rem', marginTop: '24px', letterSpacing: '-2px', lineHeight: 1.1, maxWidth: '900px', margin: '24px auto 0' }}>
                        Automate Your <span style={{ color: 'var(--primary)' }}>Vendor Risk</span> Management
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '32px auto', lineHeight: 1.6 }}>
                        The all-in-one platform for third-party compliance assessment, risk scoring, and real-time governance. Built for the modern security enterprise.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link to="/auth" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                            Start Assessment Free <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '100px', textAlign: 'left' }}>
                    {[
                        { icon: <ShieldAlert color="#ef4444" />, title: "Automated Scoring", desc: "Instantly calculate vendor risks based on ISO 27001, GDPR, and more." },
                        { icon: <BarChart3 color="#10b981" />, title: "Compliance Heatmaps", desc: "Visualize your entire supply chain risk profile in a single interactive dashboard." },
                        { icon: <Users color="#6366f1" />, title: "Vendor Onboarding", desc: "Streamline the collection and verification of compliance documentation." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            className="glass-card"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * i }}
                        >
                            <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.05)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Social Proof / Trusted Section */}
            <section style={{ padding: '80px 40px', background: 'rgba(0,0,0,0.2)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '40px' }}>
                    Industry Standard Compliance Support
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', opacity: 0.6 }}>
                    {['ISO 27001', 'PCI DSS', 'SOC2', 'GDPR', 'HIPAA'].map(standard => (
                        <span key={standard} style={{ fontSize: '1.5rem', fontWeight: 800 }}>{standard}</span>
                    ))}
                </div>
            </section>

            {/* CTA Footer */}
            <section style={{ padding: '120px 40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Ready to secure your supply chain?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Get started with GRC Guard today and take control of your third-party risks.</p>
                <Link to="/auth" className="btn-primary" style={{ padding: '16px 40px' }}>
                    Get Early Access <ChevronRight size={20} />
                </Link>
            </section>
        </div>
    );
};

export default LandingPage;
