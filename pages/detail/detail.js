Page({
  data: {
    spot: null
  },
  onLoad(options) {
    if (options.spot) {
      const spot = JSON.parse(options.spot);
      this.setData({ spot });
    } else {
      // 兼容旧逻辑（如果没有传参，回退到本地数据）
      const id = parseInt(options.id);
      const spots = [
       { id: 1, name: '外滩', intro: '黄浦江畔的百年历史建筑群', detail: '外滩全长1.5公里，南起延安东路，北至苏州河上的外白渡桥。', lat: 31.239, lng: 121.489, tags: ['历史建筑', '夜景'] },
      { id: 2, name: '东方明珠', intro: '上海地标性电视塔', detail: '高468米，于1995年建成，是上海浦东开发开放的象征。', lat: 31.239, lng: 121.502, tags: ['地标', '夜景'] },
      { id: 3, name: '豫园', intro: '明代江南古典园林', detail: '建于1559年，原为明代四川布政使潘允端的私人园林。', lat: 31.229, lng: 121.487, tags: ['古典园林', '历史建筑'] },
      { id: 4, name: '上海迪士尼', intro: '中国大陆首座迪士尼乐园', detail: '2016年开园，拥有七个主题园区。', lat: 31.144, lng: 121.663, tags: ['亲子乐园', '网红打卡'] },
      { id: 5, name: '南京路步行街', intro: '中华第一商业街', detail: '全长1033米，西起人民广场，东至外滩。', lat: 31.235, lng: 121.476, tags: ['购物', '美食'] },
      { id: 6, name: '武康路', intro: '老洋房与梧桐树的文化街区', detail: '长1.17公里，沿线有30多处历史建筑。', lat: 31.214, lng: 121.445, tags: ['网红打卡', '历史建筑'] },
      { id: 7, name: '上海科技馆', intro: '科普教育基地', detail: '包括天地馆、生命馆、智慧馆等11个展区。', lat: 31.221, lng: 121.553, tags: ['亲子乐园', '科技'] },
      { id: 8, name: '田子坊', intro: '石库门里弄的创意街区', detail: '汇集了画廊、手工艺品店和特色小吃。', lat: 31.212, lng: 121.471, tags: ['网红打卡', '美食'] },
      { id: 9, name: '新天地', intro: '时尚休闲地标', detail: '以上海近代建筑“石库门”为基础改造。', lat: 31.222, lng: 121.475, tags: ['购物', '美食'] },
      { id: 10, name: '上海博物馆', intro: '中国古代艺术博物馆', detail: '馆藏文物近102万件，其中珍贵文物14万件。', lat: 31.232, lng: 121.476, tags: ['历史建筑', '文化'] },
      { id: 11, name: '世纪公园', intro: '上海最大的生态公园', detail: '占地140.3公顷，以草坪、湖泊和森林为特色。', lat: 31.215, lng: 121.552, tags: ['自然风光', '亲子乐园'] },
      { id: 12, name: '静安寺', intro: '千年古刹', detail: '始建于三国时期，是上海最古老的寺庙之一。', lat: 31.225, lng: 121.449, tags: ['历史建筑', '宗教文化'] },
      { id: 13, name: '1933老场坊', intro: '艺术创意园区', detail: '原为宰牲场，现为时尚创意设计中心。', lat: 31.258, lng: 121.492, tags: ['网红打卡', '历史建筑'] },
      { id: 14, name: '上海野生动物园', intro: '国家级野生动物园', detail: '汇集了世界各地200多种动物。', lat: 31.071, lng: 121.715, tags: ['亲子乐园', '自然风光'] },
      { id: 15, name: '朱家角古镇', intro: '江南水乡古镇', detail: '九条长街沿河而伸，千栋明清建筑依水而立。', lat: 31.117, lng: 121.053, tags: ['古典园林', '历史建筑'] },
      { id: 16, name: '滨江大道', intro: '黄浦江畔的休闲步道', detail: '全长2500米，可眺望外滩和陆家嘴全景。', lat: 31.241, lng: 121.497, tags: ['夜景', '自然风光'] },
      { id: 17, name: '上海自然博物馆', intro: '中国最大的自然博物馆之一', detail: '馆藏标本近29万件。', lat: 31.236, lng: 121.461, tags: ['亲子乐园', '文化'] },
      { id: 18, name: '思南公馆', intro: '花园洋房建筑群', detail: '51栋花园洋房，保留了老上海的记忆。', lat: 31.214, lng: 121.467, tags: ['历史建筑', '网红打卡'] },
      { id: 19, name: '上海中心大厦', intro: '中国第一高楼', detail: '高632米，拥有世界最快的电梯。', lat: 31.237, lng: 121.503, tags: ['地标', '夜景'] },
      { id: 20, name: '七宝古镇', intro: '千年古镇', detail: '既有江南水乡风光，又有丰富的小吃。', lat: 31.163, lng: 121.352, tags: ['美食', '历史建筑'] } // 这里可以放你原来的20个本地景点，作为后备
      ];
      const found = spots.find(s => s.id === id);
      this.setData({ spot: found });
    }
    
  },
  openMap() {
    const spot = this.data.spot;
    if (!spot) return;
    wx.openLocation({
      latitude: spot.lat,
      longitude: spot.lng,
      name: spot.name,
      address: spot.detail || spot.address || '',
      scale: 15
    });
  },
  goExplore() {
    const spot = this.data.spot;
    if (!spot) return;
    wx.navigateTo({
      url: `/pages/nearby/nearby?lat=${spot.lat}&lng=${spot.lng}&name=${spot.name}`
    });
  }
});