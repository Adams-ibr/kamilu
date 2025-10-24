// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { useAdmin } from '../contexts/AdminContext';

const ContactPage: React.FC = () => {
  const { addSubmission } = useAdmin();
  const [submitted, setSubmitted] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    addSubmission({ type: 'Contact', name, email, subject, message });
    
    setSubmitted(true);
    formRef.current?.reset();
    setTimeout(() => {
        setSubmitted(false);
    }, 3000);
  };

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-blue text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Get in Touch</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">We're here to discuss your machinery needs and provide a custom quote.</p>
          </div>
        </section>
      </AnimatedSection>
      
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <SectionTitle>Send Us a Message</SectionTitle>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required/>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="Inquiry about Agro-Allied Machinery" required/>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message..." rows={5} required/>
              </div>
              <div className="relative">
                <Button type="submit" className="w-full">Send Message</Button>
                {submitted && <p className="mt-4 text-center text-green-600 dark:text-green-400">Message sent successfully!</p>}
              </div>
            </form>
          </div>
          <div className="space-y-8">
            <SectionTitle>Contact Information</SectionTitle>
            <div className="space-y-4 text-lg">
              <p><strong>Address:</strong> Technology Incubation Centre (TIC Complex), Farm Center, Kano State, Nigeria</p>
              <p><strong>Phone:</strong> <a href="tel:+2348037555035" className="text-brand-blue hover:underline dark:text-brand-gold">
+234 803 755 5035
</a></p>
 <p><strong></strong> <a href="tel:+2348097200923" className="text-brand-blue hover:underline dark:text-brand-gold">
+234 809 720 0923
</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@kamiluwelding.com" className="text-brand-blue hover:underline dark:text-brand-gold">
info@kamiluwelding.com
</a></p>
            </div>
             <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.021020297623!2d8.513363314791557!3d9.97989599279584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae81b953a5c201%3A0x723224b7a42a4a75!2sTechnology%20Incubation%20Center%20Kano!5e0!3m2!1sen!2sng!4v1719245585315!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="dark:grayscale dark:invert"
                ></iframe>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default ContactPage;