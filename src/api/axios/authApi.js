import axiosInstance from './index'

/**
 * Register a new user
 * @param {Object} payload - Registration payload
 * @param {string} payload.name - User's full name
 * @param {string} payload.email - User's email
 * @param {string} payload.password - User's password
 * @param {string} payload.confirmPassword - Password confirmation
 * @returns {Promise}
 */
export const registerUser = (payload) => {
  return axiosInstance.post('/user/register', payload)
}

/**
 * Login user
 * @param {Object} payload - Login payload
 * @param {string} payload.email - User's email
 * @param {string} payload.password - User's password
 * @returns {Promise}
 */
export const loginUser = (payload) => {
  return axiosInstance.post('/user/login', payload)
}

/**
 * Update user profile
 * @param {string} name - User's new name
 * @returns {Promise}
 */
export const updateProfile = (name) => {
  return axiosInstance.patch('/user/profile', {
    name,
  })
}

/**
 * Get current user profile
 * @returns {Promise}
 */
export const getProfile = () => {
  return axiosInstance.get('/user/profile')
}
