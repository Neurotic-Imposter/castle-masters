/**
 * Contact Page Data — Single Source of Truth
 *
 * All copy for the /contact inner page.
 * Never duplicate these values in components.
 *
 * Contact channels and hub addresses sourced from prototype.
 * Phone/email values are placeholder — never invent real contact data.
 *
 * TODO (Founder): Replace all placeholder contact details with verified
 * production information before launch.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactChannel {
  /** Emoji icon — aria-hidden in component. */
  icon: string;
  label: string;
  /** Placeholder value — replace with real contact info before launch. */
  value: string;
}

export interface AcademyHub {
  name: string;
  /** Placeholder address — replace with real address before launch. */
  address: string;
}

export interface ContactFormCopy {
  heading: string;
  submitLabel: string;
  successMessage: string;
  fields: {
    name:     { label: string; placeholder: string };
    email:    { label: string; placeholder: string };
    phone:    { label: string; placeholder: string };
    rating:   { label: string; placeholder: string };
    age:      { label: string; placeholder: string };
    interest: {
      label: string;
      defaultOption: string;
      options: readonly string[];
    };
    message:  { label: string; placeholder: string };
  };
}

export interface ContactPageCopy {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  form: ContactFormCopy;
  channels: {
    heading: string;
    items: readonly ContactChannel[];
  };
  hubs: {
    heading: string;
    description: string;
    items: readonly AcademyHub[];
  };
}

// ─── Contact Page Content ─────────────────────────────────────────────────────

export const CONTACT_PAGE_CONTENT: ContactPageCopy = {
  label: 'Support & Registration',
  titleLines: ['Connect with', 'Castle Masters'],
  subtitle:
    'Book a trial session or inquire about school and corporate partnerships. All contact details below are placeholder details.',

  form: {
    heading: 'Free Trial & Inquiry Form',
    submitLabel: 'Send Message & Book Trial',
    successMessage:
      'Demo form submitted successfully. Backend integration will be added in a later phase.',
    fields: {
      name:  { label: 'Full Name',     placeholder: 'Full Name Placeholder' },
      email: { label: 'Email Address', placeholder: 'email@example.com' },
      phone: { label: 'Phone Number',  placeholder: '+91 99999 99999' },
      rating: {
        label: 'Estimated Rating',
        placeholder: 'Unrated / FIDE Rating',
      },
      age: {
        label: 'Age',
        placeholder: 'Student Age',
      },
      interest: {
        label: 'Training Interest',
        defaultOption: 'Select Option...',
        options: [
          'Online Coaching Track',
          'Offline Coaching Track',
          'Corporate Program',
          'School Partnerships',
          'Tournament Inquiry',
        ] as const,
      },
      message: {
        label: 'Goals & Comments',
        placeholder: 'Tell us about your learning goals and preferred schedule...',
      },
    },
  },

  channels: {
    heading: 'Contact Channels',
    items: [
      // TODO (Founder): Replace placeholder values with real contact info.
      { icon: '📞', label: 'Phone Channel',    value: '+91 99999 99999' },
      { icon: '✉️', label: 'Support Email',    value: 'support@castlemasters.in' },
      { icon: '💬', label: 'WhatsApp Channel', value: '+91 99999 99999' },
    ] as const,
  },

  hubs: {
    heading: 'Placeholder Academy Hubs',
    description:
      'Our regional coaching centers are undergoing final infrastructure preparation. Addresses are placeholders.',
    items: [
      // TODO (Founder): Replace placeholder addresses with verified locations.
      { name: 'Delhi Flagship Center', address: 'Regional Center Address Placeholder, New Delhi' },
      { name: 'Mumbai Center',         address: 'Regional Center Address Placeholder, Mumbai' },
      { name: 'Bangalore Center',      address: 'Regional Center Address Placeholder, Bangalore' },
      { name: 'Chennai Center',        address: 'Regional Center Address Placeholder, Chennai' },
    ] as const,
  },
} as const;
