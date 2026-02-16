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

### Week 7
- Finalized styling using a consistent color scheme (dark blue, green, and white) and typography for readability.
- Added error handling and validation for invalid stock symbols or API errors.
- Integrated LocalStorage to persist user preferences such as last searched stock symbol, SMA toggle state, theme selection, and recent stock history to enhance user experience.
- Tested and debugged all features across different stock symbols to ensure data accuracy and responsive layout.
- Submitted the final project with fully functional search, dashboard, charts, and news integration.

---

## File Structure

## Technologies Used
- **HTML, CSS, JavaScript**
- **Chart.js** for charts and SMA visualization
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


