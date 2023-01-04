type TClear = ReturnType<typeof clearInterval>;
type TInterval = ReturnType<typeof setInterval> | TClear | null;

export default TInterval;
