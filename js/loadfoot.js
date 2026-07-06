async function loadFoot() {
  try {
    // 1. 获取当前网站的根域名绝对路径，防止多级子页面找不到 footer.html
    const rootPath = window.location.origin;
    
    // 2. 核心：在 URL 后面拼接一个动态随机时间戳（?_t=...），彻底摧毁任何层级的缓存
    const cacheBuster = `?_t=${Date.now()}`;
    const targetUrl = `${rootPath}/footer.html${cacheBuster}`;

    // 3. 发起网络请求，由于加了时间戳，GitHub Pages 必须返回刚刚生成的最新带 CommitID 的成品
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Failed to load footer: ${response.status}`);
    }
    
    const html = await response.text();
    const footer = document.createElement('footer');
    footer.innerHTML = html;
    document.body.appendChild(footer);
  } catch (error) {
    console.error("Footer Failed to load: ", error);
  }
}
