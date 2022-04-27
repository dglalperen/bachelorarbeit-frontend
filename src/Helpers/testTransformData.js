import {
  makeLocNodeAndLink,
  makePerNodeAndLink,
  makeOrgNodeAndLink,
} from "./generateNodesAndLinks";
function randomColor(r, g, b) {
  return "rgb(" + random(r) + "," + random(g) + "," + random(b) + ")";
}

function random(number) {
  return Math.floor(Math.random() * number);
}

const testTransformData = (data) => {
  const nodes = [];
  const links = [];
  const countries = [];
  const persons = [];
  const subsidiaries = [];

  if (!data) {
    console.log(data);
    return { nodes: nodes, links: links };
  }
  // Building main node
  nodes.push({
    id: data.qid,
    name: data.label,
    __typename: data.type,
    color: "gray",
    sizeInPx: 6,
  });

  // Pushing Qid´s of countries to country array
  if (data.country) {
    data.country.forEach((o) => {
      nodes.push({
        qid: o.qid,
        name: o.label,
        color: randomColor(0, 0, 255),
        sizeInPx: 4,
      });

      links.push({
        source: data.qid,
        target: o.qid,
      });
    });
  }

  // Pushing Qid´s of persons to persons array
  if (data.ceo) {
    data.ceo.forEach((o) => {
      persons.push(o);
    });
  }

  // Pushing Subsidiary Companies to subsidiaries array
  if (data.subsidiary) {
    data.subsidiary.forEach((o) => {
      subsidiaries.push(o);
    });
  }

  return {
    nodes,
    links,
    countries,
    persons,
    subsidiaries,
  };
};

export default testTransformData;
