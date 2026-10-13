import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  CheckCircle2,
  Award,
  Users,
  ShieldCheck,
  ShoppingBag,
  HeartHandshake,
  ArrowRight,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '72px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              color: '#60a5fa',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            <Building2 size={16} /> Established 2008 • Officially Registered 2012
          </div>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            About Iyanu Plastic Stores
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '750px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            A leading retail & wholesale establishment dedicated to enhancing homes and lifestyles with durable, affordable, and innovative plastic & household solutions across Nigeria.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveView('catalog')}
              style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Explore Shop Catalog <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setActiveView('contact-us')}
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid #475569',
                padding: '14px 28px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer'
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1200px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 20 }}>
        {/* Company Identity & Story Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
            padding: '48px',
            marginBottom: '40px',
            border: '1px solid #e2e8f0'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#2563eb', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                A LEADING RETAIL ESTABLISHMENT
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', margin: '8px 0 20px', lineHeight: 1.3 }}>
                Providing Quality Household Solutions Since 2008
              </h2>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                <strong>Iyanu Plastic Stores Nig. Ents.</strong> is a premier retail and wholesale establishment dedicated to enhancing homes, businesses, and industrial facilities with a wide range of premium plastic products and household utilities.
              </p>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                Established in 2008 and officially registered in 2012, our mission is to provide durable, affordable, and innovative solutions that cater to the diverse everyday needs of our customers.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #2563eb' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>2008</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Year Established</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>2012</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Official Registration</div>
                </div>
              </div>
            </div>

            <div style={{ background: '#f1f5f9', padding: '36px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag color="#2563eb" size={24} /> Anything Household Supplies...
              </h3>
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7, marginBottom: '20px' }}>
                From kitchen essentials and calibrated buckets to stylish durable furniture, eco-friendly products, waste management units, and everyday conveniences, we are committed to delivering quality, functionality, and aesthetic value in every purchase.
              </p>
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.7 }}>
                Our dedication to excellence is reinforced by our unwavering focus on customer satisfaction, sustainability, and positive community impact.
              </p>
            </div>
          </div>
        </div>

        {/* Core Business Values */}
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '24px', textAlign: 'center' }}>
          Our Core Commitments
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ background: '#eff6ff', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '20px' }}>
              <ShieldCheck size={24} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Durable Quality</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
              Every product in our catalog is manufactured from high-grade virgin & food-grade polymer materials designed to withstand daily intensive use.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ background: '#ecfdf5', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '20px' }}>
              <Award size={24} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Affordable Pricing</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
              Direct factory partnerships enable us to offer competitive wholesale and retail prices without compromising on structural integrity.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ background: '#fef3c7', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', marginBottom: '20px' }}>
              <Users size={24} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Customer First</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
              We prioritize prompt order fulfillment, transparent pricing, and attentive customer service for retail buyers and bulk commercial clients alike.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ background: '#f3e8ff', width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', marginBottom: '20px' }}>
              <HeartHandshake size={24} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Community Impact</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
              Committed to eco-friendly practices, sustainable recycling solutions, and supporting local business growth across Osun State and Nigeria.
            </p>
          </div>
        </div>

        {/* Contact Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '16px',
            padding: '40px',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
              Iyanu Plastic Stores Nig. Ents.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="#60a5fa" /> Tarred Road Between Gbodofon(Aregbe) Bridge and Aiyegbaju Market, Osogbo, Osun State
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a
              href="tel:08104052186"
              style={{
                background: '#2563eb',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PhoneCall size={16} /> 08104052186
            </a>
            <a
              href="mailto:admin@iyanuplasticstores.com"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Mail size={16} /> Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
