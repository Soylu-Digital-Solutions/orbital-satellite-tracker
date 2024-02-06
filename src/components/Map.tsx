import React, { useRef } from 'react';
import { Viewer, CesiumComponentRef, CameraFlyTo } from 'resium';
import { Viewer as CesiumViewer, Cartesian3 } from 'cesium';
import { Box, Heading } from '@chakra-ui/react';
import Satellite from './satellite/Satellite';
import satellites from './satellites';

const MapViewer: React.FC = () => {
  const ref = useRef<CesiumComponentRef<CesiumViewer> | null>(null);

  return (
    <section id="map">
      <Box alignItems="center" justifyContent="center">
        <Heading as="h2" size="xl">
          Map
        </Heading>
        <Viewer
          baseLayerPicker={false}
          timeline={false}
          projectionPicker={false}
          selectionIndicator={false}
          homeButton={false}
          sceneModePicker={false}
          ref={ref}
        >
          <CameraFlyTo
            destination={Cartesian3.fromDegrees(-101, 35, 10000000)}
          />
          {Object.values(satellites).map((satellite) => (
            <Satellite
              key={satellite.satelliteId}
              satId={satellite.satelliteId}
            />
          ))}
        </Viewer>
      </Box>
    </section>
  );
};

export default MapViewer;
