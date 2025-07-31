const fs = require('fs');
const path = require('path');

// tokens.json 파일 읽기
function loadTokens() {
  try {
    const tokensPath = path.join(__dirname, '../tokens.json');
    const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    console.log('✅ tokens.json 로드 완료');
    return tokensData;
  } catch (error) {
    console.error('❌ tokens.json 로드 실패:', error.message);
    process.exit(1);
  }
}

// CSS 변수 생성
function generateCSSVariables(tokens) {
  let css = '  /* FIGMA TOKENS START */\n\n';

  // Color Tokens
  if (tokens.global.Primary) {
    css += '  /* Color Tokens */\n';
    Object.entries(tokens.global.Primary).forEach(([key, value]) => {
      if (value.type === 'color') {
        const colorValue = value.value;
        // {Yellow.Yellow-50} 형태를 CSS 색상으로 변환
        const cssColor = convertTokenToCSSColor(colorValue);
        css += `  --primary-${key}: ${cssColor};\n`;
      }
    });
    css += '\n';
  }

  // Typography Tokens
  if (tokens.global['Text Font']) {
    css += '  /* Typography Tokens */\n';
    Object.entries(tokens.global['Text Font']).forEach(([key, value]) => {
      if (value.type === 'typography') {
        const typography = value.value;

        // YDS 네이밍 규칙에 맞게 변환
        const ydsKey = convertToYDSKey(key);

        // fontSize 추출
        if (typography.fontSize) {
          const fontSize = convertTokenToCSSValue(typography.fontSize);
          css += `  --yds-${ydsKey}-font-size: ${fontSize};\n`;
        }

        // lineHeight 추출
        if (typography.lineHeight) {
          const lineHeight = convertTokenToCSSValue(typography.lineHeight);
          css += `  --yds-${ydsKey}-line-height: ${lineHeight};\n`;
        }

        // fontWeight 추출
        if (typography.fontWeight) {
          const fontWeight = convertTokenToCSSValue(typography.fontWeight);
          css += `  --yds-${ydsKey}-font-weight: ${fontWeight};\n`;
        }
      }
    });
    css += '  /* FIGMA TOKENS END */\n\n';
  }

  // Font Family
  css += '  /* Font Family */\n';
  css += "  --font-family-yds-wanted: 'Wanted Sans Variable';\n";

  return css;
}

// Tailwind Config 생성
function generateTailwindConfig(tokens) {
  let config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      /* FIGMA TOKENS COLORS START */
      colors: {
        primary: {
          DEFAULT: 'var(--primary-400)',\n`;

  // Color Tokens
  if (tokens.global.Primary) {
    Object.entries(tokens.global.Primary).forEach(([key, value]) => {
      if (value.type === 'color') {
        config += `          ${key}: 'var(--primary-${key})',\n`;
      }
    });
  }

  config += `        },
      },
      /* FIGMA TOKENS COLORS END */

      /* FIGMA TOKENS START */
      fontSize: {\n`;

  // Typography Tokens
  if (tokens.global['Text Font']) {
    Object.entries(tokens.global['Text Font']).forEach(([key, value]) => {
      if (value.type === 'typography') {
        const typography = value.value;
        const ydsKey = convertToYDSKey(key);

        const fontSize = convertTokenToCSSValue(typography.fontSize);
        const lineHeight = convertTokenToCSSValue(typography.lineHeight);
        const fontWeight = convertTokenToCSSValue(typography.fontWeight);

        config += `        'yds-${ydsKey}': ['${fontSize}', { lineHeight: '${lineHeight}', fontWeight: '${fontWeight}' }],\n`;
      }
    });
  }

  config += `      },
      /* FIGMA TOKENS END */

      /* YDS Font Family : Wanted Sans Variable */
      fontFamily: {
        'yds-wanted': ['Wanted Sans Variable'],
      },
      screens: {
        pcHover: {
          raw: '(hover: hover) and (pointer: fine)',
        },
      },
    },
  },
  plugins: [],
};
`;

  return config;
}

// 토큰 값을 CSS 값으로 변환
function convertTokenToCSSValue(tokenValue) {
  if (typeof tokenValue === 'string') {
    // {fontSize.0} 형태를 실제 값으로 변환
    if (tokenValue.startsWith('{') && tokenValue.endsWith('}')) {
      const tokenName = tokenValue.slice(1, -1);

      // 기본 매핑 (실제로는 tokens.json에서 참조해야 함)
      const tokenMap = {
        'fontSize.0': '48px',
        'fontSize.1': '18px',
        'fontSize.2': '16px',
        'fontSize.3': '40px',
        'fontSize.4': '24px',
        'fontSize.5': '20px',
        'fontSize.7': '12px',
        'fontSize.9': '10px',
        'lineHeights.0': '58px',
        'lineHeights.1': '26px',
        'lineHeights.2': '24px',
        'lineHeights.3': '48px',
        'lineHeights.4': '30px',
        'lineHeights.5': '26px',
        'lineHeights.7': '16px',
        'lineHeights.9': '14px',
        'fontWeights.wanted-sans-0': '600',
        'fontWeights.wanted-sans-1': '400',
        'fontWeights.wanted-sans-2': '500',
      };

      return tokenMap[tokenName] || tokenValue;
    }
  }
  return tokenValue;
}

// 토큰 색상을 CSS 색상으로 변환
function convertTokenToCSSColor(colorToken) {
  if (typeof colorToken === 'string') {
    if (colorToken.startsWith('{') && colorToken.endsWith('}')) {
      const tokenName = colorToken.slice(1, -1);

      // Yellow 색상 매핑
      const colorMap = {
        'Yellow.Yellow-50': '#fcf6df',
        'Yellow.Yellow-100': '#c9bf91',
        'Yellow.Yellow-200': '#fde68a',
        'Yellow.Yellow-300': '#eccb43',
        'Yellow.Yellow-400': '#e9be11',
      };

      return colorMap[tokenName] || colorToken;
    }
  }
  return colorToken;
}

// YDS 네이밍 규칙으로 변환
function convertToYDSKey(key) {
  const keyMap = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    S1: 's1',
    S2: 's2',
    B1: 'b1',
    B2: 'b2',
    C1: 'c1m',
    C2: 'c1r',
    C3: 'c2r',
  };

  return keyMap[key] || key.toLowerCase();
}

// 파일 생성
function generateFiles() {
  const tokens = loadTokens();

  // globals-test.css 생성
  const cssContent = `@import url('https://fastly.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
${generateCSSVariables(tokens)}  }

  /* 기본 폰트 설정 */
  html {
    font-family: var(--font-family-yds-wanted);
  }

  body {
    font-family: var(--font-family-yds-wanted);
  }
}

@layer components {
  /* Button Typography - CSS 변수 사용 */
  .yds-button-typography {
    font-size: var(--yds-button-font-size);
    line-height: var(--yds-button-line-height);
    font-weight: var(--yds-button-font-weight);
  }
}
`;

  // tailwind-test.config.js 생성
  const tailwindContent = generateTailwindConfig(tokens);

  // 파일 저장
  const cssPath = path.join(__dirname, '../src/styles/globals-test.css');
  const tailwindPath = path.join(__dirname, '../tailwind-test.config.js');

  fs.writeFileSync(cssPath, cssContent);
  fs.writeFileSync(tailwindPath, tailwindContent);

  console.log('✅ globals-test.css 생성 완료');
  console.log('✅ tailwind-test.config.js 생성 완료');
  console.log('\n📁 생성된 파일들:');
  console.log(`   - ${cssPath}`);
  console.log(`   - ${tailwindPath}`);
}

// 실행
generateFiles();
