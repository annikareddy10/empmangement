<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'https://69f9e8a9c509a40d3aa3865c.mockapi.io/api/employees'

const employees = ref([])
const form = ref({
  name: '',
  designation: '',
  department: '',
  salary: ''
})
const editId = ref(null)

const getEmployees = async () => {
  const res = await axios.get(API)
  employees.value = res.data
}

const saveEmployee = async () => {
  if (editId.value) {
    await axios.put(`${API}/${editId.value}`, form.value)
    editId.value = null
  } else {
    await axios.post(API, form.value)
  }
  form.value = { name: '', designation: '', department: '', salary: '' }
  getEmployees()
}

const editEmployee = (emp) => {
  form.value = { ...emp }
  editId.value = emp.id
}

const deleteEmployee = async (id) => {
  await axios.delete(`${API}/${id}`)
  getEmployees()
}

onMounted(getEmployees)
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center">Employee Management System</h2>

    <div class="card p-3 mb-3">
      <input v-model="form.name" placeholder="Name" class="form-control mb-2" />
      <input v-model="form.designation" placeholder="Designation" class="form-control mb-2" />
      <input v-model="form.department" placeholder="Department" class="form-control mb-2" />
      <input v-model="form.salary" placeholder="Salary" class="form-control mb-2" />

      <button class="btn btn-primary" @click="saveEmployee">
        {{ editId ? 'Update' : 'Add' }}
      </button>
    </div>

    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.name }}</td>
          <td>{{ emp.designation }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.salary }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editEmployee(emp)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteEmployee(emp.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>