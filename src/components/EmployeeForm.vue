<template>
  <div class="card shadow-sm border-0 mb-4">
    <div class="card-header bg-primary text-white d-flex align-items-center gap-2">
      <i :class="editMode ? 'bi bi-pencil-square' : 'bi bi-person-plus-fill'"></i>
      <h5 class="mb-0">{{ editMode ? 'Edit Employee' : 'Add New Employee' }}</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="row g-3">
          <!-- Name -->
          <div class="col-md-6">
            <label for="name" class="form-label fw-semibold">
              <i class="bi bi-person me-1"></i>Employee Name <span class="text-danger">*</span>
            </label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
              placeholder="Enter full name"
            />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>

          <!-- Designation -->
          <div class="col-md-6">
            <label for="designation" class="form-label fw-semibold">
              <i class="bi bi-briefcase me-1"></i>Designation <span class="text-danger">*</span>
            </label>
            <input
              id="designation"
              v-model.trim="form.designation"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.designation }"
              placeholder="e.g. Software Engineer"
            />
            <div class="invalid-feedback">{{ errors.designation }}</div>
          </div>

          <!-- Department -->
          <div class="col-md-6">
            <label for="department" class="form-label fw-semibold">
              <i class="bi bi-building me-1"></i>Department <span class="text-danger">*</span>
            </label>
            <select
              id="department"
              v-model="form.department"
              class="form-select"
              :class="{ 'is-invalid': errors.department }"
            >
              <option value="">Select department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
            <div class="invalid-feedback">{{ errors.department }}</div>
          </div>

          <!-- Salary -->
          <div class="col-md-6">
            <label for="salary" class="form-label fw-semibold">
              <i class="bi bi-currency-rupee me-1"></i>Salary (₹) <span class="text-danger">*</span>
            </label>
            <input
              id="salary"
              v-model.number="form.salary"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors.salary }"
              placeholder="e.g. 50000"
              min="0"
            />
            <div class="invalid-feedback">{{ errors.salary }}</div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="d-flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary px-4" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else :class="editMode ? 'bi bi-check-circle me-2' : 'bi bi-plus-circle me-2'"></i>
            {{ editMode ? 'Update Employee' : 'Add Employee' }}
          </button>
          <button type="button" class="btn btn-outline-secondary px-4" @click="resetForm">
            <i class="bi bi-x-circle me-2"></i>Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',
  props: {
    employeeToEdit: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit', 'cancel'],

  data() {
    return {
      form: {
        name: '',
        designation: '',
        department: '',
        salary: '',
      },
      errors: {},
      departments: [
        'Engineering',
        'Human Resources',
        'Finance',
        'Marketing',
        'Sales',
        'Operations',
        'IT',
        'Legal',
        'Product',
        'Design',
      ],
    }
  },

  computed: {
    editMode() {
      return !!this.employeeToEdit
    },
  },

  watch: {
    employeeToEdit: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = { ...val }
        } else {
          this.resetForm()
        }
      },
    },
  },

  methods: {
    validate() {
      const errs = {}
      if (!this.form.name) errs.name = 'Name is required.'
      if (!this.form.designation) errs.designation = 'Designation is required.'
      if (!this.form.department) errs.department = 'Department is required.'
      if (!this.form.salary && this.form.salary !== 0)
        errs.salary = 'Salary is required.'
      else if (this.form.salary < 0) errs.salary = 'Salary must be positive.'
      this.errors = errs
      return Object.keys(errs).length === 0
    },

    submitForm() {
      if (!this.validate()) return
      this.$emit('submit', { ...this.form })
    },

    resetForm() {
      this.form = { name: '', designation: '', department: '', salary: '' }
      this.errors = {}
      this.$emit('cancel')
    },
  },
}
</script>
