// === Chart.js Historical Data Fetch ===
function fetchHistoricalChart(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_KEY}`;
  const smaUrl = `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=20&series_type=close&apikey=${ALPHA_KEY}`;

  Promise.all([
    fetch(url).then(res => res.json()),
    fetch(smaUrl).then(res => res.json())
  ]).then(([priceData, smaData]) => {
    // Extract price and date data from Alpha Vantage API
    const timeSeries = priceData["Time Series (Daily)"];
    if (!timeSeries) return alert("Failed to fetch historical data");

    const dates = Object.keys(timeSeries).slice(0, 30).reverse();  // Get the latest 30 days of data
    const prices = dates.map(date => parseFloat(timeSeries[date]["4. close"]));  // Closing prices

    // Extract SMA (Simple Moving Average) data from the SMA API
    const smaSeries = smaData["Technical Analysis: SMA"];
    const smaValues = dates.map(date => smaSeries && smaSeries[date] ? parseFloat(smaSeries[date]["SMA"]) : null);

    // Get the context for the chart
    const ctx = document.getElementById("price-chart").getContext("2d");

    // Create or update the chart
    if (stockChart) stockChart.destroy(); // Destroy previous chart if exists

    stockChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,  // Set the labels as the date values
        datasets: [
          {
            label: `${symbol} Price`,  // Price line dataset
            data: prices,
            borderColor: "#90ee90",  // Light green for the price line
            fill: false,  // Don't fill the area under the line
            borderWidth: 2
          },
          {
            label: "SMA 20",  // SMA line dataset
            data: smaValues,
            borderColor: "#ffcc00",  // Yellow for the SMA line
            borderDash: [5, 5],  // Dotted line for SMA
            fill: false,  // Don't fill the area under the line
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Date"
            }
          },
          y: {
            title: {
              display: true,
              text: "Price (USD)"
            },
            beginAtZero: false
          }
        },
        plugins: {
          legend: {
            position: "top"
          }
        }
      }
    });
  }).catch(err => console.error("Error fetching chart data:", err));
}
