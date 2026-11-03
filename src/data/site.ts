/** Everything about you that appears in more than one place. Edit here once. */
export const site = {
  name: 'Enrique José Acosta de la Rúa',
  short: 'Enrique Acosta',
  role: 'Mechatronics Engineer',
  tagline: 'Machines, motion and lab automation',
  statement: 'I build machines end to end.',
  description: 'Mechatronics engineer who designs, builds and programs precision machines, from ball screws and capstan drives to embedded control and 3D-vision pipelines.',
  email: 'ejacodel@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ejacodel',
  github: 'https://github.com/ejacodel',
  cvPdf: '/cv/Enrique_Acosta_CV.pdf',
  // Your phone number and date of birth are deliberately left off the public site, because scrapers harvest them.
  // Give them to recruiters directly, or in the PDF you attach to an application.
  facts: [
    ['Role', 'Mechatronics engineer'],
    ['Studying', 'MSc Mechatronics, UPV. Thesis due Feb–Mar 2027'],
    ['Available', 'Full-time from July 2027'],
    ['Work rights', 'EU citizen. Can work in Switzerland and the EU without a visa'],
    ['Location', 'Valencia, Spain. Willing to relocate'],
  ] as [string, string][],
};

export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/log/', label: 'Log' },
  { href: '/cv/', label: 'CV' },
];
