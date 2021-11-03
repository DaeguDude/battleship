## 10/31

- Set up the linting process using lint-staged, husky, prettier

## 11/01

Serializes to the same string

What does this mean???

```javascript
const PatrolBoat = Ship("PatrolBoat");
PatrolBoat.hit(-1);
expect(PatrolBoat.getHits()).toEqual(["noHit", "noHit"]);

// Expected: ["noHit", "noHit"]
// Received: serializes to the same string
```

Answer was [here](https://stackoverflow.com/a/57230422) Basically, when you put an index with -, it actually
puts the property inside the array.

```javascript
const arr = [1, 2];
arr[-1] = "foo";

console.log(arr);
// [1, 2, -1: 'foo']
```

So they serialize to the same string, but they are not equal.
Also another helpful [github issues](https://github.com/facebook/jest/issues/8475#issuecomment-495943549) related to this
