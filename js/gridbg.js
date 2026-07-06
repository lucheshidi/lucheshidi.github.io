// ==================== 纯2D 移动网格 - 修复边缘格子高亮 ====================

function init2DGrid(canvasId = "grid-bg", options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  const config = {
    gridSize: 168,
    speed: -0.525,
    lineColor: 'rgba(0, 0, 0, 0.15)',
    fadeColor: 'rgba(255, 255, 255, 0.8)',
    mouseColor: 'rgba(100, 180, 255, 0.25)',
    ...options
  };

  let width, height, offset = 0;
  let mouseX = 0, mouseY = 0;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function draw() {
    // 背景淡化
    ctx.fillStyle = config.fadeColor;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = config.lineColor;
    ctx.lineWidth = 1.8;

    const gs = config.gridSize;
    const offsetMod = offset % gs;

    // 绘制网格
    let y = -offsetMod;
    while (y < height) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      y += gs;
    }

    let x = -offsetMod;
    while (x < width) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
      x += gs;
    }

    // ==================== 修复后的鼠标格子高亮 ====================
    if (mouseX && mouseY) {
      // 正确的格子计算（考虑偏移和边缘情况）
      const adjustedX = mouseX + offsetMod;
      const adjustedY = mouseY + offsetMod;
      
      const cellX = Math.floor(adjustedX / gs) * gs - offsetMod;
      const cellY = Math.floor(adjustedY / gs) * gs - offsetMod;

      // 只在画布范围内绘制
      if (cellX < width && cellY < height && cellX + gs > 0 && cellY + gs > 0) {
        ctx.save();
        ctx.fillStyle = config.mouseColor;
        ctx.fillRect(cellX, cellY, gs, gs);
        ctx.restore();
      }
    }

    offset += config.speed;
    requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouseX = mouseY = 0;
  });

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}

// ==================== 使用配置 ====================
document.addEventListener('DOMContentLoaded', () => {
  init2DGrid('grid-bg', {
    gridSize: 90,
    speed: -0.3,
    lineColor: 'rgba(255, 255, 255, 0.5)',
    fadeColor: 'rgba(9, 11, 16, 1)',

    // 自定义鼠标所在格子的高亮颜色
    mouseColor: 'rgb(100, 100, 100)'
  });
});