function pushLinks(arrToPushTo, source, target) {
  arrToPushTo.push({
    source: source.id,
    target: target.sameAs,
  });
}

export { pushLinks };
