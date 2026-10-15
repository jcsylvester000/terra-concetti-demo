import { statusLabel, type Project } from "@/content/projects";
import { StatusChip } from "./status-chip";

export function ProjectStatusChip({ project, className }: { project: Pick<Project, "salesStatus">; className?: string }) {
  return <StatusChip status={statusLabel(project)} className={className} />;
}
