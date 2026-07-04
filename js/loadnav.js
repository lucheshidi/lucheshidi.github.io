function loadNav(activePage) {
  // 定义导航菜单项（英文标签）
  var items = [
    { id: 'home', text: 'Home', href: '/' },
    { id: 'contact', text: 'Contact', href: '/contact/' },
    { id: 'projects', text: 'Projects', href: '/projects/' },
    { id: 'blog', text: 'Blog', href: '/blog/' },
    { id: 'pages', text: 'Other Pages', href: '/pages/' }
  ];

  // 创建导航容器并设置样式
  var nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.style.position = 'fixed';
  nav.style.top = '0';
  nav.style.left = '0';
  nav.style.right = '0';
  nav.style.zIndex = '9999';
  nav.style.background = 'rgba(11, 17, 26, 0.95)';
  nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
  nav.style.padding = '0 0';
  nav.style.boxSizing = 'border-box';
  nav.style.fontFamily = 'sans-serif';
  nav.style.display = 'flex';
  nav.style.alignItems = 'center';
  nav.style.justifyContent = 'flex-start';
  nav.style.gap = '10px';
  nav.style.transition = 'transform 0.3s ease, box-shadow 0.5s ease';

  var icon = document.createElement('img');
  icon.src = '/assets/banner.png';
  icon.alt = 'Site icon';
  icon.style.width = '150px';
  icon.style.height = '75px';
  icon.style.objectFit = 'contain';
  icon.style.marginRight = '12px';
  icon.style.marginLeft = '1rem';
  icon.style.flexShrink = '0';
  nav.appendChild(icon);

  // 创建链接容器
  var navdiv = document.createElement('div');
  navdiv.style.display = 'flex';
  navdiv.style.gap = '10px';
  navdiv.style.alignItems = 'center';
  navdiv.className = 'nav';
  // 设置为nav的子元素
  nav.appendChild(navdiv);

  // 项目下拉内容（示例）
  var projectsDropdownItems = [
    { text: 'LucheOS', href: '/projects/lucheos/' },
    { text: 'LucheShell', href: '/projects/lucheshell/' }
  ];

  // 遍历菜单项并创建链接
  items.forEach(function(item) {
    var link = document.createElement('a');
    link.id = 'navlink'
    link.href = item.href;
    link.textContent = item.text;
    link.dataset.navId = item.id;
    link.style.color = '#e5e7eb';
    link.style.textDecoration = 'none';
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.padding = '6px 12px';
    link.style.fontSize = '15px';
    link.style.margin = '0px';
    link.style.padding = '0.4rem 1rem';
    link.style.transition = 'color 0.3s ease, transform 0.2s ease';
    link.className = 'navlink';

    // 高亮当前激活页面
    if (activePage && activePage.toString() === item.id) {
      link.style.color = '#93c5fd';
      link.style.fontWeight = '700';
      link.style.borderBottom = '2px solid #4f46e5';
    }

    // 对 Projects 添加下拉菜单，并将链接与下拉放在同一个容器内
    if (item.id === 'projects') {
      var wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-flex';
      wrapper.style.alignItems = 'center';

      link.innerHTML = item.text + ' <span aria-hidden="true" style="font-size:0.85em; margin-left:0.2rem;">▾</span>';

      var dropdown = document.createElement('div');
      dropdown.style.position = 'absolute';
      dropdown.style.left = '0';
      dropdown.style.top = '100%';
      dropdown.style.background = 'rgba(11, 17, 26, 0.96)';
      dropdown.style.border = '1px solid rgba(255,255,255,0.08)';
      dropdown.style.borderRadius = '6px';
      dropdown.style.display = 'none';
      dropdown.style.opacity = '0';
      dropdown.style.transform = 'translateY(8px)';
      dropdown.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
      dropdown.style.flexDirection = 'column';
      dropdown.style.minWidth = '180px';
      dropdown.style.boxShadow = '0 10px 24px rgba(0,0,0,0.35)';
      dropdown.style.overflow = 'hidden';
      dropdown.style.zIndex = '10000';

      projectsDropdownItems.forEach(function(d) {
        var di = document.createElement('a');
        di.href = d.href;
        di.textContent = d.text;
        di.style.padding = '0.5rem 1rem';
        di.style.color = '#e5e7eb';
        di.style.textDecoration = 'none';
        di.style.display = 'block';
        di.style.transition = 'background 0.2s ease';
        di.addEventListener('mouseenter', function() { di.style.background = 'rgba(255,255,255,0.08)'; });
        di.addEventListener('mouseleave', function() { di.style.background = 'transparent'; });
        dropdown.appendChild(di);
      });

      var dropdownOpen = false;

      function setDropdownOpen(open) {
        dropdownOpen = open;
        if (open) {
          dropdown.style.display = 'block';
          requestAnimationFrame(function() {
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
          });
        } else {
          dropdown.style.opacity = '0';
          dropdown.style.transform = 'translateY(8px)';
          setTimeout(function() { dropdown.style.display = 'none'; }, 200);
        }
      }

      link.addEventListener('click', function(e) {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen);
      });

      document.addEventListener('click', function(e) {
        if (!wrapper.contains(e.target)) {
          setDropdownOpen(false);
        }
      });

      wrapper.appendChild(link);
      wrapper.appendChild(dropdown);
      navdiv.appendChild(wrapper);
    } else {
      navdiv.appendChild(link);
    }
  });

  // 如果已有导航，则先移除旧的
  var existing = document.getElementById('site-nav');
  if (existing) {
    existing.parentNode.removeChild(existing);
  }

  // 将导航插入到 body 的最前面
  document.body.insertBefore(nav, document.body.firstChild);

  // 保持 body 的顶部内边距，以避免内容跳动
  function updateBodyPadding() {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
  }

  updateBodyPadding();
  window.addEventListener('resize', updateBodyPadding);
}
