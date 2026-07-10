'use client';

import { useState } from 'react';
import { CONTACT_PAGE_CONTENT } from '@/lib/content/contact';

/**
 * ContactForm
 *
 * Client Component — requires controlled inputs (useState).
 * Page (contact/page.tsx) stays a Server Component; this is the only
 * client island on the Contact page.
 *
 * On submit: prevents default, shows inline success message.
 * No backend submission — integration deferred to Phase 5 (CM031+).
 */

type FormFields = {
  name: string;
  email: string;
  phone: string;
  rating: string;
  age: string;
  interest: string;
  message: string;
};

const EMPTY: FormFields = {
  name: '',
  email: '',
  phone: '',
  rating: '',
  age: '',
  interest: '',
  message: '',
};

export default function ContactForm() {
  const { form } = CONTACT_PAGE_CONTENT;
  const { fields } = form;

  const [values, setValues] = useState<FormFields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormFields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    'w-full rounded-xl border border-border bg-bg-card px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent transition-colors duration-200';
  const labelBase = 'block text-sm font-medium text-foreground mb-1.5';

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center flex flex-col gap-4 items-center">
        <span className="text-4xl" aria-hidden="true">✓</span>
        <p className="text-base text-foreground font-medium">{form.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Full Name */}
      <div>
        <label htmlFor="contact-name" className={labelBase}>
          {fields.name.label} <span className="text-emerald" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          placeholder={fields.name.placeholder}
          value={values.name}
          onChange={set('name')}
          className={inputBase}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className={labelBase}>
          {fields.email.label} <span className="text-emerald" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          placeholder={fields.email.placeholder}
          value={values.email}
          onChange={set('email')}
          className={inputBase}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelBase}>
          {fields.phone.label} <span className="text-emerald" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder={fields.phone.placeholder}
          value={values.phone}
          onChange={set('phone')}
          className={inputBase}
        />
      </div>

      {/* Rating + Age row */}
      <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
        <div>
          <label htmlFor="contact-rating" className={labelBase}>
            {fields.rating.label}
          </label>
          <input
            id="contact-rating"
            type="text"
            placeholder={fields.rating.placeholder}
            value={values.rating}
            onChange={set('rating')}
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="contact-age" className={labelBase}>
            {fields.age.label}
          </label>
          <input
            id="contact-age"
            type="number"
            min="4"
            max="99"
            placeholder={fields.age.placeholder}
            value={values.age}
            onChange={set('age')}
            className={inputBase}
          />
        </div>
      </div>

      {/* Training Interest */}
      <div>
        <label htmlFor="contact-interest" className={labelBase}>
          {fields.interest.label}
        </label>
        <select
          id="contact-interest"
          value={values.interest}
          onChange={set('interest')}
          className={inputBase}
        >
          <option value="">{fields.interest.defaultOption}</option>
          {fields.interest.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Goals & Comments */}
      <div>
        <label htmlFor="contact-message" className={labelBase}>
          {fields.message.label}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder={fields.message.placeholder}
          value={values.message}
          onChange={set('message')}
          className={`${inputBase} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-medium rounded-xl bg-gradient-to-br from-emerald to-cyan text-bg shadow-glow hover:shadow-glow-strong transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {form.submitLabel}
      </button>
    </form>
  );
}
