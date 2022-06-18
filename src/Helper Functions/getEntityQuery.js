const getEntityQuery = (entityTypeStr, qid) => {
  switch (entityTypeStr) {
    case "org":
      return `query companyByQid {
        companyByQid(qid: "${qid}") {
          type
          qid
          label
          description
          image
          country {
            qid
            label
          }
          ceo {
            qid
            label
          }
          subsidiary {
            qid
            label
          }
      }
      }`;
    case "loc":
      return `query LocationByQid {
        locationByQid(qid: "${qid}") {
          qid
          type
          label
          description
          head_of_state{
            qid
            label
          }
          capital{
            qid
            label
          }
          highest_judicial_authority{
            qid
            label
          }
        }
      }`;
    case "per":
      return `query PersonByQid {
        personByQid(qid: "${qid}") {
          qid
          type
          label
          description
          date_of_birth
          date_of_death
          place_of_birth {
            qid
            label
          }
        country_of_citizenship {
            qid
            label
          }
          employer {
            qid
            label
          }
      }
      }`;
  }
};

export { getEntityQuery };
