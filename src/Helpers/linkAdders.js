function pushLinks(arrToPushTo, source, target) {
  arrToPushTo.push({
    source: source?.id,
    target: target?.sameAs,
  });
}

function pushEntityLinks(arrToPushTo, source, target) {
  if (source && target) {
    arrToPushTo.push({
      source: source?.id,
      target: target?.qid,
    });
  }
}

export { pushLinks, pushEntityLinks };
