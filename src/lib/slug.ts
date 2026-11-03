export const slug = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Finds the <Chapter title="..."> tags in an MDX body, in order, to build the chapter rail. */
export const chaptersIn = (body = '') =>
  [...body.matchAll(/<Chapter[^>]*?\stitle="([^"]+)"/g)].map((m) => ({ title: m[1], id: slug(m[1]) }));
