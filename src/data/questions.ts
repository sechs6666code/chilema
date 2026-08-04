export type Question = {
  key: 'hungerLevel' | 'temperature' | 'flavorIntensity' | 'spicyPreference' | 'foodForm';
  eyebrow: string;
  title: string;
  hint: string;
  options: { value: string; label: string; emoji: string }[];
};

export const questions: Question[] = [
  {
    key: 'hungerLevel', eyebrow: '先听听胃的意见', title: '今晚想吃多饱？', hint: '别想标准答案，只选此刻最真实的感觉。',
    options: [
      { value: 'any', label: '随便', emoji: '🎲' }, { value: 'light', label: '简单垫一下', emoji: '🥢' },
      { value: 'normal', label: '正常吃饭', emoji: '🍚' }, { value: 'good', label: '吃顿好的', emoji: '✨' },
      { value: 'stuffed', label: '必须吃撑', emoji: '😋' }
    ]
  },
  {
    key: 'temperature', eyebrow: '第二个小问题', title: '想吃什么温度？', hint: '热气腾腾，还是清爽一点？',
    options: [
      { value: 'any', label: '随便', emoji: '🎲' }, { value: 'hot', label: '热的', emoji: '♨️' },
      { value: 'cold', label: '凉的', emoji: '❄️' }, { value: 'either', label: '都可以', emoji: '👌' }
    ]
  },
  {
    key: 'flavorIntensity', eyebrow: '今晚的味觉音量', title: '能接受多重口味？', hint: '清清爽爽，还是需要一口醒神？',
    options: [
      { value: 'any', label: '随便', emoji: '🎲' }, { value: 'light', label: '清淡', emoji: '🌿' },
      { value: 'normal', label: '正常', emoji: '🙂' }, { value: 'heavy', label: '重口味', emoji: '🔥' }
    ]
  },
  {
    key: 'spicyPreference', eyebrow: '很关键的一票', title: '今天能接受辣吗？', hint: '这项属于硬条件，我不会偷偷背叛你。',
    options: [
      { value: 'any', label: '随便', emoji: '🎲' }, { value: 'none', label: '完全不辣', emoji: '🥛' },
      { value: 'mild', label: '微辣', emoji: '🌶️' }, { value: 'medium', label: '中辣', emoji: '🌶️🌶️' },
      { value: 'very', label: '越辣越好', emoji: '🌋' }
    ]
  },
  {
    key: 'foodForm', eyebrow: '最后一个基础偏好', title: '更偏向哪一种形式？', hint: '选完就进入命运口味环节。',
    options: [
      { value: 'any', label: '随便', emoji: '🎲' }, { value: 'rice', label: '米饭', emoji: '🍚' },
      { value: 'noodle', label: '面食', emoji: '🍜' }, { value: 'rice-noodle', label: '粉类', emoji: '🥣' },
      { value: 'hotpot', label: '火锅', emoji: '🍲' }, { value: 'bbq', label: '烧烤', emoji: '🍢' },
      { value: 'snack', label: '小吃', emoji: '🥟' }, { value: 'fast', label: '快餐', emoji: '🥡' },
      { value: 'meal', label: '正餐', emoji: '🍽️' }
    ]
  }
];
