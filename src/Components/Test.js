import useFetchTest from "../Helpers/useFetchTest";
import testTransformData from "../Helpers/testTransformData";
import ForceGraph2D from "react-force-graph-2d";
import { locationByQid, personByQid, companyByQid } from "../Helpers/queries";

const Test = () => {
  const { someData, isLoading, error } = useFetchTest(
    "http://195.37.233.209:4000/graphql",
    `${companyByQid}`,
    "companyByQid"
  );

  //TODO 1: fetch data (location,company,person)
  //TODO 2: create first node
  //TODO 3: When clicking append more nodes

  return (
    <div className="test">
      <p>Beispiel Firma: {someData.label}</p>
      {someData && (
        <ForceGraph2D
          height={800}
          width={1000}
          //backgroundColor="#A9A9A9"
          backgroundColor="#fdf7fa"
          nodeColor={"color"}
          nodeLabel={"name"}
          nodeVal={"sizeInPx"}
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
          }}
          
          graphData={testTransformData(someData)}
        />
      )}
    </div>
  );
};

export default Test;
