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

  // 创建汉堡菜单按钮（仅在小屏幕显示）
  var hamburger = document.createElement('button');
  hamburger.id = 'nav-hamburger';
  hamburger.style.display = 'none';
  hamburger.style.position = 'absolute';
  hamburger.style.right = '1rem';
  hamburger.style.top = '50%';
  hamburger.style.transform = 'translateY(-50%)';
  hamburger.style.background = 'none';
  hamburger.style.border = 'none';
  hamburger.style.cursor = 'pointer';
  hamburger.style.padding = '0.5rem';
  hamburger.style.zIndex = '10001';
  hamburger.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  hamburger.style.color = '#e5e7eb';
  nav.appendChild(hamburger);

  // 创建链接容器
  var navdiv = document.createElement('div');
  navdiv.style.display = 'flex';
  navdiv.style.gap = '10px';
  navdiv.style.alignItems = 'center';
  navdiv.className = 'nav';
  navdiv.id = 'nav-links-desktop';
  // 设置为nav的子元素
  nav.appendChild(navdiv);

  // 创建侧面菜单容器（仅在小屏幕显示）
  var sideMenu = document.createElement('div');
  sideMenu.id = 'nav-side-menu';
  sideMenu.style.position = 'fixed';
  sideMenu.style.top = '0';
  sideMenu.style.left = '0';
  sideMenu.style.right = '0';
  sideMenu.style.bottom = '0';
  sideMenu.style.background = 'rgba(0, 0, 0, 0.6)';
  sideMenu.style.display = 'none';
  sideMenu.style.zIndex = '9998';
  sideMenu.style.opacity = '0';
  sideMenu.style.transition = 'opacity 0.3s ease';

  var sideMenuContent = document.createElement('div');
  sideMenuContent.id = 'nav-side-content';
  sideMenuContent.style.position = 'fixed';
  sideMenuContent.style.top = '0';
  sideMenuContent.style.left = '-100%';
  sideMenuContent.style.width = '80%';
  sideMenuContent.style.maxWidth = '280px';
  sideMenuContent.style.height = '100%';
  sideMenuContent.style.background = 'rgba(11, 17, 26, 0.98)';
  sideMenuContent.style.zIndex = '10000';
  sideMenuContent.style.overflowY = 'auto';
  sideMenuContent.style.transition = 'left 0.3s ease';
  sideMenuContent.style.display = 'none';

  sideMenu.appendChild(sideMenuContent);

  // 项目下拉内容（示例）
  var projectsDropdownItems = [
    { text: 'LucheOS', href: '/projects/lucheos/' },
    { text: 'LucheShell', href: '/projects/lucheshell/' }
  ];

  // 遍历菜单项并创建链接
  items.forEach(function(item) {
    // === 桌面版导航链接 ===
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

    // === 侧面菜单链接 ===
    var sideLink = document.createElement('a');
    sideLink.href = item.href;
    sideLink.textContent = item.text;
    sideLink.className = 'side-nav-link';
    sideLink.style.display = 'block';
    sideLink.style.padding = '1rem 1.5rem';
    sideLink.style.color = '#e5e7eb';
    sideLink.style.textDecoration = 'none';
    sideLink.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    sideLink.style.transition = 'background 0.2s ease, color 0.2s ease';

    if (activePage && activePage.toString() === item.id) {
      sideLink.style.background = 'rgba(79, 70, 229, 0.2)';
      sideLink.style.color = '#93c5fd';
      sideLink.style.borderLeft = '3px solid #4f46e5';
      sideLink.style.paddingLeft = '1.2rem';
    }

    sideLink.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(255,255,255,0.08)';
    });
    sideLink.addEventListener('mouseleave', function() {
      if (!(activePage && activePage.toString() === item.id)) {
        this.style.background = 'transparent';
      }
    });

    // 对 Projects 添加下拉菜单
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

      // 侧面菜单中Projects也有子菜单
      sideLink.innerHTML = item.text + ' <span aria-hidden="true" style="font-size:0.85em; margin-left:0.2rem;">▾</span>';
      sideLink.style.display = 'flex';
      sideLink.style.justifyContent = 'space-between';
      sideLink.style.alignItems = 'center';

      var sideDropdown = document.createElement('div');
      sideDropdown.style.background = 'rgba(255,255,255,0.04)';
      sideDropdown.style.display = 'none';
      sideDropdown.style.maxHeight = '0';
      sideDropdown.style.overflow = 'hidden';
      sideDropdown.style.transition = 'max-height 0.3s ease';

      projectsDropdownItems.forEach(function(d) {
        var di = document.createElement('a');
        di.href = d.href;
        di.textContent = d.text;
        di.style.display = 'block';
        di.style.padding = '0.75rem 2rem';
        di.style.color = '#cbd5e1';
        di.style.textDecoration = 'none';
        di.style.borderBottom = '1px solid rgba(255,255,255,0.02)';
        di.style.transition = 'background 0.2s ease';
        di.addEventListener('mouseenter', function() { di.style.background = 'rgba(255,255,255,0.08)'; });
        di.addEventListener('mouseleave', function() { di.style.background = 'transparent'; });
        sideDropdown.appendChild(di);
      });

      var sideDropdownOpen = false;

      function setSideDropdownOpen(open) {
        sideDropdownOpen = open;
        if (open) {
          sideDropdown.style.display = 'block';
          sideDropdown.style.maxHeight = '200px';
        } else {
          sideDropdown.style.maxHeight = '0';
          setTimeout(function() { sideDropdown.style.display = 'none'; }, 300);
        }
      }

      sideLink.addEventListener('click', function(e) {
        e.preventDefault();
        setSideDropdownOpen(!sideDropdownOpen);
      });

      var sideWrapper = document.createElement('div');
      sideWrapper.appendChild(sideLink);
      sideWrapper.appendChild(sideDropdown);
      sideMenuContent.appendChild(sideWrapper);
    } else {
      navdiv.appendChild(link);
      sideMenuContent.appendChild(sideLink);
    }
  });


  // 如果已有导航，则先移除旧的
  var existing = document.getElementById('site-nav');
  if (existing) {
    existing.parentNode.removeChild(existing);
  }
  var existingSideMenu = document.getElementById('nav-side-menu');
  if (existingSideMenu) {
    existingSideMenu.parentNode.removeChild(existingSideMenu);
  }

  // 将导航插入到 body 的最前面
  document.body.insertBefore(nav, document.body.firstChild);
  document.body.insertBefore(sideMenu, document.body.firstChild);

  // 汉堡菜单点击事件
  var menuOpen = false;

  function openSideMenu() {
    menuOpen = true;
    sideMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSideMenu() {
    menuOpen = false;
    sideMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  hamburger.addEventListener('click', function() {
    if (menuOpen) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  });

  sideMenu.addEventListener('click', function(e) {
    if (e.target === sideMenu) {
      closeSideMenu();
    }
  });

  // 侧面菜单链接点击后关闭菜单
  var sideLinks = sideMenuContent.querySelectorAll('.side-nav-link');
  sideLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeSideMenu();
    });
  });

  // 保持 body 的顶部内边距，以避免内容跳动
  function updateBodyPadding() {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
  }

  updateBodyPadding();
  window.addEventListener('resize', updateBodyPadding);
}
