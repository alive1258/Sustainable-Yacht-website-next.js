import EditAppointment from "@/src/components/Ui/Dashboard/Appointments/EditAppointment";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditAppointment id={id} />
    </div>
  );
};

export default Page;
