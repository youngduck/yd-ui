const fs = require('fs');
const path = require('path');

// 피그마 Variables JSON 예시 (실제로는 Export된 파일 사용)
const figmaVariables = {
  variables: [
    {
      name: 'Primary-50',
      value: '#FFFBEB',
    },
    {
      name: 'Primary-100',
      value: '#FEF3C7',
    },
    {
      name: 'Primary-200',
      value: '#FDE68A',
    },
    {
      name: 'Primary-300',
      value: '#FCD34D',
    },
    {
      name: 'Primary-400',
      value: '#FBBF24',
    },
    {
      name: 'Primary-500',
      value: '#F59E0B',
    },
    {
      name: 'Primary-600',
      value: '#D97708',
    },
  ],
};

// CSS 변수로 변환
function generateCSSVariables(variables) {
  let css = '@layer base {\n  :root {\n';

  variables.forEach((variable) => {
    const name = variable.name.toLowerCase().replace(/-/g, '-');
    css += `    --${name}: ${variable.value};\n`;
  });

  css += '  }\n}\n';
  return css;
}

// Tailwind config로 변환
function generateTailwindConfig(variables) {
  let config =
    'module.exports = {\n  theme: {\n    extend: {\n      colors: {\n';

  variables.forEach((variable) => {
    const name = variable.name.toLowerCase().replace(/-/g, '-');
    config += `        '${name}': 'var(--${name})',\n`;
  });

  config += '      }\n    }\n  }\n}';
  return config;
}

// 파일 생성
function updateFiles() {
  // globals.css 업데이트
  const cssContent = generateCSSVariables(figmaVariables.variables);
  fs.writeFileSync(
    path.join(__dirname, '../src/styles/globals.css'),
    cssContent
  );

  // tailwind.config.js 업데이트
  const tailwindContent = generateTailwindConfig(figmaVariables.variables);
  fs.writeFileSync(
    path.join(__dirname, '../tailwind.config.js'),
    tailwindContent
  );

  console.log('✅ 피그마 토큰이 코드로 변환되었습니다!');
}

updateFiles();
