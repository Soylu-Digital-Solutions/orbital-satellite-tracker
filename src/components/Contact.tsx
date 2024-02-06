import { Box, Heading, Text, Stack, Link } from '@chakra-ui/react';

const Contact: React.FC = () => {
  return (
    <section id="contact">
      <Box
        padding="6"
        marginX="auto"
        boxShadow="2xl"
        rounded="2xl"
        bg="gray.50"
        my="10"
      >
        <Heading as="h3" size="lg" marginBottom="4">
          Contact Us
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing="4">
          <Box flex="1">
            <Text fontSize="lg" fontWeight="bold">
              Email
            </Text>
            <Link href="mailto:info@sodisol.com" color="teal.500" fontSize="lg">
              info@sodisol.com
            </Link>
          </Box>
          <Box flex="1">
            <Text fontSize="lg" fontWeight="bold">
              Website
            </Text>
            <Link
              href="https://sodisol.com"
              isExternal
              color="teal.500"
              fontSize="lg"
            >
              sodisol.com
            </Link>
          </Box>
        </Stack>
      </Box>
    </section>
  );
};

export default Contact;
