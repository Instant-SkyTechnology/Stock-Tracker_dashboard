// ================= API KEYS =================
const TWELVE_KEY = config.TWELVE_DATA_KEY;
const FINNHUB_KEY = config.FINNHUB_KEY;

// ================= DOM ELEMENTS =================
const companyNameEl = document.getElementById("company-name");
const priceValueEl = document.getElementById("price-value");
const priceArrowEl = document.getElementById("price-arrow");

const statOpenEl = document.getElementById("stat-open");
const statHighEl = document.getElementById("stat-high");
const statLowEl = document.getElementById("stat-low");
const statVolumeEl = document.getElementById("stat-volume");

const companyCapEl = document.getElementById("company-cap");
const companySectorEl = document.getElementById("company-sector");
const companyIndustryEl = document.getElementById("company-industry");

const newsListEl = document.getElementById("news-list");
const icon = document.querySelector("header .icon");

const chartCtx = document.getElementById("price-chart").getContext("2d");
const toggleSmaBtn = document.getElementById("toggle-sma-btn");

let previousPrice = null;
let stockChart = null;
let smaVisible = true;

// ================= GET SYMBOL =================
const params = new URLSearchParams(window.location.search);
const symbol = (params.get("symbol") || "AAPL").toUpperCase();

// ================= REAL-TIME PRICE (Finnhub) =================
async function fetchRealTimePrice(symbol) {
    const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
    );
    const data = await res.json();

    if (!data || data.c === undefined) {
        alert("Ticker not found. Please enter a valid stock symbol.");
        return;
    }

    const price = parseFloat(data.c);
    priceValueEl.textContent = price.toFixed(2);

    statOpenEl.textContent = data.o;
    statHighEl.textContent = data.h;
    statLowEl.textContent = data.l;
    statVolumeEl.textContent = data.v;

    if (previousPrice !== null) {
        priceArrowEl.textContent = price > previousPrice ? "↑" : "↓";
        priceArrowEl.style.color = price > previousPrice ? "#90ee90" : "#ff6b6b";
    }

    updateIcon(price);
    previousPrice = price;
}

// ================= COMPANY PROFILE (Finnhub) =================
async function fetchCompanyProfile(symbol) {
    const res = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_KEY}`
    );
    const data = await res.json();

    if (!data || !data.name) return;

    companyNameEl.textContent = `${data.name} (${symbol})`;
    companySectorEl.textContent = data.exchange || "N/A";
    companyIndustryEl.textContent = data.finnhubIndustry || "N/A";
    companyCapEl.textContent = data.marketCapitalization
        ? `$${(data.marketCapitalization / 1000).toFixed(2)}B`
        : "N/A";
}

// ================= NEWS (Finnhub) =================
async function fetchCompanyNews(symbol) {
    const today = new Date().toISOString().split("T")[0];
    const lastWeek = new Date(Date.now() - 7 * 86400000)
        .toISOString()
        .split("T")[0];

    const res = await fetch(
        `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${lastWeek}&to=${today}&token=${FINNHUB_KEY}`
    );
    const news = await res.json();

    newsListEl.innerHTML = "";

    if (!Array.isArray(news) || news.length === 0) {
        newsListEl.innerHTML = "<li>No recent news available.</li>";
        return;
    }

    news.slice(0, 5).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.headline;
        newsListEl.appendChild(li);
    });
}

// ================= HISTORICAL CHART + SMA (Twelve Data) =================
async function fetchHistoricalChart(symbol) {
    // Daily historical prices
    const res = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=30&apikey=${TWELVE_KEY}`
    );
    const data = await res.json();

    if (!data.values) {
        alert("Historical data unavailable.");
        return;
    }

    const labels = data.values.map(v => v.datetime).reverse();
    const prices = data.values.map(v => parseFloat(v.close)).reverse();

    // 20-day SMA
    const smaRes = await fetch(
        `https://api.twelvedata.com/sma?symbol=${symbol}&interval=1day&time_period=20&series_type=close&apikey=${TWELVE_KEY}`
    );
    const smaData = await smaRes.json();

    const smaValues = smaData.values
        ? smaData.values.map(v => parseFloat(v.sma)).reverse()
        : [];

    if (stockChart) stockChart.destroy();

    stockChart = new Chart(chartCtx, {
        type: "line",
        data: {
            labels,
            datasets: [
                { label: "Closing Price", data: prices, borderColor: "#90ee90", tension: 0.3 },
                ...(smaValues.length
                    ? [{ label: "SMA 20", data: smaValues, borderColor: "blue", borderDash: [5, 5], tension: 0.3 }]
                    : [])
            ]
        },
        options: { responsive: true }
    });
}

// ================= SMA TOGGLE =================
toggleSmaBtn.addEventListener("click", () => {
    if (stockChart.data.datasets[1]) {
        smaVisible = !smaVisible;
        stockChart.data.datasets[1].hidden = !smaVisible;
        toggleSmaBtn.textContent = smaVisible ? "Hide SMA" : "Show SMA";
        stockChart.update();
    }
});

// ================= ICON ANIMATION =================
function updateIcon(price) {
    icon.style.color =
        previousPrice && price < previousPrice ? "#ff6b6b" : "#90ee90";
    icon.classList.add("pulse");
    setTimeout(() => icon.classList.remove("pulse"), 500);
}

// ================= LOAD DASHBOARD =================
function loadDashboard() {
    fetchRealTimePrice(symbol);
    fetchCompanyProfile(symbol);
    fetchCompanyNews(symbol);
    fetchHistoricalChart(symbol);
}

loadDashboard();

