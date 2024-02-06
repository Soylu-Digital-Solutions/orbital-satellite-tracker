import { Box, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

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
          {t('about_header')}
        </Heading>
        <Text fontSize="lg">{t('about_text')}</Text>
      </Box>
    </section>
  );
};

export default About;
