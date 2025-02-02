import { chain as chainOrig } from 'wagmi'

export function useNetwork() {
  return {
    activeChain: {
      nativeCurrency: {
        symbol: 'ETH'
      }
    }
  }
}

export function useAccount() {
  return {
    data: {
      address: '0x0000000000000000000000000000000000000000'
    }
  }
}

export function useSendTransaction() {
  return {
    data: {
      address: '0x0000000000000000000000000000000000000000'
    }
  }
}

export function useEnsAvatar() {
  return {
    data: 'xxx.jpg'
  }
}

export function useEnsName() {
  return {
    data: 'fguhifgvewtyifgwyufew.eth'
  }
}

export function useBalance() {
  return {
    data: { formatted: '0.22', symbol: 'ETH' }
  }
}

export function useConnect() {
  return {
    connect: jest.fn()
  }
}

export function useDisconnect() {
  return {
    disconnect: jest.fn()
  }
}

export function useProvider() {
  return {}
}

export const chain = chainOrig

export function createClient() {
  return {
    queryClient: {
      mount: jest.fn(),
      unmount: jest.fn()
    }
  }
}
