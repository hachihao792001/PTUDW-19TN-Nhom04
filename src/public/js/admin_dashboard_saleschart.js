async function loadSaleChart(productName, labelsData, salesNumber) {
    const labels = labelsData;
    const data = {
        labels: labels,
        datasets: [
            {
                label: productName,
                data: salesNumber,
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
