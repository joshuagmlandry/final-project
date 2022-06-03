import { useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import styled from "styled-components";
const { REACT_APP_ARCGIS_API } = process.env;

const Browse = () => {
  useEffect(() => {
    esriConfig.apiKey = REACT_APP_ARCGIS_API;

    const map = new Map({
      basemap: "arcgis-topographic",
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-101.674656, 57.951146],
      zoom: 3,
    });

    const campsites = new FeatureLayer({
      url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Accommodation_Hebergement_V2_2/FeatureServer/0",
    });

    map.add(campsites);
  }, []);

  return (
    <Wrapper>
      <TextHeader>Browse <Bold>all campsites</Bold> or filter by <Bold>park or province</Bold></TextHeader>
      <MapAndFilter>
        <MapContainer id="viewDiv"></MapContainer>
        <Filter>

        </Filter>
      </MapAndFilter>
    </Wrapper>
  );
};

export default Browse;

const Bold = styled.span`
  font-weight: bold;
`;

const Filter = styled.div`

`;

const MapAndFilter = styled.div`
  display: flex;
`;

const MapContainer = styled.div`
  border: 3px solid var(--color-dark-green);
  border-radius: 4px;
  padding: 0;
  margin-bottom: 50px;
  height: 500px;
  width: 900px;
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
`;
