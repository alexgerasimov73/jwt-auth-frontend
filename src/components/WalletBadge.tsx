import { useAccount, useDisconnect } from 'wagmi';
import { Outlet } from 'react-router-dom';
import {
  Button,
  HStack,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Loader } from './Loader';
import { store } from '../store/store';
import { AvocadoAvatar, Wallet } from '../assets';
import { logoFor } from '../helpers/utils';

export const WalletBadge = () => {
  const { address, chain, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    store.getSettings();
  }, []);

  const handleDisconnect = () => disconnect();

  if (store.isLoading) return <Loader label="Loading settings..." />;

  return (
    <>
      <Popover isLazy offset={[-208, 12]} isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <PopoverTrigger>
          <Button
            pos="fixed"
            top={4}
            right={6}
            variant="link"
            transition="transform 0.2s"
            _hover={{
              transform: 'translateX(-2px)',
            }}>
            <Image
              src={Wallet}
              alt="wallet"
              transition="transform 0.2s"
              transform={`${isOpen ? 'rotate(35deg)' : 'unset'}`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent minW="480px" p={4} bg="brand.500" color="brand.900">
          <VStack align="flex-start" spacing={2}>
            <Button
              alignSelf="flex-end"
              colorScheme="red"
              variant="link"
              onClick={handleDisconnect}>
              Disconnect
            </Button>

            {connector && chain && (
              <HStack spacing={2}>
                <Image boxSize="24px" src={logoFor(connector.name)} />
                <Text>
                  Connected to the <b>{chain.name}</b> network via <b>{connector.name}</b>
                </Text>
              </HStack>
            )}

            <HStack spacing={2}>
              <Image boxSize="24px" src={AvocadoAvatar} />
              <Text>{address}</Text>
            </HStack>
          </VStack>
        </PopoverContent>
      </Popover>
      <Outlet />
    </>
  );
};
