import { getEntityQuery } from "./getEntityQuery";

const getDataUnwrapper = (entityType) => {
  switch (entityType) {
    case "org":
      return "companyByQid";
    case "per":
      return "personByQid";
    case "loc":
      return "locationByQid";
    default:
      break;
  }
};

const fetchEntity = (url, entityType, qid) => {
  var entityData = {};
  const QUERY = getEntityQuery(entityType, qid);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  })
    .then((response) => response.json())
    .then((data) => {
      entityData = data["data"][getDataUnwrapper(entityType)];
    })
    .catch((err) => {
      console.log(err);
    });
  return entityData;
};

export default fetchEntity;
