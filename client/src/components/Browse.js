import { useContext, useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import styled from "styled-components";
import { FilterContext } from "./FilterContext";
const { REACT_APP_ARCGIS_API } = process.env;

const Browse = () => {

  const [coord, setCoord] = useState([-101.674656, 57.951146]);
  const [zoom, setZoom] = useState(3);

  const provinces = [
    {name: "Alberta", coord: [-115.000000, 55.000000], zoom: 5},
    {name: "British Columbia", coord: [-125.647621, 54.726669], zoom: 5},
    {name: "Manitoba", coord: [-98.739075, 54.415211], zoom: 5},
    {name: "New Brunswick", coord: [-66.159668, 46.498390], zoom: 7},
    {name: "Newfoundland & Labrador", coord: [-55.660435, 49.135509], zoom: 6},
    {name: "Northwest Territories", coord: [-124.8457, 64.8255], zoom: 4},
    {name: "Nova Scotia", coord: [-63.000000, 45.300000], zoom: 7},
    {name: "Nunavut", coord: [-86.798981, 70.453262], zoom: 3},
    {name: "Ontario", coord: [-85.000000, 48.000000], zoom: 5},
    {name: "Prince Edward Island", coord: [-63.000000, 	46.250000], zoom: 8},
    {name: "Quebec", coord: [-70.000000, 51.000000], zoom: 5},
    {name: "Saskatchewan", coord: [-106.000000, 55.000000], zoom: 5},
    {name: "Yukon", coord: [-135.000000, 65.000000], zoom: 4}
  ];

  const changeHandler = (e)=>{
    const selectedProvince = provinces.filter(province => {
      return province.name === e.target.value;
    });
    setCoord(selectedProvince[0].coord);
    setZoom(selectedProvince[0].zoom);
  }

  useEffect(() => {
    esriConfig.apiKey = REACT_APP_ARCGIS_API;

    const map = new Map({
      basemap: "arcgis-topographic",
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: coord,
      zoom: zoom,
    });

    const campsites = new FeatureLayer({
      url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Accommodation_Hebergement_V2_2/FeatureServer/0",
    });

    map.add(campsites);
  }, [coord, zoom]);

  return (
    <Wrapper>
      <TextHeader>Browse <Bold>all campsites</Bold> or filter by <Bold>park or province</Bold></TextHeader>
      <MapAndFilter>
        <MapContainer id="viewDiv"></MapContainer>
        <Filter>
          <form onChange={changeHandler}>
            <label>Province: </label>
            <StyledSelect defaultValue={'blank'}>
              <option disabled value="blank"></option>
              {provinces.map((province, index) => {
                return (<option key={`${index}${province.name}`}>{province.name}</option>);
              })}
            </StyledSelect>
          </form>
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
  font-family: var(--font-body);
  font-size: 1.5rem;
  margin: 40px;
`;

const MapAndFilter = styled.div`
  display: flex;
  justify-content: center;
`;

const MapContainer = styled.div`
  border: 3px solid var(--color-dark-green);
  border-radius: 4px;
  padding: 0;
  margin-bottom: 50px;
  height: 500px;
  width: 900px;
`;

const StyledSelect = styled.select`
  font-family: var(--font-body);
  font-size: 1.25rem;
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
