// 由于动态加载太困难，直接从html加载
async function loadFoot() {
  try {
    const response = await fetch('/footer.html');
    if (!response.ok) {
      throw new Error(`Failed to load footer: ${response.status}`);
    }
    const html = await response.text();
    const footer = document.createElement('footer');
    footer.innerHTML = html;
    document.body.appendChild(footer);
  } catch (error) {
    console.error(error);
  }
}