import { Stack } from '@chakra-ui/react';
import Map from './Map';
import About from './About';
import Contact from './Contact';
import Divider from './CustomDivider';
import './content.css';

const Content = () => {
  return (
    <Stack direction="column" p={4} marginX="auto" id="content">
      <About />
      <Divider />
      <Map />
      <Divider />
      <Contact />
    </Stack>
  );
};

export default Content;
