Page({
  data: {
    allSpots: [],
    spots: [],
    tags: ['全部', '历史建筑', '夜景', '地标', '古典园林', '亲子乐园', '网红打卡', '购物', '美食', '文化', '自然风光'],
    currentTag: '全部',
    searchKeyword: ''
  },

  onLoad() {
    this.fetchSpotsFromAmap();
  },

  // ==================== 图片映射表（名称 → 图片链接） ====================
  imageMap: {
    '外滩': 'https://vcg01.cfp.cn/creative/vcg/800/new/VCG211561552430.jpg',
    '东方明珠': 'https://vcg05.cfp.cn/creative/vcg/800/new/VCG211585661867.jpg',
    '豫园': 'https://vcg01.cfp.cn/creative/vcg/800/new/VCG211423969425.jpg',
    '上海迪士尼': 'https://vcg01.cfp.cn/creative/vcg/800/new/VCG211438148663.jpg',
    '南京路步行街': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211558519680.jpg',
    '武康路': 'https://vcg05.cfp.cn/creative/vcg/800/new/VCG211502904981.jpg',
    '上海科技馆': 'https://vcg03.cfp.cn/creative/vcg/800/new/VCG21c9080a874.jpg',
    '田子坊': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211510518966.jpg',
    '新天地': 'https://vcg04.cfp.cn/creative/vcg/800/new/VCG211473376595.jpg',
    '上海博物馆': 'https://vcg03.cfp.cn/creative/vcg/800/new/VCG211355791731.jpg',
    '世纪公园': 'https://vcg05.cfp.cn/creative/vcg/800/new/VCG211341385829.jpg',
    '静安寺': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211419356314.jpg',
    '1933老场坊': 'https://vcg01.cfp.cn/creative/vcg/800/new/VCG211429910134.jpg',
    '朱家角古镇': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211411940206.jpg',
    '滨江大道': 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211385703963.jpg',
    '上海自然博物馆': 'https://vcg04.cfp.cn/creative/vcg/800/new/VCG211281479246.jpg',
    '思南公馆': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211429269087.jpg',
    '上海中心大厦': 'https://vcg03.cfp.cn/creative/vcg/800/new/VCG211426057480.jpg',
    '七宝古镇': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG21gic5367710.jpg',
    '上海人民广场': 'https://vcg03.cfp.cn/creative/vcg/800/new/VCG211380789899.jpg',
    '上海城隍庙': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211468627161.jpg',
    '静安雕塑公园': 'https://vcg03.cfp.cn/creative/vcg/800/new/VCG211549312622.jpg',
    '四行仓库': 'https://vcg05.cfp.cn/creative/vcg/800/new/VCG211459098674.jpg',
    '人民公园': 'https://vcg04.cfp.cn/creative/vcg/800/new/VCG211339084821.jpg',
    'LV巨轮': 'https://vcg03.cfp.cn/creative/vcg/800/new/VCG211577987587-YYR.jpg',
    '万国建筑博览群': 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211377007665.jpg',
    '外白渡桥': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211405199412.jpg',
    '中共四大纪念馆': 'https://vcg02.cfp.cn/creative/vcg/800/new/VCG211336478261.jpg',
    '上海文化广场': 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211467442399.jpg',
    '北外滩': 'https://vcg00.cfp.cn/creative/vcg/800/new/VCG211440577728.jpg',
    '白云观': 'https://vcg05.cfp.cn/creative/vcg/800/new/VCG211424559800.jpg'
  },

  // 根据景点名称获取图片链接
  getImageForName(name) {
  // 精确匹配
  if (this.imageMap[name]) return this.imageMap[name];
  // 模糊匹配
  for (let key in this.imageMap) {
    if (name.includes(key) || key.includes(name)) {
      return this.imageMap[key];
    }
  }
  // 随机三选一默认图片
  const defaultImages = [
    '/images/default1.jpg',
    '/images/default2.jpg',
    '/images/default3.jpg'
  ];
  const randomIndex = Math.floor(Math.random() * defaultImages.length);
  return defaultImages[randomIndex];
},

  fetchSpotsFromAmap() {
    wx.showLoading({ title: '加载景点...' });
    wx.request({
      url: 'https://restapi.amap.com/v3/place/text',
      data: {
        key: 'b4d0abb3ec4421a1e04f149c50e2cc29',
        keywords: '上海景点',
        types: '110000',
        city: '上海',
        offset: 20,
        output: 'JSON'
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.status === '1' && res.data.pois) {
          const pois = res.data.pois;
          // 定义景点信息映射表（你原有的，保留）
          const spotInfoMap = {
            '外滩': { intro: '黄浦江畔的万国建筑博览群', detail: '全长1.5公里，南起延安东路，北至外白渡桥，是上海的标志性景观带。', tags: ['历史建筑', '夜景','美食'] },
            '东方明珠广播电视塔': { intro: '上海浦东的地标性高塔', detail: '高468米，1995年建成，可俯瞰浦江两岸全景。', tags: ['地标', '夜景'] },
            '上海豫园': { intro: '明代江南古典园林', detail: '建于1559年，园内有江南园林典型的亭台楼阁。', tags: ['古典园林', '历史建筑','文化','夜景'] },
            '上海人民广场': { intro: '上海市中心的文化政治广场', detail: '周边有上海博物馆、上海大剧院等文化地标。', tags: ['文化', '亲子乐园','美食'] },
            '上海城隍庙': { intro: '上海著名道教宫观及商业区', detail: '始建于明代，现为热闹的旅游街区，小吃众多。', tags: ['历史建筑', '美食'] },
            '静安雕塑公园': { intro: '以雕塑为主题的城市公园', detail: '汇集中外雕塑作品，环境优美，适合散步。', tags: ['自然风光', '艺术'] },
            '上海四行仓库抗战纪念馆': { intro: '淞沪会战重要遗址', detail: '纪念八百壮士，展示抗战历史的纪念馆。', tags: ['历史建筑', '文化'] },
            '人民公园': { intro: '市中心开放式公园', detail: '原跑马场改建，内有相亲角、荷花池等。', tags: ['自然风光', '休闲'] },
            '静安寺': { intro: '千年古刹，闹中取静', detail: '始建于三国时期，金碧辉煌的佛教寺庙。', tags: ['历史建筑', '文化','夜景'] },
            '福州路文化街': { intro: '上海著名的文化用品一条街', detail: '书店、文具店、美术用品店集中地。', tags: ['购物', '文化','亲子乐园','美食'] },
            '万国建筑博览群': { intro: '外滩沿线的历史建筑群', detail: '52幢风格各异的大楼，有“万国建筑博览会”之称。', tags: ['历史建筑', '夜景'] },
            '外滩观景台': { intro: '观赏黄浦江两岸风光的最佳位置', detail: '位于外滩中段，可同时看到陆家嘴和外滩建筑群。', tags: ['夜景', '地标'] },
            '外白渡桥': { intro: '上海百年老桥，电影取景地', detail: '建于1907年，钢桁架结构，是苏州河上的标志桥。', tags: ['历史建筑', '网红打卡'] },
            '中共四大纪念馆': { intro: '党史重要纪念地', detail: '展示中共四大历史，位于四川北路公园内。', tags: ['历史建筑', '文化'] },
            '上海文化广场': { intro: '大型现代化剧场', detail: '常年上演音乐剧、话剧等演出。', tags: ['文化', '娱乐'] },
            '北外滩滨江绿地': { intro: '黄浦江边休闲步道', detail: '视野开阔，可眺望陆家嘴和外滩。', tags: ['自然风光', '夜景','亲子乐园'] },
            '白云观': { intro: '道教宫观', detail: '位于老城厢，建筑古朴，香火旺盛。', tags: ['历史建筑', '文化'] },
            '中国共产党第一次全国代表大会宿舍旧址': { intro: '中共诞生地相关旧址', detail: '博文女校旧址，具有重要历史意义。', tags: ['历史建筑', '文化'] },
            '辅德里公园': { intro: '社区公园', detail: '环境清幽，适合周边居民休憩。', tags: ['自然风光','亲子乐园'] },
            'LV巨轮': { intro: '南京西路商圈的艺术装置', detail: '路易威登巨型轮船装置，网红打卡点。', tags: ['网红打卡', '购物'] }
          };

          const realSpots = pois.map((poi, index) => {
            const name = poi.name;
            let intro, detail, tags;
            if (spotInfoMap[name]) {
              intro = spotInfoMap[name].intro;
              detail = spotInfoMap[name].detail;
              tags = spotInfoMap[name].tags;
            } else {
              intro = `${name} - 上海热门景点`;
              detail = poi.address || poi.pname;
              let autoTags = ['景点'];
              const type = poi.type || '';
              if (type.includes('风景名胜') || type.includes('公园')) autoTags = ['自然风光', '景点'];
              else if (type.includes('历史') || type.includes('文物')) autoTags = ['历史建筑', '景点'];
              else if (type.includes('购物')) autoTags = ['购物', '景点'];
              else if (type.includes('餐饮')) autoTags = ['美食', '景点'];
              else if (type.includes('娱乐')) autoTags = ['亲子乐园', '景点'];
              tags = autoTags;
            }
            const image = this.getImageForName(name);
            return {
              id: index + 1,
              name: name,
              intro: intro,
              detail: detail,
              lat: parseFloat(poi.location.split(',')[1]),
              lng: parseFloat(poi.location.split(',')[0]),
              tags: tags,
              image: image
            };
          });
          this.setData({ allSpots: realSpots });
          this.applyFilter();
          wx.showToast({ title: '已加载最新景点', icon: 'success' });
        } else {
          console.warn('高德无结果', res.data);
          this.loadFallbackSpots();
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('请求失败，使用本地数据', err);
        this.loadFallbackSpots();
      }
    });
  },

  loadFallbackSpots() {
    const backupSpots = [
      { id: 1, name: '外滩', intro: '黄浦江畔的百年历史建筑群', detail: '外滩全长1.5公里，南起延安东路，北至苏州河上的外白渡桥。', lat: 31.239, lng: 121.489, tags: ['历史建筑', '夜景'], image: this.getImageForName('外滩') },
      { id: 2, name: '东方明珠', intro: '上海地标性电视塔', detail: '高468米，于1995年建成，是上海浦东开发开放的象征。', lat: 31.239, lng: 121.502, tags: ['地标', '夜景'], image: this.getImageForName('东方明珠') },
      { id: 3, name: '豫园', intro: '明代江南古典园林', detail: '建于1559年，原为明代四川布政使潘允端的私人园林。', lat: 31.229, lng: 121.487, tags: ['古典园林', '历史建筑'], image: this.getImageForName('豫园') },
      { id: 4, name: '上海迪士尼', intro: '中国大陆首座迪士尼乐园', detail: '2016年开园，拥有七个主题园区。', lat: 31.144, lng: 121.663, tags: ['亲子乐园', '网红打卡'], image: this.getImageForName('上海迪士尼') },
      { id: 5, name: '南京路步行街', intro: '中华第一商业街', detail: '全长1033米，西起人民广场，东至外滩。', lat: 31.235, lng: 121.476, tags: ['购物', '美食'], image: this.getImageForName('南京路步行街') },
      { id: 6, name: '武康路', intro: '老洋房与梧桐树的文化街区', detail: '长1.17公里，沿线有30多处历史建筑。', lat: 31.214, lng: 121.445, tags: ['网红打卡', '历史建筑'], image: this.getImageForName('武康路') },
      { id: 7, name: '上海科技馆', intro: '科普教育基地', detail: '包括天地馆、生命馆、智慧馆等11个展区。', lat: 31.221, lng: 121.553, tags: ['亲子乐园', '科技'], image: this.getImageForName('上海科技馆') },
      { id: 8, name: '田子坊', intro: '石库门里弄的创意街区', detail: '汇集了画廊、手工艺品店和特色小吃。', lat: 31.212, lng: 121.471, tags: ['网红打卡', '美食'], image: this.getImageForName('田子坊') },
      { id: 9, name: '新天地', intro: '时尚休闲地标', detail: '以上海近代建筑“石库门”为基础改造。', lat: 31.222, lng: 121.475, tags: ['购物', '美食'], image: this.getImageForName('新天地') },
      { id: 10, name: '上海博物馆', intro: '中国古代艺术博物馆', detail: '馆藏文物近102万件，其中珍贵文物14万件。', lat: 31.232, lng: 121.476, tags: ['历史建筑', '文化'], image: this.getImageForName('上海博物馆') },
      { id: 11, name: '世纪公园', intro: '上海最大的生态公园', detail: '占地140.3公顷，以草坪、湖泊和森林为特色。', lat: 31.215, lng: 121.552, tags: ['自然风光', '亲子乐园'], image: this.getImageForName('世纪公园') },
      { id: 12, name: '静安寺', intro: '千年古刹', detail: '始建于三国时期，是上海最古老的寺庙之一。', lat: 31.225, lng: 121.449, tags: ['历史建筑', '宗教文化'], image: this.getImageForName('静安寺') },
      { id: 13, name: '1933老场坊', intro: '艺术创意园区', detail: '原为宰牲场，现为时尚创意设计中心。', lat: 31.258, lng: 121.492, tags: ['网红打卡', '历史建筑'], image: this.getImageForName('1933老场坊') },
      { id: 14, name: '上海野生动物园', intro: '国家级野生动物园', detail: '汇集了世界各地200多种动物。', lat: 31.071, lng: 121.715, tags: ['亲子乐园', '自然风光'], image: this.getImageForName('上海野生动物园') },
      { id: 15, name: '朱家角古镇', intro: '江南水乡古镇', detail: '九条长街沿河而伸，千栋明清建筑依水而立。', lat: 31.117, lng: 121.053, tags: ['古典园林', '历史建筑'], image: this.getImageForName('朱家角古镇') },
      { id: 16, name: '滨江大道', intro: '黄浦江畔的休闲步道', detail: '全长2500米，可眺望外滩和陆家嘴全景。', lat: 31.241, lng: 121.497, tags: ['夜景', '自然风光'], image: this.getImageForName('滨江大道') },
      { id: 17, name: '上海自然博物馆', intro: '中国最大的自然博物馆之一', detail: '馆藏标本近29万件。', lat: 31.236, lng: 121.461, tags: ['亲子乐园', '文化'], image: this.getImageForName('上海自然博物馆') },
      { id: 18, name: '思南公馆', intro: '花园洋房建筑群', detail: '51栋花园洋房，保留了老上海的记忆。', lat: 31.214, lng: 121.467, tags: ['历史建筑', '网红打卡'], image: this.getImageForName('思南公馆') },
      { id: 19, name: '上海中心大厦', intro: '中国第一高楼', detail: '高632米，拥有世界最快的电梯。', lat: 31.237, lng: 121.503, tags: ['地标', '夜景'], image: this.getImageForName('上海中心大厦') },
      { id: 20, name: '七宝古镇', intro: '千年古镇', detail: '既有江南水乡风光，又有丰富的小吃。', lat: 31.163, lng: 121.352, tags: ['美食', '历史建筑'], image: this.getImageForName('七宝古镇') }
    ];
    this.setData({ allSpots: backupSpots });
    this.applyFilter();
    wx.showToast({ title: '已加载本地景点', icon: 'none' });
  },

  applyFilter() {
    let filtered = this.data.allSpots;
    if (this.data.currentTag !== '全部') {
      filtered = filtered.filter(spot => spot.tags && spot.tags.indexOf(this.data.currentTag) !== -1);
    }
    if (this.data.searchKeyword && this.data.searchKeyword.trim()) {
      const kw = this.data.searchKeyword.trim().toLowerCase();
      filtered = filtered.filter(spot => spot.name && spot.name.toLowerCase().includes(kw));
    }
    this.setData({ spots: filtered });
  },

  filterByTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({ currentTag: tag });
    this.applyFilter();
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.applyFilter();
  },

  goToDetail(e) {
    const spot = e.currentTarget.dataset.spot;
    wx.navigateTo({
      url: `/pages/detail/detail?spot=${JSON.stringify(spot)}`
    });
  }
});