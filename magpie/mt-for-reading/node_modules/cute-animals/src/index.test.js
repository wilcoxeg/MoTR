const animal = require('./index')
const adjectives = require('../corpus/adjectives')
const animals = require('../corpus/animals')
const allWords = [...adjectives, ...animals]

// repeat tests a few times for good measure
const REPEAT_TIMES = 10

/** Repeats a function n times. */
const repeat = f => {
  // eslint-disable-next-line fp/no-loops
  for (let i = 0; i < REPEAT_TIMES; i++) {
    f()
  }
}

test('no arguments', () => {
  repeat(() => {
    expect(allWords).toContain(animal())
  })
})

test('adj', () => {
  repeat(() => {
    expect(adjectives).toContain(animal('adj'))
  })
})

test('animal', () => {
  repeat(() => {
    expect(animals).toContain(animal('animal'))
  })
})

test('combination', () => {
  repeat(() => {
    const result = animal('adj animal').split(' ')
    expect(adjectives).toContain(result[0])
    expect(animals).toContain(result.slice(1).join(' '))
  })
})
