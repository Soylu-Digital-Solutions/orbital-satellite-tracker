import { Stack } from '@chakra-ui/react';
import Map from './Map';
import About from './About';
import Contact from './Contact';
import Divider from './CustomDivider';

const Content = () => {
  return (
    <Stack direction="column" p={4} width="80%" marginX="auto">
      <About />
      <Divider />
      <Map />
      <Divider />
      <Contact />
    </Stack>
  );
};

export default Content;
