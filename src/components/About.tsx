import { Box, Heading, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

interface ListItemProp {
  emphasis: string;
  text: string;
}

const About: React.FC = () => {
  const { t } = useTranslation();
  console.log(t('about.list1', { returnObjects: true }));

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
        <Heading as="h2" size="xl" p={2}>
          {t('about.header1')}
        </Heading>
        <Text fontSize="lg">{t('about.text1')}</Text>
        <details>
          <summary>{t('details')}</summary>
          <Heading as="h4" size="md" p={2}>
            {t('about.header2')}
          </Heading>
          <Text fontSize="lg">{t('about.text2')}</Text>
          <br />
          <Text fontSize="lg">{t('about.text3')}</Text>
          <List spacing={3}>
            {(t('about.list1', { returnObjects: true }) as ListItemProp[]).map(
              (item: ListItemProp, index: number) => (
                <ListItem key={index}>
                  <ListIcon as={SettingsIcon} color="green.500" />
                  <strong>{item.emphasis + ': '}</strong>
                  {item.text}
                </ListItem>
              )
            )}
          </List>
          <Heading as="h4" size="md" p={2}>
            {t('about.header3')}
          </Heading>
          <Text fontSize="lg">{t('about.text4')}</Text>
          <List spacing={3}>
            {(t('about.list2', { returnObjects: true }) as ListItemProp[]).map(
              (item: ListItemProp, index: number) => (
                <ListItem key={index}>
                  <ListIcon as={SettingsIcon} color="green.500" />
                  <strong>{item.emphasis + ': '}</strong>
                  {item.text}
                </ListItem>
              )
            )}
          </List>
        </details>
      </Box>
    </section>
  );
};

export default About;
