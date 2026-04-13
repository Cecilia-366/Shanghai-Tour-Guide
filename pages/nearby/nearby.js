Page({
  data: {
    categories: [
      { name: '酒店', value: '酒店' },
      { name: '地铁', value: '地铁站' },
      { name: '餐馆', value: '餐饮' },
      { name: '景点', value: '景点' }
    ],
    currentCategory: '酒店',
    pois: [],
    loading: true,
    lat: null,
    lng: null,
    spotName: ''
  },

  onLoad(options) {
    const lat = parseFloat(options.lat);
    const lng = parseFloat(options.lng);
    const spotName = options.name || '景点';
    this.setData({ lat, lng, spotName });
    this.fetchNearby('酒店');
  },

  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ currentCategory: category });
    this.fetchNearby(category);
  },

  fetchNearby(keyword) {
    this.setData({ loading: true, pois: [] });
    wx.request({
      url: 'https://restapi.amap.com/v3/place/around',
      data: {
        key: 'b4d0abb3ec4421a1e04f149c50e2cc29',   // 替换成你自己的Key
        location: `${this.data.lng},${this.data.lat}`,
        keywords: keyword,
        radius: 1000,        // 搜索半径1000米
        output: 'JSON'
      },
      success: (res) => {
        if (res.data.status === '1' && res.data.pois) {
          const pois = res.data.pois.map((poi, idx) => ({
            id: idx,
            name: poi.name,
            address: poi.address,
            distance: poi.distance
          }));
          this.setData({ pois, loading: false });
        } else {
          console.error('高德API错误', res.data);
          this.setData({ pois: [], loading: false });
        }
      },
      fail: (err) => {
        console.error('请求失败', err);
        this.setData({ loading: false });
      }
    });
  }
});