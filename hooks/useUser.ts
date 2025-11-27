import { fetcher } from "@/services/api"
import useSWR from "swr"

export const useUser = () => {
  const {data, error, isLoading} = useSWR('/users/me', fetcher)


  return {
    user: data,
    isLoading,
    isError: error,
  }
}