async function loadSaleChart(labelsData, salesdata) {
    const labels = labelsData;
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Doanh thu",
                data: salesdata,
            },
        ],
    };

    const config = {
        type: "bar",
        data: data,
        options: {},
    };

    const saleChart = new Chart(document.getElementById("saleChart"), config);
}
