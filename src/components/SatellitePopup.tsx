import React, { useState, useEffect } from 'react';
import countries from './countries';
import satellites from './satellites';
import { Heading, Text } from '@chakra-ui/react';

const groupedSatellites = Object.values(satellites).reduce((acc, satellite) => {
  const { country } = satellite;
  acc[country] = acc[country] || [];
  acc[country].push(satellite);
  return acc;
}, {});

interface SatellitePopupProps {
  setSelectedSatellites: (satellites: number[]) => void;
  selectedSatellites: number[];
}

const SatellitePopup = ({
  setSelectedSatellites,
  selectedSatellites,
}: SatellitePopupProps) => {
  const [openCountries, setOpenCountries] = useState({});
  const [parentElement, setParentElement] = useState(null);

  useEffect(() => {
    const parent = document.getElementById('viewer');
    setParentElement(parent);
  }, []);

  const toggleCountry = (country) => {
    setOpenCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  // Add some basic styles to ensure the popup is visible and positioned correctly
  const parentTop = parentElement?.offsetTop || 0;
  const parentLeft = parentElement?.offsetLeft || 0;

  const popupStyle = {
    position: 'absolute',
    top: `${parentTop + 10}px`,
    left: `${parentLeft + 10}px`,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    overflow: 'auto',
    maxHeight: '80%',
    color: '#fff',
  };

  const handleSatelliteChange = (e) => {
    const { name, checked } = e.target;
    // name is string so convert it to number
    const satelliteId = parseInt(name, 10);
    if (checked) {
      setSelectedSatellites((prev) => [...prev, satelliteId]);
    } else {
      setSelectedSatellites((prev) => prev.filter((id) => id !== satelliteId));
    }
  };

  return (
    <div style={popupStyle}>
      <Heading as="h3" size="md" p={1}>
        Toggle Satellites
      </Heading>
      {Object.keys(groupedSatellites).map((country) => (
        <div key={country}>
          <button onClick={() => toggleCountry(country)}>
            <Text
              style={{ fontWeight: openCountries[country] ? 'bold' : 'normal' }}
            >
              {countries[country].name}
            </Text>
          </button>
          {openCountries[country] && (
            <ul>
              {groupedSatellites[country].map((satellite) => (
                <li
                  key={satellite.satelliteId}
                  style={{ marginLeft: '20px', listStyleType: 'none' }}
                >
                  <label>
                    <input
                      type="checkbox"
                      id={satellite.satelliteId}
                      name={satellite.satelliteId}
                      onChange={handleSatelliteChange}
                      defaultChecked={selectedSatellites.includes(
                        satellite.satelliteId
                      )}
                    />
                    {`\t${satellite.name}`}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SatellitePopup;
