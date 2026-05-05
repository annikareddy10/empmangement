<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-dark text-white d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-table"></i>
        <h5 class="mb-0">Employee Records</h5>
        <span class="badge bg-primary ms-2">{{ employees.length }} Total</span>
      </div>
      <!-- Search Bar -->
      <div class="d-flex align-items-center gap-2">
        <div class="input-group input-group-sm" style="width: 220px;">
          <span class="input-group-text bg-secondary border-0 text-white">
            <i class="bi bi-search"></i>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control bg-secondary border-0 text-white"
            placeholder="Search employees..."
            style="color: white !important;"
          />
        </div>
      </div>
    </div>

    <div class="card-body p-0">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading employees...</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredEmployees.length === 0" class="text-center py-5 text-muted">
        <i class="bi bi-people display-4 d-block mb-3 text-secondary"></i>
        <p class="fs-5">{{ searchQuery ? 'No employees match your search.' : 'No employees found. Add one!' }}</p>
      </div>

      <!-- Table -->
      <div v-else class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th class="ps-3">#</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Salary</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(emp, index) in filteredEmployees" :key="emp.id" class="employee-row">
              <td class="ps-3 text-muted">{{ index + 1 }}</td>
              <td>
                <span class="badge bg-light text-dark border font-monospace">{{ emp.id }}</span>
              </td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar-circle">{{ initials(emp.name) }}</div>
                  <span class="fw-semibold">{{ emp.name }}</span>
                </div>
              </td>
              <td>{{ emp.designation }}</td>
              <td>
                <span class="badge rounded-pill" :class="deptBadge(emp.department)">
                  {{ emp.department }}
                </span>
              </td>
              <td class="fw-semibold text-success">₹{{ formatSalary(emp.salary) }}</td>
              <td class="text-center">
                <button
                  class="btn btn-sm btn-outline-primary me-1"
                  title="Edit"
                  @click="$emit('edit', emp)"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  title="Delete"
                  @click="confirmDelete(emp)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    ref="deleteModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header bg-danger text-white border-0">
          <h5 class="modal-title"><i class="bi bi-exclamation-triangle me-2"></i>Confirm Delete</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center py-4">
          <p>Are you sure you want to delete</p>
          <p class="fw-bold fs-5">{{ employeeToDelete?.name }}?</p>
          <p class="text-muted small">This action cannot be undone.</p>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="deleteConfirmed">
            <i class="bi bi-trash me-1"></i>Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'EmployeeTable',
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['edit', 'delete'],

  data() {
    return {
      searchQuery: '',
      employeeToDelete: null,
      modalInstance: null,
    }
  },

  computed: {
    filteredEmployees() {
      if (!this.searchQuery) return this.employees
      const q = this.searchQuery.toLowerCase()
      return this.employees.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.designation?.toLowerCase().includes(q) ||
          e.department?.toLowerCase().includes(q) ||
          String(e.id).includes(q)
      )
    },
  },

  mounted() {
    this.modalInstance = new Modal(this.$refs.deleteModal)
  },

  methods: {
    initials(name) {
      if (!name) return '?'
      return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join('')
    },

    formatSalary(val) {
      return Number(val).toLocaleString('en-IN')
    },

    deptBadge(dept) {
      const map = {
        Engineering: 'bg-primary',
        'Human Resources': 'bg-warning text-dark',
        Finance: 'bg-success',
        Marketing: 'bg-info text-dark',
        Sales: 'bg-orange text-white',
        Operations: 'bg-secondary',
        IT: 'bg-primary',
        Legal: 'bg-dark',
        Product: 'bg-purple text-white',
        Design: 'bg-pink text-white',
      }
      return map[dept] || 'bg-secondary'
    },

    confirmDelete(emp) {
      this.employeeToDelete = emp
      this.modalInstance.show()
    },

    deleteConfirmed() {
      this.$emit('delete', this.employeeToDelete.id)
      this.modalInstance.hide()
      this.employeeToDelete = null
    },
  },
}
</script>

<style scoped>
.avatar-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d6efd, #6610f2);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.employee-row:hover {
  background-color: #f8f9ff;
}

.bg-orange {
  background-color: #fd7e14 !important;
}
.bg-purple {
  background-color: #6f42c1 !important;
}
.bg-pink {
  background-color: #d63384 !important;
}
</style>
