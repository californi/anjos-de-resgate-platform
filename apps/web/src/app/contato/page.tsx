import { siteContent } from "@anjos/shared";

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
          <form className="form">
            <label>
              {contact.form.nameLabel}
              <input disabled placeholder={contact.form.namePlaceholder} />
            </label>
            <label>
              {contact.form.messageLabel}
              <textarea disabled placeholder={contact.form.messagePlaceholder} />
            </label>
            <button disabled type="button">
              {contact.form.buttonLabel}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
