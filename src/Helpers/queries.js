
const companyByQid = `query companyByQid {
    companyByQid(qid: "Q154950") {
      qid
      type
      label
      description
      aliases
      legal_form
      logo
      image
      industry {
        qid
        label
      }
      inception
      website
      linkedin
      twitter
      facebook
      instagram
      country {
        qid
        label
      }
      headquarters_location {
        qid
        label
      }
      ceo {
        qid
        label
    start_time
    end_time
      }
      employees {
        value
        point_in_time
      }
      total_revenue {
        value
    unit
        point_in_time
      }
      net_profit {
        value
    unit
        point_in_time
      }
      subsidiary {
        qid
        label
      }
  }
}`;

const locationByQid = `query LocationByQid {
    locationByQid(qid: "Q145") {
      type
      label
      description
    flag_image
      locator_map_image
      country_code
      country_calling_code
      currency
      capital {
        qid
        label
      }
      official_language
      population {
        value
        point_in_time
      }
      basic_form_of_government
      head_of_state {
        qid
        label
      }
      highest_judicial_authority {
        qid
        label
      }
      democracy_index
      human_development_index
      number_of_out_of_school_children {
        value
        point_in_time
      }
      life_expectancy {
        value
        point_in_time
      }
      median_income {
        value
        label
      }
      total_fertility_rate {
        value
        point_in_time
      }
      part_of
      continent
      area {
        value
        label
      }
      latitude
      longitude
      located_in_or_next_to_body_of_water
      member_of
      website
      twitter
      facebook
      image
      country {
        qid
        label
      }
      head_of_government {
        qid
        label
      }
    }
}`;

const personByQid = `query LocationByQid {
    locationByQid(qid: "Q145") {
      type
      label
      description
    flag_image
      locator_map_image
      country_code
      country_calling_code
      currency
      capital {
        qid
        label
      }
      official_language
      population {
        value
        point_in_time
      }
      basic_form_of_government
      head_of_state {
        qid
        label
      }
      highest_judicial_authority {
        qid
        label
      }
      democracy_index
      human_development_index
      number_of_out_of_school_children {
        value
        point_in_time
      }
      life_expectancy {
        value
        point_in_time
      }
      median_income {
        value
        label
      }
      total_fertility_rate {
        value
        point_in_time
      }
      part_of
      continent
      area {
        value
        label
      }
      latitude
      longitude
      located_in_or_next_to_body_of_water
      member_of
      website
      twitter
      facebook
      image
      country {
        qid
        label
      }
      head_of_government {
        qid
        label
      }
    }
}`;

export { companyByQid, locationByQid, personByQid};