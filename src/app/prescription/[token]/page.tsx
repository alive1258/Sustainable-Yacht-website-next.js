import PublicPrescriptionView from "@/src/components/Ui/Dashboard/Prescriptions/PublicPrescriptionView";

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { token } = await params;

  return <PublicPrescriptionView token={token} />;
};

export default Page;
