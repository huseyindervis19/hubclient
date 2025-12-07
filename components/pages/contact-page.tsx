"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useCreateContactRequest } from "../../lib/hooks/useContactRequest";
import { useContactInfo } from "../../lib/hooks/useContactInfo";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { easeOut } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: easeOut },
  },
};

const ContactPage = () => {
  const { language, direction, message } = useLanguage();
  const { data: contactInfo } = useContactInfo(language);
  const createContactRequest = useCreateContactRequest();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const inputFields = [
    {
      name: "name",
      placeholder: message("contact.form.name", "Your Name"),
      type: "text",
      isHalfWidth: true,
    },
    {
      name: "email",
      placeholder: message("contact.form.email", "Email Address"),
      type: "email",
      isHalfWidth: true,
    },
    {
      name: "phone",
      placeholder: message("contact.form.phone", "Phone Number"),
      type: "tel",
      isHalfWidth: false,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContactRequest.mutateAsync(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const getContactCards = (message: any, contactInfo: any) => [
    {
      icon: <MapPin className="w-8 h-8 text-accent" />,
      title: message("contact.address", "Address"),
      content: contactInfo?.translated?.address,
    },
    {
      icon: <Phone className="w-8 h-8 text-accent" />,
      title: message("contact.phone", "Phone"),
      content: contactInfo?.phone,
    },
    {
      icon: <Mail className="w-8 h-8 text-accent" />,
      title: message("contact.email", "Email"),
      content: contactInfo?.email,
    },
  ];

  return (
    <div className={direction === "rtl" ? "rtl" : ""}>
      {/* Hero Section */}
      <section className="relative py-28 bg-gradient-to-br from-accent/20 via-secondary/10 to-accent/10 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {message("contact.title", "Contact Us")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {message(
              "contact.hero.subtitle",
              "Get in touch with our team for inquiries, quotes, and consultations"
            )}
          </motion.p>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {!contactInfo ? (
            <p className="text-center text-muted-foreground mb-16">
              {message("loading", "Loading contact information...")}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {getContactCards(message, contactInfo).map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center shadow-[0_20px_40px_rgba(15,23,42,0.1)] hover:shadow-[0_30px_60px_rgba(15,23,42,0.15)] transition-all cursor-pointer"
                  variants={cardVariants}
                  whileHover={{ scale: 1.08, y: -5 }}
                >
                  <div className="inline-block p-4 bg-secondary rounded-lg mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/80">{item.content}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              className="h-full"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {message("contact.form.title", "Send us a Message")}
              </h2>

              {/* Success message (AnimatePresence) */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <p className="font-medium">
                        {message(
                          "contact.form.success",
                          "Message sent successfully! We'll get back to you soon."
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* half-width inputs */}
                  {inputFields
                    .filter((f) => f.isHalfWidth)
                    .map((f) => (
                      <motion.div key={f.name} variants={containerVariants}>
                        <Label
                          htmlFor={f.name}
                          className="text-sm font-medium text-foreground mb-2 block"
                        >
                          {message(`contact.form.${f.name}`, f.placeholder)}
                        </Label>
                        <Input
                          id={f.name}
                          name={f.name}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={formData[f.name as keyof typeof formData]}
                          onChange={handleChange}
                          required
                          className="w-full h-10 px-5 py-4 text-base border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                        />
                      </motion.div>
                    ))}
                </div>

                {/* full-width inputs (phone) */}
                {inputFields
                  .filter((f) => !f.isHalfWidth)
                  .map((f) => (
                    <motion.div key={f.name} variants={containerVariants}>
                      <Label
                        htmlFor={f.name}
                        className="text-sm font-medium text-foreground mb-2 block"
                      >
                        {message(`contact.form.${f.name}`, f.placeholder)}
                      </Label>
                      <Input
                        id={f.name}
                        name={f.name}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={formData[f.name as keyof typeof formData]}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-5 py-4 text-base border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                      />
                    </motion.div>
                  ))}

                {/* textarea */}
                <motion.div variants={containerVariants}>
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground mb-2 block"
                  >
                    {message("contact.form.messageLabel", "Your Message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={message(
                      "contact.form.message",
                      "Your Message"
                    )}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full min-h-40 px-5 py-4 text-base border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground"
                  />
                </motion.div>

                {/* submit */}
                <motion.div variants={containerVariants}>
                  <motion.button
                    type="submit"
                    disabled={createContactRequest.isPending}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {createContactRequest.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {message("contact.form.submitting", "Submitting...")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {message("contact.form.submit", "Send Message")}
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              className="slide-in-up h-full flex flex-col"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {message("contact.location.title", "Find Us")}
              </h2>
              <div className="flex-1 bg-secondary rounded-lg overflow-hidden hover-lift">
                {contactInfo ? (
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${contactInfo.latitude},${contactInfo.longitude}&z=15&output=embed`}
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    {message("loading", "Loading map...")}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
