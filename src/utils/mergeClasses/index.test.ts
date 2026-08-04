import { mergeClasses } from '.'

describe('mergeClasses function', () => {
  it('should merge class names and resolve Tailwind conflicts', () => {
    expect(mergeClasses('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })
})
