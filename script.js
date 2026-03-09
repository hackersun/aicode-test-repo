/**
 * AICode HTML Demo - 交互脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    // 获取按钮元素
    const alertBtn = document.getElementById('alertBtn');
    const themeBtn = document.getElementById('themeBtn');
    const countBtn = document.getElementById('countBtn');
    const countSpan = document.getElementById('count');
    
    // 点击计数器
    let clickCount = 0;
    
    /**
     * 显示欢迎提示
     */
    alertBtn.addEventListener('click', () => {
        const messages = [
            '🎉 欢迎来到 AICode HTML Demo！',
            '✨ 这是一个响应式网页示例',
            '🚀 使用现代 Web 技术构建',
            '💻 由 AICode 开发'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        alert(randomMessage);
    });
    
    /**
     * 切换深色/浅色主题
     */
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // 更新按钮图标
        const icon = newTheme === 'dark' ? '☀️' : '🌙';
        const text = newTheme === 'dark' ? '切换亮色' : '切换暗色';
        themeBtn.innerHTML = `${icon} ${text}`;
        
        // 保存用户偏好
        localStorage.setItem('theme', newTheme);
        
        console.log(`Theme switched to: ${newTheme}`);
    });
    
    /**
     * 点击计数功能
     */
    countBtn.addEventListener('click', () => {
        clickCount++;
        countSpan.textContent = clickCount;
        
        // 添加点击动画效果
        countBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            countBtn.style.transform = '';
        }, 100);
        
        // 特殊数字提示
        if (clickCount === 10) {
            alert('🎊 太棒了！你已经点击了 10 次！');
        } else if (clickCount === 50) {
            alert('🏆 哇！50 次点击！你是点击大师！');
        }
        
        console.log(`Button clicked ${clickCount} times`);
    });
    
    /**
     * 恢复用户主题偏好
     */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const icon = savedTheme === 'dark' ? '☀️' : '🌙';
        const text = savedTheme === 'dark' ? '切换亮色' : '切换暗色';
        themeBtn.innerHTML = `${icon} ${text}`;
    }
    
    /**
     * 添加键盘快捷键支持
     */
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter 触发提示
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            alertBtn.click();
        }
        // Ctrl/Cmd + T 切换主题
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            themeBtn.click();
        }
    });
    
    // 页面加载完成日志
    console.log('✅ AICode HTML Demo loaded successfully!');
    console.log('📱 Try resizing the window to see responsive design');
    console.log('⌨️  Shortcuts: Ctrl+Enter (alert), Ctrl+T (theme)');
});
