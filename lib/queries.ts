export const postQuery = `
*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current, 
  content,
  date,
  coverImage
}`;

export const postSlugsQuery = `
*[_type == "post"] {
  "slug": slug.current
}`;
