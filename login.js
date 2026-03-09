/**
 * Login Page - 交互脚本
 * AICode 开发
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM 元素
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const rememberCheckbox = document.getElementById('remember');
    const themeToggle = document.getElementById('themeToggle');
    
    // 错误提示元素
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    /**
     * 初始化 - 恢复保存的数据
     */
    function init() {
        // 恢复主题设置
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        // 恢复记住的用户名
        const savedUsername = localStorage.getItem('savedUsername');
        const savedRemember = localStorage.getItem('rememberMe') === 'true';
        
        if (savedUsername && savedRemember) {
            usernameInput.value = savedUsername;
            rememberCheckbox.checked = true;
        }
        
        console.log('✅ Login page initialized');
    }
    
    /**
     * 更新主题图标
     */
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    /**
     * 切换主题
     */
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        console.log(`Theme switched to: ${newTheme}`);
    });
    
    /**
     * 切换密码显示/隐藏
     */
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type');
        const newType = type === 'password' ? 'text' : 'password';
        const icon = togglePasswordBtn.querySelector('i');
        
        passwordInput.setAttribute('type', newType);
        icon.className = newType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        
        // 添加点击反馈动画
        togglePasswordBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            togglePasswordBtn.style.transform = '';
        }, 150);
    });
    
    /**
     * 验证用户名
     */
    function validateUsername(value) {
        if (!value.trim()) {
            return '请输入用户名或邮箱';
        }
        if (value.length < 3) {
            return '用户名至少需要3个字符';
        }
        // 邮箱格式验证
        if (value.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return '请输入有效的邮箱地址';
            }
        }
        return '';
    }
    
    /**
     * 验证密码
     */
    function validatePassword(value) {
        if (!value) {
            return '请输入密码';
        }
        if (value.length < 6) {
            return '密码至少需要6个字符';
        }
        return '';
    }
    
    /**
     * 显示错误信息
     */
    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
        
        // 添加抖动动画
        const inputGroup = element.closest('.input-group');
        inputGroup.classList.add('shake');
        setTimeout(() => {
            inputGroup.classList.remove('shake');
        }, 500);
    }
    
    /**
     * 清除错误信息
     */
    function clearError(element) {
        element.textContent = '';
        element.classList.remove('show');
    }
    
    /**
     * 输入验证事件
     */
    usernameInput.addEventListener('blur', () => {
        const error = validateUsername(usernameInput.value);
        if (error) {
            showError(usernameError, error);
        } else {
            clearError(usernameError);
        }
    });
    
    usernameInput.addEventListener('input', () => {
        clearError(usernameError);
    });
    
    passwordInput.addEventListener('blur', () => {
        const error = validatePassword(passwordInput.value);
        if (error) {
            showError(passwordError, error);
        } else {
            clearError(passwordError);
        }
    });
    
    passwordInput.addEventListener('input', () => {
        clearError(passwordError);
    });
    
    /**
     * 表单提交
     */
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 验证输入
        const usernameErrorMsg = validateUsername(usernameInput.value);
        const passwordErrorMsg = validatePassword(passwordInput.value);
        
        if (usernameErrorMsg) {
            showError(usernameError, usernameErrorMsg);
            usernameInput.focus();
            return;
        }
        
        if (passwordErrorMsg) {
            showError(passwordError, passwordErrorMsg);
            passwordInput.focus();
            return;
        }
        
        // 保存记住密码设置
        if (rememberCheckbox.checked) {
            localStorage.setItem('savedUsername', usernameInput.value);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedUsername');
            localStorage.setItem('rememberMe', 'false');
        }
        
        // 显示加载状态
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        
        // 模拟登录请求
        try {
            await simulateLogin({
                username: usernameInput.value,
                password: passwordInput.value
            });
            
            // 登录成功
            showSuccessMessage();
            
        } catch (error) {
            showErrorMessage(error.message);
        } finally {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    });
    
    /**
     * 模拟登录请求
     */
    function simulateLogin(credentials) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 模拟验证（实际项目中这里调用后端API）
                console.log('Login attempt:', credentials.username);
                
                // 模拟成功率 80%
                if (Math.random() > 0.2) {
                    resolve({ success: true, token: 'mock-jwt-token' });
                } else {
                    reject({ message: '用户名或密码错误，请重试' });
                }
            }, 1500);
        });
    }
    
    /**
     * 显示成功消息
     */
    function showSuccessMessage() {
        // 创建成功提示
        const toast = document.createElement('div');
        toast.className = 'toast toast-success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>登录成功！正在跳转...</span>
        `;
        document.body.appendChild(toast);
        
        // 添加样式
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            box-shadow: 0 10px 40px rgba(72, 187, 120, 0.4);
            z-index: 1000;
            transition: transform 0.3s ease;
        `;
        
        // 显示动画
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // 自动移除
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
    
    /**
     * 显示错误消息
     */
    function showErrorMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-error';
        toast.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: linear-gradient(135deg, #f56565, #e53e3e);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            box-shadow: 0 10px 40px rgba(245, 101, 101, 0.4);
            z-index: 1000;
            transition: transform 0.3s ease;
        `;
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    /**
     * 社交登录按钮
     */
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.classList.contains('google') ? 'Google' :
                           btn.classList.contains('github') ? 'GitHub' : '微信';
            
            // 创建提示
            const toast = document.createElement('div');
            toast.innerHTML = `<i class="fas fa-info-circle"></i> ${platform}登录功能开发中`;
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--bg-card);
                color: var(--text-primary);
                padding: 12px 20px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                font-size: 14px;
            `;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 2000);
        });
    });
    
    /**
     * 键盘快捷键
     */
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter 提交表单
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // 初始化
    init();
    
    console.log('🚀 Login page ready!');
    console.log('💡 Tips:');
    console.log('   - Ctrl+Enter: 快速提交');
    console.log('   - 点击眼睛图标: 切换密码显示');
    console.log('   - 右下角按钮: 切换主题');
});
