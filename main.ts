// API 站点配置
const API_SITES = {
  heimuer: {
    api: 'https://json.heimuer.xyz',
    name: '服务器1',
    detail: 'https://heimuer.tv',
  },
  ffzy: {
    api: 'http://ffzy5.tv',
    name: '服务器2',
    detail: 'http://ffzy5.tv',
  },
};

// HTML 模板 - 与原始代码完全相同
const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="zh" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的电视</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {}
            }
        }
    </script>
    <style>
        :root {
            --color-bg-primary: #f8fafc;
            --color-bg-secondary: #f1f5f9;
            --color-text-primary: #0f172a;
            --color-text-secondary: #334155;
            --color-accent: #6366f1;
            --color-border: #e2e8f0;
            --color-card-bg: #ffffff;
            --color-card-border: #e2e8f0;
            --color-btn-primary: #6366f1;
            --color-btn-hover: #4f46e5;
            --color-gradient-from: #1e293b;
            --color-gradient-to: #64748b;
        }
        
        .dark {
            --color-bg-primary: #0f172a;
            --color-bg-secondary: #1e293b;
            --color-text-primary: #f8fafc;
            --color-text-secondary: #cbd5e1;
            --color-accent: #6366f1;
            --color-border: #334155;
            --color-card-bg: #1e293b;
            --color-card-border: #334155;
            --color-btn-primary: #6366f1;
            --color-btn-hover: #4f46e5;
            --color-gradient-from: #f9fafb;
            --color-gradient-to: #94a3b8;
        }

        .page-bg {
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.05) 2%, transparent 0%),
                radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.05) 2%, transparent 0%);
            background-size: 100px 100px;
        }
        
        .dark .page-bg {
            background-image: 
                radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%),
                radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
            border: 1px solid var(--color-card-border);
            backdrop-filter: blur(10px);
            background-color: var(--color-card-bg);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .card-hover:hover {
            border-color: var(--color-accent);
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-text {
            background: linear-gradient(to right, var(--color-gradient-from), var(--color-gradient-to));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .button-glow {
            position: relative;
            z-index: 1;
            overflow: hidden;
        }
        
        .button-glow:after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        .button-glow:hover:after {
            opacity: 1;
        }
        
        .settings-panel {
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
            background-color: var(--color-card-bg);
            border-left: 1px solid var(--color-border);
        }
        
        .settings-panel.show {
            transform: translateX(0);
        }
        
        /* 自定义滚动条样式 */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--color-bg-secondary);
            border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--color-border);
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--color-text-secondary);
        }
        
        /* Firefox 滚动条样式 */
        * {
            scrollbar-width: thin;
            scrollbar-color: var(--color-border) var(--color-bg-secondary);
        }
        
        .search-container {
            position: relative;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .search-input {
            transition: all 0.3s ease;
            border: 1px solid var(--color-border);
            background: var(--color-bg-secondary);
            color: var(--color-text-primary);
            backdrop-filter: blur(10px);
        }
        
        .search-input:focus {
            border-color: var(--color-accent);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        
        .search-button {
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            background-color: var(--color-btn-primary);
        }
        
        .search-button:hover {
            background-color: var(--color-btn-hover);
        }
        
        .modal-content {
            animation: modalFadeIn 0.3s ease forwards;
            background-color: var(--color-card-bg);
            border: 1px solid var(--color-border);
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        
        .episode-button {
            transition: all 0.2s ease;
            background-color: var(--color-bg-secondary);
            color: var(--color-text-primary);
            border: 1px solid var(--color-border);
        }
        
        .episode-button:hover {
            transform: translateY(-2px);
            background-color: var(--color-accent);
            color: white;
            border-color: var(--color-accent);
        }
        
        .theme-toggle {
            width: 50px;
            height: 26px;
            border-radius: 15px;
            background-color: var(--color-bg-secondary);
            position: relative;
            cursor: pointer;
            transition: background-color 0.3s ease;
            border: 1px solid var(--color-border);
        }
        
        .theme-toggle:before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            background-color: var(--color-accent);
            transition: transform 0.3s ease;
        }
        
        .dark .theme-toggle:before {
            transform: translateX(24px);
        }
    </style>
</head>
<body class="page-bg font-sans">
    <div class="fixed top-6 right-6 z-50 flex items-center space-x-4">
        <div id="themeToggle" class="theme-toggle flex items-center justify-between px-1.5" onclick="toggleTheme()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        </div>
        <button onclick="toggleSettings(event)" class="bg-opacity-80 hover:bg-opacity-100 border rounded-xl px-4 py-2.5 transition-all button-glow" style="background-color: var(--color-bg-secondary); border-color: var(--color-border); color: var(--color-text-primary);">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
        </button>
    </div>
    
    <!-- 设置面板 -->
    <div id="settingsPanel" class="settings-panel fixed right-0 top-0 h-full w-80 p-6 z-40">
        <div class="flex justify-between items-center mb-8">
            <h3 class="text-xl font-bold gradient-text">设置</h3>
            <button onclick="toggleSettings()" class="h-8 w-8 flex items-center justify-center rounded-full transition-colors" style="color: var(--color-text-secondary);">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="space-y-5">
            <div>
                <label class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">选择采集站点</label>
                <select id="apiSource" class="w-full px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors" style="background-color: var(--color-bg-secondary); border: 1px solid var(--color-border); color: var(--color-text-primary);">
                    <option value="heimuer">黑莓影视 (heimuer)</option>
                    <option value="ffzy">非凡影视 (ffzy)</option>
                    <option value="custom">自定义接口</option>
                </select>
            </div>
            
            <!-- 添加自定义接口输入框 -->
            <div id="customApiInput" class="hidden">
                <label class="block text-sm font-medium mb-2" style="color: var(--color-text-secondary);">自定义接口地址</label>
                <input 
                    type="text" 
                    id="customApiUrl" 
                    class="w-full px-3 py-2.5 rounded-lg focus:outline-none transition-colors"
                    placeholder="请输入接口地址..."
                    style="background-color: var(--color-bg-secondary); border: 1px solid var(--color-border); color: var(--color-text-primary);"
                >
            </div>
            
            <div class="mt-6 pt-4" style="border-top: 1px solid var(--color-border);">
                <p class="text-xs" style="color: var(--color-text-secondary);">当前站点代码：
                    <span id="currentCode" style="color: var(--color-text-primary); font-family: monospace;"></span>
                    <span id="siteStatus" class="ml-2"></span>
                </p>
            </div>
        </div>
    </div>
    
    <div class="container mx-auto px-4 py-8 flex flex-col h-screen">
        <div class="flex-1 flex flex-col">
            <!-- 搜索区域：默认居中 -->
            <div id="searchArea" class="flex-1 flex flex-col items-center justify-center transition-all duration-500 ease-out">
                <h1 class="text-5xl sm:text-6xl font-bold gradient-text mb-16">视频搜索</h1>
                <div class="w-full max-w-2xl">
                    <div class="flex search-container">
                        <input type="text" 
                               id="searchInput" 
                               class="w-full search-input px-6 py-4 rounded-l-xl focus:outline-none" 
                               placeholder="搜索你喜欢的视频...">
                        <button onclick="search()" 
                                class="px-8 py-4 text-white font-medium rounded-r-xl transition-colors search-button">
                            搜索
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- 搜索结果：初始隐藏 -->
            <div id="resultsArea" class="w-full hidden mt-10">
                <div id="results" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                </div>
            </div>
        </div>
    </div>
    
    <!-- 详情模态框 -->
    <div id="modal" class="fixed inset-0 hidden z-50 flex items-center justify-center" style="background-color: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);">
        <div class="modal-content p-6 sm:p-8 rounded-xl w-11/12 max-w-4xl max-h-[90vh] flex flex-col">
            <div class="flex justify-between items-center mb-6 flex-none">
                <h2 id="modalTitle" class="text-2xl font-bold gradient-text"></h2>
                <button onclick="closeModal()" class="h-10 w-10 flex items-center justify-center rounded-full transition-colors" style="color: var(--color-text-secondary);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div id="modalContent" class="overflow-auto flex-1 min-h-0">
                <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                </div>
            </div>
        </div>
    </div>
    
    <!-- 错误提示框 -->
    <div id="toast" class="fixed top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 opacity-0 -translate-y-full">
        <p id="toastMessage"></p>
    </div>
    
    <!-- 添加 loading 提示框 -->
    <div id="loading" class="fixed inset-0 hidden items-center justify-center z-50" style="backdrop-filter: blur(8px);">
        <div class="p-6 rounded-xl flex items-center space-x-4" style="background-color: var(--color-card-bg); border: 1px solid var(--color-border);">
            <div class="w-7 h-7 rounded-full animate-spin" style="border: 3px solid var(--color-accent); border-top-color: transparent;"></div>
            <p style="color: var(--color-text-primary);" class="text-lg">加载中...</p>
        </div>
    </div>
    
    <script>
        let currentApiSource = localStorage.getItem('currentApiSource') || 'heimuer';
        let customApiUrl = localStorage.getItem('customApiUrl') || '';
        
        // 初始化主题设置
        function initTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.documentElement.classList.remove('dark');
            } else {
                document.documentElement.classList.add('dark');
            }
        }
        
        // 切换主题
        function toggleTheme() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }
        
        // 初始化主题
        initTheme();
        
        // 初始化时检查是否使用自定义接口
        if (currentApiSource === 'custom') {
            document.getElementById('customApiInput').classList.remove('hidden');
            document.getElementById('customApiUrl').value = customApiUrl;
        }
        
        // 设置 select 的默认选中值
        document.getElementById('apiSource').value = currentApiSource;
        
        function toggleSettings(e) {
            // 阻止事件冒泡，防止触发document的点击事件
            e && e.stopPropagation();
            const panel = document.getElementById('settingsPanel');
            panel.classList.toggle('show');
        }
        
        async function testSiteAvailability(source) {
            try {
                const apiParams = source === 'custom' 
                    ? '&customApi=' + encodeURIComponent(customApiUrl)
                    : '&source=' + source;
                    
                const response = await fetch('/api/search?wd=test' + apiParams);
                const data = await response.json();
                return data.code !== 400;
            } catch (error) {
                return false;
            }
        }
        
        function updateSiteStatus(isAvailable) {
            const statusEl = document.getElementById('siteStatus');
            if (isAvailable) {
                statusEl.innerHTML = '<span style="color: #10b981;">●</span> <span style="color: #34d399;">可用</span>';
            } else {
                statusEl.innerHTML = '<span style="color: #ef4444;">●</span> <span style="color: #f87171;">不可用</span>';
            }
        }
        
        document.getElementById('apiSource').addEventListener('change', async function(e) {
            currentApiSource = e.target.value;
            const customApiInput = document.getElementById('customApiInput');
            
            if (currentApiSource === 'custom') {
                customApiInput.classList.remove('hidden');
                customApiUrl = document.getElementById('customApiUrl').value;
                localStorage.setItem('customApiUrl', customApiUrl);
                // 自定义接口不立即测试可用性
                document.getElementById('siteStatus').innerHTML = '<span style="color: #9ca3af;">●</span> <span style="color: #d1d5db;">待测试</span>';
            } else {
                customApiInput.classList.add('hidden');
                // 非自定义接口立即测试可用性
                showToast('正在测试站点可用性...', 'info');
                const isAvailable = await testSiteAvailability(currentApiSource);
                updateSiteStatus(isAvailable);
                
                if (!isAvailable) {
                    showToast('当前站点不可用，请尝试其他站点', 'error');
                } else {
                    showToast('站点可用', 'success');
                }
            }
            
            localStorage.setItem('currentApiSource', currentApiSource);
            document.getElementById('currentCode').textContent = currentApiSource;
            
            // 清理搜索结果
            document.getElementById('results').innerHTML = '';
            document.getElementById('searchInput').value = '';
        });
        
        // 修改自定义接口输入框的事件监听
        document.getElementById('customApiUrl').addEventListener('blur', async function(e) {
            customApiUrl = e.target.value;
            localStorage.setItem('customApiUrl', customApiUrl);
            
            if (currentApiSource === 'custom' && customApiUrl) {
                showToast('正在测试接口可用性...', 'info');
                const isAvailable = await testSiteAvailability('custom');
                updateSiteStatus(isAvailable);
                
                if (!isAvailable) {
                    showToast('接口不可用，请检查地址是否正确', 'error');
                } else {
                    showToast('接口可用', 'success');
                }
            }
        });
        
        // 初始化显示当前站点代码和状态
        document.getElementById('currentCode').textContent = currentApiSource;
        testSiteAvailability(currentApiSource).then(updateSiteStatus);
        
        function showToast(message, type = 'error') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            const bgColors = {
                'error': 'bg-red-500',
                'success': 'bg-emerald-500',
                'info': 'bg-blue-500'
            };
            
            const bgColor = bgColors[type] || bgColors.error;
            toast.className = \`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 \${bgColor} text-white\`;
            toastMessage.textContent = message;
            
            // 显示提示
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
            
            // 3秒后自动隐藏
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(-100%)';
            }, 3000);
        }
        
        // 添加显示/隐藏 loading 的函数
        function showLoading() {
            const loading = document.getElementById('loading');
            loading.style.display = 'flex';
        }
        
        function hideLoading() {
            const loading = document.getElementById('loading');
            loading.style.display = 'none';
        }
        
        async function search() {
            showLoading();
            const query = document.getElementById('searchInput').value;
            const apiParams = currentApiSource === 'custom' 
                ? '&customApi=' + encodeURIComponent(customApiUrl)
                : '&source=' + currentApiSource;
            
            try {
                const response = await fetch('/api/search?wd=' + encodeURIComponent(query) + apiParams);
                const data = await response.json();
                
                if (data.code === 400) {
                    showToast(data.msg);
                    return;
                }
                
                // 显示结果区域，调整搜索区域
                document.getElementById('searchArea').classList.remove('flex-1');
                document.getElementById('searchArea').classList.add('mb-8');
                document.getElementById('resultsArea').classList.remove('hidden');
                
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = data.list.map(item => \`
                    <div class="card-hover rounded-xl overflow-hidden cursor-pointer p-6 h-fit transition-all" onclick="showDetails('\${item.vod_id}','\${item.vod_name}')">
                        <h3 class="text-xl font-semibold mb-3" style="color: var(--color-text-primary);">\${item.vod_name}</h3>
                        <p style="color: var(--color-text-secondary);" class="text-sm mb-2">\${item.type_name}</p>
                        <p class="text-sm font-medium" style="color: var(--color-accent);">\${item.vod_remarks}</p>
                    </div>
                \`).join('');
            } catch (error) {
                showToast('搜索请求失败，请稍后重试');
            } finally {
                hideLoading();
            }
        }
        
        async function showDetails(id, vod_name) {
            showLoading();
            try {
                const apiParams = currentApiSource === 'custom' 
                    ? '&customApi=' + encodeURIComponent(customApiUrl)
                    : '&source=' + currentApiSource;
                    
                const response = await fetch('/api/detail?id=' + id + apiParams);
                const data = await response.json();
                
                const modal = document.getElementById('modal');
                const modalTitle = document.getElementById('modalTitle');
                const modalContent = document.getElementById('modalContent');
                
                modalTitle.textContent = vod_name;
                modalContent.innerHTML = \`
                    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-2">
                        \${data.episodes.map((episode, index) => \`
                            <button onclick="playVideo('\${episode}','\${vod_name}')" 
                                    class="episode-button px-4 py-2.5 rounded-lg transition-all text-center">
                                第\${index + 1}集
                            </button>
                        \`).join('')}
                    </div>
                \`;
                
                modal.classList.remove('hidden');
            } catch (error) {
                showToast('获取详情失败，请稍后重试');
            } finally {
                hideLoading();
            }
        }
        
        function closeModal() {
            document.getElementById('modal').classList.add('hidden');
            // 清除 iframe 内容
            document.getElementById('modalContent').innerHTML = '';
        }
        
        function playVideo(url, vod_name) {
            showLoading();
            const modalContent = document.getElementById('modalContent');
            const modalTitle = document.getElementById('modalTitle');
            const currentHtml = modalContent.innerHTML;
            
            // 从当前点击的按钮获取集数
            const episodeNumber = event.target.textContent.replace(/[^0-9]/g, '');
            
            // 更新标题显示
            modalTitle.textContent = vod_name + " - 第" + episodeNumber + "集";
            
            // 先移除现有的视频播放器（如果存在）
            const existingPlayer = modalContent.querySelector('.video-player');
            if (existingPlayer) {
                existingPlayer.remove();
            }
            
            // 如果是第一次播放，保存集数列表
            if (!modalContent.querySelector('.episodes-list')) {
                modalContent.innerHTML = \`
                    <div class="space-y-6">
                        <div class="video-player rounded-lg overflow-hidden shadow-xl">
                            <iframe 
                                src="https://hoplayer.com/index.html?url=\${url}&autoplay=true"
                                width="100%" 
                                height="600" 
                                frameborder="0" 
                                scrolling="no" 
                                allowfullscreen="true"
                                onload="hideLoading()">
                            </iframe>
                        </div>
                        <div class="episodes-list mt-6">
                            \${currentHtml}
                        </div>
                    </div>
                \`;
            } else {
                // 如果已经有集数列表，只更新视频播放器
                const episodesList = modalContent.querySelector('.episodes-list');
                modalContent.innerHTML = \`
                    <div class="space-y-6">
                        <div class="video-player rounded-lg overflow-hidden shadow-xl">
                            <iframe 
                                src="https://hoplayer.com/index.html?url=\${url}&autoplay=true"
                                width="100%" 
                                height="600" 
                                frameborder="0" 
                                scrolling="no" 
                                allowfullscreen="true"
                                onload="hideLoading()">
                            </iframe>
                        </div>
                        <div class="episodes-list mt-6">
                            \${episodesList.innerHTML}
                        </div>
                    </div>
                \`;
            }
        }
        
        // 点击外部关闭设置面板
        document.addEventListener('click', function(e) {
            const panel = document.getElementById('settingsPanel');
            const settingsButton = document.querySelector('button[onclick="toggleSettings(event)"]');
            
            if (!panel.contains(e.target) && !settingsButton.contains(e.target) && panel.classList.contains('show')) {
                panel.classList.remove('show');
            }
        });
        
        // 回车搜索
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                search();
            }
        });
    </script>
</body>
</html>
`;

// 处理请求的函数
async function handleRequest(request) {
  const url = new URL(request.url);
  const customApi = url.searchParams.get('customApi') || '';

  // API 路由处理
  if (url.pathname === '/api/search') {
    const searchQuery = url.searchParams.get('wd');
    const source = url.searchParams.get('source') || 'heimuer';

    try {
      const apiUrl = customApi
        ? customApi
        : API_SITES[source].api + '/api.php/provide/vod/?ac=list&wd=' + encodeURIComponent(searchQuery || '');
        
      const response = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('API 请求失败');
      }
      
      const data = await response.text();
      return new Response(data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          code: 400,
          msg: '搜索服务暂时不可用，请稍后再试',
          list: [],
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
    }
  }

  if (url.pathname === '/api/detail') {
    const id = url.searchParams.get('id');
    const source = url.searchParams.get('source') || 'heimuer';
    const customApiParam = url.searchParams.get('customApi') || '';
    const detailUrl = `https://r.jina.ai/${
      customApiParam ? customApiParam : API_SITES[source].detail
    }/index.php/vod/detail/id/${id}.html`;
    
    try {
      const response = await fetch(detailUrl);
      const html = await response.text();

      // 更新正则表达式以匹配新的 URL 格式
      let matches = [];
      if (source === 'ffzy') {
        matches = html.match(/(?<=\$)(https?:\/\/[^"'\s]+?\/\d{8}\/\d+_[a-f0-9]+\/index\.m3u8)/g) || [];
        matches = matches.map(link => link.split('(')[1]);
      } else {
        matches = html.match(/\$https?:\/\/[^"'\s]+?\.m3u8/g) || [];
        matches = matches.map(link => link.substring(1)); // 移除开头的 $
      }

      return new Response(
        JSON.stringify({
          episodes: matches,
          detailUrl: detailUrl,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } catch (error) {
      console.error('API 详情请求错误:', error);
      return new Response(
        JSON.stringify({
          code: 400,
          msg: '获取详情失败，请稍后重试',
          episodes: [],
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }

  // 默认返回 HTML 页面
  return new Response(HTML_TEMPLATE, {
    headers: { 'Content-Type': 'text/html' },
  });
}

// 配置并启动 Deno 服务器
Deno.serve({ port: 8000 }, handleRequest);
