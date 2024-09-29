const reportForm = document.getElementById("reportForm");
const reportList = document.getElementById("reportList");
const reportsChart = document.getElementById("reportsChart").getContext('2d');

// Fetch reports from the server
const fetchReports = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    const response = await fetch("http://localhost:5000/api/reports", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const reports = await response.json();
        displayReports(reports);
        renderChart(reports);
    } else {
        alert("Failed to fetch reports. You may need to log in again.");
        window.location.href = "index.html"; // Redirect to login page if unauthorized
    }
};

// Display reports in the list
const displayReports = (reports) => {
    reportList.innerHTML = ""; // Clear existing reports
    reports.forEach((report) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${report.title}</h3>
            <p>${report.description}</p>
            <p>Location: ${report.location}</p>
            <p>Status: ${report.status}</p>`
        ;
        reportList.appendChild(li);
    });
};

// Render chart for reports
const renderChart = (reports) => {
    const statusCounts = reports.reduce((acc, report) => {
        acc[report.status] = (acc[report.status] || 0) + 1; // Count statuses
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(statusCounts), // ['Pending', 'Resolved']
        datasets: [{
            label: 'Number of Reports',
            data: Object.values(statusCounts), // Counts for each status
            backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)']
        }]
    };

    new Chart(reportsChart, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Handle report submission
reportForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
        const location = document.getElementById("location").value;

    const newReport = {
        title,
        description,
        location,
    };

    const token = localStorage.getItem("token"); // Retrieve token

    const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(newReport),
    });

    if (response.ok) {
        reportForm.reset(); // Clear the form
        fetchReports(); // Refresh the report list and chart
    } else {
        const errorMessage = await response.json();
        alert(errorMessage.message || "Error creating report");
    }
});

// Initial fetch of reports when the page loads
fetchReports();

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("token"); // Remove token from local storage
    window.location.href = "index.html"; // Redirect to login page
});