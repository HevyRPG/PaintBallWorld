import axios from 'axios'
import Cookies from 'js-cookie'
import APIKEYS from '../../APIKEYS'

export const fetchUserProfile = async () => {
  const token = Cookies.get('authToken')
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await axios.get(`${apiUrl}/api/User/User/profile`, {
      headers: {
        ...APIKEYS.headers,
        Authorization: `Bearer ${token}`, // Append Authorization header
      },
    })

    return response.data
  } catch (error) {
    console.error('Błąd podczas pobierania profilu użytkownika:', error)
    throw error // Rzuć błąd, aby mógł być obsłużony w komponencie wywołującym funkcję
  }
}

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = Cookies.get('authToken')

    const response = await axios.put(
      '/api/Auth/ResetPassword',
      { oldPassword, newPassword },
      {
        headers: {
          ...APIKEYS.headers,
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return { success: true }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Błąd podczas zmiany hasła'
    throw new Error(errorMessage)
  }
}
