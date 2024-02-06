import { Box, Heading, Text } from '@chakra-ui/react';

const About: React.FC = () => {
  return (
    <section id="about">
      <Box
        padding="6"
        marginX="auto"
        boxShadow="2xl"
        rounded="2xl"
        bg="gray.100"
        my="10"
      >
        <Heading as="h2" size="xl">
          About
        </Heading>
        <Text fontSize="lg">
          This is a simple example of a React application using Cesium and
          Chakra UI. It displays a 3D map with satellite models and information.
          The map is built using Cesium, a JavaScript library for creating 3D
          globes and maps. The UI components are built using Chakra UI, a
          simple, modular and accessible component library that gives you the
          building blocks you need to build your React applications.
        </Text>
      </Box>
    </section>
  );
};

export default About;
