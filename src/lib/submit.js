/**
 * Netlify Forms submission.
 *
 * The collectors are declared as static hidden forms in index.html (Netlify's
 * build step scans served HTML, and a React tree renders too late to be seen).
 * Submitting here by hand — a urlencoded POST to the site root carrying
 * `form-name` — lets each form keep its own success UI instead of Netlify's
 * default redirect page.
 */
export function submitForm(formName, data) {
  const body = new URLSearchParams({ 'form-name': formName, ...data })

  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
}
