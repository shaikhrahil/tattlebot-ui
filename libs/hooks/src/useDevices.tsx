import { getDevices } from '@tbot/api'
import { useQuery } from 'react-query'

export const useDevices = () => {
  console.log('Mocking Failed !!')
  const { data, error, isLoading: loading, isLoadingError: retrying } = useQuery('devices', () => getDevices())
  return { data, error, loading, retrying }
}

export default useDevices
