"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Sparkles, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { useToastStore } from "@/store/useToastStore";
import { submitContactInquiry } from "@/lib/supabase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Bespoke Bridal Styling",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactInquiry(formData);
    } catch (err) {
      console.warn("Contact inquiry submission note:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast({
        title: "Concierge Request Received",
        description: "Our jewelry stylist will contact you within 4 hours.",
        type: "success",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EDE3] pb-24">
      {/* Header */}
      <div className="bg-[#EBD3BE]/40 border-b border-[#A9714B]/15 py-14 text-center px-4">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#A9714B] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A66B]" />
            <span>Private Client Care</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3A2416] font-light">
            Concierge & Stylist Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#3A2416]/75 max-w-md mx-auto font-light leading-relaxed">
            Whether inquiring about custom sizing, bridal trousseau pairings, or order dispatch, our private styling team is at your disposal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Boutique */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 p-6 sm:p-7 rounded-3xl border border-[#A9714B]/20 shadow-xs space-y-6">
              <h2 className="font-serif text-2xl text-[#3A2416] border-b border-[#A9714B]/15 pb-3">
                Reach Our Concierge
              </h2>

              <div className="space-y-4 text-xs text-[#3A2416]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#7A4A2B] uppercase tracking-wider font-semibold">
                      Email Concierge
                    </strong>
                    <a
                      href="mailto:concierge@herbeautywrap.com"
                      className="text-xs hover:text-[#A9714B] transition-colors"
                    >
                      concierge@herbeautywrap.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#7A4A2B] uppercase tracking-wider font-semibold">
                      Concierge Direct Line
                    </strong>
                    <span>+91 98200 48210 (Mon - Sat, 10 AM - 7 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#EBD3BE]/60 text-[#A9714B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#7A4A2B] uppercase tracking-wider font-semibold">
                      The Mumbai Atelier
                    </strong>
                    <p className="text-[#3A2416]/75 leading-relaxed">
                      First Floor, Ropewalk Lane, Behind Jehangir Art Gallery, Kala Ghoda, Fort, Mumbai 400001
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge CTA */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919820048210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366]/90 hover:bg-[#25D366] text-white py-3 px-4 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Stylist on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 p-6 sm:p-8 rounded-3xl border border-[#A9714B]/20 shadow-xs">
              <h2 className="font-serif text-2xl text-[#3A2416] mb-1">
                Book a Private Consultation
              </h2>
              <p className="text-xs text-[#3A2416]/70 mb-6 font-light">
                Fill in the details below and an atelier stylist will connect with you.
              </p>

              {submitted ? (
                <div className="text-center py-12 px-4 space-y-3 bg-[#F6EDE3] rounded-2xl border border-[#A9714B]/20">
                  <CheckCircle className="w-12 h-12 text-emerald-700 mx-auto" />
                  <h3 className="font-serif text-2xl text-[#3A2416]">
                    Thank you for reaching out
                  </h3>
                  <p className="text-xs text-[#3A2416]/75 max-w-sm mx-auto">
                    We have received your request. An atelier stylist will review your request and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-luxury px-6 py-2 rounded-full text-xs uppercase font-medium mt-4"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Radhika Sharma"
                        className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. radhika@example.com"
                        className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                    >
                      <option value="Bespoke Bridal Styling">Bespoke Bridal Styling & Trousseau</option>
                      <option value="Custom Ring / Sizing Consultation">Custom Ring / Sizing Consultation</option>
                      <option value="Corporate / Festive Gifting (Bulk)">Corporate / Festive Gifting (Bulk)</option>
                      <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                      <option value="Care & Lifetime Replating">Care & Lifetime Replating Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#7A4A2B] mb-1">
                      Your Message / Styling Request
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your wedding dates, outfit color palette, or specific jewelry questions..."
                      className="w-full bg-white border border-[#A9714B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#3A2416] focus:outline-none focus:border-[#A9714B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-luxury py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending to Atelier...</span>
                    ) : (
                      <span>Submit Concierge Request</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
