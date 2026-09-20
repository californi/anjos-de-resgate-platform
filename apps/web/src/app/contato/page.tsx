import { siteContent } from "@anjos/shared";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  const { contact } = siteContent;

  return (
    <main>
      <div className="page-title">
        <p className="eyebrow">{contact.eyebrow}</p>
        <h1>{contact.title}</h1>
        <p>{contact.description}</p>
      </div>

      <section className="section contact-layout">
        <div className="panel">
          <h2>{contact.channelsTitle}</h2>
          <div className="contact-list">
            {contact.channels.map((channel) => (
              <p key={channel.label}>
                <strong>{channel.label}:</strong> {channel.value}
              </p>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>{contact.formTitle}</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
