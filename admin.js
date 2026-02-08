let originalData = [];

function fetchAppointments() {
    fetch('appointment_fetch.php')
    .then(res => res.json())
    .then(data => {
        // Add temporary "status" to each row
        originalData = data;
        renderTable(originalData);
    });
}

function renderTable(data) {
    const tbody = document.querySelector("#appointmentsTable tbody");
    tbody.innerHTML = '';
    data.forEach((row, index) => {
    tbody.innerHTML += `
        <tr>
        <td>${row.id}</td>
        <td>${row.full_name}</td>
        <td>${row.phone_number}</td>
        <td>${row.visited_before}</td>
        <td>${row.service}</td>
        <td>${row.provider}</td>
        <td>${row.appointment_date}</td>
        <td>${row.appointment_time}</td>
        <td>${row.created_at}</td>
        <td id="status-${index}">${row.status}</td>
        <td>
            <button onclick="approve(${index})">Approve</button>
            <button onclick="del(${row.id})">Delete</button>
        </td>
        </tr>
    `;
    });
}

function approve(index) {
    const id = originalData[index].id;
    const status = "Approved";

    fetch('approve.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}&status=${status}`
    })
    .then(res => res.text())
    .then(response => {
        if (response.trim() === "success") {
            originalData[index].status = status;
            document.getElementById(`status-${index}`).innerText = status;
            alert("Appointment approved successfully.");
        } else {
            alert("Failed to approve appointment.");
        }
    });
}

function del(id) {
  if (confirm("Are you sure you want to delete this appointment?")) {
    fetch('delete.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'action=delete&id=' + encodeURIComponent(id),
    })
    .then(res => res.text())
    .then(response => {
      if (response.trim() === "success") {
        alert("Appointment deleted successfully.");
        fetchAppointments();
      } else {
        alert("Failed to delete appointment.");
      }
    });
  }
}

function filterAppointments() {
    const keyword = document.getElementById('search').value.toLowerCase();
    const date = document.getElementById('filterDate').value;

    const filtered = originalData.filter(item => {
    const matchKeyword = keyword === "" || (
        item.full_name.toLowerCase().includes(keyword) ||
        item.service.toLowerCase().includes(keyword) ||
        item.provider.toLowerCase().includes(keyword)
    );
    const matchDate = date === "" || item.appointment_date === date;
    return matchKeyword && matchDate;
    });

    renderTable(filtered);
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const headers = [
        ["ID", "Full Name", "Phone Number", "Visited Before", "Service", "Provider", "Appointment Date", "Appointment Time", "Created At", "Status"]
    ];

    const rows = originalData.map(row => [
        row.id,
        row.full_name,
        row.phone_number,
        row.visited_before,
        row.service,
        row.provider,
        row.appointment_date,
        row.appointment_time,
        row.created_at,
        row.status
    ]);

    doc.autoTable({
        head: headers,
        body: rows,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 160, 133] }
    });

    doc.save("appointments.pdf");
}

window.onload = fetchAppointments;