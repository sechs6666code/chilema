import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bookmark, Check, ChevronRight, Clock3, Heart, MapPin, Moon, RotateCcw, Share2, Sparkles, Sun, UtensilsCrossed } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FoodImage } from './components/FoodImage';
import { Wheel } from './components/Wheel';
import { flavorList } from './data/foods';
import { questions } from './data/questions';
import { usePersistentState } from './hooks/usePersistentState';
import type { AppView, DecisionState, Food, HistoryEntry } from './types';
import { chooseFood, displayMaps, filterFoods, getCuisineCandidates, getFlavorCandidates, getFoodById } from './utils/recommendation';

type WheelState = { title: string; eyebrow: string; options: string[]; onAccept: (value: string) => void };

const transition = { duration: .32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

function App() {
  const [view, setView] = usePersistentState<AppView>('dinner:view', 'welcome');
  const [questionIndex, setQuestionIndex] = usePersistentState('dinner:question', 0);
  const [decision, setDecision] = usePersistentState<DecisionState>('dinner:decision', {});
  const [favorites, setFavorites] = usePersistentState<string[]>('dinner:favorites', []);
  const [history, setHistory] = usePersistentState<HistoryEntry[]>('dinner:history', []);
  const [dark, setDark] = usePersistentState('dinner:dark', false);
  const [wheel, setWheel] = useState<WheelState>();
  const [notice, setNotice] = useState<string>();

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  useEffect(() => {
    const handler = () => {
      const hash = location.hash.replace('#', '') as AppView;
      if (hash && ['welcome', 'question', 'flavor', 'cuisine', 'dish', 'result', 'favorites', 'history'].includes(hash)) setView(hash);
    };
    addEventListener('popstate', handler);
    return () => removeEventListener('popstate', handler);
  }, [setView]);

  const navigate = (next: AppView, replace = false) => {
    setView(next);
    historyState(next, replace);
    scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setDecision({});
    setQuestionIndex(0);
    setWheel(undefined);
    navigate('welcome', true);
  };

  const updateDecision = (patch: Partial<DecisionState>, clear: (keyof DecisionState)[] = []) => {
    setDecision((current) => {
      const next = { ...current, ...patch };
      clear.forEach((key) => delete next[key]);
      return next;
    });
  };

  const answerQuestion = (value: string) => {
    const question = questions[questionIndex];
    const apply = (resolved: string) => {
      updateDecision({ [question.key]: resolved }, ['selectedFlavor', 'selectedCuisine', 'selectedDish']);
      if (questionIndex === questions.length - 1) navigate('flavor');
      else setQuestionIndex((index) => index + 1);
    };
    if (value === 'any') {
      setWheel({ title: question.title, eyebrow: '把这一票交给命运', options: question.options.filter((option) => option.value !== 'any').map((option) => option.label), onAccept: (label) => {
        const resolved = question.options.find((option) => option.label === label)?.value ?? 'any';
        setWheel(undefined);
        apply(resolved);
      }});
    } else apply(value);
  };

  const flavorCandidates = useMemo(() => {
    const list = getFlavorCandidates(decision);
    return flavorList.filter((flavor) => list.includes(flavor));
  }, [decision]);
  const cuisineCandidates = useMemo(() => getCuisineCandidates(decision), [decision]);
  const dishCandidates = useMemo(() => filterFoods(decision, { ignoreDish: true }), [decision]);
  const resultFood = getFoodById(decision.selectedDish);

  const selectFlavor = (flavor: string) => {
    updateDecision({ selectedFlavor: flavor }, ['selectedCuisine', 'selectedDish']);
    navigate('cuisine');
  };

  const selectCuisine = (cuisine: string) => {
    updateDecision({ selectedCuisine: cuisine }, ['selectedDish']);
    navigate('dish');
  };

  const selectDish = (food: Food) => {
    updateDecision({ selectedDish: food.id });
    navigate('result');
  };

  const openWheel = (kind: 'flavor' | 'cuisine' | 'dish') => {
    if (kind === 'flavor') setWheel({ title: '今晚是什么命运口味？', eyebrow: '第一层 · 命运口味', options: flavorCandidates, onAccept: (value) => { setWheel(undefined); selectFlavor(value); } });
    if (kind === 'cuisine') setWheel({ title: '把菜系也交给转盘', eyebrow: `已锁定 · ${decision.selectedFlavor}`, options: cuisineCandidates.slice(0, 12), onAccept: (value) => { setWheel(undefined); selectCuisine(value); } });
    if (kind === 'dish') {
      const pool = [...dishCandidates].sort(() => Math.random() - .5).slice(0, 12);
      if (pool.length === 1) return selectDish(pool[0]);
      setWheel({ title: '今晚到底吃什么？', eyebrow: `${decision.selectedFlavor} · ${decision.selectedCuisine}`, options: pool.map((food) => food.name), onAccept: (value) => {
        setWheel(undefined);
        const food = pool.find((item) => item.name === value);
        if (food) selectDish(food);
      }});
    }
  };

  const goBack = () => {
    if (view === 'question') {
      if (questionIndex > 0) setQuestionIndex((index) => index - 1);
      else navigate('welcome');
    } else if (view === 'flavor') { setQuestionIndex(questions.length - 1); navigate('question'); }
    else if (view === 'cuisine') navigate('flavor');
    else if (view === 'dish') navigate('cuisine');
    else if (view === 'result') navigate('dish');
    else navigate(decision.selectedDish ? 'result' : 'welcome');
  };

  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((foodId) => foodId !== id) : [id, ...current]);

  const confirmFood = (food: Food) => {
    const today = new Date().toISOString();
    setHistory((current) => [{ id: `${food.id}-${Date.now()}`, foodId: food.id, chosenAt: today }, ...current.filter((entry) => entry.foodId !== food.id)].slice(0, 30));
    setNotice(`今晚就吃 ${food.name}`);
    setTimeout(() => setNotice(undefined), 2400);
  };

  const reroll = (sameCuisine = false) => {
    const state = sameCuisine ? decision : { ...decision, selectedCuisine: undefined, selectedDish: undefined };
    const pool = filterFoods(state, { ignoreDish: true });
    const next = chooseFood(pool, history.map((item) => item.foodId));
    if (next) selectDish(next);
  };

  const share = async (food: Food) => {
    const data = { title: '今晚吃什么', text: `今晚不纠结了，我决定吃${food.name}。`, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(`${data.text} ${data.url}`); setNotice('分享文案已复制'); }
    } catch { /* The user can cancel the native share sheet. */ }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <AnimatePresence>{notice && <motion.div className="toast" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }}><Check size={17} />{notice}</motion.div>}</AnimatePresence>
      <AnimatePresence>{wheel && <Wheel {...wheel} onCancel={() => setWheel(undefined)} />}</AnimatePresence>

      {!wheel && view !== 'welcome' && (
        <header className="topbar">
          <button className="icon-button" onClick={goBack} aria-label="返回"><ArrowLeft /></button>
          <span className="wordmark"><Heart size={15} fill="currentColor" /> 今晚吃什么</span>
          <button className="icon-button" onClick={() => setDark((value) => !value)} aria-label="切换深色模式">{dark ? <Sun /> : <Moon />}</button>
        </header>
      )}

      <main>
        <AnimatePresence mode="wait">
          {view === 'welcome' && <Welcome key="welcome" dark={dark} setDark={setDark} onStart={() => { setQuestionIndex(0); navigate('question'); }} onOpen={navigate} />}
          {view === 'question' && <QuestionView key={`q-${questionIndex}`} index={questionIndex} value={decision[questions[questionIndex].key]} onAnswer={answerQuestion} />}
          {view === 'flavor' && <ChoiceView key="flavor" eyebrow="第 2 阶段 · 命运口味" title="今晚想要哪种味道？" hint={`基础筛选后，还有 ${filterFoods(decision, { ignoreFlavor: true, ignoreCuisine: true, ignoreDish: true }).length} 道菜在候选区。`} options={flavorCandidates} onSelect={selectFlavor} onRandom={() => openWheel('flavor')} />}
          {view === 'cuisine' && <ChoiceView key="cuisine" eyebrow={`已锁定 · ${decision.selectedFlavor}`} title="接下来，选一个菜系" hint="这里只会出现与前面条件相容的方向。" options={cuisineCandidates} onSelect={selectCuisine} onRandom={() => openWheel('cuisine')} />}
          {view === 'dish' && <DishView key="dish" foods={dishCandidates} decision={decision} onSelect={selectDish} onRandom={() => openWheel('dish')} />}
          {view === 'result' && resultFood && <ResultView key={resultFood.id} food={resultFood} favorite={favorites.includes(resultFood.id)} onFavorite={() => toggleFavorite(resultFood.id)} onConfirm={() => confirmFood(resultFood)} onShare={() => share(resultFood)} onReroll={() => reroll(false)} onSame={() => reroll(true)} onBack={goBack} onReset={reset} />}
          {view === 'favorites' && <LibraryView key="favorites" mode="favorites" foods={favorites.map(getFoodById).filter(Boolean) as Food[]} onSelect={selectDish} onReset={reset} />}
          {view === 'history' && <LibraryView key="history" mode="history" foods={history.map((entry) => getFoodById(entry.foodId)).filter(Boolean) as Food[]} entries={history} onSelect={selectDish} onReset={reset} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function historyState(view: AppView, replace: boolean) {
  const method = replace ? 'replaceState' : 'pushState';
  window.history[method]({ view }, '', `#${view}`);
}

function Page({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.section className={`page ${className}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={transition}>{children}</motion.section>;
}

function Welcome({ dark, setDark, onStart, onOpen }: { dark: boolean; setDark: React.Dispatch<React.SetStateAction<boolean>>; onStart: () => void; onOpen: (view: AppView) => void }) {
  return <Page className="welcome-page">
    <div className="welcome-actions">
      <button className="icon-button" onClick={() => onOpen('history')} aria-label="历史记录"><Clock3 /></button>
      <button className="icon-button" onClick={() => onOpen('favorites')} aria-label="收藏"><Bookmark /></button>
      <button className="icon-button" onClick={() => setDark(!dark)} aria-label="切换深色模式">{dark ? <Sun /> : <Moon />}</button>
    </div>
    <div className="date-mark"><span>TONIGHT</span><i /></div>
    <div className="welcome-copy">
      <span className="eyebrow"><Heart size={15} fill="currentColor" /> 约会不该从纠结开始</span>
      <h1>别纠结了，<br /><em>今晚吃什么</em><br />交给我。</h1>
      <p>几道小问题，一只认真旋转的命运转盘，帮你们把“随便”变成一个真的答案。</p>
    </div>
    <button className="primary-button start-button" onClick={onStart}>开始选吃的 <ChevronRight /></button>
    <div className="welcome-note"><Sparkles size={15} /> 最终一定具体到一道菜</div>
  </Page>;
}

function QuestionView({ index, value, onAnswer }: { index: number; value?: string; onAnswer: (value: string) => void }) {
  const question = questions[index];
  return <Page className="question-page">
    <div className="progress-block">
      <span>{String(index + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</span>
      <div className="progress-track"><motion.i animate={{ width: `${((index + 1) / questions.length) * 100}%` }} transition={transition} /></div>
    </div>
    <div className="section-heading"><span className="eyebrow">{question.eyebrow}</span><h2>{question.title}</h2><p>{question.hint}</p></div>
    <div className="option-list">
      {question.options.map((option, optionIndex) => <motion.button key={option.value} className={`option-card ${value === option.value ? 'selected' : ''} ${option.value === 'any' ? 'random-option' : ''}`} onClick={() => onAnswer(option.value)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: optionIndex * .045 }}>
        <span className="option-emoji">{option.emoji}</span><strong>{option.label}</strong>{option.value === 'any' && <small>让转盘替我决定</small>}<ChevronRight size={19} />
      </motion.button>)}
    </div>
  </Page>;
}

function ChoiceView({ eyebrow, title, hint, options, onSelect, onRandom }: { eyebrow: string; title: string; hint: string; options: string[]; onSelect: (value: string) => void; onRandom: () => void }) {
  return <Page className="choice-page">
    <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{hint}</p></div>
    <button className="fate-card" onClick={onRandom}><span><Sparkles /> 我还是随便</span><strong>开启命运转盘</strong><ChevronRight /></button>
    <div className="choice-grid">{options.map((option, index) => <motion.button key={option} onClick={() => onSelect(option)} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: index * .025 }}>{option}<ChevronRight size={16} /></motion.button>)}</div>
  </Page>;
}

function DishView({ foods, decision, onSelect, onRandom }: { foods: Food[]; decision: DecisionState; onSelect: (food: Food) => void; onRandom: () => void }) {
  return <Page className="dish-page">
    <div className="section-heading"><span className="eyebrow">最后一层 · {decision.selectedCuisine}</span><h2>今晚具体吃什么？</h2><p>{decision.selectedFlavor}方向下，为你留下 {foods.length} 个不冲突的答案。</p></div>
    <button className="fate-card compact" onClick={onRandom}><span><Sparkles /> 继续随便</span><strong>转出最终答案</strong><ChevronRight /></button>
    <div className="dish-grid">{foods.slice(0, 12).map((food, index) => <motion.button className="dish-card" key={food.id} onClick={() => onSelect(food)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: index * .035 }}>
      <FoodImage src={food.image} alt={food.name} /><span><small>{food.cuisine}</small><strong>{food.name}</strong><em>{food.flavor.slice(0, 2).join(' · ')}</em></span>
    </motion.button>)}</div>
  </Page>;
}

function ResultView({ food, favorite, onFavorite, onConfirm, onShare, onReroll, onSame, onBack, onReset }: { food: Food; favorite: boolean; onFavorite: () => void; onConfirm: () => void; onShare: () => void; onReroll: () => void; onSame: () => void; onBack: () => void; onReset: () => void }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.name)}`;
  return <Page className="result-page">
    <div className="result-hero"><FoodImage src={food.image} alt={food.name} /><div className="hero-shade" /><div className="hero-tools"><button onClick={onFavorite} aria-label="收藏">{favorite ? <Heart fill="currentColor" /> : <Heart />}</button><button onClick={onShare} aria-label="分享"><Share2 /></button></div><div className="hero-copy"><span>今晚就吃</span><h2>{food.name}</h2><div>{food.flavor.map((tag) => <i key={tag}>{tag}</i>)}</div></div></div>
    <div className="result-body">
      <p className="result-description">{food.description}</p>
      <div className="stat-grid">
        <div><small>菜系</small><strong>{food.cuisine}</strong></div><div><small>辣度</small><strong>{displayMaps.spicy[food.spicyLevel]}</strong></div>
        <div><small>饱腹</small><strong>{displayMaps.fullness[food.fullnessLevel - 1]}</strong></div><div><small>人均</small><strong>{displayMaps.price[food.priceLevel - 1]}</strong></div>
      </div>
      <div className="reason-card"><Sparkles /><div><small>为什么推荐它</small><p>{food.suitableForGroup ? '适合两个人慢慢吃，也能照顾不同的节奏。' : '一人食没有负担，两个人分享也刚刚好。'}{food.deliveryFriendly ? ' 外卖表现也很稳。' : ' 更建议到店吃，状态会更好。'}</p></div></div>
      <div className="suitability"><span>{food.suitableForSolo ? '✓' : '–'} 一个人</span><span>{food.suitableForGroup ? '✓' : '–'} 约会分享</span><span>{food.deliveryFriendly ? '✓' : '–'} 适合外卖</span></div>
      <button className="primary-button" onClick={onConfirm}><Check /> 就吃这个</button>
      <a className="map-button" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin /> 搜索附近餐厅 <ChevronRight /></a>
      <div className="secondary-actions"><button onClick={onSame}>换一个同类型</button><button onClick={onReroll}>再随便一次</button><button onClick={onBack}>返回上一层</button><button onClick={onReset}><RotateCcw size={15} /> 全部重新选择</button></div>
    </div>
  </Page>;
}

function LibraryView({ mode, foods, entries, onSelect, onReset }: { mode: 'favorites' | 'history'; foods: Food[]; entries?: HistoryEntry[]; onSelect: (food: Food) => void; onReset: () => void }) {
  return <Page className="library-page"><div className="section-heading"><span className="eyebrow">{mode === 'favorites' ? '我的心动菜单' : '最近吃过什么'}</span><h2>{mode === 'favorites' ? '收藏' : '历史记录'}</h2><p>{mode === 'favorites' ? '喜欢过的答案，都在这里等你再选一次。' : '短时间内随机推荐会主动避开这些结果。'}</p></div>
    {foods.length ? <div className="library-list">{foods.map((food, index) => <button key={`${food.id}-${index}`} onClick={() => onSelect(food)}><FoodImage src={food.image} alt={food.name} /><span><strong>{food.name}</strong><small>{mode === 'history' && entries?.[index] ? new Date(entries[index].chosenAt).toLocaleDateString('zh-CN') : food.cuisine}</small></span><ChevronRight /></button>)}</div> : <div className="empty-state"><UtensilsCrossed /><h3>这里还是空的</h3><p>{mode === 'favorites' ? '遇见喜欢的菜，点一下爱心就会留在这里。' : '确定一次晚餐后，这里会记住你的选择。'}</p><button className="primary-button" onClick={onReset}>开始选今晚的饭</button></div>}
  </Page>;
}

export default App;
