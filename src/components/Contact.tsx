import { Box, Heading, Text, Stack, Link } from '@chakra-ui/react';

const Contact: React.FC = () => {
  return (
    <section id="contact">
      <Box
        padding="6"
        marginX="auto"
        boxShadow="lg"
        rounded="md"
        bg="gray.50"
        my="10"
      >
        <Heading as="h3" size="lg" marginBottom="4">
          Contact Us
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing="4">
          <Box flex="1">
            <Text fontSize="md" fontWeight="bold">
              Email
            </Text>
            <Link href="mailto:info@sodisol.com" color="teal.500" fontSize="md">
              info@sodisol.com
            </Link>
          </Box>
          <Box flex="1">
            <Text fontSize="md" fontWeight="bold">
              Website
            </Text>
            <Link
              href="https://sodisol.com"
              isExternal
              color="teal.500"
              fontSize="md"
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
