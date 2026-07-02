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
  { word: 'ห้องมืด', hint: 'ไม่ได้มาหลับอย่างเดียว' },
  { word: 'มุมอับ', hint: 'คนชอบแอบไป' },
  { word: 'โต๊ะคู่', hint: 'ไม่ได้นั่งคนเดียว' },
  { word: 'หลังชั้นหนังสือ', hint: 'มุมลับยอดฮิต' },
  { word: 'ปลั๊กไฟ', hint: 'เสียบได้ทุกคนอยากได้' },
  { word: 'สายชาร์จ', hint: 'ขาดเมื่อไหร่ลำบาก' },
  { word: 'เก้าอี้', hint: 'โยกแรงไม่ได้' },
  { word: 'ห้องแอร์', hint: 'เข้าแล้วไม่อยากออก' },
  { word: 'โต๊ะอ่านหนังสือ', hint: 'บางคนไม่ได้มาอ่าน' },
  { word: 'เสียงคราง...เอ้ย ไอ', hint: 'เงียบ ๆ หน่อย' },
  { word: 'ข้อสอบเก่า', hint: 'รุ่นพี่เคยใช้' },
  { word: 'หนังสือหนา', hint: 'จับแล้วเมื่อยมือ' },
  { word: 'Wi-Fi', hint: 'เชื่อมต่อได้ทุกคน' },
  { word: 'โทรศัพท์', hint: 'สั่นทีมีคนหัน' },
  { word: 'ห้องน้ำ', hint: 'หายไปนานผิดปกติ' },
  { word: 'กระเป๋า', hint: 'เปิดได้แต่ห้ามยุ่ง' },
  { word: 'บรรณารักษ์', hint: 'คนคอยจับผิด' },
  { word: 'เครื่องปริ้น', hint: 'เสียบก่อนถึงจะใช้ได้' },
  { word: 'ปลั๊กพ่วง', hint: 'ยิ่งหลายช่องยิ่งดี' },
  { word: 'มุมเงียบ', hint: 'เงียบจนได้ยินทุกอย่าง' },
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
