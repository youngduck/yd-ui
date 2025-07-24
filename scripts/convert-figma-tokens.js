const fs = require('fs');
const path = require('path');

// 피그마 Variables JSON 예시 (실제로는 Export된 파일 사용)
const figmaVariables = {
  variables: [
    // 색상 토큰
    {
      name: 'Primary-50',
      value: '#FFFBEB',
      type: 'color',
    },
    {
      name: 'Primary-100',
      value: '#FEF3C7',
      type: 'color',
    },
    {
      name: 'Primary-200',
      value: '#FDE68A',
      type: 'color',
    },
    {
      name: 'Primary-300',
      value: '#FCD34D',
      type: 'color',
    },
    {
      name: 'Primary-400',
      value: '#FBBF24',
      type: 'color',
    },
    {
      name: 'Primary-500',
      value: '#F59E0B',
      type: 'color',
    },
    {
      name: 'Primary-600',
      value: '#D97708',
      type: 'color',
    },

    // 타이포그래피 토큰
    {
      name: 'yds-h1-font-size',
      value: '48px',
      type: 'typography',
    },
    {
      name: 'yds-h1-line-height',
      value: '58px',
      type: 'typography',
    },
    {
      name: 'yds-h1-font-weight',
      value: '600',
      type: 'typography',
    },
    {
      name: 'yds-h2-font-size',
      value: '40px',
      type: 'typography',
    },
    {
      name: 'yds-h2-line-height',
      value: '48px',
      type: 'typography',
    },
    {
      name: 'yds-h2-font-weight',
      value: '600',
      type: 'typography',
    },
    {
      name: 'yds-s1-font-size',
      value: '24px',
      type: 'typography',
    },
    {
      name: 'yds-s1-line-height',
      value: '30px',
      type: 'typography',
    },
    {
      name: 'yds-s1-font-weight',
      value: '600',
      type: 'typography',
    },
    {
      name: 'yds-s2-font-size',
      value: '24px',
      type: 'typography',
    },
    {
      name: 'yds-s2-line-height',
      value: '30px',
      type: 'typography',
    },
    {
      name: 'yds-s2-font-weight',
      value: '500',
      type: 'typography',
    },
    {
      name: 'yds-b1-font-size',
      value: '18px',
      type: 'typography',
    },
    {
      name: 'yds-b1-line-height',
      value: '26px',
      type: 'typography',
    },
    {
      name: 'yds-b1-font-weight',
      value: '400',
      type: 'typography',
    },
    {
      name: 'yds-b2-font-size',
      value: '16px',
      type: 'typography',
    },
    {
      name: 'yds-b2-line-height',
      value: '24px',
      type: 'typography',
    },
    {
      name: 'yds-b2-font-weight',
      value: '400',
      type: 'typography',
    },
    {
      name: 'yds-c1m-font-size',
      value: '12px',
      type: 'typography',
    },
    {
      name: 'yds-c1m-line-height',
      value: '16px',
      type: 'typography',
    },
    {
      name: 'yds-c1m-font-weight',
      value: '500',
      type: 'typography',
    },
    {
      name: 'yds-c1r-font-size',
      value: '12px',
      type: 'typography',
    },
    {
      name: 'yds-c1r-line-height',
      value: '16px',
      type: 'typography',
    },
    {
      name: 'yds-c1r-font-weight',
      value: '400',
      type: 'typography',
    },
    {
      name: 'yds-c2r-font-size',
      value: '10px',
      type: 'typography',
    },
    {
      name: 'yds-c2r-line-height',
      value: '14px',
      type: 'typography',
    },
    {
      name: 'yds-c2r-font-weight',
      value: '400',
      type: 'typography',
    },
  ],
};

// 색상 변수로 변환
function generateColorVariables(variables) {
  const colorVariables = variables.filter((v) => v.type === 'color');
  let css = '    /* Color Tokens */\n';

  colorVariables.forEach((variable) => {
    const name = variable.name.toLowerCase().replace(/-/g, '-');
    css += `    --${name}: ${variable.value};\n`;
  });

  return css;
}

// 타이포그래피 변수로 변환
function generateTypographyVariables(variables) {
  const typographyVariables = variables.filter((v) => v.type === 'typography');
  let css = '    /* Typography Tokens */\n';

  typographyVariables.forEach((variable) => {
    const name = variable.name.toLowerCase().replace(/-/g, '-');
    css += `    --${name}: ${variable.value};\n`;
  });

  return css;
}

// YDS 컴포넌트 클래스 생성 (토스처럼 element.style에 묶이도록)
function generateYDSComponents(variables) {
  const typographyVariables = variables.filter((v) => v.type === 'typography');

  // 타이포그래피 토큰을 그룹화
  const typographyGroups = {};
  typographyVariables.forEach((variable) => {
    const parts = variable.name.split('-');
    const group = parts[1]; // yds-h1, yds-s2 등
    if (!typographyGroups[group]) {
      typographyGroups[group] = {};
    }

    if (variable.name.includes('font-size')) {
      typographyGroups[group].fontSize = variable.value;
    } else if (variable.name.includes('line-height')) {
      typographyGroups[group].lineHeight = variable.value;
    } else if (variable.name.includes('font-weight')) {
      typographyGroups[group].fontWeight = variable.value;
    }
  });

  let css =
    '@layer components {\n  /* YDS Typography Components - 토스처럼 element.style에 묶여서 표시 */\n';

  Object.entries(typographyGroups).forEach(([group, props]) => {
    css += `  .${group} {\n`;
    css += `    font-size: var(--${group}-font-size);\n`;
    css += `    line-height: var(--${group}-line-height);\n`;
    css += `    font-weight: var(--${group}-font-weight);\n`;
    css += `  }\n\n`;
  });

  css += '}\n';
  return css;
}

// CSS 변수로 변환
function generateCSSVariables(variables) {
  let css =
    '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n';

  css += generateColorVariables(variables);
  css += '\n';
  css += generateTypographyVariables(variables);

  css +=
    '  }\n\n  * {\n    @apply border-neutral-200;\n  }\n  body {\n    @apply bg-background text-foreground;\n  }\n}\n\n';

  // YDS 컴포넌트 클래스 추가
  css += generateYDSComponents(variables);

  return css;
}

// Tailwind config로 변환
function generateTailwindConfig(variables) {
  const colorVariables = variables.filter((v) => v.type === 'color');
  const typographyVariables = variables.filter((v) => v.type === 'typography');

  let config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-400)',
`;

  // 색상 토큰
  colorVariables.forEach((variable) => {
    const name = variable.name.toLowerCase().replace(/-/g, '-');
    const shortName = name.replace('primary-', '');
    config += `          '${shortName}': 'var(--${name})',\n`;
  });

  config += `        },
        secondary: {
          DEFAULT: '#0A8CC4',
        },
        danger: {
          DEFAULT: '#ED1515',
        },
        warning: {
          DEFAULT: '#F87209',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontSize: {
`;

  // 타이포그래피 토큰을 그룹화
  const typographyGroups = {};
  typographyVariables.forEach((variable) => {
    const parts = variable.name.split('-');
    const group = parts[1]; // yds-h1, yds-s2 등
    if (!typographyGroups[group]) {
      typographyGroups[group] = {};
    }

    if (variable.name.includes('font-size')) {
      typographyGroups[group].fontSize = variable.value;
    } else if (variable.name.includes('line-height')) {
      typographyGroups[group].lineHeight = variable.value;
    } else if (variable.name.includes('font-weight')) {
      typographyGroups[group].fontWeight = variable.value;
    }
  });

  // 타이포그래피 클래스 생성 (yds- 접두사 사용)
  Object.entries(typographyGroups).forEach(([group, props]) => {
    config += `        '${group}': ['${props.fontSize}', { lineHeight: '${props.lineHeight}', fontWeight: '${props.fontWeight}' }],\n`;
  });

  config += `      },
    },
  },
  plugins: [],
}`;

  return config;
}

// --- 마커 블록 교체 유틸리티 ---
function replaceBlock(src, startMarker, endMarker, newBlock) {
  const startIdx = src.indexOf(startMarker);
  const endIdx = src.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) return src; // 마커 없으면 전체 유지
  const before = src.slice(0, startIdx + startMarker.length);
  const after = src.slice(endIdx);
  return before + '\n' + newBlock.trim() + '\n' + after;
}

// --- globals.css 갱신 ---
function updateGlobalsCSS(newTokensBlock) {
  const filePath = path.join(__dirname, '../src/styles/globals.css');
  let src = fs.readFileSync(filePath, 'utf8');
  const startMarker = '/* FIGMA TOKENS START */';
  const endMarker = '/* FIGMA TOKENS END */';
  const updated = replaceBlock(src, startMarker, endMarker, newTokensBlock);
  fs.writeFileSync(filePath, updated);
}

// --- tailwind.config.js 갱신 ---
function updateTailwindConfig(newTokensBlock) {
  const filePath = path.join(__dirname, '../tailwind.config.js');
  let src = fs.readFileSync(filePath, 'utf8');
  const startMarker = '/* FIGMA TOKENS START */';
  const endMarker = '/* FIGMA TOKENS END */';
  const updated = replaceBlock(src, startMarker, endMarker, newTokensBlock);
  fs.writeFileSync(filePath, updated);
}

// --- FIGMA 토큰 블록 생성 ---
function getGlobalsTokensBlock(variables) {
  return [
    '/* Color Tokens */',
    generateColorVariables(variables),
    '',
    '/* Typography Tokens */',
    generateTypographyVariables(variables),
  ].join('\n');
}

function getTailwindColorsBlock(variables) {
  // primary 계열만 자동 변환
  const colorVariables = variables.filter(
    (v) => v.type === 'color' && v.name.toLowerCase().startsWith('primary-')
  );
  let block = 'colors: {\n  primary: {\n    DEFAULT: "var(--primary-400)",\n';
  colorVariables.forEach((variable) => {
    const key = variable.name.split('-')[1];
    if (key && key !== '400') {
      block += `    ${key}: 'var(--primary-${key})',\n`;
    }
  });
  block += '  },\n},';
  return block;
}

function getTailwindTokensBlock(variables) {
  // fontSize만 토큰으로 교체
  const typographyVariables = variables.filter((v) => v.type === 'typography');
  const typographyGroups = {};
  typographyVariables.forEach((variable) => {
    const parts = variable.name.split('-');
    const group = parts[1];
    if (!typographyGroups[group]) typographyGroups[group] = {};
    if (variable.name.includes('font-size'))
      typographyGroups[group].fontSize = variable.value;
    else if (variable.name.includes('line-height'))
      typographyGroups[group].lineHeight = variable.value;
    else if (variable.name.includes('font-weight'))
      typographyGroups[group].fontWeight = variable.value;
  });
  let block = 'fontSize: {\n';
  Object.entries(typographyGroups).forEach(([group, props]) => {
    block += `  'yds-${group}': ['${props.fontSize}', { lineHeight: '${props.lineHeight}', fontWeight: '${props.fontWeight}' }],\n`;
  });
  block += '}';
  return block;
}

// --- 메인 ---
function updateFiles() {
  // globals.css 토큰 블록 생성 및 교체
  const globalsBlock = getGlobalsTokensBlock(figmaVariables.variables);
  updateGlobalsCSS(globalsBlock);

  // tailwind.config.js colors 토큰 블록 생성 및 교체
  const tailwindColorsBlock = getTailwindColorsBlock(figmaVariables.variables);
  updateTailwindConfigColors(tailwindColorsBlock);

  // tailwind.config.js fontSize 토큰 블록 생성 및 교체
  const tailwindBlock = getTailwindTokensBlock(figmaVariables.variables);
  updateTailwindConfig(tailwindBlock);

  console.log('✅ FIGMA 토큰 블록만 갱신 완료!');
}

// --- tailwind.config.js colors 블록만 교체 ---
function updateTailwindConfigColors(newColorsBlock) {
  const filePath = path.join(__dirname, '../tailwind.config.js');
  let src = fs.readFileSync(filePath, 'utf8');
  const startMarker = '/* FIGMA TOKENS COLORS START */';
  const endMarker = '/* FIGMA TOKENS COLORS END */';
  const updated = replaceBlock(src, startMarker, endMarker, newColorsBlock);
  fs.writeFileSync(filePath, updated);
}

updateFiles();
