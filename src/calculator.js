/**
 * 简单计算器模块
 * 用于演示OpenCode开发流程
 */

class Calculator {
  /**
   * 加法运算
   * @param {number} a - 第一个数
   * @param {number} b - 第二个数
   * @returns {number} 和
   */
  add(a, b) {
    return a + b;
  }

  /**
   * 减法运算
   * @param {number} a - 第一个数
   * @param {number} b - 第二个数
   * @returns {number} 差
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * 乘法运算
   * @param {number} a - 第一个数
   * @param {number} b - 第二个数
   * @returns {number} 积
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * 除法运算
   * @param {number} a - 被除数
   * @param {number} b - 除数
   * @returns {number} 商
   * @throws {Error} 除数为零时抛出错误
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

module.exports = Calculator;
