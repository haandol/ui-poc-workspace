import { baseConfigs } from '../../eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'

const prettierRulesWithoutVue = Object.fromEntries(
  Object.entries(prettierConfig.rules || {}).filter(([key]) => !key.startsWith('vue/'))
)

export default [
  ...baseConfigs,
  {
    ignores: ['.nuxt/**', '.output/**'],
  },
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/no-v-html': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': 'off',
    },
  },
  {
    rules: prettierRulesWithoutVue,
  },
]
