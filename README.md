# Stock Tracker Dashboard

## Project Overview
This project is a **Stock Tracker Dashboard** that allows users to search for stock symbols and view real-time prices, historical charts, company profiles, key statistics, and latest news. The application integrates **Twelve Data** for price data and historical charts, and **Finnhub** for company profiles and news.

---

## Weekly Progress

### Week 5
- Finalized the project proposal.
- Created wireframes for both the main search page and dashboard.
- Set up the project file structure, including HTML, CSS, JS, and assets folders.
- Researched and tested APIs (Twelve Data and Finnhub) for real-time and historical stock data, company profiles, and news.

### Week 6
- Implemented stock search functionality on the main page.
- Integrated API data to fetch real-time stock prices, historical prices, company info, and news.
- Built the dashboard layout to display charts, key statistics, company info, and news.
- Displayed charts using **Chart.js** and calculated SMA (Simple Moving Average) for visual analytics.

---

## File Structure

## Technologies Used
- **HTML, CSS, JavaScript**
- **Chart.js** for charts and SMA visualization
- **app.js and config.js** for fetching data
- **Twelve Data API** – real-time and historical stock prices
- **Finnhub API** – company profiles and news

---
    
    [User Input: Stock Symbol]
                 │
                 ▼
            index.html
                 │
                 ▼
        dashboard.html
                 │
      ┌──────────┴───────────┐
      ▼                      ▼

---

## Notes
- My **API keys** in `config.js`:
```json
{
     "TWELVE_DATA_KEY": "a33352d1123943829d738d51951a67a6",
    "FINNHUB_KEY": "d61dke1r01quq5pfto1gd61dke1r01quq5pfto20"
}


