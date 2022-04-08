import transformData from "../Helpers/transformData";
import useFetch from "../Helpers/useFetch";
import ForceGraph2D from "react-force-graph-2d";
import News from "./News";


const NodeGraph = () => {
  const { someData: newsData, isLoading, error } = useFetch(
    "http://195.37.233.209:4000/graphql",
    `query{
      news(limit: 2){
        id 
        __typename
        image
        headline
          org{
              sameAs
              name
              __typename
          }
          per{
              sameAs
              name
              __typename
          }
          loc {
            sameAs
            name
            __typename
          }
      }
    }`, "news"
  );

  return (
    <div className="node-graph">
      <News/>

      <ForceGraph2D
      height={800}
      width={1000}
      //backgroundColor="#A9A9A9"
      backgroundColor="#fdf7fa"
      nodeColor={"color"}
      nodeLabel={"name"}
      nodeVal={"sizeInPx"}
      graphData={transformData(newsData)}
    />
    </div>
    
  );
};

//839073
//6e6362

export default NodeGraph;
