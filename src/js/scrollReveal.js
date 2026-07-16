// document.addEventListener('DOMContentLoaded', () => {
//   const selectors = [
//     '.summary article',
//     '.skills__item',
//     '.projects__grid article',
//     '.experience__item'
//   ];

//   const items = document.querySelectorAll(selectors.join(', '));

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.remove('hidden');
//         observer.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.2 });

//   items.forEach(item => {
//     item.classList.add('hidden');
//     observer.observe(item);
//   });
// });