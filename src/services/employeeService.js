import axios from 'axios'

// MockAPI endpoint — replace YOUR_PROJECT_ID with your actual MockAPI project ID
// e.g. https://67abc1234def56789.mockapi.io/api/v1/employees
const BASE_URL = 'https://YOUR_PROJECT_ID.mockapi.io/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const employeeAPI = {
  // GET all employees
  getAll() {
    return apiClient.get('/employees')
  },

  // GET single employee by ID
  getById(id) {
    return apiClient.get(`/employees/${id}`)
  },

  // POST create new employee
  create(employee) {
    return apiClient.post('/employees', employee)
  },

  // PUT update employee
  update(id, employee) {
    return apiClient.put(`/employees/${id}`, employee)
  },

  // DELETE employee
  delete(id) {
    return apiClient.delete(`/employees/${id}`)
  },
}
