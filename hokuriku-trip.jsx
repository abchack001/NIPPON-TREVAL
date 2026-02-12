import React, { useState, useEffect, useRef } from 'react';

export default function HokurikuTrip() {
  const [expandedDays, setExpandedDays] = useState({});
  const canvasRef = useRef(null);

  // 切換日程展開/收合
  const toggleDay = (day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  // 加入單日行程到 Google Calendar
  const addToCalendar = (day, e) => {
    e.stopPropagation();
    
    const tripData = {
      1: {
        date: '2026-09-24',
        title: '北陸之旅 Day 1 - 抵達日',
        description: `行程：
• 11:30 桃園機場出發
• 15:30 抵達中部國際機場
• 17:00-17:30 えびせんべいの里 買蝦餅
• 17:30-18:30 矢場丼豬排機場店 晚餐
• 20:30 東橫INN 米原西口站 CHECK IN

住宿：東橫INN 米原西口站`,
        startTime: '11:30',
        endTime: '21:00'
      },
      2: {
        date: '2026-09-25',
        title: '北陸之旅 Day 2 - 租車首日・彥根・長濱',
        description: `行程：
• 10:00 NIPPON RENT A CAR 米原店 取車
• 10:40-12:30 彥根城
• 12:30-13:45 比内地鶏夢京橋店 午餐
• 14:40-17:00 長濱市黑壁廣場
• 18:15-19:15 越前そばの里 晚餐
• 20:00-21:00 Seria 武生楽市店 採購

住宿：Route Inn Takefu Inter Hotel`,
        startTime: '08:30',
        endTime: '21:00'
      },
      3: {
        date: '2026-09-26',
        title: '北陸之旅 Day 3 - 大野・恐龍博物館',
        description: `行程：
• 09:40-10:00 四季の餅 あめこ
• 10:00-11:30 越前大野城
• 11:40-13:00 古民家茶屋 おがまち 午餐
• 14:00-17:00 福井縣立恐龍博物館
• 18:00-19:00 しゃぶ葉 福井大和田店 晚餐
• 20:00-21:00 ドン・キホーテ 採購

住宿：コンフォートイン福井`,
        startTime: '08:30',
        endTime: '21:00'
      },
      4: {
        date: '2026-09-27',
        title: '北陸之旅 Day 4 - 丸岡・東尋坊・動物園・還車',
        description: `行程：
• 09:30-11:00 丸岡城
• 11:40-12:00 蘆湯 泡足湯
• 12:00-14:30 東尋坊 午餐+散步
• 15:30-17:00 いしかわ動物園
• 18:00 NIPPON RENT A CAR 金澤西口站 還車
• 19:00-20:00 金澤站周邊晚餐

住宿：金沢マンテンホテル駅前`,
        startTime: '08:30',
        endTime: '20:00'
      },
      5: {
        date: '2026-09-28',
        title: '北陸之旅 Day 5 - 金澤東側・市場與茶屋街',
        description: `行程：
• 09:30-11:30 近江町市場
• 12:00-15:00 東茶屋街
• 15:30-16:30 尾山神社
• 17:00-18:00 長町武家屋敷跡
• 18:30-20:00 金澤肉食堂 百番街店 晚餐

住宿：金沢マンテンホテル駅前`,
        startTime: '08:30',
        endTime: '20:00'
      },
      6: {
        date: '2026-09-29',
        title: '北陸之旅 Day 6 - 金澤西側・兼六園與美術館',
        description: `行程：
• 10:00-12:00 兼六園
• 12:15-13:15 金澤城跡
• 13:20-14:30 自由軒 午餐
• 14:30-17:00 金澤21世紀美術館
• 17:05-17:45 石浦神社
• 18:30-19:30 Go Go Curry 晚餐
• 19:30-21:00 金澤站補貨

住宿：金沢マンテンホテル駅前`,
        startTime: '08:30',
        endTime: '21:00'
      },
      7: {
        date: '2026-09-30',
        title: '北陸之旅 Day 7 - 返台日',
        description: `行程：
• 07:30 飯店早餐、退房
• 08:30 金澤站西口搭乘機場巴士
• 09:20 抵達小松機場
• 11:45 小松機場起飛
• 13:55 抵達桃園機場`,
        startTime: '07:30',
        endTime: '13:55'
      }
    };
    
    const data = tripData[day];
    if (!data) return;
    
    const startDateTime = `${data.date}T${data.startTime.replace(':', '')}00`;
    const endDateTime = `${data.date}T${data.endTime.replace(':', '')}00`;
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(data.description)}&location=日本北陸&sf=true&output=xml`;
    
    window.open(calendarUrl, '_blank');
  };

  // 一鍵加入所有行程
  const addAllToCalendar = () => {
    const confirmMsg = '即將開啟 7 個 Google 日曆分頁，每天的行程都會分別加入。\n\n請確認您的瀏覽器允許彈出視窗。\n\n要繼續嗎？';
    
    if (!confirm(confirmMsg)) return;
    
    const tripData = {
      1: { date: '2026-09-24', title: '北陸之旅 Day 1 - 抵達日', description: '行程：\n• 11:30 桃園機場出發\n• 15:30 抵達中部國際機場\n• 17:00-17:30 えびせんべいの里 買蝦餅\n• 17:30-18:30 矢場丼豬排機場店 晚餐\n• 20:30 東橫INN 米原西口站 CHECK IN\n\n住宿：東橫INN 米原西口站', startTime: '11:30', endTime: '21:00' },
      2: { date: '2026-09-25', title: '北陸之旅 Day 2 - 租車首日・彥根・長濱', description: '行程：\n• 10:00 NIPPON RENT A CAR 米原店 取車\n• 10:40-12:30 彥根城\n• 12:30-13:45 比内地鶏夢京橋店 午餐\n• 14:40-17:00 長濱市黑壁廣場\n• 18:15-19:15 越前そばの里 晚餐\n• 20:00-21:00 Seria 武生楽市店 採購\n\n住宿：Route Inn Takefu Inter Hotel', startTime: '08:30', endTime: '21:00' },
      3: { date: '2026-09-26', title: '北陸之旅 Day 3 - 大野・恐龍博物館', description: '行程：\n• 09:40-10:00 四季の餅 あめこ\n• 10:00-11:30 越前大野城\n• 11:40-13:00 古民家茶屋 おがまち 午餐\n• 14:00-17:00 福井縣立恐龍博物館\n• 18:00-19:00 しゃぶ葉 福井大和田店 晚餐\n• 20:00-21:00 ドン・キホーテ 採購\n\n住宿：コンフォートイン福井', startTime: '08:30', endTime: '21:00' },
      4: { date: '2026-09-27', title: '北陸之旅 Day 4 - 丸岡・東尋坊・動物園・還車', description: '行程：\n• 09:30-11:00 丸岡城\n• 11:40-12:00 蘆湯 泡足湯\n• 12:00-14:30 東尋坊 午餐+散步\n• 15:30-17:00 いしかわ動物園\n• 18:00 NIPPON RENT A CAR 金澤西口站 還車\n• 19:00-20:00 金澤站周邊晚餐\n\n住宿：金沢マンテンホテル駅前', startTime: '08:30', endTime: '20:00' },
      5: { date: '2026-09-28', title: '北陸之旅 Day 5 - 金澤東側・市場與茶屋街', description: '行程：\n• 09:30-11:30 近江町市場\n• 12:00-15:00 東茶屋街\n• 15:30-16:30 尾山神社\n• 17:00-18:00 長町武家屋敷跡\n• 18:30-20:00 金澤肉食堂 百番街店 晚餐\n\n住宿：金沢マンテンホテル駅前', startTime: '08:30', endTime: '20:00' },
      6: { date: '2026-09-29', title: '北陸之旅 Day 6 - 金澤西側・兼六園與美術館', description: '行程：\n• 10:00-12:00 兼六園\n• 12:15-13:15 金澤城跡\n• 13:20-14:30 自由軒 午餐\n• 14:30-17:00 金澤21世紀美術館\n• 17:05-17:45 石浦神社\n• 18:30-19:30 Go Go Curry 晚餐\n• 19:30-21:00 金澤站補貨\n\n住宿：金沢マンテンホテル駅前', startTime: '08:30', endTime: '21:00' },
      7: { date: '2026-09-30', title: '北陸之旅 Day 7 - 返台日', description: '行程：\n• 07:30 飯店早餐、退房\n• 08:30 金澤站西口搭乘機場巴士\n• 09:20 抵達小松機場\n• 11:45 小松機場起飛\n• 13:55 抵達桃園機場', startTime: '07:30', endTime: '13:55' }
    };
    
    for (let day = 1; day <= 7; day++) {
      setTimeout(() => {
        const data = tripData[day];
        const startDateTime = `${data.date}T${data.startTime.replace(':', '')}00`;
        const endDateTime = `${data.date}T${data.endTime.replace(':', '')}00`;
        
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(data.description)}&location=日本北陸&sf=true&output=xml`;
        
        window.open(calendarUrl, '_blank');
      }, day * 500);
    }
  };

  // Canvas 背景動畫
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const sakuras = [];
    for (let i = 0; i < 30; i++) {
      sakuras.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * 360
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      sakuras.forEach(sakura => {
        ctx.save();
        ctx.translate(sakura.x, sakura.y);
        ctx.rotate(sakura.rotation * Math.PI / 180);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, sakura.size);
        gradient.addColorStop(0, 'rgba(255, 182, 193, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 105, 180, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, sakura.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        sakura.y += sakura.speed;
        sakura.rotation += 2;
        
        if (sakura.y > canvas.height) {
          sakura.y = -sakura.size;
          sakura.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dayColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
    '#ffeaa7', '#fd79a8', '#a29bfe'
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Canvas 背景 */}
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      />
      
      {/* 主內容 */}
      <div className="relative z-10 max-w-6xl mx-auto p-5">
        {/* 標題 */}
        <div className="text-center bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-10 mb-8 shadow-2xl border-4 border-pink-400 animate-pulse">
          <h1 className="text-5xl font-bold text-pink-600 mb-3" style={{
            textShadow: '3px 3px 0 #fff, 6px 6px 0 #ff69b4'
          }}>
            🗾 北陸7天6夜親子之旅 🌸
          </h1>
          <p className="text-2xl text-pink-700 font-bold">2026年9月24日 - 9月30日</p>
        </div>
        
        {/* 航班資訊 */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 shadow-xl border-4 border-yellow-400 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">✈️ 去程航班</h3>
            <p className="text-lg mb-2"><strong>日期：</strong>9/24 (四)</p>
            <p className="text-lg mb-2"><strong>航班：</strong>國泰 CX530</p>
            <p className="text-lg mb-2"><strong>時間：</strong>11:30 → 15:30</p>
            <p className="text-lg"><strong>路線：</strong>桃園 → 中部國際機場</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 shadow-xl border-4 border-yellow-400 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">🚗 租車資訊</h3>
            <p className="text-lg mb-2"><strong>取車：</strong>9/25 10:00</p>
            <p className="text-lg mb-2"><strong>地點：</strong>NIPPON 米原店</p>
            <p className="text-lg mb-2"><strong>還車：</strong>9/27 19:00前</p>
            <p className="text-lg"><strong>地點：</strong>NIPPON 金澤西口站</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 shadow-xl border-4 border-yellow-400 hover:scale-105 transition-transform">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">✈️ 回程航班</h3>
            <p className="text-lg mb-2"><strong>日期：</strong>9/30 (三)</p>
            <p className="text-lg mb-2"><strong>航班：</strong>長榮 BR157</p>
            <p className="text-lg mb-2"><strong>時間：</strong>11:45 → 13:55</p>
            <p className="text-lg"><strong>路線：</strong>小松 → 桃園機場</p>
          </div>
        </div>
        
        {/* 一鍵加入所有行程按鈕 */}
        <button 
          onClick={addAllToCalendar}
          className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold text-xl py-5 px-10 rounded-full shadow-2xl hover:scale-110 transition-transform mx-auto block mb-8"
        >
          📅 一鍵加入所有行程到 Google 日曆
        </button>
        
        {/* 每日行程 */}
        {[
          {
            day: 1,
            date: '9/24 (四)',
            title: '抵達日',
            hotel: '🏨 東橫INN 米原西口站',
            schedule: [
              { time: '11:30', activity: '桃園機場出發' },
              { time: '15:30', activity: '抵達中部國際機場' },
              { time: '15:30-17:00', activity: '入境、領行李、準備出關' },
              { time: '17:00-17:30', activity: '機場4F えびせんべいの里 買蝦餅' },
              { time: '17:30-18:30', activity: '🍱 矢場丼豬排機場店 晚餐' },
              { time: '18:45', activity: '搭乘μ-sky往名鐵名古屋站' },
              { time: '19:15', activity: '抵達名鐵名古屋，轉乘JR往米原' },
              { time: '20:15', activity: '抵達米原站' },
              { time: '20:30', activity: '東橫INN CHECK IN、休息' }
            ],
            tips: ['第一天以休息為主，不要排太多行程', '可在便利商店採購隔天早餐或零食']
          },
          {
            day: 2,
            date: '9/25 (五)',
            title: '租車首日・彥根・長濱',
            hotel: '🏨 Route Inn Takefu Inter Hotel',
            schedule: [
              { time: '08:30', activity: '飯店早餐、退房' },
              { time: '09:30', activity: '步行至NIPPON RENT A CAR 米原店' },
              { time: '10:00', activity: '🚗 取車、確認車況、安裝兒童座椅' },
              { time: '10:20', activity: '開車前往彥根城（車程約15分鐘）' },
              { time: '10:40-12:30', activity: '🏯 彥根城 遊覽' },
              { time: '12:30-13:45', activity: '🍱 比内地鶏夢京橋店 午餐' },
              { time: '14:00-14:40', activity: '開車前往長濱市（車程約40分鐘）' },
              { time: '14:40-17:00', activity: '✨ 長濱市黑壁廣場 散策' },
              { time: '17:15-18:15', activity: '開車前往武生（車程約1小時）' },
              { time: '18:15-19:15', activity: '🍜 越前そばの里 晚餐' },
              { time: '19:30', activity: 'Route Inn Takefu Inter CHECK IN' },
              { time: '20:00-21:00', activity: '🛒 Seria 武生楽市店 採購物品' }
            ],
            tips: ['黑壁廣場有很多玻璃工藝品，小朋友可體驗玻璃珠DIY', '越前そばの里有蕎麥麵製作體驗（需預約）']
          },
          {
            day: 3,
            date: '9/26 (六)',
            title: '大野・恐龍博物館',
            hotel: '🏨 コンフォートイン福井',
            schedule: [
              { time: '08:30', activity: '飯店早餐、退房' },
              { time: '09:00-09:40', activity: '開車前往大野市（車程約40分鐘）' },
              { time: '09:40-10:00', activity: '🍡 四季の餅 あめこ 買伴手禮' },
              { time: '10:00-11:30', activity: '🏯 越前大野城 遊覽' },
              { time: '11:40-13:00', activity: '🍱 古民家レストラン 茶屋 おがまち 午餐' },
              { time: '13:10-13:50', activity: '開車前往福井恐龍博物館（車程約40分鐘）' },
              { time: '14:00-17:00', activity: '🦕 福井縣立恐龍博物館 遊覽' },
              { time: '17:10-18:00', activity: '開車前往福井市區（車程約50分鐘）' },
              { time: '18:00-19:00', activity: '🍲 しゃぶ葉 福井大和田店 晚餐' },
              { time: '19:15', activity: 'コンフォートイン福井 CHECK IN' },
              { time: '20:00-21:00', activity: '🛒 ドン・キホーテ 福井大和田店 採購' }
            ],
            tips: ['恐龍博物館是小朋友最愛，建議預留3小時以上', '恐龍博物館建議事先網路預約，避免現場排隊']
          },
          {
            day: 4,
            date: '9/27 (日)',
            title: '丸岡・東尋坊・動物園・還車',
            hotel: '🏨 金沢マンテンホテル駅前',
            schedule: [
              { time: '08:30', activity: '飯店早餐、退房' },
              { time: '09:00-09:30', activity: '開車前往丸岡城（車程約30分鐘）' },
              { time: '09:30-11:00', activity: '🏯 丸岡城 遊覽' },
              { time: '11:10-11:40', activity: '開車前往東尋坊（車程約30分鐘）' },
              { time: '11:40-12:00', activity: '♨️ 蘆湯 泡足湯、放鬆' },
              { time: '12:00-13:15', activity: '🍱 東尋坊 周邊午餐' },
              { time: '13:15-14:30', activity: '🌊 東尋坊散步、看斷崖絕壁' },
              { time: '14:40-15:30', activity: '開車前往石川動物園（車程約50分鐘）' },
              { time: '15:30-17:00', activity: '🐼 いしかわ動物園 遊玩' },
              { time: '17:10-17:50', activity: '開車前往金澤站（車程約40分鐘）' },
              { time: '18:00', activity: '🚗 NIPPON RENT A CAR 金澤西口站 還車' },
              { time: '18:30', activity: '步行至金沢マンテンホテル駅前 CHECK IN' },
              { time: '19:00-20:00', activity: '🍱 金澤站周邊晚餐' }
            ],
            tips: ['東尋坊懸崖邊請特別注意小朋友安全', '動物園17:00閉園，建議15:30前入園', '還車前記得加滿油，確認車況']
          },
          {
            day: 5,
            date: '9/28 (一)',
            title: '金澤東側・市場與茶屋街',
            hotel: '🏨 金沢マンテンホテル駅前',
            schedule: [
              { time: '08:30', activity: '飯店早餐' },
              { time: '09:30-11:30', activity: '🦀 近江町市場 逛市場、早午餐' },
              { time: '11:30-12:00', activity: '從近江町市場步行至東茶屋街' },
              { time: '12:00-15:00', activity: '🏮 東茶屋街 散策' },
              { time: '15:00-15:30', activity: '從東茶屋街搭巴士至尾山神社' },
              { time: '15:30-16:30', activity: '⛩️ 尾山神社 參拜' },
              { time: '16:30-17:00', activity: '從尾山神社步行至長町武家屋敷跡' },
              { time: '17:00-18:00', activity: '🏛️ 長町武家屋敷跡 散策' },
              { time: '18:00-18:30', activity: '搭巴士或步行返回金澤站' },
              { time: '18:30-20:00', activity: '🥩 晚餐：金澤肉食堂 百番街店' }
            ],
            tips: ['近江町市場建議一早去，魚販最新鮮、遊客較少', '東茶屋街可以慢慢逛，有很多特色小店', '建議購買「金澤巴士一日券」600日圓']
          },
          {
            day: 6,
            date: '9/29 (二)',
            title: '金澤西側・兼六園與美術館',
            hotel: '🏨 金沢マンテンホテル駅前',
            schedule: [
              { time: '08:30', activity: '飯店早餐' },
              { time: '09:30-10:00', activity: '從金澤站搭巴士至兼六園' },
              { time: '10:00-12:00', activity: '🌳 兼六園 散策' },
              { time: '12:00-12:15', activity: '從兼六園步行至金澤城公園' },
              { time: '12:15-13:15', activity: '🏯 金澤城跡 散步' },
              { time: '13:15-13:20', activity: '從金澤城步行至21世紀美術館' },
              { time: '13:20-14:30', activity: '🍱 美術館周邊午餐' },
              { time: '14:30-17:00', activity: '🎨 金澤21世紀美術館 參觀' },
              { time: '17:00-17:05', activity: '從美術館步行至石浦神社' },
              { time: '17:05-17:45', activity: '⛩️ 石浦神社 參拜' },
              { time: '17:45-18:30', activity: '搭巴士返回金澤站' },
              { time: '18:30-19:30', activity: '🍛 晚餐：Go Go Curry 金沢駅総本山' },
              { time: '19:30-21:00', activity: '🎁 金澤站補貨、買伴手禮' }
            ],
            tips: ['兼六園→金澤城→21世紀美術館→石浦神社 全程步行可達', '21世紀美術館週一閉館，週二正常開放', '這一區景點超集中，是金澤精華區']
          },
          {
            day: 7,
            date: '9/30 (三)',
            title: '返台日',
            hotel: '✈️ 回家囉！',
            schedule: [
              { time: '07:30', activity: '飯店早餐、退房' },
              { time: '08:30', activity: '🚌 金澤站西口搭乘機場巴士' },
              { time: '09:20', activity: '抵達小松機場' },
              { time: '09:20-11:15', activity: '辦理登機手續、逛免稅店、候機' },
              { time: '11:45', activity: '✈️ 小松機場起飛' },
              { time: '13:55', activity: '🏠 抵達桃園機場，返回溫暖的家' }
            ],
            tips: ['巴士班次不多，務必提前確認時刻表', '小松機場較小，提前1.5小時到即可']
          }
        ].map((dayData, index) => (
          <div 
            key={dayData.day}
            className="bg-white rounded-3xl p-8 mb-6 shadow-2xl transition-all hover:scale-105"
            style={{ borderLeft: `8px solid ${dayColors[index]}` }}
          >
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => toggleDay(dayData.day)}
            >
              <div 
                className="text-6xl font-bold mr-4"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Day {dayData.day}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {dayData.date} {dayData.title}
                </h2>
                <div className="text-gray-600 text-lg">{dayData.hotel}</div>
              </div>
              <button
                onClick={(e) => addToCalendar(dayData.day, e)}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full mr-3 hover:scale-110 transition-transform shadow-lg"
              >
                📅 加入日曆
              </button>
              <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white w-12 h-12 rounded-full text-2xl hover:rotate-90 transition-transform shadow-lg">
                {expandedDays[dayData.day] ? '−' : '+'}
              </button>
            </div>
            
            {expandedDays[dayData.day] && (
              <div className="mt-6 animate-fadeIn">
                {dayData.schedule.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-5 p-4 my-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border-l-4 border-purple-500 hover:translate-x-2 transition-transform"
                  >
                    <div className="font-bold text-purple-600 min-w-[100px] text-lg">
                      {item.time}
                    </div>
                    <div className="text-gray-700 text-lg leading-relaxed">
                      {item.activity}
                    </div>
                  </div>
                ))}
                
                {dayData.tips && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-2xl p-6 mt-5 shadow-lg">
                    <h4 className="text-orange-600 font-bold text-xl mb-3 flex items-center gap-2">
                      💡 貼心提醒
                    </h4>
                    <ul className="space-y-2">
                      {dayData.tips.map((tip, idx) => (
                        <li key={idx} className="text-gray-700 pl-6 relative text-lg">
                          <span className="absolute left-0">💡</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}