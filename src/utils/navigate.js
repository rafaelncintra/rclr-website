export function navigate(path) {
  window.location.hash = '#' + path
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
}
