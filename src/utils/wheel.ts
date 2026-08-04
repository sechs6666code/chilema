export function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

export function getNextWheelRotation(
  currentRotation: number,
  selectedIndex: number,
  optionCount: number,
  extraTurns: number
) {
  if (optionCount <= 0) return currentRotation;

  const segment = 360 / optionCount;
  const selectedCenter = (selectedIndex + 0.5) * segment;
  const targetRotation = normalizeAngle(-selectedCenter);
  const currentAngle = normalizeAngle(currentRotation);
  const remainingAngle = normalizeAngle(targetRotation - currentAngle);

  return currentRotation + Math.max(0, extraTurns) * 360 + remainingAngle;
}

export function getPointerIndex(rotation: number, optionCount: number) {
  if (optionCount <= 0) return -1;

  const segment = 360 / optionCount;
  const sourceAngleAtPointer = normalizeAngle(-rotation);
  return Math.floor(sourceAngleAtPointer / segment) % optionCount;
}
