// script.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search algorithms...');
  searchInput.classList.add('form-control', 'mb-4');
  
  // Insert the search bar above the main content
  const container = document.querySelector('.container');
  container.prepend(searchInput);
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title').innerText.toLowerCase();
      const description = card.querySelector('.card-text').innerText.toLowerCase();
      
      if (title.includes(query) || description.includes(query)) {
        card.parentElement.style.display = 'block';
      } else {
        card.parentElement.style.display = 'none';
      }
    });
  });
});
