import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(containerRef, options = {}) {
  const {
    selector = '[data-reveal]',
    threshold = 0.12,
    rootMargin = '0px 0px -48px 0px',
    once = true
  } = options

  let observer = null

  function refresh() {
    if (!containerRef.value) return

    observer?.disconnect()

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-revealed')
          }
        })
      },
      { threshold, rootMargin }
    )

    containerRef.value.querySelectorAll(selector).forEach((element) => {
      if (!element.classList.contains('is-revealed')) {
        observer.observe(element)
      }
    })
  }

  onMounted(() => {
    requestAnimationFrame(refresh)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { refresh }
}
