import ostLogo from '/logo.png';
import { chakra } from '@chakra-ui/react';

const Logo = () => {
  return (
    <chakra.a
      href="/"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      _hover={{ textDecoration: 'none' }}
    >
      <img
        src={ostLogo}
        alt="OST Logo"
        style={{ width: '50px', height: '50px' }}
      />
    </chakra.a>
  );
};

export default Logo;
