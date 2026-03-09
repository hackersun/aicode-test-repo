/**
 * 工具函数集合
 * @module utils
 */

/**
 * 计算数组平均值
 * @param {number[]} numbers - 数字数组
 * @returns {number} 平均值
 * @throws {Error} 数组为空时抛出错误
 */
function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

/**
 * 检查字符串是否为有效的邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 将对象转换为查询字符串
 * @param {Object} params - 参数对象
 * @returns {string} 查询字符串
 */
function toQueryString(params) {
  if (!params || typeof params !== 'object') return '';
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

/**
 * 防抖函数
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

module.exports = {
  average,
  isValidEmail,
  toQueryString,
  debounce
};
