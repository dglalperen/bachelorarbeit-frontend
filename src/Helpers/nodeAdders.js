function pushNewsNode(arrToPushTo, data) {
  arrToPushTo.push({
    id: data?.id,
    name: data?.headline,
    __typename: data?.__typename,
    color: "rgba(236, 213, 225, 0.7)",
    sizeInPx: 6,
  });
}

function pushEntityNode(arrToPushTo, data, entityTypeStr, nodeColorStr) {
  arrToPushTo.push({
    id: data.qid,
    name: data.label,
    __typename: entityTypeStr,
    color: nodeColorStr,
    sizeInPx: 5,
  });
}

function pushEntityMainNode(arrToPushTo, data, entityTypeStr, nodeColorStr) {
  arrToPushTo.push({
    id: data.qid,
    name: data.label,
    __typename: entityTypeStr,
    color: nodeColorStr,
    sizeInPx: 6,
  });
}

function pushNodes(arrToPushTo, data, entityTypeStr, nodeColorStr) {
  arrToPushTo?.push({
    id: data?.sameAs,
    name: data?.name,
    __typename: entityTypeStr,
    color: nodeColorStr,
    sizeInPx: 5,
  });
}

export { pushNewsNode, pushNodes, pushEntityNode, pushEntityMainNode };
