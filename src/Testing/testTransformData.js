import { randomColor } from "../Helpers/generateColor";

const testTransformData = (data) => {

  console.log(data)
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

/* 
nodeCanvasObject={(node, ctx, globalScale) => {
  const label = node.name;
  const fontSize = 15 / globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  const textWidth = ctx.measureText(label).width;
  const bckgDimensions = [textWidth, fontSize].map(
    (n) => n + fontSize * 0.2
  ); // some padding

  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillRect(
    node.x - bckgDimensions[0] / 2,
    node.y - bckgDimensions[1] / 2,
    ...bckgDimensions
  );

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = node.color;
  ctx.fillText(label, node.x, node.y);

  node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
}} */
