import { useContext, useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import Locate from "@arcgis/core/widgets/Locate";
import styled from "styled-components";
import { FilterContext } from "./FilterContext";
import { useNavigate } from "react-router-dom";
const { REACT_APP_ARCGIS_API } = process.env;

const Browse = () => {
  const [coord, setCoord] = useState([-101.674656, 57.951146]);
  const [zoom, setZoom] = useState(3);
  const [provinceSelected, setProvinceSelected] = useState({
    prov: "",
    flag: false,
  });
  const [parkSelected, setParkSelected] = useState(null);
  const [allCampsiteTypes, setAllCampsiteTypes] = useState(null);
  const [allCampsiteTypesLoading, setAllCampsiteTypesLoading] = useState("loading");
  const [campsiteSelected, setCampsiteSelected] = useState(null);
  const [provinceSelectedLoading, setProvinceSelectedLoading] =
    useState("loading");
  let defEx = parkSelected !== null ? (campsiteSelected !== null ? (`place_name = '${parkSelected}' AND unit_type_name = '${campsiteSelected}'`) : `place_name = '${parkSelected}'`)  : "1=1";

  const { provinces, provincesLoading } = useContext(FilterContext);

  const changeHandler = (e) => {
    setParkSelected(null);
    if (provincesLoading !== "loading") {
      const selectedProvince = provinces.data.filter((province) => {
        return province.name === e.target.value;
      });
      if (selectedProvince.length !== 0) {
        setProvinceSelected({ prov: selectedProvince[0], flag: true });
        setProvinceSelectedLoading("idle");
      }
      setCoord(selectedProvince[0].coord);
      setZoom(selectedProvince[0].zoom);
    }
  };

  const parkHandler = (e) => {
    e.stopPropagation();
    setParkSelected(e.target.value);
  };

  const campsiteHandler = (e) => {
    e.stopPropagation();
    setCampsiteSelected(e.target.value);
    console.log(campsiteSelected);
  };

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

    const locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: (view, options)=>{
        options.target.scale = 5000000;
        return view.goTo(options.target);
      }
    });
    view.ui.add(locate, "top-left");

    const popupCampsites = {
      title: "Campsites",
      content: `<h4>Province/Territory:</h4> {region_name}<br>
                <h4>Park/Location:</h4> {place_name}<br>
                <h4>Campground/Site:</h4> {area_name}<br>
                <h4>Campground/Site Con't:</h4> {facility_name}<br>
                <h4>Accommodation Type:</h4> {unit_type_name}<br>
                <h4>Accommodation Type Con't:</h4> {Accommodation_Type}<br>
                <h4>Site Number:</h4> {Site_Num_Site}<br>
                <h4>Reviews:</h4> Highly rated (10 reviews) <br>
                <h4>Campsite Page:</h4><a href='http://localhost:3000/campsite/{Unique_Site_ID}'> {Unique_Site_ID}</a>`,
    };

    const campsites = new FeatureLayer({
      // url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Accommodation_Hebergement_V2_2/FeatureServer/0",
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
      definitionExpression: defEx,
    });

    if (parkSelected !== null) {
      const query = campsites.createQuery();
      query.where = `place_name = '${parkSelected}'`;
      query.outFields = ["unit_type_name"];
      query.returnDistinctValues = true;
      campsites.queryFeatures(query).then((data) => {
        const allAttributes = data.features.map((entry) => {
          return entry.attributes.unit_type_name;
        });
        setAllCampsiteTypes([...new Set(allAttributes)]);
        setAllCampsiteTypesLoading("idle");
      });
    }

    map.add(campsites);
  }, [coord, zoom, provincesLoading, parkSelected, campsiteSelected]);

  return (
    <>
      {provincesLoading !== "loading" ? (
        <Wrapper>
          <TextHeader>
            Browse <Bold>all campsites</Bold> or filter by{" "}
            <Bold>place and province or territory</Bold>
          </TextHeader>
          <MapAndFilter>
            <MapContainer id="viewDiv"></MapContainer>
            <Filter>
              <StyledForm onChange={changeHandler}>
                <BothFilters>
                  <FilterOptions>
                    <label>Province/Territory: </label>
                    <StyledSelect defaultValue={"blank"}>
                      <option disabled value="blank"></option>
                      {provinces.data.map((province, index) => {
                        return (
                          <option key={`${index}${province.name}`}>
                            {province.name}
                          </option>
                        );
                      })}
                    </StyledSelect>
                  </FilterOptions>
                  <FilterOptions>
                    {provinceSelectedLoading !== "loading" ? (
                      <ParkSelector>
                        <label>Place/Park: </label>
                        <StyledSelect
                          defaultValue={"blank2"}
                          disabled={!provinceSelected.flag}
                          onChange={parkHandler}
                        >
                          <option disabled value="blank2"></option>
                          {provinceSelected.prov.place.map((park, index) => {
                            return (
                              <option key={`${index}${park}`}>{park}</option>
                            );
                          })}
                        </StyledSelect>
                      </ParkSelector>
                    ) : (
                      ""
                    )}
                    {allCampsiteTypesLoading !== "loading" ? (
                      <ParkSelector>
                        <label>Campsite Type: </label>
                        <StyledSelect
                          defaultValue={"blank2"}
                          disabled={!provinceSelected.flag}
                          onChange={campsiteHandler}
                        >
                          <option disabled value="blank2"></option>
                          {allCampsiteTypes.map((type, index) => {
                            return (
                              <option key={`${index}${type}`}>{type}</option>
                            );
                          })}
                        </StyledSelect>
                      </ParkSelector>
                    ) : (
                      " "
                    )}
                  </FilterOptions>
                </BothFilters>

                <div>
                  <ResetButton type="submit">Reset</ResetButton>
                </div>
              </StyledForm>
            </Filter>
          </MapAndFilter>
        </Wrapper>
      ) : (
        " "
      )}
    </>
  );
};

export default Browse;

const Bold = styled.span`
  font-weight: bold;
`;

const BothFilters = styled.div`
  height: 250px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  font-size: 1.5rem;
  margin: 0 40px;
  width: 300px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 900px;
`;

const ParkSelector = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ResetButton = styled.button`
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 5px;
  color: var(--color-light-beige);
  font-family: var(--font-body);
  font-size: 1rem;
  margin-top: 10px;
  padding: 10px;
  width: 100px;
  &:hover {
    background-color: var(--color-green);
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledSelect = styled.select`
  font-family: var(--font-body);
  font-size: 1.25rem;
  margin-top: 5px;
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
