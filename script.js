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

// history
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

          <button class="action-btn approve-btn"
          onclick="approveLeave(${index})">
            Approve
          </button>

          <button class="action-btn reject-btn"
          onclick="rejectLeave(${index})"
          style="margin-left:5px;">
            Reject
          </button>

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