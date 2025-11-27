// script.js

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // 1. Create and Insert Search Bar
  // -------------------------------
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search algorithms...';
  searchInput.classList.add('form-control', 'mb-4');

  // Insert the search bar above the first <section>
  const firstSection = document.querySelector('section');
  if (firstSection && firstSection.parentNode) {
    firstSection.parentNode.insertBefore(searchInput, firstSection);
  }

  // Cache all cards for search
  const cards = Array.from(document.querySelectorAll('.card'));

  // ----------------------
  // 2. Search Functionality
  // ----------------------
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    cards.forEach((card) => {
      const text = card.innerText.toLowerCase();
      const col = card.closest('.col-md-4') || card.parentElement;

      if (!col) return;

      if (!query || text.includes(query)) {
        col.style.display = '';
      } else {
        col.style.display = 'none';
      }
    });
  });

  // -----------------------------------------
  // 3. Algorithm descriptions for the modal
  // -----------------------------------------
  const algorithms = {
    'Quick Sort': `
Quick sort is a divide-and-conquer sorting algorithm:

• Pick a pivot element.
• Partition the array into elements less than, equal to, and greater than the pivot.
• Recursively sort the subarrays.
• Combine the results.

Average: O(n log n)
Worst-case: O(n²)
Space: O(log n)
    `.trim(),

    'Merge Sort': `
Merge sort is a stable, divide-and-conquer sorting algorithm:

• Split the list into two halves.
• Recursively sort each half.
• Merge them back together.

Time: O(n log n)
Space: O(n)
    `.trim(),

    'Binary Search': `
Binary search finds an element in a sorted array:

• Start with low and high indexes.
• Check mid.
• Narrow left or right depending on comparison.

Time: O(log n)
Requires sorted data.
    `.trim(),

    'Linear Search': `
Linear search checks items one by one:

• Start at index 0.
• Compare each item.
• Return index if match found.

Time: O(n)
Works on unsorted lists.
    `.trim(),

    "Dijkstra's Algorithm": `
Finds the shortest path from a source node in a weighted graph:

• Use a priority queue.
• Repeatedly pick the smallest-distance node.
• Relax edges.

Time: O((V + E) log V)
    `.trim(),

    'Breadth-First Search': `
BFS explores a graph level by level using a queue:

• Mark start node visited.
• Visit neighbors.
• Continue until queue empty.

Time: O(V + E)
Ideal for shortest paths in unweighted graphs.
    `.trim()
  };

  // -----------------------------------------
  // 4. Modal helper (GLOBAL for HTML buttons)
  // -----------------------------------------
  window.openModal = function (algorithmName) {
    const modalTitle = document.getElementById('algorithmModalLabel');
    const modalDescription = document.getElementById('algorithmDescription');

    if (!modalTitle || !modalDescription) return;

    modalTitle.innerText = algorithmName;
    modalDescription.innerText =
      algorithms[algorithmName] || 'Description not available yet.';
  };

  // -------------------------
  // 5. Dark Mode Toggle Logic
  // -------------------------
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  if (darkModeToggle) {
    // Load saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');

      darkModeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
});
