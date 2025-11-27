document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     DARK MODE
  ------------------------------------------------------- */
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    darkModeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  /* -------------------------------------------------------
     ALGORITHM DESCRIPTIONS (EVERY ALGORITHM HERE)
  ------------------------------------------------------- */
  const descriptions = {
    "Bubble Sort": "Bubble Sort compares adjacent pairs...",
    "Quick Sort": "Quick Sort partitions around a pivot...",
    "Merge Sort": "Merge Sort recursively splits and merges...",
    "Binary Search": "Binary Search divides the search range...",
    "Breadth-First Search": "BFS visits nodes level-by-level...",
    "Dijkstra": "Dijkstra computes shortest path...",
    // Auto-fill placeholder for ALL algorithms
  };

  /* -------------------------------------------------------
     LEARN MORE MODAL (MERMAID GRAPHS)
  ------------------------------------------------------- */
  window.learnMore = function(name) {
    const modalLabel = document.getElementById("algorithmModalLabel");
    const desc = document.getElementById("algorithmDescription");

    modalLabel.innerText = name;

    desc.innerHTML = `
      <p>${descriptions[name] || "Description coming soon."}</p>
      <hr>
      <h5>Algorithm Flow</h5>
      <div class="mermaid">
        flowchart TD
          A([Start]) --> B([Step 1])
          B --> C([Step 2])
          C --> D([End])
      </div>
    `;
    mermaid.init();
  };

  /* -------------------------------------------------------
     SVG VISUALIZER ENGINE
  ------------------------------------------------------- */
  const Visualizer = (() => {
    let steps = [];
    let i = 0;
    let playing = false;
    let interval = null;
    let speed = 1;

    const container = document.getElementById("visualizerContainer");
    const controls = {
      prev: document.getElementById("vizPrev"),
      next: document.getElementById("vizNext"),
      play: document.getElementById("vizPlay"),
      reset: document.getElementById("vizReset"),
      speed: document.getElementById("vizSpeed"),
      panel: document.getElementById("visualizerControls"),
    };

    function renderStep() {
      container.innerHTML = "";
      const s = steps[i];
      if (!s) return;

      container.innerHTML = s.svg;

      if (s.text) {
        const p = document.createElement("p");
        p.className = "mt-2";
        p.textContent = s.text;
        container.appendChild(p);
      }
    }

    function play() {
      if (playing) return;
      playing = true;
      controls.play.textContent = "⏸ Pause";

      interval = setInterval(() => {
        if (i < steps.length - 1) {
          i++;
          renderStep();
        } else {
          pause();
        }
      }, 900 / speed);
    }

    function pause() {
      playing = false;
      controls.play.textContent = "▶ Play";
      clearInterval(interval);
    }

    controls.prev.onclick = () => {
      if (i > 0) i--;
      renderStep();
    };
    controls.next.onclick = () => {
      if (i < steps.length - 1) i++;
      renderStep();
    };
    controls.reset.onclick = () => {
      pause();
      i = 0;
      renderStep();
    };
    controls.play.onclick = () => playing ? pause() : play();
    controls.speed.oninput = e => {
      speed = parseFloat(e.target.value);
      if (playing) {
        pause();
        play();
      }
    };

    return {
      load(_steps) {
        steps = _steps;
        i = 0;
        controls.panel.style.display = "block";
        renderStep();
      }
    };
  })();


  /* -------------------------------------------------------
     VISUALIZER: Bubble Sort
  ------------------------------------------------------- */
  function bubbleSortVisualizer() {
    const arr = [5,3,8,2];
    const steps = [];

    function draw(a=-1, b=-1) {
      let svg = `<svg width="500" height="150">`;
      arr.forEach((v,i)=>{
        const highlight = (i===a || i===b) ? "neon-highlight" : "";
        const x = 30 + i*90;
        svg += `
        <rect x="${x}" y="40" width="60" height="60"
              class="${highlight}" fill="#111" stroke="#0ff"/>
        <text x="${x+30}" y="75" fill="#0ff" font-size="22"
              text-anchor="middle">${v}</text>`;
      });
      svg += `</svg>`;
      return svg;
    }

    for (let i=0;i<arr.length;i++) {
      for (let j=0;j<arr.length-i-1;j++) {
        steps.push({svg:draw(j,j+1), text:`Compare ${arr[j]} and ${arr[j+1]}`});
        if (arr[j] > arr[j+1]) {
          const temp=arr[j]; arr[j]=arr[j+1]; arr[j+1]=temp;
          steps.push({svg:draw(j,j+1), text:`Swapped`});
        }
      }
    }

    return steps;
  }


  /* -------------------------------------------------------
     VISUALIZER: Quick Sort (simple partition animation)
  ------------------------------------------------------- */
  function quickSortVisualizer() {
    const steps=[];
    const arr=[5,2,8,1,9];

    function draw(pivot, left, right) {
      let svg = `<svg width="600" height="150">`;
      arr.forEach((v,i)=>{
        let cls="";
        if (i===pivot) cls="neon-highlight";
        if (i===left || i===right) cls="neon-fill";

        const x=20+i*100;
        svg+=`
          <rect x="${x}" y="40" width="70" height="60" fill="#111"
                stroke="#0ff" class="${cls}"/>
          <text x="${x+35}" y="75" fill="#0ff" text-anchor="middle"
                font-size="22">${v}</text>
        `;
      });
      svg += `</svg>`;
      return svg;
    }

    function partition(low,high) {
      const pivot=arr[high];
      let i=low-1;

      for (let j=low;j<high;j++) {
        steps.push({svg:draw(high, j, i), text:`Compare ${arr[j]} with pivot ${pivot}`});
        if (arr[j] <= pivot) {
          i++;
          [arr[i],arr[j]]=[arr[j],arr[i]];
          steps.push({svg:draw(high, j, i), text:`Swapped`});
        }
      }
      [arr[i+1],arr[high]]=[arr[high],arr[i+1]];
      return i+1;
    }

    function quick(low,high) {
      if (low<high) {
        const pi=partition(low,high);
        quick(low,pi-1);
        quick(pi+1,high);
      }
    }

    quick(0,arr.length-1);
    return steps;
  }


  /* -------------------------------------------------------
     VISUALIZER: Merge Sort (merge animation)
  ------------------------------------------------------- */
  function mergeSortVisualizer() {
    const steps=[];
    let arr=[5,1,4,2,6];

    function draw(highA=-1, highB=-1) {
      let svg=`<svg width="600" height="150">`;
      arr.forEach((v,i)=>{
        const cls=(i===highA||i===highB)?"neon-highlight":"";
        const x=20+i*100;
        svg+=`
          <rect x="${x}" y="40" width="70" height="60" fill="#111"
                stroke="#0ff" class="${cls}" />
          <text x="${x+35}" y="75" fill="#0ff" text-anchor="middle"
                font-size="22">${v}</text>`;
      });
      svg+=`</svg>`;
      return svg;
    }

    function merge(l,m,r) {
      let L=arr.slice(l,m+1);
      let R=arr.slice(m+1,r+1);

      let i=0,j=0,k=l;

      while(i<L.length && j<R.length) {
        steps.push({svg:draw(k), text:`Compare ${L[i]} and ${R[j]}`});
        if(L[i]<=R[j]) arr[k++]=L[i++];
        else arr[k++]=R[j++];
      }
      while(i<L.length) arr[k++]=L[i++];
      while(j<R.length) arr[k++]=R[j++];
    }

    function sort(l,r) {
      if(l>=r) return;
      const m=Math.floor((l+r)/2);
      sort(l,m);
      sort(m+1,r);
      merge(l,m,r);
    }

    sort(0,arr.length-1);
    return steps;
  }


  /* -------------------------------------------------------
     VISUALIZER: Binary Search
  ------------------------------------------------------- */
  function binarySearchVisualizer() {
    const steps=[];
    const arr=[1,3,5,7,9,11,13];
    let left=0,right=arr.length-1,target=7;

    function draw(mid,left,right) {
      let svg=`<svg width="600" height="150">`;
      arr.forEach((v,i)=>{
        let cls = "";
        if (i===mid) cls="neon-highlight";
        if (i>=left && i<=right) cls="neon-fill";

        const x=20+i*80;
        svg+=`
          <rect x="${x}" y="40" width="60" height="60"
                stroke="#0ff" fill="#111" class="${cls}"/>
          <text x="${x+30}" y="75" fill="#0ff"
                text-anchor="middle" font-size="20">${v}</text>
        `;
      });
      svg+=`</svg>`;
      return svg;
    }

    while(left<=right) {
      const mid=Math.floor((left+right)/2);
      steps.push({
        svg:draw(mid,left,right),
        text:`Check mid=${arr[mid]}`
      });
      if(arr[mid]===target) {
        steps.push({svg:draw(mid,left,right), text:`Found ${target}!`});
        break;
      }
      else if(arr[mid]<target) left=mid+1;
      else right=mid-1;
    }

    return steps;
  }


  /* -------------------------------------------------------
     VISUALIZER: BFS Graph Traversal
  ------------------------------------------------------- */
  function bfsVisualizer() {
    const steps=[];

    const graph = {
      A:["B","C"],
      B:["D","E"],
      C:["F"],
      D:[],
      E:[],
      F:[]
    };

    function draw(current, queue=[]) {
      return `
      <svg width="500" height="220">

        <!-- Graph -->
        <circle cx="250" cy="40" r="25" stroke="#0ff" fill="#111"
                class="${current==='A'?'neon-highlight':''}"/>
        <text x="250" y="45" text-anchor="middle" fill="#0ff">A</text>

        <circle cx="150" cy="110" r="25" stroke="#0ff" fill="#111"
                class="${current==='B'?'neon-highlight':''}"/>
        <text x="150" y="115" text-anchor="middle" fill="#0ff">B</text>

        <circle cx="350" cy="110" r="25" stroke="#0ff" fill="#111"
                class="${current==='C'?'neon-highlight':''}"/>
        <text x="350" y="115" text-anchor="middle" fill="#0ff">C</text>

        <circle cx="100" cy="180" r="25" stroke="#0ff" fill="#111"
                class="${current==='D'?'neon-highlight':''}"/>
        <text x="100" y="185" text-anchor="middle" fill="#0ff">D</text>

        <circle cx="200" cy="180" r="25" stroke="#0ff" fill="#111"
                class="${current==='E'?'neon-highlight':''}"/>
        <text x="200" y="185" text-anchor="middle" fill="#0ff">E</text>

        <circle cx="350" cy="180" r="25" stroke="#0ff" fill="#111"
                class="${current==='F'?'neon-highlight':''}"/>
        <text x="350" y="185" text-anchor="middle" fill="#0ff">F</text>

        <!-- Queue Display -->
        <text x="20" y="210" fill="#0ff" font-size="16">Queue: [${queue.join(", ")}]</text>

      </svg>
      `;
    }

    const visited=new Set();
    const queue=["A"];

    while(queue.length>0) {
      const node = queue.shift();
      visited.add(node);

      steps.push({svg:draw(node,queue), text:`Visit ${node}`});

      for(const nbr of graph[node]) {
        if(!visited.has(nbr)) queue.push(nbr);
      }
    }

    return steps;
  }


  /* -------------------------------------------------------
     VISUALIZER: Dijkstra
  ------------------------------------------------------- */
  function dijkstraVisualizer() {
    const steps=[];

    const graph = {
      A:{B:2,C:4},
      B:{C:1,D:7},
      C:{E:3},
      D:{F:1},
      E:{D:2, F:5},
      F:{}
    };

    const dist = {A:0, B:Infinity, C:Infinity, D:Infinity, E:Infinity, F:Infinity};
    const visited = new Set();

    function draw(current) {
      return `
      <svg width="600" height="250">
        <text x="20" y="30" fill="#0ff">Distances:</text>
        <text x="20" y="55" fill="#0ff">A: ${dist.A}</text>
        <text x="20" y="75" fill="#0ff">B: ${dist.B}</text>
        <text x="20" y="95" fill="#0ff">C: ${dist.C}</text>
        <text x="20" y="115" fill="#0ff">D: ${dist.D}</text>
        <text x="20" y="135" fill="#0ff">E: ${dist.E}</text>
        <text x="20" y="155" fill="#0ff">F: ${dist.F}</text>

        <text x="20" y="190" fill="#0ff">
          Visiting: ${current || "None"}
        </text>
      </svg>
      `;
    }

    function minDistNode() {
      let min=Infinity, node=null;
      for(let k in dist) {
        if(!visited.has(k) && dist[k]<min) {
          min=dist[k]; node=k;
        }
      }
      return node;
    }

    let node;
    while(node=minDistNode()) {
      visited.add(node);
      steps.push({svg:draw(node), text:`Visit ${node}`});

      for(const nbr in graph[node]) {
        const nd=dist[node]+graph[node][nbr];
        if(nd<dist[nbr]) {
          dist[nbr]=nd;
          steps.push({
            svg:draw(node),
            text:`Update ${nbr} to distance ${nd}`
          });
        }
      }
    }

    return steps;
  }


  /* -------------------------------------------------------
     VISUALIZER REGISTRY
  ------------------------------------------------------- */
  const algorithmVisualizers = {
    "Bubble Sort": bubbleSortVisualizer,
    "Quick Sort": quickSortVisualizer,
    "Merge Sort": mergeSortVisualizer,
    "Binary Search": binarySearchVisualizer,
    "Breadth-First Search": bfsVisualizer,
    "Dijkstra": dijkstraVisualizer
  };


  /* -------------------------------------------------------
     OPEN MODAL (VISUALIZE)
  ------------------------------------------------------- */
  window.openModal = function(name) {
    document.getElementById("algorithmModalLabel").innerText = name;
    document.getElementById("algorithmDescription").innerHTML =
      `<p>${descriptions[name] || "Description coming soon."}</p>`;

    document.getElementById("visualizerContainer").innerHTML = "";
    document.getElementById("visualizerControls").style.display = "none";

    if (algorithmVisualizers[name]) {
      Visualizer.load(algorithmVisualizers[name]());
    } else {
      document.getElementById("visualizerContainer").innerHTML =
        `<p class="text-info">Visualizer coming soon...</p>`;
    }
  };
});
