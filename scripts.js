async function fetchParagraphs() {
    const url = "https://docs.google.com/spreadsheets/d/1MGD5da-EnNQb-6wG3HYpgIYyUgTduiYqowJrf-jXqPQ/gviz/tq?tqx=out:json&sheet=Form Responses 1";
  
    try {
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(text.substr(47).slice(0, -2)); // strips Google's weird wrapper
  
      const rows = json.table.rows;
      const container = document.getElementById('paragraph-list');
  
      rows.forEach(row => {
        const paragraph = row.c[1]?.v; // column B (second column) is usually where the text is
        if (paragraph) {
          const p = document.createElement('p');
          p.textContent = paragraph;
          container.appendChild(p);
        }
      });
    } catch (err) {
      console.error('Failed to load paragraphs:', err);
    }
  }
  
  fetchParagraphs();
  