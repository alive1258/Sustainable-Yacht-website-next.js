import {
  School,
  BookOpen,
  GraduationCap,
  BadgeCheck,
  FileBadge,
  Trophy,
  Brain,
  Stethoscope,
  Crown,
  Users,
  Droplet,
  Calculator,
  LucideIcon,
} from "lucide-react";

/* ================= TYPES ================= */
interface Row {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  period?: string;
  placeholder?: boolean;
}

/* ================= CONSTANTS ================= */
const EDUCATION: Row[] = [
  {
    icon: School,
    title: "Secondary School Certificate (SSC)",
    subtitle: "Komorpur High School, Pabna",
  },
  {
    icon: BookOpen,
    title: "Higher Secondary Certificate (HSC)",
    subtitle: "Ullapara Science College",
  },
  {
    icon: GraduationCap,
    title: "MBBS — Bachelor of Medicine & Surgery",
    subtitle: "Jamalpur Medical College, Jamalpur",
    period: "2015–2021",
  },
];

const CERTIFICATES: Row[] = [
  {
    icon: BadgeCheck,
    title: "Certificate in Medical Ultrasonography (CMU)",
    subtitle: "Bangladesh Medical University (Ex-PG Hospital), Mirpur",
  },
  {
    icon: FileBadge,
    title: "Certificate title",
    subtitle: "Issuing organization — to be confirmed",
    placeholder: true,
  },
];

const AWARDS: Row[] = [
  {
    icon: Trophy,
    title: "Award title",
    subtitle: "Issuing organization — to be confirmed",
    placeholder: true,
  },
  {
    icon: Trophy,
    title: "Award title",
    subtitle: "Issuing organization — to be confirmed",
    placeholder: true,
  },
];

const EXPERIENCE: Row[] = [
  {
    icon: Brain,
    title: "MS Resident — Neurosurgery",
    subtitle: "Bangladesh Medical University (BMU)",
    period: "Mar 2025–Present",
  },
  {
    icon: Stethoscope,
    title: "Intern Doctor (ইন্টার্ন ডাক্তার)",
    subtitle: "250-Bed General Hospital, Jamalpur",
    period: "Dec 2021–Present",
  },
];

const LEADERSHIP: Row[] = [
  {
    icon: Crown,
    title: "Former President (সভাপতি)",
    subtitle: "Padma Students Welfare Association",
    period: "2020–2025",
  },
  {
    icon: Users,
    title: "Member",
    subtitle: "Padma Students Welfare Association",
    period: "2018–Present",
  },
  {
    icon: Droplet,
    title: "Volunteer",
    subtitle: "Blood Donation Bangladesh",
    period: "2017–2025",
  },
  {
    icon: Calculator,
    title: "Former Attendant",
    subtitle: "Bangladesh Mathematical Olympiad",
    period: "2014–2025",
  },
];

/* ================= SUBCOMPONENTS ================= */
const GroupHeading: React.FC<{ icon: LucideIcon; label: string }> = ({
  icon: Icon,
  label,
}) => (
  <div className="flex items-center gap-2.5">
    <div className="p-1.5 rounded-lg bg-[#2AA7FF]/10">
      <Icon size={14} className="text-[#2AA7FF]" />
    </div>
    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
      {label}
    </h3>
  </div>
);

const RowItem: React.FC<{ item: Row; index: number }> = ({ item, index }) => (
  <div
    className="flex items-center justify-between gap-4 py-3.5 transition-all duration-200 hover:pl-1 group"
    style={{
      animationDelay: `${index * 50}ms`,
    }}
  >
    <div className="flex items-center gap-3.5 min-w-0 flex-1">
      <span
        className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
          item.placeholder
            ? "bg-gray-100 text-gray-400"
            : "bg-[#2AA7FF]/10 text-[#2AA7FF] group-hover:bg-[#2AA7FF] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#2AA7FF]/20"
        }`}
      >
        <item.icon size={17} />
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-semibold leading-snug truncate transition-colors ${
            item.placeholder
              ? "text-gray-400 italic"
              : "text-gray-800 group-hover:text-[#2AA7FF]"
          }`}
        >
          {item.title}
        </p>
        <p
          className={`text-xs truncate transition-colors ${
            item.placeholder ? "text-gray-400 italic" : "text-gray-500"
          }`}
        >
          {item.subtitle}
        </p>
      </div>
    </div>
    {item.period && (
      <span className="shrink-0 whitespace-nowrap text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
        {item.period}
      </span>
    )}
  </div>
);

const Group: React.FC<{ icon: LucideIcon; label: string; rows: Row[] }> = ({
  icon,
  label,
  rows,
}) => (
  <div className="group/group">
    <GroupHeading icon={icon} label={label} />
    <div className="mt-3 divide-y divide-gray-100/80">
      {rows.map((row, i) => (
        <RowItem key={i} item={row} index={i} />
      ))}
    </div>
  </div>
);

/* ================= COMPONENT ================= */
const EducationSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/60 via-white to-gray-50/60 py-20 md:py-28">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2AA7FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2AA7FF]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2AA7FF]/[0.02] rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2AA7FF]/10 text-[#2AA7FF] text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2AA7FF]"></span>
            Background
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900">
            Qualifications &{" "}
            <span className="bg-gradient-to-r from-[#2AA7FF] to-[#6BC5FF] bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Dr. Anarul Islam&apos;s academic background, certifications,
            clinical practice, and community involvement — at a glance.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: academic track */}
          <div className="rounded-2xl border border-gray-100/80 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/70 transition-all duration-300 space-y-8">
            <Group icon={GraduationCap} label="Education" rows={EDUCATION} />
            <Group
              icon={BadgeCheck}
              label="Certifications & Training"
              rows={CERTIFICATES}
            />
            <Group icon={Trophy} label="Honors & Recognition" rows={AWARDS} />
          </div>

          {/* RIGHT: professional track */}
          <div className="rounded-2xl border border-gray-100/80 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/70 transition-all duration-300 space-y-8">
            <Group
              icon={Stethoscope}
              label="Clinical Experience"
              rows={EXPERIENCE}
            />
            <Group icon={Users} label="Beyond The Clinic" rows={LEADERSHIP} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
