function getDataUnwrapper(entityType) {
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
}

export { getDataUnwrapper };
