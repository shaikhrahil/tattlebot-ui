import axios from 'axios'
import { useQuery } from 'react-query'

export const useDevices = () => {
  const {
    data,
    error,
    isLoading: loading,
    isLoadingError: retrying,
  } = useQuery('devices', (): Promise<any[]> => axios.get(`${process.env.SERVER_URL}/devices`))
  return { data, error, loading, retrying }
}

export default useDevices
