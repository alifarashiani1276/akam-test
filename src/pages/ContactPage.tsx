import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { PageHeader } from '@/components/common/PageHeader';
import { SITE } from '@/config/site';
import { productService } from '@/services/productService';
import { usePageMeta } from '@/hooks/usePageMeta';

type FieldName = 'name' | 'email' | 'message';
type Errors = Partial<Record<FieldName, true>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { t } = useTranslation();
  usePageMeta(t('pages.contact.title'));
  const [params] = useSearchParams();
  const products = productService.list();
  const preselected = products.some((p) => p.id === params.get('product')) ? (params.get('product') as string) : '';

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? '').trim();

    const nextErrors: Errors = {};
    if (!value('name')) nextErrors.name = true;
    if (!EMAIL_PATTERN.test(value('email'))) nextErrors.email = true;
    if (!value('message')) nextErrors.message = true;
    setErrors(nextErrors);
    setSent(false);

    const firstError = (['name', 'email', 'message'] as const).find((k) => nextErrors[k]);
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    // No backend: compose a mailto: link so the message is delivered through the visitor's own email app.
    const interest = value('interest');
    const lines = [`${t('contact.form.name')}: ${value('name')}`, `${t('contact.form.email')}: ${value('email')}`];
    if (value('phone')) lines.push(`${t('contact.form.phone')}: ${value('phone')}`);
    if (value('company')) lines.push(`${t('contact.form.company')}: ${value('company')}`);
    if (interest) {
      lines.push(`${t('contact.form.interest')}: ${products.find((p) => p.id === interest)?.model ?? interest}`);
    }
    lines.push('', value('message'));
    const body = lines.join('\n');
    window.location.assign(`mailto:${SITE.email}?subject=${encodeURIComponent(t('contact.mailSubject'))}&body=${encodeURIComponent(body)}`);
    setSent(true);
  };

  const field = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <>
      <PageHeader kicker={t('nav.contact')} title={t('contact.title')} subtitle={t('contact.subtitle')} />
      <section className="section section--tight">
        <div className="container contact">
          <form className="form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="contact-name">{t('contact.form.name')}</label>
              <input type="text" autoComplete="name" required {...field('name')} />
              {errors.name && <p className="field__error" id="contact-name-error">{t('contact.errors.name')}</p>}
            </div>
            <div className="field">
              <label htmlFor="contact-email">{t('contact.form.email')}</label>
              <input type="email" autoComplete="email" dir="ltr" required {...field('email')} />
              {errors.email && <p className="field__error" id="contact-email-error">{t('contact.errors.email')}</p>}
            </div>
            <div className="form__row">
              <div className="field">
                <label htmlFor="contact-phone">{t('contact.form.phone')}</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" dir="ltr" />
              </div>
              <div className="field">
                <label htmlFor="contact-company">{t('contact.form.company')}</label>
                <input id="contact-company" name="company" type="text" autoComplete="organization" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="contact-interest">{t('contact.form.interest')}</label>
              <select id="contact-interest" name="interest" defaultValue={preselected}>
                <option value="">{t('contact.form.interestGeneral')}</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.model} — {t(`products.${p.id}.name`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="contact-message">{t('contact.form.message')}</label>
              <textarea rows={6} required {...field('message')} />
              {errors.message && <p className="field__error" id="contact-message-error">{t('contact.errors.message')}</p>}
            </div>
            <Button type="submit" arrow>
              {t('contact.form.submit')}
            </Button>
            {sent && (
              <p className="form__status" role="status">
                {t('contact.status')}
              </p>
            )}
          </form>

          <aside className="panel contact__details" aria-labelledby="contact-details-title">
            <h2 className="panel__title" id="contact-details-title">
              {t('contact.details.title')}
            </h2>
            <ul className="contact-list">
              <li>
                <Mail size={20} aria-hidden="true" />
                <div>
                  <span>{t('contact.details.email')}</span>
                  <a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a>
                </div>
              </li>
              <li>
                <Phone size={20} aria-hidden="true" />
                <div>
                  <span>{t('contact.details.phone')}</span>
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} dir="ltr">{SITE.phone}</a>
                </div>
              </li>
              <li>
                <MapPin size={20} aria-hidden="true" />
                <div>
                  <span>{t('contact.details.address')}</span>
                  <address>{SITE.address}</address>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
