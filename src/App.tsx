import { Flex, Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Content from './components/Content';
import { Ion } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Set your Cesium ion access token here
Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN || '';

function App() {
  return (
    <Flex minHeight="100vh" display="flex" flexDirection="column" width="100vw">
      <Navbar />
      <Box flex="1" bg="gray.100">
        <Content />
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
