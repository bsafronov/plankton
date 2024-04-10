import { ProcessCommentItem } from "./process-comment-item";

export const ProcessCommentList = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <ProcessCommentItem key={i} />
      ))}
    </div>
  );
};
