import type { Food, Level, PriceLevel, SpicyLevel, Temperature } from '../types';

type Seed = [
  name: string,
  cuisine: string,
  category: string[],
  flavor: string[],
  spicyLevel: SpicyLevel,
  fullnessLevel: Level,
  temperature: Temperature,
  priceLevel: PriceLevel,
  suitableForSolo: boolean,
  suitableForGroup: boolean,
  deliveryFriendly: boolean
];

const categoryPhotoPools: Record<string, string[]> = {
  noodle: [
    'photo-1569718212165-3a8278d5f624', 'photo-1555126634-323283e090fa', 'photo-1557872943-16a5ac26437e',
    'photo-1559314809-0d155014e29e', 'photo-1563379926898-05f4575a45d8', 'photo-1473093295043-cdd812d0e601',
    'photo-1547592180-85f173990554', 'photo-1515003197210-e0cd71810b5f', 'photo-1626804475297-41608ea09aeb'
  ],
  rice: [
    'photo-1512058564366-18510be2db19', 'photo-1543353071-873f17a7a088', 'photo-1603133872878-684f208fb84b',
    'photo-1536304993881-ff6e9eefa2a6', 'photo-1603105037880-880cd4edfb0d', 'photo-1515003197210-e0cd71810b5f',
    'photo-1504674900247-0877df9cc836', 'photo-1569058242253-92a9c755a0ec', 'photo-1604908176997-125f25cc6f3d',
    'photo-1544025162-d76694265947', 'photo-1561043433-aaf687c4cf04', 'photo-1585937421612-70a008356fbe'
  ],
  soup: [
    'photo-1547592166-23ac45744acd', 'photo-1548943487-a2e4e43b4853', 'photo-1601050690117-94f5f6fa8bd7',
    'photo-1547592180-85f173990554', 'photo-1582878826629-29b7ad1cdc43', 'photo-1603105037880-880cd4edfb0d',
    'photo-1560963689-b5682b6440f8', 'photo-1603894584373-5ac82b2ae398', 'photo-1547592180-85f173990554'
  ],
  hotpot: [
    'photo-1547592180-85f173990554', 'photo-1560963689-b5682b6440f8', 'photo-1603105037880-880cd4edfb0d',
    'photo-1582878826629-29b7ad1cdc43', 'photo-1555126634-323283e090fa', 'photo-1515003197210-e0cd71810b5f'
  ],
  bbq: [
    'photo-1544025162-d76694265947', 'photo-1541544741938-0af808871cc0', 'photo-1529193591184-b1d58069ecdd',
    'photo-1499028344343-cd173ffc68a9', 'photo-1558030006-450675393462', 'photo-1529692236671-f1f6cf9683ba',
    'photo-1600891964092-4316c288032e', 'photo-1528712306091-ed0763094c98'
  ],
  snack: [
    'photo-1563245372-f21724e3856d', 'photo-1534422298391-e4f8c172dddb', 'photo-1606756790138-261d2b21cd75',
    'photo-1562565652-a0d8f0c59eb4', 'photo-1551504734-5ee1c4a1479b', 'photo-1529042410759-befb1204b468',
    'photo-1601050690597-df0568f70950', 'photo-1565299585323-38d6b0865b47', 'photo-1562967914-608f82629710'
  ],
  fast: [
    'photo-1550547660-d9450f859349', 'photo-1568901346375-23c9450c58cd', 'photo-1586190848861-99aa4a171e90',
    'photo-1571091718767-18b5b1457add', 'photo-1565299624946-b28f40a0ae38', 'photo-1565958011703-44f9829ba187',
    'photo-1562967916-eb82221dfb92', 'photo-1626082927389-6cd097cdc6ec'
  ],
  cold: [
    'photo-1512621776951-a57141f2eefd', 'photo-1540420773420-3366772f4999', 'photo-1543362906-acfc16c67564',
    'photo-1540189549336-e6e99c3679fe', 'photo-1553621042-f6e147245754', 'photo-1579871494447-9811cf80d66c',
    'photo-1551024506-0bccd828d307', 'photo-1563805042-7684c019e1cb'
  ],
  meal: [
    'photo-1414235077428-338989a2e8c0', 'photo-1559339352-11d035aa65de', 'photo-1504674900247-0877df9cc836',
    'photo-1533777857889-4be7c70b33f7', 'photo-1559847844-5315695dadae', 'photo-1546069901-ba9599a7e63c',
    'photo-1526318896980-cf78c088247c', 'photo-1532636875304-0c89119d9b4d', 'photo-1600891964599-f61ba0e24092',
    'photo-1565557623262-b51c2513a641', 'photo-1603894584373-5ac82b2ae398', 'photo-1585937421612-70a008356fbe'
  ]
};

const seeds: Seed[] = [
  ['四川火锅', '川菜', ['hotpot', 'meal', 'dinner'], ['麻辣', '浓郁', '烟火味'], 4, 5, 'hot', 3, false, true, false],
  ['冒菜', '川菜', ['hotpot', 'fast', 'dinner'], ['麻辣', '咸香', '汤汤水水'], 3, 4, 'hot', 2, true, true, true],
  ['麻辣香锅', '川菜', ['hotpot', 'meal', 'dinner'], ['麻辣', '香辣', '烟火味'], 3, 4, 'hot', 2, true, true, true],
  ['水煮肉片', '川菜', ['rice', 'meal', 'dinner'], ['麻辣', '香辣', '浓郁'], 4, 4, 'hot', 2, true, true, true],
  ['回锅肉', '川菜', ['rice', 'meal', 'dinner'], ['咸香', '香辣', '烟火味'], 2, 4, 'hot', 2, true, true, true],
  ['辣子鸡', '川菜', ['rice', 'meal', 'dinner'], ['香辣', '麻辣', '烟火味'], 4, 3, 'hot', 3, true, true, true],
  ['酸菜鱼', '川菜', ['rice', 'meal', 'dinner'], ['酸辣', '鲜香', '汤汤水水'], 2, 4, 'hot', 3, true, true, true],
  ['重庆小面', '川菜', ['noodle', 'fast', 'snack'], ['麻辣', '咸香', '浓郁'], 3, 3, 'hot', 1, true, false, true],

  ['剁椒鱼头', '湘菜', ['rice', 'meal', 'dinner'], ['香辣', '鲜香', '浓郁'], 4, 4, 'hot', 3, false, true, true],
  ['小炒黄牛肉', '湘菜', ['rice', 'meal', 'dinner'], ['香辣', '烟火味', '咸香'], 3, 4, 'hot', 3, true, true, true],
  ['辣椒炒肉', '湘菜', ['rice', 'meal', 'dinner'], ['香辣', '咸香', '烟火味'], 3, 4, 'hot', 2, true, true, true],
  ['毛氏红烧肉', '湘菜', ['rice', 'meal', 'dinner'], ['浓郁', '咸香', '酸甜'], 1, 5, 'hot', 3, true, true, true],
  ['湘西外婆菜', '湘菜', ['rice', 'meal'], ['咸香', '香辣', '烟火味'], 2, 3, 'hot', 2, true, true, true],
  ['口味虾', '湘菜', ['snack', 'dinner', 'late-night'], ['香辣', '麻辣', '烟火味'], 4, 3, 'hot', 3, false, true, false],
  ['永州血鸭', '湘菜', ['rice', 'meal'], ['香辣', '浓郁', '咸香'], 3, 4, 'hot', 3, true, true, true],
  ['衡阳鱼粉', '湘菜', ['rice-noodle', 'fast'], ['鲜香', '香辣', '汤汤水水'], 2, 3, 'hot', 1, true, false, true],

  ['广式烧腊饭', '粤菜', ['rice', 'fast', 'dinner'], ['咸香', '鲜香', '酸甜'], 0, 4, 'hot', 2, true, false, true],
  ['白切鸡', '粤菜', ['rice', 'meal', 'dinner'], ['清淡', '鲜香'], 0, 3, 'either', 3, true, true, true],
  ['煲仔饭', '粤菜', ['rice', 'meal', 'dinner'], ['咸香', '烟火味', '浓郁'], 0, 4, 'hot', 2, true, false, true],
  ['豉汁蒸排骨', '粤菜', ['rice', 'meal'], ['咸香', '鲜香'], 0, 3, 'hot', 2, true, true, true],
  ['云吞面', '粤菜', ['noodle', 'fast'], ['鲜香', '清淡', '汤汤水水'], 0, 3, 'hot', 1, true, false, true],
  ['干炒牛河', '粤菜', ['rice-noodle', 'meal'], ['咸香', '烟火味'], 0, 4, 'hot', 2, true, false, true],
  ['艇仔粥', '粤菜', ['rice', 'fast', 'snack'], ['鲜香', '清淡', '汤汤水水'], 0, 2, 'hot', 1, true, false, true],
  ['广式肠粉', '粤菜', ['rice-noodle', 'snack', 'fast'], ['鲜香', '清淡'], 0, 2, 'hot', 1, true, false, true],

  ['潮汕牛肉火锅', '潮汕风味', ['hotpot', 'meal', 'dinner'], ['鲜香', '清淡', '汤汤水水'], 0, 5, 'hot', 4, false, true, false],
  ['潮汕粿条汤', '潮汕风味', ['rice-noodle', 'fast'], ['鲜香', '清淡', '汤汤水水'], 0, 3, 'hot', 2, true, false, true],
  ['潮汕卤鹅饭', '潮汕风味', ['rice', 'meal'], ['咸香', '浓郁'], 0, 4, 'hot', 3, true, true, true],
  ['牛肉粿条', '潮汕风味', ['rice-noodle', 'fast'], ['鲜香', '烟火味'], 0, 3, 'hot', 2, true, false, true],
  ['潮汕砂锅粥', '潮汕风味', ['rice', 'meal', 'late-night'], ['鲜香', '清淡', '汤汤水水'], 0, 4, 'hot', 3, true, true, true],
  ['蚝烙', '潮汕风味', ['snack', 'meal'], ['鲜香', '咸香', '烟火味'], 0, 3, 'hot', 2, true, true, true],
  ['普宁豆干', '潮汕风味', ['snack', 'fast'], ['咸香', '鲜香'], 0, 2, 'hot', 1, true, true, true],
  ['潮汕鱼饭', '潮汕风味', ['rice', 'meal'], ['鲜香', '清淡'], 0, 3, 'cold', 3, true, true, true],

  ['江西小炒', '江西菜', ['rice', 'meal', 'dinner'], ['香辣', '烟火味', '咸香'], 3, 4, 'hot', 2, true, true, true],
  ['南昌拌粉', '江西菜', ['rice-noodle', 'fast'], ['香辣', '咸香', '鲜香'], 2, 3, 'hot', 1, true, false, true],
  ['瓦罐汤', '江西菜', ['soup', 'snack', 'fast'], ['清淡', '鲜香', '汤汤水水'], 0, 2, 'hot', 1, true, false, true],
  ['莲花血鸭', '江西菜', ['rice', 'meal'], ['香辣', '浓郁', '咸香'], 4, 4, 'hot', 3, true, true, true],
  ['余干辣椒炒肉', '江西菜', ['rice', 'meal'], ['香辣', '烟火味'], 3, 4, 'hot', 2, true, true, true],
  ['啤酒烧鸭', '江西菜', ['rice', 'meal'], ['浓郁', '咸香', '香辣'], 2, 4, 'hot', 3, true, true, true],
  ['萍乡炒粉', '江西菜', ['rice-noodle', 'fast'], ['香辣', '烟火味', '咸香'], 2, 3, 'hot', 1, true, false, true],
  ['赣南小炒鱼', '江西菜', ['rice', 'meal'], ['酸辣', '鲜香'], 3, 4, 'hot', 3, true, true, true],

  ['河南烩面', '河南菜', ['noodle', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0, 4, 'hot', 2, true, false, true],
  ['胡辣汤配油饼', '河南菜', ['soup', 'snack', 'fast'], ['香辣', '浓郁', '汤汤水水'], 2, 3, 'hot', 1, true, false, true],
  ['羊肉汤', '河南菜', ['soup', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0, 4, 'hot', 2, true, true, true],
  ['水煎包', '河南菜', ['snack', 'fast'], ['咸香', '烟火味'], 0, 3, 'hot', 1, true, true, true],
  ['道口烧鸡', '河南菜', ['rice', 'meal'], ['咸香', '浓郁'], 0, 3, 'either', 2, true, true, true],
  ['浆面条', '河南菜', ['noodle', 'fast'], ['酸香', '清淡', '汤汤水水'], 0, 3, 'hot', 1, true, false, true],
  ['开封灌汤包', '河南菜', ['snack', 'meal'], ['鲜香', '汤汤水水'], 0, 3, 'hot', 2, true, true, false],
  ['焖饼', '河南菜', ['meal', 'fast'], ['咸香', '烟火味'], 0, 4, 'hot', 1, true, false, true],

  ['螺蛳粉', '广西菜', ['rice-noodle', 'fast', 'late-night'], ['酸辣', '浓郁', '汤汤水水'], 3, 4, 'hot', 1, true, false, true],
  ['桂林米粉', '广西菜', ['rice-noodle', 'fast'], ['咸香', '鲜香'], 1, 3, 'hot', 1, true, false, true],
  ['老友粉', '广西菜', ['rice-noodle', 'fast'], ['酸辣', '鲜香', '汤汤水水'], 3, 3, 'hot', 1, true, false, true],
  ['柳州鸭脚煲', '广西菜', ['hotpot', 'meal', 'late-night'], ['酸辣', '浓郁', '烟火味'], 3, 4, 'hot', 3, true, true, true],
  ['柠檬鸭', '广西菜', ['rice', 'meal'], ['酸辣', '鲜香'], 2, 4, 'hot', 3, true, true, true],
  ['南宁生榨米粉', '广西菜', ['rice-noodle', 'fast'], ['鲜香', '酸香', '汤汤水水'], 1, 3, 'hot', 1, true, false, true],
  ['广西卷筒粉', '广西菜', ['rice-noodle', 'snack'], ['清淡', '鲜香'], 0, 2, 'hot', 1, true, false, true],
  ['玉林牛巴饭', '广西菜', ['rice', 'meal'], ['咸香', '浓郁'], 0, 4, 'hot', 2, true, false, true],

  ['过桥米线', '云南菜', ['rice-noodle', 'meal'], ['鲜香', '清淡', '汤汤水水'], 0, 4, 'hot', 2, true, false, true],
  ['汽锅鸡', '云南菜', ['soup', 'meal'], ['鲜香', '清淡', '汤汤水水'], 0, 4, 'hot', 3, true, true, true],
  ['野生菌火锅', '云南菜', ['hotpot', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0, 5, 'hot', 4, false, true, false],
  ['大理酸辣鱼', '云南菜', ['rice', 'meal'], ['酸辣', '鲜香'], 2, 4, 'hot', 3, true, true, true],
  ['傣味手抓饭', '云南菜', ['rice', 'meal'], ['酸辣', '鲜香', '烟火味'], 2, 4, 'either', 3, true, true, false],
  ['建水烧豆腐', '云南菜', ['snack', 'bbq'], ['咸香', '烟火味'], 1, 2, 'hot', 1, true, true, true],
  ['小锅米线', '云南菜', ['rice-noodle', 'fast'], ['香辣', '鲜香', '汤汤水水'], 2, 3, 'hot', 1, true, false, true],
  ['云南饵丝', '云南菜', ['rice-noodle', 'fast'], ['鲜香', '清淡', '汤汤水水'], 0, 3, 'hot', 1, true, false, true],

  ['酸汤鱼', '贵州菜', ['hotpot', 'meal'], ['酸辣', '鲜香', '汤汤水水'], 2, 5, 'hot', 3, false, true, false],
  ['贵阳辣子鸡', '贵州菜', ['rice', 'meal'], ['香辣', '浓郁', '烟火味'], 4, 4, 'hot', 3, true, true, true],
  ['肠旺面', '贵州菜', ['noodle', 'fast'], ['香辣', '浓郁', '汤汤水水'], 3, 3, 'hot', 1, true, false, true],
  ['花溪牛肉粉', '贵州菜', ['rice-noodle', 'fast'], ['鲜香', '香辣', '汤汤水水'], 2, 3, 'hot', 1, true, false, true],
  ['丝娃娃', '贵州菜', ['snack', 'cold'], ['酸辣', '清淡', '鲜香'], 2, 2, 'cold', 1, true, true, false],
  ['烙锅', '贵州菜', ['bbq', 'meal', 'late-night'], ['香辣', '烟火味', '咸香'], 3, 4, 'hot', 3, true, true, false],
  ['豆米火锅', '贵州菜', ['hotpot', 'meal'], ['浓郁', '咸香', '汤汤水水'], 1, 5, 'hot', 3, false, true, false],
  ['贵州糯米饭', '贵州菜', ['rice', 'fast', 'snack'], ['咸香', '香辣'], 1, 3, 'hot', 1, true, false, true],

  ['锅包肉', '东北菜', ['rice', 'meal'], ['酸甜', '烟火味'], 0, 4, 'hot', 2, true, true, true],
  ['小鸡炖蘑菇', '东北菜', ['rice', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0, 5, 'hot', 3, true, true, true],
  ['猪肉炖粉条', '东北菜', ['rice-noodle', 'meal'], ['咸香', '浓郁', '汤汤水水'], 0, 5, 'hot', 2, true, true, true],
  ['地三鲜', '东北菜', ['rice', 'meal'], ['咸香', '浓郁'], 0, 4, 'hot', 2, true, true, true],
  ['东北大拉皮', '东北菜', ['cold', 'snack'], ['酸甜', '清淡', '鲜香'], 0, 2, 'cold', 1, true, true, true],
  ['铁锅炖大鹅', '东北菜', ['hotpot', 'meal'], ['浓郁', '咸香', '烟火味'], 0, 5, 'hot', 4, false, true, false],
  ['酸菜白肉锅', '东北菜', ['hotpot', 'meal'], ['酸香', '鲜香', '汤汤水水'], 0, 4, 'hot', 3, false, true, false],
  ['东北饺子', '东北菜', ['noodle', 'meal'], ['鲜香', '咸香'], 0, 4, 'hot', 2, true, true, true],

  ['兰州牛肉面', '西北菜', ['noodle', 'fast'], ['鲜香', '清淡', '汤汤水水'], 1, 4, 'hot', 1, true, false, true],
  ['羊肉泡馍', '西北菜', ['meal', 'soup'], ['浓郁', '鲜香', '汤汤水水'], 0, 5, 'hot', 2, true, false, true],
  ['新疆大盘鸡', '西北菜', ['rice', 'noodle', 'meal'], ['香辣', '浓郁', '烟火味'], 2, 5, 'hot', 3, false, true, true],
  ['肉夹馍', '西北菜', ['snack', 'fast'], ['咸香', '浓郁'], 0, 3, 'hot', 1, true, false, true],
  ['油泼面', '西北菜', ['noodle', 'fast'], ['香辣', '咸香', '烟火味'], 2, 4, 'hot', 1, true, false, true],
  ['烤羊肉串', '西北菜', ['bbq', 'late-night'], ['烟火味', '香辣', '咸香'], 2, 3, 'hot', 2, true, true, true],
  ['新疆手抓饭', '西北菜', ['rice', 'meal'], ['咸香', '浓郁'], 0, 4, 'hot', 2, true, false, true],
  ['biangbiang面', '西北菜', ['noodle', 'meal'], ['香辣', '咸香'], 2, 4, 'hot', 1, true, false, true],

  ['东坡肉', '江浙菜', ['rice', 'meal'], ['浓郁', '咸香', '酸甜'], 0, 5, 'hot', 3, true, true, true],
  ['西湖醋鱼', '江浙菜', ['rice', 'meal'], ['酸甜', '鲜香'], 0, 3, 'hot', 3, true, true, true],
  ['龙井虾仁', '江浙菜', ['rice', 'meal'], ['清淡', '鲜香'], 0, 3, 'hot', 4, true, true, true],
  ['片儿川', '江浙菜', ['noodle', 'fast'], ['鲜香', '清淡', '汤汤水水'], 0, 3, 'hot', 1, true, false, true],
  ['葱油拌面', '江浙菜', ['noodle', 'fast'], ['咸香', '鲜香'], 0, 3, 'hot', 1, true, false, true],
  ['小笼包', '江浙菜', ['snack', 'meal'], ['鲜香', '汤汤水水'], 0, 3, 'hot', 2, true, true, false],
  ['宁波汤圆', '江浙菜', ['snack', 'dessert'], ['香甜', '汤汤水水'], 0, 2, 'hot', 1, true, true, true],
  ['腌笃鲜', '江浙菜', ['soup', 'meal'], ['鲜香', '清淡', '汤汤水水'], 0, 4, 'hot', 3, true, true, true],

  ['佛跳墙', '福建菜', ['soup', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0, 4, 'hot', 4, false, true, false],
  ['沙县拌面扁肉', '福建菜', ['noodle', 'fast'], ['咸香', '鲜香'], 0, 3, 'hot', 1, true, false, true],
  ['福州鱼丸汤', '福建菜', ['soup', 'snack'], ['鲜香', '清淡', '汤汤水水'], 0, 2, 'hot', 1, true, false, true],
  ['厦门沙茶面', '福建菜', ['noodle', 'fast'], ['浓郁', '鲜香', '汤汤水水'], 1, 4, 'hot', 2, true, false, true],
  ['海蛎煎', '福建菜', ['snack', 'meal'], ['鲜香', '烟火味'], 0, 3, 'hot', 2, true, true, true],
  ['荔枝肉', '福建菜', ['rice', 'meal'], ['酸甜', '鲜香'], 0, 4, 'hot', 2, true, true, true],
  ['闽南卤面', '福建菜', ['noodle', 'meal'], ['浓郁', '鲜香', '汤汤水水'], 0, 4, 'hot', 2, true, false, true],
  ['泉州面线糊', '福建菜', ['noodle', 'fast'], ['清淡', '鲜香', '汤汤水水'], 0, 2, 'hot', 1, true, false, true],

  ['海南鸡饭', '海南菜', ['rice', 'meal'], ['清淡', '鲜香'], 0, 4, 'hot', 2, true, false, true],
  ['椰子鸡火锅', '海南菜', ['hotpot', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0, 5, 'hot', 3, false, true, false],
  ['海南粉', '海南菜', ['rice-noodle', 'fast'], ['鲜香', '咸香'], 0, 3, 'hot', 1, true, false, true],
  ['清补凉', '海南菜', ['dessert', 'snack', 'cold'], ['香甜', '清淡'], 0, 2, 'cold', 1, true, true, true],
  ['文昌鸡', '海南菜', ['rice', 'meal'], ['清淡', '鲜香'], 0, 3, 'either', 3, true, true, true],
  ['抱罗粉', '海南菜', ['rice-noodle', 'fast'], ['鲜香', '汤汤水水'], 0, 3, 'hot', 1, true, false, true],
  ['糟粕醋火锅', '海南菜', ['hotpot', 'meal'], ['酸辣', '鲜香', '汤汤水水'], 2, 5, 'hot', 3, false, true, false],
  ['海南斋菜煲', '海南菜', ['meal', 'rice'], ['清淡', '鲜香'], 0, 4, 'hot', 2, true, true, true],

  ['豚骨拉面', '日式料理', ['noodle', 'meal'], ['浓郁', '鲜香', '汤汤水水'], 0, 4, 'hot', 2, true, false, true],
  ['寿司拼盘', '日式料理', ['rice', 'meal', 'cold'], ['清淡', '鲜香'], 0, 3, 'cold', 3, true, true, false],
  ['日式咖喱饭', '日式料理', ['rice', 'meal'], ['浓郁', '咸香'], 0, 4, 'hot', 2, true, false, true],
  ['鳗鱼饭', '日式料理', ['rice', 'meal'], ['酸甜', '咸香', '鲜香'], 0, 4, 'hot', 4, true, false, true],
  ['天妇罗荞麦面', '日式料理', ['noodle', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0, 3, 'hot', 3, true, false, true],
  ['日式烧鸟', '日式料理', ['bbq', 'late-night'], ['咸香', '烟火味'], 0, 3, 'hot', 3, true, true, false],
  ['亲子丼', '日式料理', ['rice', 'fast'], ['鲜香', '酸甜'], 0, 4, 'hot', 2, true, false, true],
  ['关东煮', '日式料理', ['snack', 'soup'], ['清淡', '鲜香', '汤汤水水'], 0, 2, 'hot', 1, true, true, true],

  ['韩式烤肉', '韩式料理', ['bbq', 'meal'], ['咸香', '烟火味', '浓郁'], 1, 5, 'hot', 4, false, true, false],
  ['部队锅', '韩式料理', ['hotpot', 'meal'], ['香辣', '浓郁', '汤汤水水'], 2, 5, 'hot', 3, false, true, false],
  ['石锅拌饭', '韩式料理', ['rice', 'meal'], ['香辣', '咸香', '烟火味'], 1, 4, 'hot', 2, true, false, true],
  ['参鸡汤', '韩式料理', ['soup', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0, 4, 'hot', 3, true, true, true],
  ['韩式炸鸡', '韩式料理', ['fast', 'late-night'], ['酸甜', '香辣', '咸香'], 1, 4, 'hot', 2, true, true, true],
  ['冷面', '韩式料理', ['noodle', 'cold'], ['酸甜', '清淡', '汤汤水水'], 0, 3, 'cold', 2, true, false, true],
  ['辣炒年糕', '韩式料理', ['snack', 'fast'], ['香辣', '酸甜'], 2, 3, 'hot', 1, true, true, true],
  ['泡菜豆腐汤', '韩式料理', ['soup', 'meal'], ['酸辣', '鲜香', '汤汤水水'], 2, 3, 'hot', 2, true, false, true],

  ['泰式冬阴功汤', '东南亚料理', ['soup', 'meal'], ['酸辣', '鲜香', '汤汤水水'], 3, 3, 'hot', 3, true, true, true],
  ['越南牛肉河粉', '东南亚料理', ['rice-noodle', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0, 3, 'hot', 2, true, false, true],
  ['新加坡叻沙', '东南亚料理', ['rice-noodle', 'meal'], ['香辣', '浓郁', '汤汤水水'], 2, 4, 'hot', 3, true, false, true],
  ['泰式菠萝炒饭', '东南亚料理', ['rice', 'meal'], ['酸甜', '鲜香'], 0, 4, 'hot', 2, true, false, true],
  ['马来椰浆饭', '东南亚料理', ['rice', 'meal'], ['香辣', '浓郁', '鲜香'], 2, 4, 'hot', 2, true, false, true],
  ['印尼炒饭', '东南亚料理', ['rice', 'meal'], ['咸香', '香辣', '烟火味'], 2, 4, 'hot', 2, true, false, true],
  ['泰式青咖喱鸡', '东南亚料理', ['rice', 'meal'], ['香辣', '浓郁', '鲜香'], 3, 4, 'hot', 3, true, true, true],
  ['越南春卷', '东南亚料理', ['snack', 'cold'], ['清淡', '鲜香'], 0, 2, 'either', 2, true, true, false],

  ['意大利肉酱面', '西餐', ['noodle', 'meal'], ['浓郁', '酸甜', '咸香'], 0, 4, 'hot', 3, true, false, true],
  ['玛格丽特披萨', '西餐', ['fast', 'meal'], ['咸香', '浓郁'], 0, 4, 'hot', 3, true, true, true],
  ['香煎牛排', '西餐', ['meal', 'dinner'], ['咸香', '烟火味'], 0, 4, 'hot', 4, true, true, false],
  ['奶油蘑菇汤配面包', '西餐', ['soup', 'meal'], ['浓郁', '鲜香', '汤汤水水'], 0, 3, 'hot', 2, true, false, true],
  ['经典牛肉汉堡', '西餐', ['fast', 'meal'], ['咸香', '浓郁', '烟火味'], 0, 5, 'hot', 2, true, false, true],
  ['凯撒鸡肉沙拉', '西餐', ['cold', 'light', 'meal'], ['清淡', '鲜香'], 0, 2, 'cold', 3, true, false, true],
  ['西班牙海鲜饭', '西餐', ['rice', 'meal'], ['鲜香', '浓郁'], 0, 4, 'hot', 4, true, true, false],
  ['德式烤香肠拼盘', '西餐', ['bbq', 'meal'], ['咸香', '烟火味'], 0, 4, 'hot', 3, true, true, true],

  ['生煎包', '快餐小吃', ['snack', 'fast'], ['咸香', '汤汤水水'], 0, 3, 'hot', 1, true, true, true],
  ['麻辣烫', '快餐小吃', ['hotpot', 'fast'], ['麻辣', '香辣', '汤汤水水'], 3, 4, 'hot', 2, true, true, true],
  ['黄焖鸡米饭', '快餐小吃', ['rice', 'fast'], ['浓郁', '咸香', '汤汤水水'], 1, 4, 'hot', 1, true, false, true],
  ['沙县蒸饺', '快餐小吃', ['snack', 'fast'], ['清淡', '鲜香'], 0, 3, 'hot', 1, true, true, true],
  ['鸡蛋灌饼', '快餐小吃', ['snack', 'fast'], ['咸香', '烟火味'], 0, 3, 'hot', 1, true, false, true],
  ['炸串拼盘', '快餐小吃', ['snack', 'late-night'], ['香辣', '烟火味', '咸香'], 2, 3, 'hot', 1, true, true, true],
  ['烤冷面', '快餐小吃', ['snack', 'late-night'], ['酸甜', '咸香', '烟火味'], 1, 3, 'hot', 1, true, true, true],
  ['手工水饺', '快餐小吃', ['noodle', 'fast'], ['清淡', '鲜香'], 0, 4, 'hot', 1, true, true, true],

  ['轻食鸡胸饭', '清淡饮食', ['rice', 'light', 'meal'], ['清淡', '鲜香'], 0, 3, 'either', 2, true, false, true],
  ['三文鱼藜麦碗', '清淡饮食', ['rice', 'cold', 'light'], ['清淡', '鲜香'], 0, 3, 'cold', 3, true, false, true],
  ['番茄鸡蛋面', '清淡饮食', ['noodle', 'fast'], ['酸甜', '清淡', '汤汤水水'], 0, 3, 'hot', 1, true, false, true],
  ['鲜虾蔬菜粥', '清淡饮食', ['rice', 'light', 'soup'], ['清淡', '鲜香', '汤汤水水'], 0, 2, 'hot', 2, true, false, true],
  ['菌菇豆腐汤', '清淡饮食', ['soup', 'light'], ['清淡', '鲜香', '汤汤水水'], 0, 2, 'hot', 1, true, true, true],
  ['日式荞麦冷面', '清淡饮食', ['noodle', 'cold', 'light'], ['清淡', '鲜香'], 0, 2, 'cold', 2, true, false, true],
  ['蒸鸡蛋羹配米饭', '清淡饮食', ['rice', 'light'], ['清淡', '鲜香'], 0, 3, 'hot', 1, true, false, true],
  ['蔬菜豆腐煲', '清淡饮食', ['meal', 'light'], ['清淡', '鲜香', '汤汤水水'], 0, 3, 'hot', 2, true, true, true]
];

type CompactSeed = [
  name: string,
  cuisine: string,
  category: string[],
  flavor: string[],
  spicyLevel: SpicyLevel
];

const extendedSeeds: CompactSeed[] = [
  // 华北、东北与齐鲁
  ['九转大肠', '鲁菜', ['rice', 'meal'], ['酸甜', '咸香', '浓郁'], 0],
  ['糖醋鲤鱼', '鲁菜', ['rice', 'meal'], ['酸甜', '鲜香'], 0],
  ['葱烧海参', '鲁菜', ['rice', 'meal'], ['咸香', '鲜香', '浓郁'], 0],
  ['德州扒鸡', '鲁菜', ['rice', 'meal'], ['咸香', '浓郁'], 0],
  ['油爆双脆', '鲁菜', ['rice', 'meal'], ['咸香', '烟火味'], 0],
  ['鲅鱼水饺', '鲁菜', ['noodle', 'meal'], ['鲜香', '汤汤水水'], 0],

  ['北京烤鸭', '北京菜', ['meal', 'dinner'], ['咸香', '烟火味', '浓郁'], 0],
  ['老北京炸酱面', '北京菜', ['noodle', 'meal'], ['咸香', '浓郁'], 0],
  ['铜锅涮羊肉', '北京菜', ['hotpot', 'meal'], ['鲜香', '清淡', '汤汤水水'], 0],
  ['京酱肉丝', '北京菜', ['rice', 'meal'], ['咸香', '酸甜'], 0],
  ['卤煮火烧', '北京菜', ['soup', 'snack'], ['浓郁', '咸香', '汤汤水水'], 0],
  ['爆肚', '北京菜', ['snack', 'meal'], ['咸香', '鲜香'], 0],

  ['天津煎饼果子', '天津菜', ['snack', 'fast'], ['咸香', '烟火味'], 0],
  ['狗不理包子', '天津菜', ['snack', 'meal'], ['鲜香', '汤汤水水'], 0],
  ['锅塌里脊', '天津菜', ['rice', 'meal'], ['咸香', '鲜香'], 0],
  ['独面筋', '天津菜', ['rice', 'meal'], ['咸香', '浓郁'], 0],
  ['天津老豆腐', '天津菜', ['soup', 'fast'], ['咸香', '鲜香', '汤汤水水'], 0],
  ['八珍豆腐', '天津菜', ['rice', 'meal'], ['鲜香', '浓郁'], 0],

  ['驴肉火烧', '河北菜', ['snack', 'fast'], ['咸香', '烟火味'], 0],
  ['金毛狮子鱼', '河北菜', ['rice', 'meal'], ['酸甜', '鲜香'], 0],
  ['承德汽锅鸡', '河北菜', ['soup', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0],
  ['香河肉饼', '河北菜', ['snack', 'meal'], ['咸香', '烟火味'], 0],
  ['沧州火锅鸡', '河北菜', ['hotpot', 'meal'], ['香辣', '浓郁', '汤汤水水'], 2],
  ['正定八大碗', '河北菜', ['rice', 'meal'], ['咸香', '浓郁'], 0],

  ['刀削面', '山西菜', ['noodle', 'meal'], ['咸香', '酸香'], 1],
  ['山西过油肉', '山西菜', ['rice', 'meal'], ['咸香', '烟火味'], 0],
  ['莜面栲栳栳', '山西菜', ['noodle', 'meal'], ['清淡', '咸香'], 0],
  ['平遥牛肉', '山西菜', ['rice', 'meal'], ['咸香', '浓郁'], 0],
  ['太原头脑', '山西菜', ['soup', 'meal'], ['清淡', '浓郁', '汤汤水水'], 0],
  ['山西焖面', '山西菜', ['noodle', 'meal'], ['咸香', '浓郁'], 0],

  ['内蒙古手把肉', '内蒙古菜', ['meal', 'dinner'], ['鲜香', '咸香'], 0],
  ['铁锅焖面', '内蒙古菜', ['noodle', 'meal'], ['浓郁', '咸香'], 0],
  ['烤全羊', '内蒙古菜', ['bbq', 'meal'], ['烟火味', '咸香'], 0],
  ['蒙古奶茶配炒米', '内蒙古菜', ['snack', 'light'], ['咸香', '浓郁'], 0],
  ['羊杂汤', '内蒙古菜', ['soup', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0],
  ['冰煮羊', '内蒙古菜', ['hotpot', 'meal'], ['鲜香', '清淡', '汤汤水水'], 0],

  // 华中、华东与客家
  ['排骨藕汤', '湖北菜', ['soup', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0],
  ['沔阳三蒸', '湖北菜', ['rice', 'meal'], ['咸香', '鲜香'], 0],
  ['潜江油焖大虾', '湖北菜', ['meal', 'late-night'], ['香辣', '浓郁', '烟火味'], 3],
  ['热干面', '湖北菜', ['noodle', 'fast'], ['咸香', '浓郁'], 1],
  ['武昌鱼', '湖北菜', ['rice', 'meal'], ['鲜香', '清淡'], 0],
  ['公安牛肉火锅', '湖北菜', ['hotpot', 'meal'], ['香辣', '浓郁', '汤汤水水'], 2],

  ['臭鳜鱼', '安徽菜', ['rice', 'meal'], ['鲜香', '浓郁'], 0],
  ['毛豆腐', '安徽菜', ['snack', 'meal'], ['咸香', '浓郁'], 1],
  ['徽州一品锅', '安徽菜', ['hotpot', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0],
  ['问政山笋', '安徽菜', ['rice', 'meal'], ['清淡', '鲜香'], 0],
  ['李鸿章大杂烩', '安徽菜', ['soup', 'meal'], ['浓郁', '鲜香', '汤汤水水'], 0],
  ['淮南牛肉汤', '安徽菜', ['soup', 'fast'], ['鲜香', '浓郁', '汤汤水水'], 1],

  ['南京盐水鸭', '苏菜', ['rice', 'meal'], ['咸香', '清淡'], 0],
  ['松鼠鳜鱼', '苏菜', ['rice', 'meal'], ['酸甜', '鲜香'], 0],
  ['无锡酱排骨', '苏菜', ['rice', 'meal'], ['酸甜', '浓郁'], 0],
  ['扬州狮子头', '苏菜', ['rice', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0],
  ['大煮干丝', '苏菜', ['soup', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0],
  ['鸭血粉丝汤', '苏菜', ['rice-noodle', 'fast'], ['鲜香', '汤汤水水'], 1],

  ['上海红烧肉', '上海本帮菜', ['rice', 'meal'], ['浓郁', '酸甜', '咸香'], 0],
  ['油爆虾', '上海本帮菜', ['rice', 'meal'], ['酸甜', '鲜香'], 0],
  ['八宝辣酱', '上海本帮菜', ['rice', 'meal'], ['咸香', '香辣', '浓郁'], 1],
  ['草头圈子', '上海本帮菜', ['rice', 'meal'], ['咸香', '浓郁'], 0],
  ['排骨年糕', '上海本帮菜', ['snack', 'meal'], ['酸甜', '咸香'], 0],
  ['上海菜饭', '上海本帮菜', ['rice', 'fast'], ['咸香', '清淡'], 0],

  ['梅菜扣肉', '客家菜', ['rice', 'meal'], ['咸香', '浓郁'], 0],
  ['客家酿豆腐', '客家菜', ['rice', 'meal'], ['鲜香', '咸香'], 0],
  ['盐焗鸡', '客家菜', ['rice', 'meal'], ['咸香', '鲜香'], 0],
  ['猪肚包鸡', '客家菜', ['hotpot', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 0],
  ['客家盆菜', '客家菜', ['meal', 'dinner'], ['浓郁', '鲜香'], 0],
  ['腌面三及第汤', '客家菜', ['noodle', 'fast'], ['咸香', '鲜香', '汤汤水水'], 0],

  // 西北、高原与边疆
  ['肉夹馍凉皮套餐', '陕西菜', ['snack', 'fast'], ['咸香', '香辣'], 1],
  ['岐山臊子面', '陕西菜', ['noodle', 'meal'], ['酸辣', '鲜香', '汤汤水水'], 2],
  ['葫芦鸡', '陕西菜', ['rice', 'meal'], ['咸香', '烟火味'], 0],
  ['秦镇米皮', '陕西菜', ['rice-noodle', 'fast'], ['酸辣', '咸香'], 2],
  ['水盆羊肉', '陕西菜', ['soup', 'meal'], ['鲜香', '汤汤水水'], 0],
  ['陕西甑糕', '陕西菜', ['snack', 'dessert'], ['香甜', '浓郁'], 0],

  ['新疆烤包子', '新疆菜', ['snack', 'fast'], ['咸香', '烟火味'], 0],
  ['椒麻鸡', '新疆菜', ['rice', 'meal'], ['麻辣', '鲜香'], 3],
  ['新疆炒米粉', '新疆菜', ['rice-noodle', 'fast'], ['香辣', '浓郁'], 4],
  ['馕坑肉', '新疆菜', ['bbq', 'meal'], ['烟火味', '咸香'], 0],
  ['架子肉', '新疆菜', ['bbq', 'meal'], ['烟火味', '鲜香'], 0],
  ['新疆拌面', '新疆菜', ['noodle', 'meal'], ['咸香', '烟火味'], 1],

  ['糌粑酥油茶', '藏餐', ['snack', 'light'], ['咸香', '浓郁'], 0],
  ['藏式牦牛肉火锅', '藏餐', ['hotpot', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 1],
  ['藏面', '藏餐', ['noodle', 'meal'], ['鲜香', '汤汤水水'], 0],
  ['牦牛肉包子', '藏餐', ['snack', 'meal'], ['咸香', '鲜香'], 0],
  ['萝卜炖牦牛肉', '藏餐', ['soup', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0],
  ['藏式血肠', '藏餐', ['meal', 'dinner'], ['咸香', '浓郁'], 0],

  ['手抓羊肉', '宁夏青海风味', ['meal', 'dinner'], ['鲜香', '咸香'], 0],
  ['羊肉臊子面', '宁夏青海风味', ['noodle', 'meal'], ['鲜香', '香辣', '汤汤水水'], 2],
  ['青海土火锅', '宁夏青海风味', ['hotpot', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 1],
  ['羊杂碎汤', '宁夏青海风味', ['soup', 'fast'], ['鲜香', '浓郁', '汤汤水水'], 1],
  ['青海尕面片', '宁夏青海风味', ['noodle', 'meal'], ['咸香', '汤汤水水'], 1],
  ['宁夏烩小吃', '宁夏青海风味', ['soup', 'meal'], ['鲜香', '浓郁', '汤汤水水'], 1],

  // 海峡与岛屿风味
  ['台式卤肉饭', '台湾风味', ['rice', 'fast'], ['咸香', '浓郁'], 0],
  ['台式牛肉面', '台湾风味', ['noodle', 'meal'], ['浓郁', '鲜香', '汤汤水水'], 1],
  ['盐酥鸡', '台湾风味', ['snack', 'late-night'], ['咸香', '烟火味'], 1],
  ['蚵仔煎', '台湾风味', ['snack', 'meal'], ['鲜香', '酸甜'], 0],
  ['三杯鸡', '台湾风味', ['rice', 'meal'], ['咸香', '浓郁'], 0],
  ['大肠包小肠', '台湾风味', ['snack', 'fast'], ['咸香', '酸甜'], 0],

  // 南亚与东南亚热门料理
  ['印度黄油鸡', '印度料理', ['rice', 'meal'], ['浓郁', '咸香'], 1],
  ['咖喱羊肉', '印度料理', ['rice', 'meal'], ['香辣', '浓郁'], 2],
  ['坦都里烤鸡', '印度料理', ['bbq', 'meal'], ['香辣', '烟火味'], 2],
  ['印度香饭', '印度料理', ['rice', 'meal'], ['鲜香', '浓郁'], 1],
  ['玛萨拉多萨', '印度料理', ['snack', 'meal'], ['香辣', '咸香'], 2],
  ['菠菜奶酪咖喱', '印度料理', ['rice', 'meal'], ['浓郁', '清淡'], 1],

  ['泰式打抛饭', '泰国料理', ['rice', 'fast'], ['香辣', '咸香', '烟火味'], 3],
  ['泰式炒河粉', '泰国料理', ['rice-noodle', 'meal'], ['酸甜', '鲜香'], 1],
  ['泰式船面', '泰国料理', ['noodle', 'meal'], ['浓郁', '香辣', '汤汤水水'], 2],
  ['芒果糯米饭', '泰国料理', ['rice', 'dessert'], ['香甜', '清淡'], 0],
  ['泰式红咖喱', '泰国料理', ['rice', 'meal'], ['香辣', '浓郁'], 3],
  ['泰式烤鸡', '泰国料理', ['bbq', 'meal'], ['酸辣', '烟火味'], 2],

  ['越南烤肉米线', '越南料理', ['rice-noodle', 'meal'], ['酸甜', '鲜香'], 1],
  ['越南法棍', '越南料理', ['fast', 'snack'], ['酸甜', '咸香'], 1],
  ['越南碎米饭', '越南料理', ['rice', 'meal'], ['咸香', '烟火味'], 0],
  ['越式甘蔗虾', '越南料理', ['snack', 'meal'], ['鲜香', '酸甜'], 0],
  ['越南鸡肉河粉', '越南料理', ['rice-noodle', 'meal'], ['清淡', '鲜香', '汤汤水水'], 0],
  ['越式烤肉春卷', '越南料理', ['snack', 'cold'], ['清淡', '鲜香'], 0],

  ['新加坡海南鸡饭', '新马料理', ['rice', 'meal'], ['清淡', '鲜香'], 0],
  ['肉骨茶', '新马料理', ['soup', 'meal'], ['浓郁', '鲜香', '汤汤水水'], 0],
  ['福建炒虾面', '新马料理', ['noodle', 'meal'], ['鲜香', '浓郁'], 1],
  ['马来沙嗲', '新马料理', ['bbq', 'meal'], ['酸甜', '烟火味'], 1],
  ['槟城炒粿条', '新马料理', ['rice-noodle', 'meal'], ['咸香', '烟火味'], 1],
  ['咖椰吐司套餐', '新马料理', ['snack', 'fast'], ['香甜', '咸香'], 0],

  // 欧洲与美洲热门料理
  ['那不勒斯披萨', '意大利菜', ['meal', 'fast'], ['酸甜', '咸香', '浓郁'], 0],
  ['海鲜意大利面', '意大利菜', ['noodle', 'meal'], ['鲜香', '浓郁'], 0],
  ['米兰烩饭', '意大利菜', ['rice', 'meal'], ['浓郁', '鲜香'], 0],
  ['千层面', '意大利菜', ['meal', 'dinner'], ['浓郁', '酸甜'], 0],
  ['意式烩牛膝', '意大利菜', ['meal', 'dinner'], ['浓郁', '鲜香', '汤汤水水'], 0],
  ['青酱宽面', '意大利菜', ['noodle', 'meal'], ['鲜香', '浓郁'], 0],

  ['墨西哥牛肉塔可', '墨西哥菜', ['snack', 'fast'], ['香辣', '酸辣', '烟火味'], 2],
  ['墨西哥卷饼', '墨西哥菜', ['fast', 'meal'], ['咸香', '浓郁'], 1],
  ['芝士玉米片', '墨西哥菜', ['snack', 'late-night'], ['咸香', '香辣'], 1],
  ['墨西哥鸡肉法士达', '墨西哥菜', ['bbq', 'meal'], ['烟火味', '香辣'], 2],
  ['波索莱玉米汤', '墨西哥菜', ['soup', 'meal'], ['酸辣', '浓郁', '汤汤水水'], 2],
  ['墨西哥辣肉酱饭', '墨西哥菜', ['rice', 'meal'], ['香辣', '浓郁'], 3],

  ['土耳其烤肉饭', '中东料理', ['rice', 'bbq', 'meal'], ['烟火味', '咸香'], 1],
  ['黎巴嫩烤肉拼盘', '中东料理', ['bbq', 'meal'], ['烟火味', '鲜香'], 0],
  ['鹰嘴豆泥配皮塔饼', '中东料理', ['snack', 'light'], ['清淡', '鲜香'], 0],
  ['沙威玛卷饼', '中东料理', ['fast', 'meal'], ['咸香', '浓郁'], 1],
  ['中东香料羊肉饭', '中东料理', ['rice', 'meal'], ['鲜香', '浓郁'], 1],
  ['以色列番茄炖蛋', '中东料理', ['meal', 'light'], ['酸甜', '鲜香', '汤汤水水'], 1],

  ['勃艮第红酒炖牛肉', '法式料理', ['meal', 'dinner'], ['浓郁', '鲜香', '汤汤水水'], 0],
  ['法式油封鸭腿', '法式料理', ['meal', 'dinner'], ['咸香', '浓郁'], 0],
  ['马赛鱼汤', '法式料理', ['soup', 'meal'], ['鲜香', '汤汤水水'], 0],
  ['洛林咸派', '法式料理', ['meal', 'snack'], ['咸香', '浓郁'], 0],
  ['法式可丽饼', '法式料理', ['snack', 'dessert'], ['香甜', '清淡'], 0],
  ['普罗旺斯炖菜', '法式料理', ['meal', 'light'], ['清淡', '鲜香'], 0],

  ['美式烟熏牛胸肉', '美式料理', ['bbq', 'meal'], ['烟火味', '咸香', '浓郁'], 0],
  ['纽约热狗', '美式料理', ['fast', 'snack'], ['咸香', '酸甜'], 0],
  ['水牛城辣鸡翅', '美式料理', ['fast', 'late-night'], ['酸辣', '香辣'], 3],
  ['美式芝士通心粉', '美式料理', ['noodle', 'meal'], ['浓郁', '咸香'], 0],
  ['南方炸鸡华夫饼', '美式料理', ['fast', 'meal'], ['咸香', '酸甜'], 0],
  ['夏威夷波奇饭', '美式料理', ['rice', 'cold', 'light'], ['清淡', '鲜香'], 0],

  ['西班牙海鲜烩饭', '西班牙菜', ['rice', 'meal'], ['鲜香', '浓郁'], 0],
  ['伊比利亚火腿拼盘', '西班牙菜', ['cold', 'snack'], ['咸香', '鲜香'], 0],
  ['西班牙土豆蛋饼', '西班牙菜', ['meal', 'snack'], ['咸香', '清淡'], 0],
  ['蒜香虾', '西班牙菜', ['meal', 'snack'], ['鲜香', '烟火味'], 1],
  ['西班牙炖牛尾', '西班牙菜', ['meal', 'dinner'], ['浓郁', '鲜香', '汤汤水水'], 0],
  ['加利西亚章鱼', '西班牙菜', ['meal', 'snack'], ['鲜香', '香辣'], 1],

  ['希腊烤肉卷', '地中海料理', ['fast', 'meal'], ['咸香', '烟火味'], 0],
  ['希腊沙拉', '地中海料理', ['cold', 'light'], ['清淡', '鲜香'], 0],
  ['意式烤蔬菜鸡肉碗', '地中海料理', ['rice', 'light'], ['清淡', '鲜香'], 0],
  ['摩洛哥塔吉锅', '地中海料理', ['meal', 'dinner'], ['浓郁', '鲜香', '汤汤水水'], 1],
  ['地中海烤鱼', '地中海料理', ['meal', 'dinner'], ['清淡', '鲜香', '烟火味'], 0],
  ['土耳其红扁豆汤', '地中海料理', ['soup', 'light'], ['清淡', '浓郁', '汤汤水水'], 1],

  ['俄式红菜汤', '俄罗斯菜', ['soup', 'meal'], ['酸甜', '浓郁', '汤汤水水'], 0],
  ['基辅炸鸡', '俄罗斯菜', ['meal', 'dinner'], ['咸香', '浓郁'], 0],
  ['俄式牛肉丝', '俄罗斯菜', ['rice', 'meal'], ['浓郁', '鲜香'], 0],
  ['俄式饺子', '俄罗斯菜', ['noodle', 'meal'], ['鲜香', '汤汤水水'], 0],
  ['烤肉串沙什雷克', '俄罗斯菜', ['bbq', 'meal'], ['烟火味', '咸香'], 0],
  ['俄式土豆沙拉', '俄罗斯菜', ['cold', 'light'], ['清淡', '咸香'], 0]
];

function expandSeed(seed: CompactSeed): Seed {
  const [name, cuisine, category, flavor, spicyLevel] = seed;
  const isHotpot = category.includes('hotpot');
  const isSnack = category.includes('snack') && !category.includes('meal');
  const isFast = category.includes('fast');
  const fullnessLevel: Level = isHotpot ? 5 : isSnack ? 2 : category.includes('light') ? 2 : 4;
  const temperature: Temperature = category.includes('cold') ? 'cold' : 'hot';
  const priceLevel: PriceLevel = isHotpot || category.includes('dinner') ? 3 : isSnack || isFast ? 1 : 2;
  return [name, cuisine, category, flavor, spicyLevel, fullnessLevel, temperature, priceLevel, !isHotpot, !isFast, !isHotpot];
}

const allSeeds: Seed[] = [...seeds, ...extendedSeeds.map(expandSeed)];

const descriptions: Record<string, string> = {
  '清淡': '温和耐吃，让食材本味稳稳站在中央。',
  '麻辣': '热辣与椒麻层层推进，第一口就把今晚的气氛点燃。',
  '酸辣': '酸香先开胃，辣意随后跟上，越吃越有精神。',
  '烟火味': '锅气与焦香很直接，是下班后最踏实的犒赏。',
  '汤汤水水': '一口热汤把疲惫接住，胃和心情一起被照顾。'
};

function getPhoto(category: string[], name: string, index: number) {
  const group = category.includes('hotpot') ? 'hotpot'
    : category.some((item) => ['noodle', 'rice-noodle'].includes(item)) ? 'noodle'
      : category.includes('soup') ? 'soup'
        : category.includes('bbq') ? 'bbq'
          : category.some((item) => ['cold', 'light', 'dessert'].includes(item)) ? 'cold'
            : category.includes('snack') ? 'snack'
              : category.includes('fast') ? 'fast'
                : category.includes('rice') ? 'rice' : 'meal';
  const pool = categoryPhotoPools[group];
  const nameHash = [...name].reduce((total, char) => total + (char.codePointAt(0) ?? 0), 0);
  return pool[(nameHash + index) % pool.length];
}

export const foods: Food[] = allSeeds.map((seed, index) => {
  const [name, cuisine, category, flavor, spicyLevel, fullnessLevel, temperature, priceLevel, suitableForSolo, suitableForGroup, deliveryFriendly] = seed;
  const photo = getPhoto(category, name, index);
  const lead = descriptions[flavor.find((item) => descriptions[item]) ?? ''] ?? '味道有层次、分量刚刚好，适合认真吃完这一顿。';
  return {
    id: `dish-${String(index + 1).padStart(3, '0')}`,
    name,
    cuisine,
    category,
    flavor,
    spicyLevel,
    fullnessLevel,
    temperature,
    priceLevel,
    suitableForSolo,
    suitableForGroup,
    deliveryFriendly,
    description: `${lead} ${name}很适合今晚。`,
    image: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=82`
  };
});

export const cuisineList = [...new Set(foods.map((food) => food.cuisine))];
export const flavorList = ['麻辣', '香辣', '酸辣', '清淡', '咸香', '酸甜', '鲜香', '浓郁', '烟火味', '汤汤水水'];
