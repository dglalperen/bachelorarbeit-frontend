function randomColor(r,g,b){
    return 'rgb('+random(r)+','+random(g)+','+random(b)+')';    
   }

function random(number){
    return Math.floor(Math.random()*number);;
    }   

function makeOrgNodeAndLink(data,nodes,links){
    if(data.org){
        data.org.forEach((o) =>{
          if(o.sameAs){
              // organization node
              nodes.push({
                  id: o.sameAs,
                  name: o.name,
                  __typename: o.__typename,
                  color: randomColor(255,0,0),
                  sizeInPx: 4
              })

              links.push({
                source: data.id, target: o.sameAs
              })

          }
        })

    }
}

function makePerNodeAndLink(data,nodes,links){
    if(data.per){
        data.per.forEach((o) =>{
          if(o.sameAs){
              // organization node
              nodes.push({
                  id: o.sameAs,
                  name: o.name,
                  __typename: o.__typename,
                  color: randomColor(0,255,0),
                  sizeInPx: 4
              })

              links.push({
                source: data.id, target: o.sameAs
              })

          }
        })

    }
}



function makeLocNodeAndLink(data,nodes,links){
    if(data.loc){
        data.loc.forEach((o) =>{
          if(o.sameAs){
              // location node
              nodes.push({
                  id: o.sameAs,
                  name: o.name,
                  __typename: o.__typename,
                  color: randomColor(0,0,255),
                  sizeInPx: 4
              })

              links.push({
                source: data.id, target: o.sameAs
              })

          }
        })

    }
}

export { makeLocNodeAndLink, makeOrgNodeAndLink, makePerNodeAndLink}

