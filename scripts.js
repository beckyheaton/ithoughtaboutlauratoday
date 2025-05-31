async function fetchParagraphs() {
  const url = "https://api.sheetbest.com/sheets/854acc31-7133-467e-8c7f-da99d1dd3266";

  try {
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById('paragraph-list');
    container.innerHTML = ""; // optional: clear before rendering

    // Show newest first:
    const reversed = data.reverse();

    reversed.forEach(entry => {
    const paragraph = entry["What made you think of Laura today?"];
    const timestamp = entry["Timestamp"];
    const name = entry["Name"]; // extract the name column

    if (paragraph && timestamp) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('entry');

        // Combine timestamp and paragraph into a single block
        wrapper.innerHTML = `<br><br>${paragraph} <em>${name ? `<br>- ${name}` : ""}</em><br><em>${formatTimestampFancy(timestamp)}</em>`;
        
        container.appendChild(wrapper);
    }
    });

  } catch (err) {
    console.error('Failed to load paragraphs:', err);
  }
}

// Format timestamp like: 26th May 2025 13:35
function formatTimestampFancy(raw) {
    const date = new Date(raw);

    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ordinal = getOrdinalSuffix(day);

    return `${day}${ordinal} ${month} ${year} ${hours}:${minutes}`;
}

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'ᵗʰ';
    switch (day % 10) {
        case 1: return 'ˢᵗ';
        case 2: return 'ⁿᵈ';
        case 3: return 'ʳᵈ';
        default: return 'ᵗʰ';
    }
}


fetchParagraphs();

// Prevent form from submitting when pressing Enter in the name input
document.querySelector('input[name="Name"]').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') e.preventDefault();
});

// **************** Replace Form *******************

document.getElementById('laura-form').addEventListener('submit', async function(e) {
  e.preventDefault();

    const form = e.target;
    const textarea = form.querySelector('textarea');
    const message = textarea.value;
    const nameInput = form.querySelector('input[name="Name"]'); // get name input field
    const name = nameInput ? nameInput.value : ""; // safely extract value or fallback to ""

    const responseDisplay = document.getElementById('form-response');

    try {
        await fetch('https://api.sheetbest.com/sheets/854acc31-7133-467e-8c7f-da99d1dd3266', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "What made you think of Laura today?": message,
                "Name": name, // include name in the submission
                "Timestamp": new Date().toISOString()
            })
        });

        form.reset();
        responseDisplay.style.display = 'block';
    }
  catch (err) {
    alert('Something went wrong 😢');
    console.error(err);
  }
});

  