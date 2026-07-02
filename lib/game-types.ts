// Game Types
export interface Player {
  id: number
  name: string
  isImposter: boolean
  hasRevealed: boolean
  votes: number
  isEliminated: boolean
}

export interface GameSettings {
  playerCount: number
  imposterCount: number
  timerDuration: number
  category: Category
}

export type Category = 
  | 'ห้องสมุด'
  | 'อาหาร'
  | 'อนิเมะ'
  | 'เกม'
  | 'ประเทศ'
  | 'สถานที่'
  | 'สัตว์'
  | 'ของใช้'
  | 'สุ่มทั้งหมด'

export type GamePhase = 
  | 'home'
  | 'setup'
  | 'tutorial'
  | 'roleReveal'
  | 'discussion'
  | 'voting'
  | 'result'

export interface GameState {
  phase: GamePhase
  settings: GameSettings
  players: Player[]
  currentPlayerIndex: number
  secretWord: string
  hint: string
  timeRemaining: number
  isPaused: boolean
  winner: 'imposters' | 'villagers' | null
}

// Word data by category
export const WORD_DATA: Record<Exclude<Category, 'สุ่มทั้งหมด'>, { word: string; hint: string }[]> = {
  'ห้องสมุด': [
  { word: 'ปลั๊กไฟ', hint: 'ของหายากกว่าความรัก' },
  { word: 'Wi-Fi', hint: 'พระเอกของห้องสมุด' },
  { word: 'ข้อสอบเก่า', hint: 'คัมภีร์ก่อนวันตาย...เอ้ย วันสอบ' },
  { word: 'ห้องแอร์', hint: 'เข้ามาแล้วลืมวิชา' },
  { word: 'โต๊ะอ่านหนังสือ', hint: 'ชื่อมันโกหก' },
  { word: 'โต๊ะกลุ่ม', hint: 'ประชุมเรื่องกิน' },
  { word: 'เก้าอี้', hint: 'นั่งจนตูดจำทรงได้' },
  { word: 'หนังสือ', hint: 'พร็อพประกอบการนอน' },
  { word: 'ชั้นหนังสือ', hint: 'เขาวงกตของคนขี้เกียจหา' },
  { word: 'บรรณารักษ์', hint: 'บอสใหญ่ของแมพนี้' },
  { word: 'เครื่องปริ้น', hint: 'รีบเมื่อไหร่ พังเมื่อนั้น' },
  { word: 'คอมพิวเตอร์', hint: 'เปิด YouTube ไวกว่า Word' },
  { word: 'สายชาร์จ', hint: 'ยืมได้ คืนยาก' },
  { word: 'ปลั๊กพ่วง', hint: 'คนดังประจำห้อง' },
  { word: 'ห้องน้ำ', hint: 'ไปทีเหมือนย้ายทะเบียนบ้าน' },
  { word: 'กระเป๋า', hint: 'เจ้าของหาย แต่ของยังอยู่' },
  { word: 'ปากกา', hint: 'ของที่ไม่มีใครพก' },
  { word: 'สมุด', hint: 'เปิดหน้าแรกแล้วปิด' },
  { word: 'นาฬิกา', hint: 'เดินช้ากว่าอาจารย์ปล่อย' },
  { word: 'ป้ายห้ามเสียงดัง', hint: 'ของตกแต่งผนัง' },
  { word: 'มุมเงียบ', hint: 'คนไอดังที่สุด' },
  { word: 'โต๊ะคู่', hint: 'คนนั่งไม่ค่อยคุยเรื่องเรียน' },
  { word: 'ชั้นบน', hint: 'ง่วงกว่าเดิม 300%' },
  { word: 'ตู้หนังสือ', hint: 'เปิดเพื่อปิด' },
  { word: 'แก้วน้ำ', hint: 'เข้าได้แบบเนียน ๆ' },
  { word: 'แอร์', hint: 'ศัตรูของคนง่วง' },
  { word: 'เมาส์', hint: 'จับทั้งวัน งานไม่เดิน' },
  { word: 'คีย์บอร์ด', hint: 'เสียงดังกว่าเพื่อนกระซิบ' },
  { word: 'ปลั๊กเสียบ', hint: 'เห็นว่างแล้ววิ่งเหมือนแจกเงิน' },
  { word: 'ข้อสอบ', hint: 'เจอแล้วเหมือนถูกหวย' },
],
  'อาหาร': [
    { word: 'ส้มตำ', hint: 'อาหารอีสาน' },
    { word: 'ต้มยำกุ้ง', hint: 'น้ำซุปรสจัด' },
    { word: 'ข้าวผัด', hint: 'ทำจากข้าวสวย' },
    { word: 'พิซซ่า', hint: 'อาหารอิตาลี' },
    { word: 'ซูชิ', hint: 'อาหารญี่ปุ่น' },
    { word: 'แกงเขียวหวาน', hint: 'มีกะทิ' },
    { word: 'ผัดไทย', hint: 'มีเส้น' },
    { word: 'ไก่ทอด', hint: 'ทอดกรอบ' },
  ],
  'อนิเมะ': [
    { word: 'นารูโตะ', hint: 'นินจา' },
    { word: 'วันพีช', hint: 'โจรสลัด' },
    { word: 'ดราก้อนบอล', hint: 'ไซย่า' },
    { word: 'โดเรม่อน', hint: 'แมวหุ่นยนต์' },
    { word: 'โคนัน', hint: 'นักสืบ' },
    { word: 'ดาบพิฆาตอสูร', hint: 'ล่าปีศาจ' },
    { word: 'จูจุสึไคเซ็น', hint: 'คาถา' },
    { word: 'สไปเดอร์แมน', hint: 'ฮีโร่ใยแมงมุม' },
  ],
  'เกม': [
    { word: 'มายคราฟ', hint: 'สร้างบ้าน' },
    { word: 'ฟีฟ่า', hint: 'ฟุตบอล' },
    { word: 'PUBG', hint: 'ยิงกัน' },
    { word: 'Among Us', hint: 'หาคนร้าย' },
    { word: 'ROV', hint: 'โมบา' },
    { word: 'Roblox', hint: 'เล่นกับเพื่อน' },
    { word: 'Fortnite', hint: 'สร้าง+ยิง' },
    { word: 'GTA', hint: 'เมืองเปิด' },
  ],
  'ประเทศ': [
    { word: 'ญี่ปุ่น', hint: 'ดอกซากุระ' },
    { word: 'อเมริกา', hint: 'ฮอลลีวูด' },
    { word: 'จีน', hint: 'กำแพงยาว' },
    { word: 'ฝรั่งเศส', hint: 'หอไอเฟล' },
    { word: 'อิตาลี', hint: 'โคลอสเซียม' },
    { word: 'เกาหลี', hint: 'K-POP' },
    { word: 'อังกฤษ', hint: 'ราชินี' },
    { word: 'ออสเตรเลีย', hint: 'จิงโจ้' },
  ],
  'สถานที่': [
    { word: 'โรงเรียน', hint: 'เรียนหนังสือ' },
    { word: 'โรงพยาบาล', hint: 'หมอ' },
    { word: 'ห้างสรรพสินค้า', hint: 'ช้อปปิ้ง' },
    { word: 'สนามบิน', hint: 'เครื่องบิน' },
    { word: 'ชายหาด', hint: 'ทราย+ทะเล' },
    { word: 'ภูเขา', hint: 'สูงมาก' },
    { word: 'วัด', hint: 'พระพุทธรูป' },
    { word: 'สวนสนุก', hint: 'เครื่องเล่น' },
  ],
  'สัตว์': [
    { word: 'ช้าง', hint: 'งวงยาว' },
    { word: 'สิงโต', hint: 'ราชาป่า' },
    { word: 'ปลาฉลาม', hint: 'ฟันแหลม' },
    { word: 'นกเพนกวิน', hint: 'ขั้วโลก' },
    { word: 'ลิง', hint: 'ปีนต้นไม้' },
    { word: 'งู', hint: 'เลื้อย' },
    { word: 'แมว', hint: 'เหมียว' },
    { word: 'หมี', hint: 'กินน้ำผึ้ง' },
  ],
  'ของใช้': [
    { word: 'โทรศัพท์', hint: 'โทรหาคน' },
    { word: 'รถยนต์', hint: 'พาหนะ' },
    { word: 'คอมพิวเตอร์', hint: 'หน้าจอ' },
    { word: 'โทรทัศน์', hint: 'ดูรายการ' },
    { word: 'ตู้เย็น', hint: 'เก็บอาหาร' },
    { word: 'เตียง', hint: 'นอน' },
    { word: 'กระเป๋า', hint: 'ใส่ของ' },
    { word: 'รองเท้า', hint: 'ใส่เดิน' },
  ],
}

export const CATEGORIES: Category[] = [
  'ห้องสมุด',
  'อาหาร',
  'อนิเมะ',
  'เกม',
  'ประเทศ',
  'สถานที่',
  'สัตว์',
  'ของใช้',
  'สุ่มทั้งหมด',
]

export const DEFAULT_SETTINGS: GameSettings = {
  playerCount: 4,
  imposterCount: 1,
  timerDuration: 180,
  category: 'สุ่มทั้งหมด',
}
