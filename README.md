# Shanghai Tourist Attraction Recommendation Mini Program
Une mini-programme WeChat pour recommander les attractions touristiques de Shanghai

A WeChat mini program that helps visitors discover popular attractions in Shanghai. Features include real-time attraction data from Amap API, tag-based filtering, search, map navigation, and nearby recommendations (hotels, restaurants, subway, trendy spots).

## Features

- **Attraction List** – 20+ curated Shanghai attractions with high-quality images
- **Tag Filtering** – Filter by historical sites, night views, family-friendly, shopping, etc.
- **Real-time Search** – Search attractions by name
- **Detail Page** – Full description, photo, and buttons for map & nearby
- **Map Navigation** – Built-in route planning via WeChat map
- **Nearby Recommendations** – Discover nearby POIs using Amap API
- **Fallback Mechanism** – Local data backup when network fails

## Tech Stack

- WeChat Mini Program (WXML, WXSS, JavaScript)
- Amap API (static map, place search, around search)
- Cursor (AI-assisted development)
- Git (version control)

## Demo Video

[Click here to watch the demo video](video/demo.mp4)

## Trial Version

Scan the QR code below to try the mini program on WeChat. *Note: Due to WeChat restrictions, you need to be added as a tester. Please contact me at [cecilia050102@163.com] and I will add your WeChat ID.*

[Trial QR Code](images/qr_trial.png)  

## Project Structure

```
Shanghai-Tour-Guide/
├── pages/
│   ├── index/          # Home page (list, tags, search)
│   ├── detail/         # Detail page (info, image, map, nearby)
│   └── nearby/         # Nearby page (category tabs, POI list)
├── images/             # Default placeholder images (3 random)
├── video/              # Demo video
├── utils/              # Utility functions
├── app.js
├── app.json
├── app.wxss
├── project.config.json
├── sitemap.json
├── package.json        # npm dependencies (weui-miniprogram)
├── package-lock.json   # dependency lock file
└── README.md
```
## How to Run Locally

1. Clone this repository.
2. Open with WeChat Developer Tool.
3. Replace `key` in `index.js` and `nearby.js` with your own Amap Web Service key.
4. (Optional) Configure request domain `https://restapi.amap.com` in WeChat backend.

## Future Improvements

- Add more attractions and smarter image matching
- User favorites collection
- Multi-destination route planning

## Contact

Xinying Jia – [cecilia050102@163.com]
