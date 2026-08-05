import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const projectRoot = new URL('..', import.meta.url).pathname;
const foodSource = await readFile(join(projectRoot, 'src/data/foods.ts'), 'utf8');
const dishNames = [...foodSource.matchAll(/^\s*\['([^']+)',/gm)].map((match) => match[1]);
const outputDir = join(projectRoot, 'public/food-images');
const start = Number(process.argv.find((arg) => arg.startsWith('--start='))?.split('=')[1] ?? 0);
const limit = Number(process.argv.find((arg) => arg.startsWith('--limit='))?.split('=')[1] ?? dishNames.length);
const requestedIds = process.argv.find((arg) => arg.startsWith('--ids='))?.split('=')[1]
  .split(',')
  .map(Number)
  .filter((id) => Number.isInteger(id) && id >= 1 && id <= dishNames.length);
const selected = requestedIds?.length
  ? requestedIds.map((id) => ({ name: dishNames[id - 1], index: id - 1 }))
  : dishNames.slice(start, start + limit).map((name, offset) => ({ name, index: start + offset }));

const preciseQueries = {
  '余干辣椒炒肉': '余干枫树辣椒炒肉 江西菜 成品 实拍',
  '江西小炒': '江西小炒 辣椒炒肉 江西菜 成品 高清',
  '瓦罐汤': '南昌瓦罐汤 单盅 成品 高清',
  '老友粉': '南宁老友粉 汤粉 单碗 高清',
  '玉林牛巴饭': '玉林牛巴饭 套餐 米饭 牛巴 碗 高清',
  '汽锅鸡': '云南汽锅鸡 单锅 成品 高清',
  '云南饵丝': '云南饵丝 汤饵丝 面条 云南小吃 高清',
  '海南粉': '海南粉 米粉 单碗 成品 高清',
  '贵阳辣子鸡': '贵阳辣子鸡 贵州 糍粑辣椒 鸡块 成品 高清',
  '三文鱼藜麦碗': '三文鱼藜麦碗 轻食 沙拉碗 高清',
  '蔬菜豆腐煲': '蔬菜豆腐煲 砂锅 成品 高清',
  '独面筋': '天津独面筋 面筋菜 成品 高清',
  '排骨年糕': '上海排骨年糕 炸猪排 年糕 成品 高清',
  '架子肉': '新疆架子肉 烤羊肉 成品 高清',
  '大肠包小肠': '台湾大肠包小肠 路边摊 小吃 糯米肠香肠 高清',
  '印度香饭': '印度香饭 biryani 米饭 成品 高清',
  '越南法棍': '越南法棍 banh mi 三明治 成品 高清',
  '越南烤肉米线': 'bun cha Hanoi grilled pork vermicelli plated food photo',
  '越式甘蔗虾': '越南甘蔗虾 chao tom 成品 高清',
  '马来沙嗲': '马来西亚沙嗲 satay 烤肉串 成品 高清',
  '意式烩牛膝': '意式烩牛膝 osso buco 成品 高清',
  '芝士玉米片': '芝士玉米片 nachos 餐厅 成品 高清',
  '洛林咸派': '洛林咸派 quiche lorraine 切片 成品 高清',
  '西班牙炖牛尾': '西班牙炖牛尾 rabo de toro 成品 高清',
  '摩洛哥塔吉锅': '摩洛哥塔吉锅 tagine 炖肉 成品 高清',
  '烤肉串沙什雷克': '沙什雷克 shashlik 烤肉串 熟食 高清',
  '荔枝肉': 'Fujian lychee pork sweet and sour pork food photo no text',
  '天妇罗荞麦面': 'tempura soba noodles shrimp tempura Japanese food photo',
  '德式烤香肠拼盘': 'German bratwurst sausage platter food photo no text',
  '鲅鱼水饺': '鲅鱼水饺 煮熟 饺子 装盘 成品',
  '狗不理包子': 'Chinese steamed buns bamboo basket food photo no text',
  '独面筋': 'Chinese braised fried gluten dish food photo no text',
  '沧州火锅鸡': '沧州火锅鸡 铜锅 鸡块 成品 无文字',
  '排骨年糕': '上海排骨年糕 猪排 年糕 成品 无文字',
  '秦镇米皮': '秦镇米皮 凉皮 单碗 成品 无包装',
  '大肠包小肠': 'Taiwanese sausage in sticky rice street food plate',
  '泰式打抛饭': 'pad kra pao Thai basil pork rice fried egg food photo',
  '米兰烩饭': 'risotto Milanese saffron risotto food photo no watermark',
  '波索莱玉米汤': 'red pozole Mexican hominy soup food photo',
  '土耳其烤肉饭': 'Turkish doner kebab over rice plate food photo',
  '鹰嘴豆泥配皮塔饼': 'hummus pita bread ceramic plate food photo',
  '洛林咸派': 'quiche Lorraine slice food photo no text',
  '西班牙土豆蛋饼': 'Spanish tortilla potato omelette food photo no text',
  '土耳其红扁豆汤': 'Turkish red lentil soup mercimek food photo no text',
  '俄式牛肉丝': 'beef stroganoff creamy sauce noodles food photo'
};

const alternateOffsets = {
  '余干辣椒炒肉': 1,
  '天妇罗荞麦面': 1,
  '狗不理包子': 3,
  '独面筋': 2,
  '沧州火锅鸡': 1,
  '秦镇米皮': 1,
  '荔枝肉': 3,
  '大肠包小肠': 1,
  '土耳其烤肉饭': 0,
  '鹰嘴豆泥配皮塔饼': 2
};

await mkdir(outputDir, { recursive: true });

function fileName(index) {
  return `dish-${String(index + 1).padStart(3, '0')}.jpg`;
}

async function fetchDish(name, index) {
  const query = encodeURIComponent(preciseQueries[name] ?? `${name} 高清 无水印 菜品`);
  const offset = alternateOffsets[name] ?? 0;
  const url = `https://tse1.mm.bing.net/th?q=${query}&w=1200&h=800&c=7&rs=1&p=${offset}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; chilema-food-image-curation/1.0)'
    }
  });

  if (!response.ok) {
    throw new Error(`${name}: HTTP ${response.status}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`${name}: unexpected content type ${contentType}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 8_000) {
    throw new Error(`${name}: image is suspiciously small (${bytes.length} bytes)`);
  }

  await writeFile(join(outputDir, fileName(index)), bytes);
  return { id: `dish-${String(index + 1).padStart(3, '0')}`, name, bytes: bytes.length, source: url };
}

const queue = [...selected];
const results = [];
const errors = [];
const workerCount = Math.min(6, queue.length);

async function worker() {
  while (queue.length) {
    const item = queue.shift();
    if (!item) return;
    try {
      results.push(await fetchDish(item.name, item.index));
    } catch (error) {
      errors.push({ name: item.name, message: error instanceof Error ? error.message : String(error) });
    }
  }
}

await Promise.all(Array.from({ length: workerCount }, () => worker()));

results.sort((a, b) => a.id.localeCompare(b.id));
const manifestPath = join(outputDir, 'sources.json');
let existing = [];
try {
  existing = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {
  existing = [];
}
const merged = [...existing.filter((item) => !results.some((result) => result.id === item.id)), ...results]
  .sort((a, b) => a.id.localeCompare(b.id));
await writeFile(manifestPath, `${JSON.stringify(merged, null, 2)}\n`);

console.log(JSON.stringify({ downloaded: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
