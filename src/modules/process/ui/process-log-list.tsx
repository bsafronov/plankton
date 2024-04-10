import { ProcessLogItem } from "./process-log-item";

export const ProcessLogList = () => {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, i) => (
        <ProcessLogItem key={i} />
      ))}
    </div>
  );
};
