import EditChamber from "@/src/components/Ui/Dashboard/Chambers/EditChamber";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditChamber id={id} />
    </div>
  );
};

export default Page;
