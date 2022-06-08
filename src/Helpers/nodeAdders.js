function pushNewsNode(arrToPushTo, data) {
  arrToPushTo.push({
    id: data.id,
    name: data.headline,
    __typename: data.__typename,
    color: "black",
    sizeInPx: 6,
  });
}

function pushNodes(arrToPushTo, data, entityTypeStr, nodeColorStr) {
  arrToPushTo.push({
    id: data.sameAs,
    name: data.name,
    __typename: entityTypeStr,
    color: nodeColorStr,
    sizeInPx: 5,
  });
}

export { pushNewsNode, pushNodes };
