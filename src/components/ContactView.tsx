import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Building,
  Globe,
  Share2
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { addLead, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    subject: '',
    question: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.question) {
      addToast('error', 'Missing Required Fields', 'Please complete Name, Email, Subject, and Question fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Connect to AppContext CRM Lead pipeline
      addLead({
        customerName: formData.name,
        businessName: formData.company || 'Retail Customer Enquiry',
        email: formData.email,
        phone: formData.phone || '08104052186',
        state: 'Osun',
        leadSource: 'Bulk Inquiry',
        status: 'new',
        estimatedValue: 0,
        assignedStaff: 'Wholesale Sales Desk',
        notes: `Subject: ${formData.subject}\n\nEnquiry Details:\n${formData.question}`
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast(
        'success',
        'Enquiry Received!',
        'Thank you for reaching out to Iyanu Plastic Stores. Our sales team will get back to you promptly.'
      );
    }, 600);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '60px 24px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              color: '#60a5fa',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            WATERLORD — Iyanu Plastic Stores Nig. Ents.
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', marginBottom: '12px' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', margin: 0 }}>
            Contact us about anything related to our company or services. We'll do our best to get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <div style={{ maxWidth: '1200px', margin: '-30px auto 0', padding: '0 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {/* Contact Details Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Official Business Details
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '28px' }}>
              Iyanu Plastic Stores Nig. Ents. — Retail & Wholesale Plastic Solutions
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '12px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Physical Address
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', marginTop: '4px', lineHeight: 1.5 }}>
                    Tarred Road Between Gbodofon(Aregbe) Bridge and Aiyegbaju Market, Osogbo, Osun State
                  </div>
                </div>
              </div>

              {/* Telephone */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    background: '#ecfdf5',
                    color: '#10b981',
                    padding: '12px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Telephone Number
                  </div>
                  <a
                    href="tel:08104052186"
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#2563eb',
                      textDecoration: 'none',
                      display: 'inline-block',
                      marginTop: '4px'
                    }}
                  >
                    08104052186
                  </a>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Tap to call directly from your device
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    background: '#fef3c7',
                    color: '#d97706',
                    padding: '12px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Email Address
                  </div>
                  <a
                    href="mailto:admin@iyanuplasticstores.com"
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2563eb',
                      textDecoration: 'none',
                      display: 'inline-block',
                      marginTop: '4px'
                    }}
                  >
                    admin@iyanuplasticstores.com
                  </a>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    Opens your email client directly
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    background: '#f3e8ff',
                    color: '#9333ea',
                    padding: '12px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Business Operating Hours
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>
                    Monday – Saturday: 8:00 AM – 6:00 PM
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    Sunday: Closed (Online orders processed next business day)
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Share2 size={16} /> Official Social Channels
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Facebook', 'X (Twitter)', 'LinkedIn', 'Instagram'].map(social => (
                  <span
                    key={social}
                    style={{
                      background: '#f1f5f9',
                      color: '#334155',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Enquiry Form Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Send an Enquiry
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Fill out the form below and your message will be routed directly to our customer support desk.
            </p>

            {isSubmitted ? (
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '32px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    background: '#22c55e',
                    color: '#ffffff',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <CheckCircle size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#14532d', marginBottom: '8px' }}>
                  Enquiry Submitted Successfully!
                </h4>
                <p style={{ fontSize: '14px', color: '#166534', marginBottom: '20px' }}>
                  Thank you, <strong>{formData.name}</strong>. Your message regarding <em>"{formData.subject}"</em> has been logged in our CRM pipeline. A representative will respond via email/phone shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', company: '', subject: '', question: '' });
                  }}
                  style={{
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adebayo Johnson"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Email Address <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 1' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Company / Business
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Crown Catering Services"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Subject <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bulk Calibrated Buckets Wholesale Pricing Enquiry"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Question / Enquiry Details <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Please describe your product requirement or question..."
                    value={formData.question}
                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '8px' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      background: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '15px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Send size={18} /> {isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
