// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    rules: { 'no-console': 'off', 'regexp/no-super-linear-backtracking': 'off', 'ts/no-this-alias': 'off', 'regexp/no-useless-assertions': 'off', 'regexp/no-obscure-range': 'off' },
  },
)
