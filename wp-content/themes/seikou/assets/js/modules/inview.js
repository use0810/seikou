export function initInView(selector = '.inview-trigger', className = 'in-view') {
  const targets = document.querySelectorAll(selector);
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target); // 一度だけ実行したい場合
      }
    });
  }, {
    threshold: 0.1
  });

  targets.forEach(target => observer.observe(target));
}
