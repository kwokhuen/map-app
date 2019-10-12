import React from "react";
import Map from "./components/Map";
import styled from "styled-components";
import LocationForm from "./components/LocationForm";
import { usePathContext } from "./hooks/usePathContext";

const FlexContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const App: React.FC = () => (
  <usePathContext.Provider>
    <FlexContainer>
      <LocationForm />
      <Map />
    </FlexContainer>
  </usePathContext.Provider>
);

export default App;
