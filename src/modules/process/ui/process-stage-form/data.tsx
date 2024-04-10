import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { ProcessStageForm } from "./form";

type Props = {
  processId: ID;
};

export const ProcessStageFormData = async ({ processId }: Props) => {
  const currentStage = await db.processStage.findFirst({
    where: {
      processCurrentStage: {
        id: processId,
      },
    },
    include: {
      templateStage: {
        include: {
          fields: {
            include: {
              templateField: true,
            },
          },
        },
      },
    },
  });

  if (!currentStage) return notFound();

  const { templateStage } = currentStage;
  return (
    <div>
      <h5 className="mb-8 font-semibold">{templateStage.name}</h5>
      <ProcessStageForm templateStageFields={templateStage.fields} />
    </div>
  );
};
