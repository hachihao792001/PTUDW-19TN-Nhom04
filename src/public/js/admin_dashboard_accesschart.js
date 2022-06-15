async function loadAccessChart(labelsData, accessesNumber) {
    const labels = labelsData;
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Số lượt truy cập",
                data: accessesNumber,
                fill: false,
                tension: 0.1,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.4)",
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
