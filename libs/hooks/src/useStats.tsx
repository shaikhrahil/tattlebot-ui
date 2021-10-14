import React from 'react'

export const useStats = () => {
  return {
    send: (packet: any) => {
      console.log(packet)
    },
    connected: true,
    connecting: false,
    error: '',
    listen: (callback: (props: any) => void) => {
      callback({
        observers: 10,
        devices: 4,
        rate: 20,
        bandwidth: 1,
        last: 3,
      })
    },
  }
}

export default useStats
