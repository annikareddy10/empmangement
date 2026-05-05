# Employee Management System
### WP Assignment-II | BE/BTech CSE-3 | IV Semester | 2025-26
### Chaitanya Bharathi Institute of Technology (Autonomous), Hyderabad-75

---

## Tech Stack
- **Vue 3** (Composition-ready Options API)
- **Axios** — HTTP client for API calls
- **Bootstrap 5** + **Bootstrap Icons** — Responsive UI
- **MockAPI** — REST backend (free cloud mock server)
- **Vite** — Build tool / Dev server

---

## Project Structure

```
employee-mgmt/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js                        # App entry — imports Vue + Bootstrap
    ├── App.vue                        # Root component: state, CRUD logic, layout
    ├── services/
    │   └── employeeService.js         # Axios instance + all API methods
    └── components/
        ├── EmployeeForm.vue           # Add / Edit form with validation
        └── EmployeeTable.vue          # Data table with search + delete modal
```

---

## Part 1: Setup

### Step 1 — Clone / unzip the project, then install dependencies

```bash
cd employee-mgmt
npm install
```

### Step 2 — Create MockAPI Resource

1. Go to [https://mockapi.io](https://mockapi.io) and sign up (free).
2. Create a new project (e.g., `employee-mgmt`).
3. Add a resource called **`employees`** with these fields:

| Field       | Type   |
|-------------|--------|
| id          | String (auto) |
| name        | String |
| designation | String |
| department  | String |
| salary      | Number |

4. Copy your API endpoint — it looks like:
   ```
   https://67abc1234def56789.mockapi.io/api/v1/employees
   ```

### Step 3 — Configure the API endpoint

Open `src/services/employeeService.js` and replace `YOUR_PROJECT_ID`:

```js
const BASE_URL = 'https://YOUR_PROJECT_ID.mockapi.io/api/v1'
//                        ^^^^^^^^^^^^^^^^ paste your project ID here
```

### Step 4 — Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Part 2: MockAPI Integration

The `employeeService.js` wraps all HTTP calls via Axios:

| Method   | Endpoint              | Operation   |
|----------|-----------------------|-------------|
| GET      | /employees            | Fetch all   |
| POST     | /employees            | Create new  |
| PUT      | /employees/:id        | Update by ID|
| DELETE   | /employees/:id        | Delete by ID|

MockAPI automatically handles CORS — no backend setup needed.

---

## Part 3: CRUD Functionality

### Create
Click **Add Employee**, fill in the form, and click **Add Employee**.

### Read
All employees load automatically on page start from the MockAPI endpoint and are displayed in a searchable table.

### Update
Click the **pencil icon** next to any employee row. The form pre-fills with existing data. Click **Update Employee** to save changes.

### Delete
Click the **trash icon** → confirm in the modal popup → record is deleted from MockAPI.

---

## Part 4: UI Design (Bootstrap 5)

- **Responsive layout** using Bootstrap grid (`col-md-*`, `container-xl`)
- **Stats cards** at the top (total employees, departments, avg salary, designations)
- **Bootstrap Table** with hover states and badge-colored department labels
- **Modal** for delete confirmation (`bootstrap/Modal`)
- **Avatar circles** with initials for each employee
- **Form validation** with Bootstrap's `is-invalid` feedback classes
- **Animated transitions** (slide-down) when showing/hiding the form
- **Alert messages** with auto-dismiss after 4 seconds

---

## Part 5: Code Quality

- Clean, modular component structure
- Options API used consistently throughout
- Props & emits clearly defined on each component
- Validation logic separated from submit logic
- Error handling with `try/catch` on all API calls
- No hardcoded magic strings — API URL is in one service file
- Computed properties used for derived state (avgSalary, uniqueDepts, filtered list)

---

## Expected Output

The application renders:
1. A **navbar** with system name and college name
2. **4 stat cards** (Employees, Departments, Avg Salary, Designations)
3. **Add Employee button** that toggles the form
4. A **form** with 4 fields and validation
5. A **searchable table** listing all employees with Edit/Delete actions
6. A **delete confirmation modal**

---

## GitHub Upload

```bash
git init
git add .
git commit -m "WP Assignment-II: Employee Management System using Vue.js + MockAPI"
git remote add origin https://github.com/YOUR_USERNAME/employee-mgmt.git
git push -u origin main
```

Add screenshots to a `/screenshots` folder before pushing.
