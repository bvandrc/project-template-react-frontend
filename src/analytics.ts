export {}

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

const GA_MEASUREMENT_ID = 'G-ID-CHANGE-THIS'

const script = document.createElement('script')
script.async = true
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
document.head.appendChild(script)

window.global ||= window
window.dataLayer = window.dataLayer || []

function gtag(...args: unknown[]) {
  window.dataLayer.push(args)
}

gtag('js', new Date())
gtag('config', GA_MEASUREMENT_ID)
