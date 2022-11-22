# cute-animals
[![npm version](https://img.shields.io/npm/v/cute-animals.svg)](https://npmjs.org/package/cute-animals)

Generates random cute adj-animal combinations that are kid-friendly and not too weird. 

## Install

```sh
npm install --save cute-animals
```

## Usage

### Module

```js
const animal = require('cute-animals')
```

Generate one random animal:

```js
animal()

/*
yak
water boa
ocelot
butterfly
giant panda
*/
```

Generate one random adjective:

```js
animal('adj')

/*
blissful
goofy
sweet
tumbly
pretty
*/
```

Generate two adjectives and an animal:

```js
animal('adj adj animal')

/*
warmhearted tranquil tarantula
yummmy divine mackerel
little exquisite moose
elated tender blue bird
heavenly optimistic starfish
*/
```

### CLI

```sh
$ cute-animals adj adj animal
elated sincere sloth
```

## Corpus

### Adjectives

```
<%=adjectives.join('\n')%>
```

### Animals

```
<%=animals.join('\n')%>
```

