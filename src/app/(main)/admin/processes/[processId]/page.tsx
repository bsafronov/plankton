import { notFound } from "next/navigation";
import { links } from "~/modules/_app/lib/links";
import { DeleteProcessDialog } from "~/modules/process/ui/delete-process/dialog";
import { db } from "~/server/db";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/shared/ui/table";

type Props = {
  params: {
    processId: string;
  };
};

export default async function Page({ params }: Props) {
  const { processId } = parseIds(params);

  const process = await db.process.findUnique({
    where: {
      id: processId,
    },
    include: {
      fields: {
        include: {
          templateField: true,
        },
      },
      template: true,
      stages: true,
      currentStage: {
        select: {
          templateStage: {
            select: {
              name: true,
            },
          },
        },
      },
      product: true,
    },
  });

  if (!process) {
    return notFound();
  }

  const { template, fields, currentStage, product } = process;

  return (
    <>
      <MyBreadcrumb
        items={[
          links.adminPanel.index,
          links.adminPanel.processes.index,
          links.adminPanel.processes.id(process.id.toString(), process.id),
        ]}
      />
      <div className="flex flex-col gap-4 p-4">
        <div className="rounded-md border">
          <h5 className="px-4 py-2 font-semibold">Общая информация</h5>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Значение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Изделие</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Шаблон</TableCell>
                <TableCell>{template.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Текущий этап</TableCell>
                <TableCell>{currentStage?.templateStage.name}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-md border">
          <h5 className="px-4 py-2 font-semibold">Поля процесса</h5>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Поле</TableHead>
                <TableHead>Значение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.templateField.name}</TableCell>
                  <TableCell>
                    {item.value ?? (
                      <span className="text-muted-foreground">
                        Не заполнено
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DeleteProcessDialog processId={processId} />
      </div>
    </>
  );
}
