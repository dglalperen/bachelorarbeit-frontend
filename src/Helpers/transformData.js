import { makeLocNodeAndLink, makePerNodeAndLink, makeOrgNodeAndLink } from "./generateNodesAndLinks";

const transformData = (data) => {
    const nodes = [];
    const links = [];
  
    if(!data){
        return {nodes: nodes, links: links}
    }
    
    data.forEach((a) => {

          // article node
          nodes.push({
              id: a.id,
              image: a.image,
              name: a.headline,
              __typename: a.__typename,
              color: "grey",
              sizeInPx: 6,
          })

          // Org,Loc and Per nodes + links
          makeOrgNodeAndLink(a,nodes,links)
          makeLocNodeAndLink(a,nodes,links)
          makePerNodeAndLink(a,nodes,links)  
    })

    return{
        nodes,
        links
    }
}

export default transformData;

