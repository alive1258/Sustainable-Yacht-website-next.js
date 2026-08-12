import EditPrescription from "@/src/components/Ui/Dashboard/Prescriptions/EditPrescription";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditPrescription id={id} />
    </div>
  );
};

export default Page;
