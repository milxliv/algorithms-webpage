// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Create and Insert Search Bar
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search algorithms...');
  searchInput.classList.add('form-control', 'mb-4');
  
  // Insert the search bar above the first section
  const firstSection = document.querySelector('section');
  firstSection.parentNode.insertBefore(searchInput, firstSection);
  
  // Search Functionality
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

// Algorithm Details
const algorithms = {
  'Quick Sort': 'Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot. It recursively sorts the subarrays.',
  'Merge Sort': 'Merge Sort is a stable, divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves.',
  'Binary Search': 'Binary Search efficiently finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
  'Linear Search': 'Linear Search sequentially checks each element of the list until the desired element is found or the list ends.',
  'Dijkstra\'s Algorithm': 'Dijkstra\'s Algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights.',
  'Breadth-First Search': 'Breadth-First Search explores all neighbors at the current depth before moving to nodes at the next depth level.',
  // Add more algorithms and their descriptions here
};

// Function to Open Modal with Algorithm Details
function openModal(algorithmName) {
  const modalTitle = document.getElementById('algorithmModalLabel');
  const modalDescription = document.getElementById('algorithmDescription');
  
  modalTitle.innerText = algorithmName;
  modalDescription.innerText = algorithms[algorithmName] || 'Description not available.';
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  darkModeToggle.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});
