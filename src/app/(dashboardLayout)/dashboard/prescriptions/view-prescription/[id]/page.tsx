import ViewPrescription from "@/src/components/Ui/Dashboard/Prescriptions/ViewPrescription";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <ViewPrescription id={id} />
    </div>
  );
};

export default Page;
