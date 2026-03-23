# 🌊 Turkey Water Crisis Analytics Platform

**Live Demo → [turkey-water-crisis.vercel.app](https://turkey-water-crisis.vercel.app)**

An interactive data dashboard analyzing Turkey's water scarcity crisis across 25 river basins, with industrial water consumption trends and 2100 projections — built to support evidence-based decision-making for water-intensive industries.

---

## 📊 What This Dashboard Shows

### Tab 1 — Basin Analysis
- **25 river basins** classified by Falkenmark Water Scarcity Index (Absolute Scarcity / Scarcity / Stress / Sufficient)
- Per-capita water potential (m³/year) for each basin
- Industrial sector overlay: Food, Textile, Chemical, Metal manufacturing presence
- Interactive cards with source citations (DSİ, WWF-TR, WRI Aqueduct)

### Tab 2 — Projection (2017–2100)
- Historical data: 1,386 m³/capita (2017) → 1,301 m³/capita (2025)
- Projections to 2100 under business-as-usual scenario
- Key threshold markers: 1,700 / 1,000 / 500 m³ Falkenmark thresholds
- Sources: DSİ 2025, WWF-TR, Turkish Ministry of Agriculture National Water Plan, WRI Aqueduct 4.0

### Tab 3 — Manufacturing Industry Trends
- **2000–2024 water withdrawal trends** (total: 1.47 → 3.08 billion m³, +110%)
- Source breakdown: seawater cooling vs. freshwater dependency
- **OSB (Organized Industrial Zone) network growth: +172%** (2008–2024)
- Donut charts: freshwater source distribution (groundwater 46.5%, OSB network 19.3%, reservoirs, rivers)
- Consumption breakdown by use type: cooling water, process water, domestic, boiler

---

## 🔍 Key Findings

| Metric | Value | Source |
|--------|-------|--------|
| Turkey per-capita water (2025) | **1,301 m³/year** — Water Stress threshold | DSİ 2025 |
| Manufacturing water withdrawal (2024) | **3.082 billion m³** | TÜİK 2024 |
| Basins in Absolute Scarcity or Scarcity | **9 out of 25** | DSİ / WWF-TR |
| Marmara Basin per-capita water | **220 m³/year** — below Absolute Scarcity | WWF-TR |
| Istanbul reservoir level (Nov 2025) | **20.29%** — 5-year low | İSKİ |
| Projected per-capita water (2060) | **980 m³/year** — Scarcity territory | WRI BAU scenario |

---

## 🏭 Industrial Relevance

Turkey's water-intensive manufacturing sectors (textile, food, chemical, metal) are disproportionately concentrated in the most water-stressed basins:

- **Gediz Basin** (Izmir/Manisa) — Turkey's top textile hub, 310 m³/capita → Absolute Scarcity
- **Marmara Basin** — 28% of population, only 4% of national water flow, 220 m³/capita
- **Sakarya Basin** — Turkey's densest OSB concentration, multi-sector industrial hub

This geographic mismatch between industrial density and water availability creates urgent demand for **alternative water sourcing solutions** — particularly for process water and backup cooling.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Charts | Recharts (line, area, bar, pie) |
| Custom visualizations | SVG (donut charts, bar charts) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 📁 Project Structure

```
Turkey-Water-Crisis/
├── index.html
├── main.jsx
├── turkey-water-crisis-v5.jsx   # Main dashboard component
├── package.json
└── vite.config.js
```

---

## 📚 Data Sources

| Source | Data Used |
|--------|-----------|
| **DSİ** (State Hydraulic Works) | Per-capita water potential by basin, 2024–2025 |
| **TÜİK** (Turkish Statistical Institute) | Manufacturing industry water indicators 2000–2024 |
| **WWF-TR** | Basin classification, Marmara paradox analysis |
| **WRI Aqueduct 4.0** | 2050 water stress projections, GDP risk analysis |
| **İSKİ** | Istanbul reservoir levels 2025–2026 |
| **Turkish Ministry of Agriculture** | National Water Plan projections |
| **BSTB VGM 2017** | Sectoral water consumption by NACE codes |

---

## 🔗 Related Work

This dashboard is part of a broader research initiative on **atmospheric water generation (AWG)** as an alternative water source for Turkish industrial facilities — exploring the intersection of water scarcity data, meteorological feasibility, and industrial demand patterns.

---

## 👤 Author

**Gizem Bal** — Industrial Engineer & Data Scientist  
[LinkedIn](https://www.linkedin.com/in/balgizem/) · [GitHub](https://github.com/gizembal)

*Data last updated: March 2026*
