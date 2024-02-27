import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

import { ReactNode } from 'react';
import Logo from './Logo';
import packageJson from '../../package.json';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('green.50', 'green.900')}
      color={useColorModeValue('green.700', 'green.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Logo />
        <Text>
          OTS version: {packageJson.version} © {new Date().getFullYear()} Soylu
          Digital Solution. All rights reserved.
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Github'}
            href={'https://github.com/Soylu-Digital-Solutions'}
          >
            <FaGithub />
          </SocialButton>
          <SocialButton label={'Email'} href={'mailto:info@sodisol.com'}>
            <MdAlternateEmail />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
