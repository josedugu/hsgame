export const topValue = (a) => {
  let top = undefined;
  if ((a > 0 && a <= 45) || (a >= 315 && a <= 360)) {
    top = 0;
  } else if (a >= 135 && a <= 225) {
    top = 100;
  }
  return top;
};
const remainAngle = (B) => {
  return 180 - 45 - B;
};

export const less45 = (a, h) => {
  //const anguloRadianes = (a * Math.PI) / 180;
  const catetoOpuesto = h * Math.tan((a * Math.PI) / 180);
  return catetoOpuesto;
};

export const greater45 = (b, B, C) => {
  const result =
    (b / Math.sin((B * Math.PI) / 180)) * Math.sin((C * Math.PI) / 180);
  return result;
};

export const hyp = (a, b) => {
  const sum = a ** 2 + b ** 2;
  const result = Math.sqrt(sum);
  return result;
};

export const firstPoint = ({ angle, height, width }) => {
  const hypo = hyp(width, height);
  let result;
  if (angle > 0 && angle < 45) {
    const value = less45(angle, height);
    result = value;
  } else if (angle > 45 && angle < 90) {
    const C = angle - 45;
    const B = remainAngle(C);
    const value = greater45(hypo, B, C);
    result = value;
  } else if (angle > 90 && angle < 135) {
    const a = angle - 90;
    const value = less45(a, width);
    result = value + height;
  } else if (angle > 135 && angle < 180) {
    const C = angle - 135;
    const B = remainAngle(C);
    const value = greater45(hypo, B, C);
    result = value;
  } else if (angle > 180 && angle < 225) {
    const a = angle - 180;
    const value = less45(a, width);
    result = value + width;
  } else if (angle > 225 && angle < 270) {
    const C = angle - 225;
    const B = remainAngle(C);
    const value = greater45(hypo, B, C);
    result = height * 2 - value;
  } else if (angle > 270 && angle < 315) {
    const a = angle - 270;
    const value = less45(a, width);
    result = value;
  } else if (angle > 315 && angle < 360) {
    const C = angle - 315;
    const B = remainAngle(C);
    const value = greater45(hypo, B, C);
    result = value + width;
  } else {
    console.log("punto 0,0");
    result = 0;
  }
  return result;
};
