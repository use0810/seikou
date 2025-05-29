export function initHamburger() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('#main-menu .menu'); 

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active'); 
    menu.classList.toggle('active'); 
  });
}
