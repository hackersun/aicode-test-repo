const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Login Page Files', () => {
  const rootDir = path.join(__dirname, '..');
  
  it('should have login.html', () => {
    const filePath = path.join(rootDir, 'login.html');
    assert.ok(fs.existsSync(filePath), 'login.html should exist');
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(content.includes('<!DOCTYPE html>'), 'should be HTML5');
    assert.ok(content.includes('username') || content.includes('email'), 'should have username input');
    assert.ok(content.includes('password'), 'should have password input');
    assert.ok(content.includes('button') || content.includes('submit'), 'should have login button');
  });

  it('should have login.css', () => {
    const filePath = path.join(rootDir, 'login.css');
    assert.ok(fs.existsSync(filePath), 'login.css should exist');
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(content.includes('@media') || content.includes('flex'), 'should have responsive design');
    assert.ok(content.includes('transition') || content.includes('animation'), 'should have animations');
    assert.ok(content.includes('gradient') || content.includes('background'), 'should have background styles');
  });

  it('should have login.js', () => {
    const filePath = path.join(rootDir, 'login.js');
    assert.ok(fs.existsSync(filePath), 'login.js should exist');
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(content.includes('addEventListener') || content.includes('onclick'), 'should have event listeners');
    assert.ok(content.includes('password') || content.includes('toggle'), 'should handle password toggle');
  });

  it('should link CSS and JS correctly in HTML', () => {
    const htmlPath = path.join(rootDir, 'login.html');
    const content = fs.readFileSync(htmlPath, 'utf8');
    assert.ok(content.includes('login.css'), 'should link login.css');
    assert.ok(content.includes('login.js'), 'should link login.js');
  });

  it('should have all required form elements', () => {
    const htmlPath = path.join(rootDir, 'login.html');
    const content = fs.readFileSync(htmlPath, 'utf8');
    assert.ok(content.includes('remember') || content.includes('checkbox'), 'should have remember me option');
    assert.ok(content.includes('forget') || content.includes('forgot'), 'should have forgot password link');
    assert.ok(content.includes('register') || content.includes('signup'), 'should have register link');
  });
});
