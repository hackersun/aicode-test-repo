/**
 * 主入口文件
 */
const utils = require('./utils');

// 导出所有工具函数
module.exports = {
  ...utils
};

// 如果直接运行，展示示例
if (require.main === module) {
  console.log('=== AICode Test Repo - Utility Functions Demo ===\n');
  
  // 测试 average
  const scores = [85, 92, 78, 96, 88];
  console.log(`Scores: ${scores.join(', ')}`);
  console.log(`Average: ${utils.average(scores)}\n`);
  
  // 测试 isValidEmail
  const emails = ['test@example.com', 'invalid-email', 'user@domain.org'];
  emails.forEach(email => {
    console.log(`${email} is valid: ${utils.isValidEmail(email)}`);
  });
  console.log();
  
  // 测试 toQueryString
  const params = { name: 'John Doe', age: 30, city: 'New York' };
  console.log(`Query string: ${utils.toQueryString(params)}\n`);
  
  console.log('=== Demo Complete ===');
}
