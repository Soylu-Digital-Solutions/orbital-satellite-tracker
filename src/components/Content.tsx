import { Stack } from '@chakra-ui/react';
import Map from './Map';
import About from './About';
import Contact from './Contact';
import Divider from './CustomDivider';
import { useMediaQuery } from '@chakra-ui/react';

const Content = () => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <Stack
      direction="column"
      p={4}
      width={isLargerThan800 ? '80%' : '100%'}
      marginX="auto"
    >
      <About />
      <Divider />
      <Map />
      <Divider />
      <Contact />
    </Stack>
  );
};

export default Content;
