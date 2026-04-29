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

if (table) {

  leaves.forEach((leave, index) => {

    let statusClass = leave.status.toLowerCase();

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
          <button onclick="approveLeave(${index})">
            Approve
          </button>

          <button onclick="rejectLeave(${index})"
            style="background:red; margin-left:5px;">
            Reject
          </button>
        </td>
      </tr>
    `;
  });
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