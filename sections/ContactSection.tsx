import { FormEvent, useState } from 'react';
import {
  ArrowUpRight,
  EnvelopeSimple,
  Fingerprint,
  GithubLogo,
  GraduationCap,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  UsersThree,
  XLogo,
} from '@phosphor-icons/react';
import { SOCIAL_LINKS } from '../portfolioData';
import { DetailHeader } from './DetailSections';

const EMAIL = 'aswinmr0060@gmail.com';

const CONTACT_LINKS = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: <LinkedinLogo size={21} weight="fill" /> },
  { label: 'GitHub', href: SOCIAL_LINKS.github, icon: <GithubLogo size={21} weight="fill" /> },
  { label: 'X', href: SOCIAL_LINKS.x, icon: <XLogo size={19} /> },
  { label: 'ResearchGate', href: SOCIAL_LINKS.researchgate, icon: <UsersThree size={21} /> },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, icon: <InstagramLogo size={21} /> },
  { label: 'Google Scholar', href: SOCIAL_LINKS.scholar, icon: <GraduationCap size={21} /> },
  { label: 'ORCID', href: SOCIAL_LINKS.orcid, icon: <Fingerprint size={21} /> },
];

export default function ContactSection() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    setStatus('Opening your email app…');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section id="contact" className="detail-section contact-section">
      <DetailHeader
        index="07"
        title="Let’s connect"
        description="Send a message, propose a collaboration, or continue a technical conversation."
      />

      <div className="contact-section-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-heading">
            <p className="eyebrow">Message form</p>
            <h3>What would you like to discuss?</h3>
          </div>

          <div className="contact-field-row">
            <label htmlFor="contact-name">
              Name
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
            </label>
            <label htmlFor="contact-email">
              Email
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
          </div>

          <label htmlFor="contact-message">
            Message
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              placeholder="Share the project, role, or question you have in mind."
              required
            />
          </label>

          <div className="contact-form-actions">
            <button type="submit">
              Prepare email <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </button>
            <span role="status" aria-live="polite">{status}</span>
          </div>
        </form>

        <aside className="contact-directory">
          <div>
            <p className="eyebrow">Direct details</p>
            <a className="contact-directory-line" href={`mailto:${EMAIL}`}>
              <EnvelopeSimple size={20} aria-hidden="true" />
              <span>
                <small>Email</small>
                {EMAIL}
              </span>
            </a>
            <p className="contact-directory-line">
              <MapPin size={20} aria-hidden="true" />
              <span>
                <small>Location</small>
                Urbana, Illinois, US
              </span>
            </p>
          </div>

          <div className="contact-network">
            <p className="eyebrow">Social & research</p>
            {CONTACT_LINKS.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
