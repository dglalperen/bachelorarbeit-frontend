function pushLinks(arrToPushTo, source, target) {
  arrToPushTo.push({
    source: source?.id,
    target: target?.sameAs,
  });
}

function pushNewsLink(arrToPushTo, source, target) {
  arrToPushTo.push({
    source: source?.id,
    target: target?.id,
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

export { pushLinks, pushEntityLinks, pushNewsLink };
