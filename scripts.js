async function fetchParagraphs() {
    const url = "https://api.sheetbest.com/sheets/854acc31-7133-467e-8c7f-da99d1dd3266"; // ← replace this
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      const container = document.getElementById('paragraph-list');
  
      data.forEach(entry => {
        const paragraph = entry["What made you think of Laura today?"]; // ← use your actual column name here
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

// **************** Replace Form *******************

document.getElementById('laura-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const textarea = form.querySelector('textarea');
  const message = textarea.value;

  const responseDisplay = document.getElementById('form-response');

  try {
    await fetch('https://api.sheetbest.com/sheets/854acc31-7133-467e-8c7f-da99d1dd3266', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "What made you think of Laura today?": message
      })
    });

    form.reset();
    responseDisplay.style.display = 'block';
  } catch (err) {
    alert('Something went wrong 😢');
    console.error(err);
  }
});

  