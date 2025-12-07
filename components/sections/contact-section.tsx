"use client";

import { useLanguage } from "@/components/language-provider";
import { useContactInfo } from "../../lib/hooks/useContactInfo";
import { useState } from "react";
import { useCreateContactRequest } from "../../lib/hooks/useContactRequest";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { staggerContainer, fadeUpVariant } from "@/lib/types/animations";

// Contact Info Card Component
interface ContactInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const ContactInfoCard = ({
  icon,
  label,
  value,
  href,
}: ContactInfoCardProps) => {
  const content = (
    <motion.div
      variants={fadeUpVariant}
      className="
        flex items-center gap-4 
        p-5 rounded-xl
        bg-muted/50 border border-border/50
        hover:border-primary/30 hover:bg-muted
        transition-all duration-300
      "
    >
      <div
        className="
        p-3 rounded-xl 
        bg-primary/10 text-primary
      "
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-foreground font-semibold">{value}</p>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

// Form Field Component
interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function FormField({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: FormFieldProps) {
  return (
    <motion.div variants={fadeUpVariant} className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="
          h-12 px-4
          bg-background
          border-border/50 focus:border-primary
          transition-colors duration-200
        "
      />
    </motion.div>
  );
}

const ContactSection = () => {
  const { language, direction, message } = useLanguage();
  const { data: contactInfo } = useContactInfo(language);
  const createContactRequest = useCreateContactRequest();
  const isRTL = direction === "rtl";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContactRequest.mutateAsync(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 1500);
    } catch (error) {
      console.error("Error submitting contact request:", error);
    }
  };

  return (
    <section className={`py-24 md:py-32 bg-muted/30 ${isRTL ? "rtl" : ""}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          topLabel={message("contact.label", "Get In Touch")}
          title={message("contact.title", "Contact Us")}
          subtitle={message(
            "contact.subtitle",
            "Have a question? We would love to hear from you. Send us a message and we'll respond as soon as possible."
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-3"
          >
            <motion.div
              variants={fadeUpVariant}
              className="
                bg-card rounded-2xl 
                border border-border/50
                p-8 md:p-10
                shadow-sm
              "
            >
              {/* Success Message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    className="mb-6"
                  >
                    <div
                      className="
                      flex items-center gap-3 
                      p-4 rounded-xl
                      bg-green-500/10 border border-green-500/20
                      text-green-600 dark:text-green-400
                    "
                    >
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* name input */}
                  <FormField
                    name="name"
                    label={message("contact.form.nameLabel", "Your Name")}
                    placeholder={message("contact.form.name", "John Doe")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {/* email input */}
                  <FormField
                    name="email"
                    type="email"
                    label={message("contact.form.emailLabel", "Email Address")}
                    placeholder={message(
                      "contact.form.email",
                      "john@example.com"
                    )}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* phone input */}
                <FormField
                  name="phone"
                  type="tel"
                  label={message("contact.form.phoneLabel", "Phone Number")}
                  placeholder={message(
                    "contact.form.phone",
                    "+1 (555) 000-0000"
                  )}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                {/* message textarea */}
                <motion.div variants={fadeUpVariant} className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    {message("contact.form.messageLabel", "Your Message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={message(
                      "contact.form.message",
                      "Tell us how we can help you..."
                    )}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="
                      h-32
                      px-4 py-3
                      bg-background
                      border-border/50 focus:border-primary
                      transition-colors duration-200
                      resize-none
                    "
                  />
                </motion.div>

                {/* send button */}
                <motion.div variants={fadeUpVariant}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={createContactRequest.isPending}
                    className="
                      w-full md:w-auto px-10 py-6 text-base
                      hover:shadow-lg hover:shadow-primary/20
                      transition-all duration-300
                      disabled:opacity-70
                    "
                  >
                    {createContactRequest.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {message("contact.form.submitting", "Sending...")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {message("contact.form.submit", "Send Message")}
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 space-y-4"
          >
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {message("contact.direct", "Contact Information")}
              </h3>
            </motion.div>

            {contactInfo && (
              <>
                <ContactInfoCard
                  icon={<Phone className="w-5 h-5" />}
                  label={message("contact.phone", "Phone")}
                  value={contactInfo.phone}
                  href={`tel:${contactInfo.phone}`}
                />

                <ContactInfoCard
                  icon={<Mail className="w-5 h-5" />}
                  label={message("contact.email", "Email")}
                  value={contactInfo.email}
                  href={`mailto:${contactInfo.email}`}
                />

                <ContactInfoCard
                  icon={<MessageCircle className="w-5 h-5" />}
                  label={message("contact.whatsapp", "WhatsApp")}
                  value={contactInfo.whatsapp}
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
