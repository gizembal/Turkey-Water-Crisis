import React, { useState, useEffect } from "react";
import { Droplets, AlertTriangle, TrendingDown, Users, Factory, Droplet, Map, BarChart3, Info, ChevronRight, Share2, Download, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

// Havza Verileri
const BASINS = [
  { id:1,  name:"Marmara",        region:"Marmara",        status:"kesin_kitlik", wpp:220,  pop_pct:28, flow_pct:4,  gida:true,  tekstil:false, kimya:true,  metal:true,  detail:"Nüfusun %28'i burada, ama toplam akışın yalnızca %4'ü. Kişi başı 220 m³ — kesin kıtlık sınırının da altında. Kimya (Kocaeli/İzmit), metal (Gebze) ve gıda sanayi yoğun. (WWF-TR)" },
  { id:2,  name:"Meriç-Ergene",    region:"Trakya",        status:"stres",        wpp:890,  pop_pct:3,  flow_pct:2,  gida:false, tekstil:true,  kimya:false, metal:false, detail:"Ergene Türkiye'nin en kirli nehirlerinden. Tekstil boyacılığı kaynaklı ağır metal ve kimyasal kirlilik. Tekirdağ Naip Barajı 2025'te tamamen kurudu." },
  { id:3,  name:"Susurluk",        region:"Ege Kuzey",     status:"kitlik",       wpp:740,  pop_pct:5,  flow_pct:6,  gida:true,  tekstil:true,  kimya:false, metal:false, detail:"Bursa ve Balıkesir. Türkiye'nin önemli tekstil (Bursa/Gemlik) ve gıda sanayi merkezlerinden biri. Su yenilenme kapasitesi aşılmış. (DSİ 2024)" },
  { id:4,  name:"Kuzey Ege",      region:"Ege",            status:"kitlik",       wpp:680,  pop_pct:2,  flow_pct:2,  gida:true,  tekstil:false, kimya:false, metal:false, detail:"Çanakkale ve Balıkesir kuzeyini kapsıyor. Gıda ve tarıma dayalı sanayi mevcut. Düşük yağış potansiyeli." },
  { id:5,  name:"Gediz",          region:"Ege",            status:"kesin_kitlik", wpp:310,  pop_pct:5,  flow_pct:3,  gida:true,  tekstil:true,  kimya:true,  metal:false, detail:"İzmir ve Manisa. Türkiye'nin en önemli tekstil havzası. Kimya OSB'leri de mevcut. Kişi başı 310 m³ — kesin kıtlık. (Tarım Gündem / DSİ)" },
  { id:6,  name:"Küçük Menderes", region:"Ege",            status:"kesin_kitlik", wpp:290,  pop_pct:2,  flow_pct:1,  gida:true,  tekstil:true,  kimya:false, metal:false, detail:"İzmir güneyi. Tekstil ve gıda sanayi var. Tarımsal sulama yeraltı suyunu hızla tüketiyor." },
  { id:7,  name:"Büyük Menderes", region:"Ege Güney",      status:"stres",        wpp:920,  pop_pct:3,  flow_pct:5,  gida:true,  tekstil:true,  kimya:false, metal:false, detail:"Aydın ve Denizli. Türkiye'nin önemli tekstil havzalarından. Gıda sanayi de mevcut." },
  { id:8,  name:"Batı Akdeniz",   region:"Akdeniz",        status:"zengin",       wpp:3200, pop_pct:2,  flow_pct:8,  gida:false, tekstil:false, kimya:false, metal:false, detail:"Yüksek yağış sayesinde su zenginliği kategorisinde." },
  { id:9,  name:"Antalya",         region:"Akdeniz",        status:"zengin",       wpp:4100, pop_pct:3,  flow_pct:10, gida:true,  tekstil:false, kimya:false, metal:false, detail:"Toros Dağları'ndan beslenen havza. Gıda ve turizm sektörü su kullanımı var." },
  { id:10, name:"Burdur",          region:"İç Anadolu",    status:"kesin_kitlik", wpp:180,  pop_pct:0.5,flow_pct:0.3,gida:false, tekstil:false, kimya:false, metal:false, detail:"Türkiye'nin kişi başı su potansiyeli en düşük havzası. Burdur Gölü son 50 yılda yüzey alanının %40'ını kaybetti." },
  { id:11, name:"Akarçay",        region:"İç Anadolu",    status:"kesin_kitlik", wpp:150,  pop_pct:0.5,flow_pct:0.2,gida:false, tekstil:false, kimya:false, metal:false, detail:"Afyon. Kapalı havza — dışarıya akmayan sistemde kirlilik birikimli etki yaratıyor." },
  { id:12, name:"Sakarya",        region:"Marmara-İç",    status:"kitlik",       wpp:760,  pop_pct:5,  flow_pct:5,  gida:true,  tekstil:true,  kimya:true,  metal:true,  detail:"Eskişehir, Kütahya, Sakarya, Kocaeli. Türkiye'nin en yoğun OSB havzalarından. Metal, kimya, tekstil ve gıda sanayi bir arada. Su kalitesi ciddi sorun." },
  { id:13, name:"Batı Karadeniz", region:"Karadeniz",      status:"zengin",       wpp:5800, pop_pct:4,  flow_pct:8,  gida:false, tekstil:false, kimya:false, metal:false, detail:"Bolu, Zonguldak, Bartın. Yüksek yağış miktarıyla su zengini." },
  { id:14, name:"Yeşilırmak",      region:"Karadeniz",      status:"stres",        wpp:1100, pop_pct:4,  flow_pct:5,  gida:true,  tekstil:false, kimya:false, metal:false, detail:"Samsun, Tokat, Amasya, Çorum. Gıda sanayi mevcut. Artan nüfusla su stresi artıyor." },
  { id:15, name:"Kızılırmak",      region:"İç Anadolu",    status:"stres",        wpp:1050, pop_pct:5,  flow_pct:7,  gida:true,  tekstil:false, kimya:true,  metal:false, detail:"Ankara dahil. Kimya sanayi (Kırıkkale petrokimya) ve gıda sektörü mevcut. Türkiye'nin en uzun nehri." },
  { id:16, name:"Konya Kapalı",    region:"İç Anadolu",    status:"stres",        wpp:870,  pop_pct:4,  flow_pct:3,  gida:true,  tekstil:false, kimya:false, metal:false, detail:"Tarımsal sulama için aşırı yeraltı suyu çekimi. Tahıl ve şeker pancarı üretimine dayalı gıda sanayi yoğun. Su stresi giderek derinleşiyor." },
  { id:17, name:"Doğu Karadeniz", region:"Karadeniz",      status:"zengin",       wpp:7200, pop_pct:3,  flow_pct:10, gida:false, tekstil:false, kimya:false, metal:false, detail:"Rize, Trabzon. En yüksek su potansiyelli havza. Yıllık yağış 2.500mm üzeri." },
  { id:18, name:"Çoruh",           region:"Doğu Anadolu",  status:"zengin",       wpp:6100, pop_pct:1,  flow_pct:4,  gida:false, tekstil:false, kimya:false, metal:false, detail:"Artvin. HES kapasitesi bakımından kritik. Gürcistan'a uzanan sınır ötesi havza." },
  { id:19, name:"Aras",            region:"Doğu Anadolu",  status:"zengin",       wpp:4800, pop_pct:2,  flow_pct:5,  gida:false, tekstil:false, kimya:false, metal:false, detail:"Erzurum, Ağrı. Türkiye-İran-Azerbaycan sınır ötesi havzası." },
  { id:20, name:"Van Gölü",        region:"Doğu Anadolu",  status:"stres",        wpp:1120, pop_pct:2,  flow_pct:2,  gida:false, tekstil:false, kimya:false, metal:false, detail:"Dünyanın en büyük soda gölü. Kapalı havza — tuzluluk artıyor." },
  { id:21, name:"Dicle-Fırat",     region:"Güneydoğu",     status:"zengin",       wpp:3800, pop_pct:8,  flow_pct:28, gida:false, tekstil:false, kimya:false, metal:false, detail:"Türkiye toplam akışının %28'i. Irak ve Suriye ile sınır ötesi su anlaşmazlığı." },
  { id:22, name:"Doğu Akdeniz",    region:"Akdeniz",        status:"zengin",       wpp:2900, pop_pct:2,  flow_pct:6,  gida:false, tekstil:false, kimya:false, metal:false, detail:"Mersin, Adana doğusu. Su zengini." },
  { id:23, name:"Seyhan",          region:"Akdeniz",        status:"stres",        wpp:1180, pop_pct:3,  flow_pct:4,  gida:true,  tekstil:false, kimya:true,  metal:false, detail:"Adana Ovası. Yoğun tarımsal sulama ve gıda sanayi. Petrokimya tesisleri mevcut. Seyhan Barajı kritik içme suyu kaynağı." },
  { id:24, name:"Asi",             region:"Akdeniz",        status:"kitlik",       wpp:640,  pop_pct:1,  flow_pct:0.5,gida:false, tekstil:false, kimya:false, metal:false, detail:"Hatay. Suriye kaynaklı sınır ötesi havza." },
  { id:25, name:"Ceyhan",          region:"Akdeniz",        status:"zengin",       wpp:2100, pop_pct:2,  flow_pct:5,  gida:false, tekstil:false, kimya:false, metal:false, detail:"Kahramanmaraş, Adıyaman. Su zengini." },
];

const ST = {
  kesin_kitlik: { label:"Kesin Kıtlık", falk:"< 500 m³",    color:"#b71c1c", bg:"rgba(183,28,28,0.07)",  border:"rgba(183,28,28,0.2)"  },
  kitlik:        { label:"Kıtlık",       falk:"500–1.000 m³", color:"#bf360c", bg:"rgba(191,54,12,0.07)",  border:"rgba(191,54,12,0.2)"  },
  stres:         { label:"Su Stresi",    falk:"1.000–1.700 m³",color:"#e65100", bg:"rgba(230,81,0,0.07)",   border:"rgba(230,81,0,0.2)"   },
  zengin:        { label:"Su Zengini",   falk:"> 1.700 m³",    color:"#4caf50", bg:"rgba(76,175,80,0.12)",  border:"rgba(76,175,80,0.35)"  },
};

const PROJ = [
  { year:"2017", wpp:1386, s:"stres",  real:true,  src:"DSİ 2024" },
  { year:"2025", wpp:1301, s:"stres",  real:true,  src:"DSİ 2025" },
  { year:"2030", wpp:1200, s:"stres",  real:false, src:"WWF-TR" },
  { year:"2040", wpp:1116, s:"stres",  real:false, src:"Tarım Bak." },
  { year:"2050", wpp:1069, s:"stres",  real:false, src:"WWF-TR" },
  { year:"2060", wpp:980,  s:"kitlik", real:false, src:"WRI Aqueduct" },
  { year:"2100", wpp:850,  s:"kitlik", real:false, src:"WRI BAU" },
];

export default function Dashboard() {
  const [tab, setTab]           = useState("basins");
  const [filter, setFilter]     = useState("all");
  const [selected, setSelected] = useState(null);
  const [loaded, setLoaded]     = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const counts = {
    kesin_kitlik: BASINS.filter(b => b.status === "kesin_kitlik").length,
    kitlik:        BASINS.filter(b => b.status === "kitlik").length,
    stres:         BASINS.filter(b => b.status === "stres").length,
    zengin:        BASINS.filter(b => b.status === "zengin").length,
  };

  const filtered = filter === "all" ? BASINS : BASINS.filter(b => b.status === filter);

  const C = (extra = {}) => ({
    background:"#fff", borderRadius:10, border:"1px solid #dde4ee",
    boxShadow:"0 1px 4px rgba(15,30,60,0.06)", padding:"20px 22px", ...extra,
  });

  const TABS = [
    { id:"basins",   label:"🗺  Havza Analizi" },
    { id:"proj",     label:"📈  Projeksiyon" },
    { id:"industry", label:"🏭  İmalat Sanayi" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#edf1f7", fontFamily:"Georgia,'Times New Roman',serif", color:"#1a2332" }}>
      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#0c1e3e 0%,#153162 55%,#0c1e3e 100%)", padding:"34px 36px 26px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontSize:9, letterSpacing:4, color:"#7eb3f5", marginBottom:9, fontFamily:"'Courier New',monospace" }}>SU KRİZİ ANALİTİK PLATFORMU — TÜRKİYE 2025–2026</div>
          <h1 style={{ margin:"0 0 3px", fontSize:"clamp(20px,4vw,38px)", fontWeight:700, color:"#fff" }}>Türkiye Su Kıtlığı Dashboard</h1>
          <h2 style={{ margin:"0 0 20px", fontSize:"clamp(13px,2.5vw,21px)", fontWeight:400, color:"#7eb3f5" }}>Bölgesel Havza Analizi ve Sanayi Etki Matrisi</h2>
          
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:22, alignItems:"center" }}>
            {Object.entries(ST).map(([k,v]) => (
              <div key={k} style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${v.border}`, background:"rgba(255,255,255,0.06)", fontSize:12, color:v.color, display:"flex", alignItems:"center", gap:7 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:v.color, display:"inline-block" }} />
                <span><strong style={{ fontSize:14 }}>{counts[k]}</strong> {v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", borderBottom:"2px solid #dde4ee", background:"#fff", padding:"0 36px" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding:"12px 16px", background:"none", border:"none",
            borderBottom: tab===t.id?"2px solid #153162":"2px solid transparent",
            color: tab===t.id?"#153162":"#8a96a8",
            cursor:"pointer", fontWeight: tab===t.id?700:400
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding:"28px 36px", maxWidth:1440, margin:"0 auto" }}>
        {/* BASINS CONTENT */}
        {tab==="basins" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:15 }}>
            {filtered.map((b,i) => {
              const s = ST[b.status];
              const isSel = selected?.id === b.id;
              return (
                <div key={b.id} onClick={()=>setSelected(isSel?null:b)} style={{
                  ...C(), cursor:"pointer",
                  borderLeft:`4px solid ${s.color}`,
                  background: isSel?s.bg:"#fff",
                  transform: loaded ? "translateY(0)" : "translateY(15px)",
                  opacity: loaded ? 1 : 0,
                  transition: `all 0.4s ease ${i*0.03}s`
                }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ fontSize:16, fontWeight:700 }}>{b.name}</div>
                    <span style={{ fontSize:9, padding:"2px 8px", borderRadius:10, background:s.bg, color:s.color }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#8a96a8" }}>{b.wpp} m³/kişi/yıl</div>
                  {isSel && <div style={{ marginTop:10, fontSize:13, lineHeight:1.6 }}>{b.detail}</div>}
                </div>
              );
            })}
          </div>
        )}
        
        {/* DİĞER TABLAR (Projenin geri kalanı buraya eklenebilir) */}
        {tab!=="basins" && <div style={{ textAlign:"center", padding:50, color:"#8a96a8" }}>Bu sekme şu an analiz aşamasındadır.</div>}
      </div>
    </div>
  );
}
