import { Fragment } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from './Logo';
interface Props {
  children: string;
}
import { useTranslation } from 'react-i18next';

const languages = ['en', 'tr', 'jp'];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('green.200', 'green.700'),
      }}
      href={`#${children?.toLowerCase()}`}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { t, i18n } = useTranslation();
  const Links = t('navbar_links', { returnObjects: true }) as string[];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('green.100', 'green.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Logo />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack
            spacing={2}
            p={2}
            borderWidth="2px"
            borderRadius="lg"
            borderColor="green.500"
            mr={5}
          >
            {languages.map((lang, index) => (
              <Fragment key={lang}>
                <Box
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'green.200',
                    cursor: 'pointer',
                  }}
                  onClick={() => i18n.changeLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </Box>
                {index !== languages.length - 1 && (
                  <Divider
                    orientation="vertical"
                    height="20px"
                    borderColor="green.500"
                    mx={2}
                  />
                )}
              </Fragment>
            ))}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
            <Stack as={'nav'} spacing={4}>
              {languages.map((lang) => (
                <Box
                  px={2}
                  py={1}
                  rounded={'xl'}
                  _hover={{
                    textDecoration: 'none',
                    bg: 'green.200',
                  }}
                  onClick={() => i18n.changeLanguage(lang)}
                  key={lang}
                >
                  {lang.toUpperCase()}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
