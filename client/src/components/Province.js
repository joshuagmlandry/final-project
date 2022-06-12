import ErrorPage from "./ErrorPage";
import esriConfig from "@arcgis/core/config";
import FeaturedProvince from "./FeaturedProvince";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Loading from "./Loading";
import Locate from "@arcgis/core/widgets/Locate";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import styled from "styled-components";
import { FilterContext } from "./FilterContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { REACT_APP_ARCGIS_API } = process.env;

// Displays a map for the queried province/territory.  Additionally, there is a featured park/place section that shows a random park and random mock review.

const Province = () => {
  const { provinces, provincesLoading } = useContext(FilterContext);
  const [validProvince, setValidProvince] = useState({
    prov: "",
    valid: false,
  });
  let defEx = validProvince.valid
    ? `Name_EN = '${validProvince.prov.name}'`
    : "1=0";

  const params = useParams();

  useEffect(() => {
    if (provincesLoading !== "loading") {
      const provinceToDisplay = provinces.data.filter((province) => {
        return province.abbr === params.abbr;
      });
      if (provinceToDisplay.length !== 0) {
        setValidProvince({ prov: provinceToDisplay[0], valid: true });
      }

      esriConfig.apiKey = REACT_APP_ARCGIS_API;

      const map = new Map({
        basemap: "arcgis-topographic",
      });

      if (validProvince.valid) {
        const view = new MapView({
          container: "viewDiv",
          map: map,
          center: provinceToDisplay[0].coord,
          zoom: provinceToDisplay[0].zoom,
        });

        const locate = new Locate({
          view: view,
          useHeadingEnabled: false,
          goToOverride: (view, options) => {
            options.target.scale = 5000000;
            return view.goTo(options.target);
          },
        });
        view.ui.add(locate, "top-left");
      }

      const popupCampsites = {
        title: "Campsites",
        content: `<h4>Province/Territory:</h4> {region_name}<br>
                  <h4>Park/Location:</h4> {place_name}<br>
                  <h4>Campground/Site:</h4> {area_name}<br>
                  <h4>Campground/Site Con't:</h4> {facility_name}<br>
                  <h4>Accommodation Type:</h4> {unit_type_name}<br>
                  <h4>Accommodation Type Con't:</h4> {Accommodation_Type}<br>
                  <h4>Site Number:</h4> {Site_Num_Site}<br>
                  <h4>Reviews:</h4> Poorly rated (17 reviews)<br>
                  <h4>Campsite Page:</h4><a href='http://localhost:3000/campsite/{Unique_Site_ID}'> {Unique_Site_ID}</a>`,
      };

      const campsites = new FeatureLayer({
        url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Campsites_Join/FeatureServer/0",
        outFields: [
          "Accommodation_Type",
          "region_name",
          "place_name",
          "area_name",
          "facility_name",
          "unit_type_name",
          "Unique_Site_ID",
          "Site_Num_Site",
        ],
        popupTemplate: popupCampsites,
      });

      const provOutline = new FeatureLayer({
        url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Provinces_and_Territories/FeatureServer/0",
        opacity: 0.2,
        definitionExpression: defEx,
      });

      map.add(campsites);
      map.add(provOutline);
    }
  }, [provincesLoading, validProvince.valid]);

  return (
    <>
      {provincesLoading !== "loading" && validProvince.valid ? (
        validProvince.valid ? (
          <Wrapper>
            <TextHeader>
              Browse campsites in <Bold>{validProvince.prov.name}</Bold>
            </TextHeader>
            <MapAndFilter>
              <MapContainer id="viewDiv"></MapContainer>
              <Filter></Filter>
              <FeaturedProvince prov={validProvince.prov} />
            </MapAndFilter>
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

export default Province;

const Bold = styled.span`
  font-weight: bold;
`;

const Filter = styled.div`
  font-family: var(--font-body);
  font-size: 1.5rem;
  margin: 40px;
`;

const MapAndFilter = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: center;
`;

const MapContainer = styled.div`
  border: 3px solid var(--color-dark-green);
  border-radius: 4px;
  padding: 0;
  margin-bottom: 50px;
  height: 500px;
  width: 700px;
`;

const TextHeader = styled.div`
  font-family: var(--font-body);
  font-size: 2rem;
  margin: 40px;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
`;
