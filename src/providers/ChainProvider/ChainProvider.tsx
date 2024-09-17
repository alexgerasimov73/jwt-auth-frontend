import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
// import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import { PropsWithChildren } from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { web3AuthOptionsBuilder } from './web3AuthOptionsBuilder';
import { injected } from 'wagmi/connectors';

export const ChainProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  // const web3connector = new Web3AuthCo
  console.log('sepolia', sepolia);

  console.log('first', web3AuthOptionsBuilder(sepolia));

  const config = createConfig({
    chains: [sepolia],
    // connectors: [new Web3AuthConnector(web3AuthOptionsBuilder(sepolia)), new MetaMaskConnector({ sepolia })],
    connectors: [injected()],
    transports: {
      [sepolia.id]: http(),
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
