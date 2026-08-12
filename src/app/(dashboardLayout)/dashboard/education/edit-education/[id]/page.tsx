import EditEducation from "@/src/components/Ui/Dashboard/Education/EditEducation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditEducation id={id} />
    </div>
  );
};

export default Page;
