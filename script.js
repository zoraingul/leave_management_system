
//login system
const loginForm =
  document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();

      const username =
        document.getElementById("username").value;

      const role =
        document.getElementById("role").value;

      const user = {
        username: username,
        role: role
      };

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      window.location.href =
        "dashboard.html";
    }
  );
}

//auth check
const protectedPages = [
  "dashboard.html",
  "apply.html",
  "history.html"
];

const currentPage =
  window.location.pathname
  .split("/")
  .pop();

const loggedInUser =
  JSON.parse(
    localStorage.getItem("loggedInUser")
  );

if (
  protectedPages.includes(currentPage)
  && !loggedInUser
) {
  window.location.href = "login.html";
}

let leaves = JSON.parse(localStorage.getItem("leaves")) || [];


function saveLeaves() {
  localStorage.setItem("leaves", JSON.stringify(leaves));
}

// apply leave
const form = document.getElementById("leaveForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const leave = {
      name: document.getElementById("name").value,
      dept: document.getElementById("dept").value,
      type: document.getElementById("type").value,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      reason: document.getElementById("reason").value,
      status: "Pending"
    };

    leaves.push(leave);

    saveLeaves();

    alert("Leave submitted successfully!");

    form.reset();
  });
}

// history table
const table = document.getElementById("historyTable");

function renderTable(filteredLeaves) {

  table.innerHTML = "";

  if (filteredLeaves.length === 0) {

    table.innerHTML = `
      <tr>
        <td colspan="6"
        style="text-align:center; padding:20px;">
          No matching records found.
        </td>
      </tr>
    `;

    return;
  }

  filteredLeaves.forEach((leave, index) => {

    let statusClass =
      leave.status.toLowerCase();

    table.innerHTML += `
      <tr>
        <td>${leave.name}</td>
        <td>${leave.dept}</td>
        <td>${leave.type}</td>
        <td>${leave.from} to ${leave.to}</td>

        <td>
          <span class="status ${statusClass}">
            ${leave.status}
          </span>
        </td>

        <td>

          ${
            loggedInUser &&
            loggedInUser.role === "Admin"
            ?
            `
            <button class="action-btn approve-btn"
            onclick="approveLeave(${index})">
              Approve
            </button>

            <button class="action-btn reject-btn"
            onclick="rejectLeave(${index})"
            style="margin-left:5px;">
              Reject
            </button>

            <button class="action-btn"
            onclick="editLeave(${index})"
            style="background:#f59e0b; margin-left:5px;">
              Edit
            </button>

            <button class="action-btn"
            onclick="deleteLeave(${index})"
            style="background:#475569; margin-left:5px;">
              Delete
            </button>
            `
            :
            `No Actions`
          }

        </td>
      </tr>
    `;
  });
}

if (table) {

  renderTable(leaves);

  const searchInput =
    document.getElementById("searchInput");

  const statusFilter =
    document.getElementById("statusFilter");

  function applyFilters() {

    let searchText =
      searchInput.value.toLowerCase();

    let selectedStatus =
      statusFilter.value;

    let filteredLeaves = leaves.filter(leave => {

      let matchesSearch =
        leave.name.toLowerCase()
        .includes(searchText);

      let matchesStatus =
        selectedStatus === "All" ||
        leave.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    renderTable(filteredLeaves);
  }

  searchInput.addEventListener(
    "input",
    applyFilters
  );

  statusFilter.addEventListener(
    "change",
    applyFilters
  );
}

function approveLeave(index) {

  leaves[index].status = "Approved";

  saveLeaves();

  location.reload();
}

function rejectLeave(index) {

  leaves[index].status = "Rejected";

  saveLeaves();

  location.reload();
}

const total = document.getElementById("total");
const pending = document.getElementById("pending");
const approved = document.getElementById("approved");

if (total) {

  total.innerText = leaves.length;

  pending.innerText =
    leaves.filter(l => l.status === "Pending").length;

  approved.innerText =
    leaves.filter(l => l.status === "Approved").length;
}


//delete leave
function deleteLeave(index) {

  let confirmDelete = confirm(
    "Delete this leave request?"
  );

  if (confirmDelete) {

    leaves.splice(index, 1);

    saveLeaves();

    location.reload();
  }
}

//edit leave

function editLeave(index) {

  let leave = leaves[index];

  let newName = prompt(
    "Edit Employee Name:",
    leave.name
  );

  if (newName === null) return;

  let newDept = prompt(
    "Edit Department:",
    leave.dept
  );

  if (newDept === null) return;

  leave.name = newName;
  leave.dept = newDept;

  saveLeaves();

  location.reload();
}

//logout
function logout() {

  localStorage.removeItem(
    "loggedInUser"
  );

  window.location.href =
    "login.html";
}