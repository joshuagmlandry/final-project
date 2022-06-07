import AddToFavourites from "./AddToFavourites";
import styled from "styled-components";
import DisplayReviews from "./DisplayReviews";
import esriConfig from "@arcgis/core/config";
import Loading from "./Loading";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ReviewForm from "./ReviewForm";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const { REACT_APP_ARCGIS_API } = process.env;

const Campsite = () => {
  const [queriedCampsite, setQueriedCampsite] = useState(null);
  const [queriedCampsiteLoading, setQueriedCampsiteLoading] =
    useState("loading");
  const params = useParams();

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    esriConfig.apiKey = REACT_APP_ARCGIS_API;
    const campsites = new FeatureLayer({
      // url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Accommodation_Hebergement_V2_2/FeatureServer/0",
      url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Campsites_Join/FeatureServer/0",
    });
    const query = campsites.createQuery();
    query.where = `Unique_Site_ID = '${params.id}'`;
    query.outFields = [
      "Accommodation_Type",
      "region_name",
      "place_name",
      "area_name",
      "facility_name",
      "unit_type_name",
      "Unique_Site_ID",
      "Site_Num_Site",
    ];
    campsites.queryFeatures(query).then((data) => {
      setQueriedCampsite(data.features[0].attributes);
      setQueriedCampsiteLoading("idle");
    });
  }, []);

  return (
    <>
      {queriedCampsiteLoading !== "loading" ? (
        queriedCampsite !== null ? (
          <Wrapper>
            <CampsiteHeader>{params.id}</CampsiteHeader>
            <CampsiteSubHeader>Province/Territory:</CampsiteSubHeader>{" "}
            <CampsiteSubHeaderText>
              {queriedCampsite.region_name}
            </CampsiteSubHeaderText>
            <CampsiteSubHeader>Park/Location:</CampsiteSubHeader>{" "}
            <CampsiteSubHeaderText>
              {queriedCampsite.place_name}
            </CampsiteSubHeaderText>
            <CampsiteSubHeader>Campground/Site:</CampsiteSubHeader>{" "}
            <CampsiteSubHeaderText>
              {queriedCampsite.area_name}
            </CampsiteSubHeaderText>
            <CampsiteSubHeader>Campground/Site Con't:</CampsiteSubHeader>{" "}
            <CampsiteSubHeaderText>
              {queriedCampsite.facility_name}
            </CampsiteSubHeaderText>
            <CampsiteSubHeader>Accommodation Type:</CampsiteSubHeader>{" "}
            <CampsiteSubHeaderText>
              {queriedCampsite.unit_type_name}
            </CampsiteSubHeaderText>
            <CampsiteSubHeader>Accommodation Type Con't:</CampsiteSubHeader>{" "}
            <CampsiteSubHeaderText>
              {queriedCampsite.Accommodation_Type}
            </CampsiteSubHeaderText>
            <CampsiteSubHeader>Site Number:</CampsiteSubHeader>{" "}
            <CampsiteSubHeaderText>
              {queriedCampsite.Site_Num_Site}
            </CampsiteSubHeaderText>
            {isAuthenticated && <AddToFavourites user={user} queriedCampsite={queriedCampsite}/>}
            <DisplayReviews queriedCampsite={queriedCampsite} />
            <ReviewForm queriedCampsite={queriedCampsite} />
          </Wrapper>
        ) : (
          <ErrorPage />
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Campsite;

const CampsiteHeader = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CampsiteSubHeader = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 10px 0;
`;

const CampsiteSubHeaderText = styled.p``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  margin: 50px 75px;
`;
