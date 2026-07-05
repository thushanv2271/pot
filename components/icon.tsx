import {
  Award,
  Boxes,
  Cloud,
  Database,
  FlaskConical,
  GitPullRequest,
  GraduationCap,
  Monitor,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  Video,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Award,
  Boxes,
  Cloud,
  Database,
  FlaskConical,
  GitPullRequest,
  GraduationCap,
  Monitor,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  Video,
  Workflow,
  Wrench,
  Zap,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
