// script.js

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // 1. Dark Mode Toggle
  // -------------------------------
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  if (darkModeToggle) {
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

  // -------------------------------
  // 2. Algorithm Descriptions
  // -------------------------------
  const algorithms = {
    'Quick Sort': `
Quick sort is a divide-and-conquer sorting algorithm:

• Pick a pivot element.
• Partition the array into elements less than, equal to, and greater than the pivot.
• Recursively sort the subarrays.

Average: O(n log n)
Worst:   O(n²)
Space:   O(log n) (recursion stack)
    `.trim(),

    'Merge Sort': `
Merge sort is a stable, divide-and-conquer sorting algorithm:

• Split the list into two halves.
• Recursively sort each half.
• Merge them back together in order.

Time:  O(n log n)
Space: O(n)
    `.trim(),

    'Bubble Sort': `
Bubble sort repeatedly swaps adjacent elements that are out of order:

• Repeatedly scan the list.
• Swap neighbors if they are in the wrong order.
• Stop when a full pass causes no swaps.

Time:  O(n²)
Space: O(1)
Easy to understand but slow for large inputs.
    `.trim(),

    'Insertion Sort': `
Insertion sort builds a sorted portion of the array one element at a time:

• Start from the second element.
• "Insert" it into the correct place in the sorted left side.
• Repeat for all elements.

Best:   O(n) when nearly sorted
Worst:  O(n²)
Space:  O(1)
Often used for very small arrays or as a base case in other sorts.
    `.trim(),

    'Selection Sort': `
Selection sort repeatedly selects the smallest remaining element:

• Find the minimum element in the unsorted part.
• Swap it into the next position in the sorted part.
• Repeat.

Time:  O(n²) (always)
Space: O(1)
Simple but rarely used in performance-sensitive code.
    `.trim(),

    'Heap Sort': `
Heap sort uses a binary heap to sort:

• Build a max-heap from the input.
• Repeatedly remove the max element and place it at the end of the array.
• Restore the heap each time.

Time:  O(n log n)
Space: O(1) extra (in-place)
    `.trim(),

    'Binary Search': `
Binary search finds an element in a sorted array:

• Keep low and high indexes.
• Check the middle element.
• Move left or right depending on comparison.
• Repeat until found or range is empty.

Time:  O(log n)
Req:   Input must be sorted.
    `.trim(),

    'Linear Search': `
Linear search scans the array from start to finish:

• Compare each element with the target.
• Stop when you find it or reach the end.

Time:  O(n)
Works on unsorted data; simple but slower for large inputs.
    `.trim(),

    'Interpolation Search': `
Interpolation search improves on binary search when data is uniformly distributed:

• Estimate the likely position of the target using its value.
• Probe that index instead of always the midpoint.
• Narrow the range and repeat.

Average: O(log log n)
Worst:   O(n)
    `.trim(),

    'Exponential Search': `
Exponential search quickly finds a range for binary search:

• Check a[1], a[2], a[4], a[8], ... until value >= target or end.
• Perform binary search within the found range.

Time: O(log n)
Good when the target is near the beginning of a very long array.
    `.trim(),

    "Dijkstra's Algorithm": `
Dijkstra's algorithm finds the shortest path from a source node in a weighted graph (no negative edges):

• Initialize distances to ∞, source = 0.
• Use a priority queue to repeatedly pick the node with the smallest distance.
• Relax its outgoing edges.
• Continue until all reachable nodes are processed.

Typical: O((V + E) log V) with a binary heap.
    `.trim(),

    'Breadth-First Search': `
Breadth-First Search (BFS) explores a graph level by level:

• Use a queue.
• Start at a source node, mark it visited, and enqueue it.
• Dequeue nodes and visit unvisited neighbors, enqueueing them.

Time: O(V + E)
Finds shortest paths in unweighted graphs.
    `.trim(),

    'Depth-First Search': `
Depth-First Search (DFS) explores as far as possible along one branch before backtracking:

• Implement with recursion or a stack.
• Visit a node, then recursively visit each unvisited neighbor.

Time:  O(V + E)
Useful for connectivity, cycle detection, topological sort, etc.
    `.trim(),

    'A* Search': `
A* search is a best-first search that uses a heuristic:

• Each state has:
  f(n) = g(n) + h(n)
  g(n): cost so far, h(n): estimated cost to goal.
• Always expand the node with the smallest f(n) from a priority queue.

If h is admissible and consistent, A* is optimal.
Used in pathfinding (games, maps, robotics).
    `.trim()
  };

  // -----------------------------------------
  // 3. Modal helper (GLOBAL for HTML buttons)
  // -----------------------------------------
  window.openModal = function (algorithmName) {
    const modalTitle = document.getElementById('algorithmModalLabel');
    const modalDescription = document.getElementById('algorithmDescription');

    if (!modalTitle || !modalDescription) return;

    modalTitle.innerText = algorithmName;
    modalDescription.innerText =
      algorithms[algorithmName] || 'Description not available yet.';
  };

  // -------------------------------
  // 4. Search Bar + Filtering
  // -------------------------------
  const searchBarContainer = document.getElementById('search-bar-container');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search algorithms in this category...';
  searchInput.classList.add('form-control');

  if (searchBarContainer) {
    searchBarContainer.appendChild(searchInput);
  }

  function filterCards() {
    const query = (searchInput.value || '').toLowerCase();
    const activePane = document.querySelector('.tab-pane.active');

    if (!activePane) return;

    const cards = activePane.querySelectorAll('.algorithm-card');

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
  }

  searchInput.addEventListener('input', filterCards);

  // Re-run filtering when switching tabs so the current query applies
  const tabButtons = document.querySelectorAll('#algorithmTabs button[data-bs-toggle="tab"]');
  tabButtons.forEach((btn) => {
    btn.addEventListener('shown.bs.tab', () => {
      filterCards();
    });
  });
});
