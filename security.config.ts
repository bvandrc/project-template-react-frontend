/**
 * Shared security-header config for the dev server, the preview server
 * (vite.config.ts), and the `<meta http-equiv>` fallback injected into
 * index.html.
 *
 * GitHub Pages serves static files and cannot set response headers, so the
 * deployed site only gets what a `<meta>` tag can carry (see `CSP_META`).
 * The Vite dev/preview servers send the full set, which is also what the CI
 * OWASP ZAP baseline scan checks.
 */

/**
 * Content-Security-Policy directives.
 *
 * `style-src`/`script-src` deliberately omit `'unsafe-inline'`: Tailwind is
 * extracted to a real stylesheet at build time and no component uses inline
 * `style` attributes or inline `<script>`s, so nothing needs the escape hatch.
 * The Google hosts are for `react-ga4` (see src/main.tsx).
 */
const CSP_DIRECTIVES: Record<string, string[]> = {
  'default-src': ["'self'"],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
  'form-action': ["'self'"],
  'frame-src': ["'none'"],
  'worker-src': ["'self'"],
  'font-src': ["'self'"],
  'style-src': ["'self'"],
  'img-src': [
    "'self'",
    'data:',
    'https://*.google-analytics.com',
    'https://*.googletagmanager.com',
  ],
  'script-src': ["'self'", 'https://*.googletagmanager.com'],
  'connect-src': [
    "'self'",
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://*.googletagmanager.com',
  ],
}

const serialize = (directives: Record<string, string[]>) =>
  Object.entries(directives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ')

/**
 * Policy for the `Content-Security-Policy` response header. `frame-ancestors`
 * is the anti-clickjacking half of the policy and is header-only.
 */
export const CSP_HEADER = serialize({
  ...CSP_DIRECTIVES,
  'frame-ancestors': ["'none'"],
})

/**
 * Policy for the `<meta http-equiv="Content-Security-Policy">` tag. Browsers
 * ignore `frame-ancestors`, `report-uri` and `sandbox` in a meta policy, so
 * they are left out rather than shipped as a directive that never applies.
 */
export const CSP_META = serialize(CSP_DIRECTIVES)

/**
 * Response headers sent by the Vite dev and preview servers. The CI OWASP ZAP
 * baseline scan runs against `vite preview`, so this is the set it checks.
 */
export const SECURITY_HEADERS = {
  'Content-Security-Policy': CSP_HEADER,
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy': [
    'accelerometer=()',
    'autoplay=()',
    'camera=()',
    'display-capture=()',
    'encrypted-media=()',
    'fullscreen=(self)',
    'geolocation=()',
    'gyroscope=()',
    'magnetometer=()',
    'microphone=()',
    'midi=()',
    'payment=()',
    'usb=()',
  ].join(', '),
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
} as const
