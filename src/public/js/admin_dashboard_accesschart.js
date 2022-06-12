async function loadAccessChart() {
    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Số lượt truy cập",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
    };

    const accessChart = new Chart(
        document.getElementById("accessChart"),
        config
    );
}
