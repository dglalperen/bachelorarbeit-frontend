const companyByQid = `query companyByQid {
  companyByQid(qid: "Q154950") {
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

const locationByQid = `query LocationByQid {
  locationByQid(qid: "Q145") {
    qid
    type
    label
    description
    head_of_state{
      qid
      label
      __typename
    }
  }
}`;

const personByQid = `query PersonByQid {
  personByQid(qid: "Q15650949") {
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

export { companyByQid, locationByQid, personByQid };
