import { describe, expect, it } from 'vitest';
import { getNextWheelRotation, getPointerIndex } from './wheel';

describe('wheel angle mapping', () => {
  it('keeps the pointer aligned with the selected result across repeated spins', () => {
    for (let optionCount = 2; optionCount <= 12; optionCount += 1) {
      let rotation = 0;

      for (let spin = 0; spin < 30; spin += 1) {
        const selectedIndex = (spin * 5 + 3) % optionCount;
        rotation = getNextWheelRotation(rotation, selectedIndex, optionCount, 5 + (spin % 3));

        expect(getPointerIndex(rotation, optionCount)).toBe(selectedIndex);
      }
    }
  });

  it('lands at the center of the target segment instead of a boundary', () => {
    const optionCount = 8;
    const segment = 360 / optionCount;
    const rotation = getNextWheelRotation(2272.5, 6, optionCount, 6);
    const sourceAngle = ((-rotation % 360) + 360) % 360;

    expect(sourceAngle).toBeCloseTo((6 + 0.5) * segment, 8);
    expect(getPointerIndex(rotation, optionCount)).toBe(6);
  });
});
