export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  excerpt,
  date,
  coverImage,
  content
}`;

export const postSlugsQuery = `
*[_type == "post"] {
  "slug": slug.current
}`;
