const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('HTML Demo Files', () => {
  const rootDir = path.join(__dirname, '..');
  
  it('should have index.html', () => {
    const htmlPath = path.join(rootDir, 'index.html');
    assert.ok(fs.existsSync(htmlPath), 'index.html should exist');
    const content = fs.readFileSync(htmlPath, 'utf8');
    assert.ok(content.includes('<!DOCTYPE html>'), 'should be HTML5');
    assert.ok(content.includes('<title>'), 'should have title');
    assert.ok(content.includes('<button'), 'should have button');
  });

  it('should have styles.css', () => {
    const cssPath = path.join(rootDir, 'styles.css');
    assert.ok(fs.existsSync(cssPath), 'styles.css should exist');
    const content = fs.readFileSync(cssPath, 'utf8');
    assert.ok(content.includes('@media') || content.includes('flex') || content.includes('grid'), 'should have modern CSS');
    assert.ok(content.includes('transition') || content.includes('transform'), 'should have animations');
  });

  it('should have script.js', () => {
    const jsPath = path.join(rootDir, 'script.js');
    assert.ok(fs.existsSync(jsPath), 'script.js should exist');
    const content = fs.readFileSync(jsPath, 'utf8');
    assert.ok(content.includes('addEventListener') || content.includes('onclick'), 'should have event listeners');
    assert.ok(content.includes('alert') || content.includes('console.log'), 'should have interaction');
  });

  it('should link CSS and JS correctly', () => {
    const htmlPath = path.join(rootDir, 'index.html');
    const content = fs.readFileSync(htmlPath, 'utf8');
    assert.ok(content.includes('styles.css'), 'should link styles.css');
    assert.ok(content.includes('script.js'), 'should link script.js');
  });
});
