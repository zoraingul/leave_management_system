let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

const form = document.getElementById("leaveForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const newLeave = {
      name: document.getElementById("name").value,
      dept: document.getElementById("dept").value,
      type: document.getElementById("type").value,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      status: "Pending"
    };

    leaves.push(newLeave);
    localStorage.setItem("leaves", JSON.stringify(leaves));

    alert("Leave Submitted Successfully!");
    form.reset();
  });
}

// history page
const table = document.getElementById("historyTable");

if (table) {
  leaves.forEach(l => {
    table.innerHTML += `
      <tr>
        <td>${l.name}</td>
        <td>${l.type}</td>
        <td>${l.from} - ${l.to}</td>
        <td>${l.status}</td>
      </tr>
    `;
  });
}

//dashboard stats
const total = document.getElementById("total");
const pending = document.getElementById("pending");
const approved = document.getElementById("approved");

if (total) {
  total.innerText = leaves.length;
  pending.innerText = leaves.filter(l => l.status === "Pending").length;
  approved.innerText = leaves.filter(l => l.status === "Approved").length;
}