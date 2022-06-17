function intersectionOf(set1, set2) {
  let intersection = set1.filter((a) => set2.some((b) => a.name === b.name));
  return intersection.length;
}

function unionOf(set1, set2) {
  let union = [...set2, ...set1].filter(
    (
      (set) => (o) =>
        set.has(o.name) ? false : set.add(o.name)
    )(new Set())
  );
  return union.length;
}

function getJaccardIndexOf(set1, set2) {
  return intersectionOf(set1, set2) / unionOf(set1, set2);
}

export { getJaccardIndexOf };
