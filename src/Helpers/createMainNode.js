const createMainNode = (data, setNodes) => {
  if (data.qid) {
    setNodes({
      nodes: [
        {
          id: data.qid,
          name: data.label,
          __typename: data.type,
          color: "blue",
          sizeInPx: 6,
        },
      ],
      links: [],
    });
  }
};

export default createMainNode;
