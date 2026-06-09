import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const d = Number((e.target as HTMLElement).dataset.d || 0);
            setTimeout(() => e.target.classList.add('in'), d);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    );
    document.querySelectorAll<HTMLElement>('.rv').forEach((el, i) => {
      el.dataset.d = String((i % 4) * 80);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}
