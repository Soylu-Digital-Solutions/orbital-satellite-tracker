import React, { useRef, useState } from 'react';
import { Viewer, CesiumComponentRef } from 'resium';
import { Viewer as CesiumViewer } from 'cesium';
import { Box, Heading } from '@chakra-ui/react';
import Satellite from './satellite/Satellite';
import satellites from './satellites';
import { useTranslation } from 'react-i18next';
import SatellitePopup from './SatellitePopup';

const MapViewer: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef<CesiumComponentRef<CesiumViewer> | null>(null);
  // set all satellites to selected by default, add their satelliteId to the selectedSatellites array
  const [selectedSatellites, setSelectedSatellites] = useState<number[]>(
    Object.values(satellites).map(
      (satellite: SatelliteInfo) => satellite.satelliteId
    )
  );

  return (
    <section id="map">
      <Box alignItems="center" justifyContent="center">
        <Heading as="h2" size="xl" p={1}>
          {t('map_header')}
        </Heading>
        <Viewer
          timeline={false}
          projectionPicker={false}
          selectionIndicator={false}
          homeButton={false}
          sceneModePicker={false}
          fullscreenButton={false}
          ref={ref}
          id="viewer"
        >
          {selectedSatellites.map((satelliteId) => (
            <Satellite key={satelliteId} satId={satelliteId} />
          ))}
        </Viewer>
        <SatellitePopup
          setSelectedSatellites={setSelectedSatellites}
          selectedSatellites={selectedSatellites}
        />
      </Box>
    </section>
  );
};

export default MapViewer;
