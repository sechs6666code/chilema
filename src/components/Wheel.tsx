import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, RotateCw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getNextWheelRotation } from '../utils/wheel';

type Props = {
  title: string;
  eyebrow: string;
  options: string[];
  onAccept: (value: string) => void;
  onCancel: () => void;
};

const palette = ['#f78da7', '#ffc2ce', '#e45179', '#ffd6c9', '#c93d68', '#ffb2a3', '#ef7996', '#f8d5de', '#d95c83', '#ffc9b8', '#b93660', '#f5a8bd'];

function randomIndex(length: number) {
  if (length <= 1) return 0;
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % length;
}

export function Wheel({ title, eyebrow, options, onAccept, onCancel }: Props) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string>();
  const [pendingResult, setPendingResult] = useState<string>();
  const segment = 360 / options.length;
  const gradient = useMemo(
    () => `conic-gradient(${options.map((_, index) => `${palette[index % palette.length]} ${index * segment}deg ${(index + 1) * segment}deg`).join(',')})`,
    [options, segment]
  );

  const spin = () => {
    if (spinning || options.length === 0) return;
    const index = randomIndex(options.length);
    const selected = options[index];
    const next = getNextWheelRotation(rotation, index, options.length, 5 + randomIndex(3));
    setResult(undefined);
    setPendingResult(selected);
    setSpinning(true);
    setRotation(next);
    if ('vibrate' in navigator) navigator.vibrate(12);
  };

  return (
    <motion.div className="wheel-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="icon-button wheel-back" onClick={onCancel} disabled={spinning} aria-label="返回自己选择">
        <ArrowLeft />
      </button>
      <div className="wheel-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>别偷看指针，让今晚保留一点偶然。</p>
      </div>

      <div className="wheel-stage">
        <div className="wheel-pointer"><span /></div>
        <motion.div
          className="wheel"
          style={{ background: gradient }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4.6, ease: [0.12, 0.72, 0.16, 1] }}
          onAnimationComplete={() => {
            if (!spinning) return;
            setSpinning(false);
            setResult(pendingResult);
            if ('vibrate' in navigator) navigator.vibrate([18, 45, 24]);
          }}
        >
          <div className="wheel-labels">
            {options.map((option, index) => (
              <span key={option} style={{ transform: `rotate(${(index + 0.5) * segment}deg) translateY(-132px) rotate(90deg)` }}>
                {option.length > 7 ? `${option.slice(0, 6)}…` : option}
              </span>
            ))}
          </div>
          <div className="wheel-hub"><Sparkles size={22} /></div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div className="wheel-result" initial={{ opacity: 0, y: 22, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
            <span>今晚的命运选择</span>
            <strong>{result}</strong>
            <button className="primary-button" onClick={() => onAccept(result)}>就它了</button>
            <div className="wheel-secondary">
              <button onClick={spin}><RotateCw size={16} /> 再转一次</button>
              <button onClick={onCancel}>我还是自己选</button>
            </div>
          </motion.div>
        ) : (
          <motion.button key="spin" className="primary-button spin-button" onClick={spin} disabled={spinning} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {spinning ? '命运正在认真考虑…' : '转动命运'}
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
