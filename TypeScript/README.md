# Gilded Rose

This is the Gilded Rose kata in TypeScript.

## Notes on the refactor
Although the most natural approach to the problem in my opinion was to move the update logic to the Item class, creating a bunch of specialized Item classes using Abstract classes or interfaces, that damn Goblin wasn't going to let me. So I've created specialized versions of the update function inside the gildedrose class. Those functions decide the amount quality they are going to change for each Item and rely on quality increase/decrease (which I've kept separate for readability purpose) functions to make the changes .


## Getting started

Install dependencies

```sh
npm install
```

## Running app
_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

## Running tests

To run all tests

### Jest way

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

### Mocha way

```sh
npm run test:mocha
```
