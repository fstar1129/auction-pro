export default function displayCorrectShipImage(respect: number): string {
  let shipNumber = 0;

  switch (true) {
    case respect == 0:
      shipNumber = 1;
      break;
    case respect >= 1:
      shipNumber = 2;
      break;
    case respect >= 6:
      shipNumber = 3;
      break;
    case respect >= 11:
      shipNumber = 4;
      break;
    case respect >= 16:
      shipNumber = 5;
      break;
    default:
      shipNumber = 1;
      break;
  }

  return `ships/ship_${shipNumber}.png`;
}
