function rot13Encrypt(text) {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const offset = char >= 'a' ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - offset + 13) % 26) + offset);
  });
}

function splitTextIntoChunks(text, numChunks) {
  const words = text.split(' ');
  const avgLength = Math.ceil(words.length / numChunks);
  const chunks = [];
  for (let i = 0; i < numChunks; i++) {
    const chunk = words.splice(0, avgLength).join(' ');
    chunks.push(chunk);
  }
  return chunks;
}

document.getElementById('processButton').addEventListener('click', () => {
  const text = document.getElementById('inputText').value;
  if (!text.trim()) {
    alert('Please enter some text.');
    return;
  }

  const chunks = splitTextIntoChunks(text, 4);
  const output = document.getElementById('printable');
  output.innerHTML = '';

  const prefixes = ['0001', '0011', '0111', '1111'];
  chunks.forEach((chunk, index) => {
    const encryptedChunk = rot13Encrypt(chunk);
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `<span>${prefixes[index]}</span> <span class="dragon_alphabet">${encryptedChunk}</span><br/><br/>`;
    output.appendChild(paragraph);
  });

  document.getElementById('exportPdfButton').style.display = 'block';
});

