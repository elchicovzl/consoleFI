import {
    ArrowDownToLine,
    ArrowRightToLine,
    ArrowUpCircle,
    ArrowUpToLine,
    CheckCircle2,
    Circle,
    HelpCircle,
    XCircle,
  } from "lucide-react"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "Pending",
      label: "Pending",
      icon: Circle,
    },
    {
      value: "expired",
      label: "Expired",
      icon: ArrowUpCircle,
    },
    {
      value: "Active",
      label: "Active",
      icon: CheckCircle2,
    },
    {
      value: "sold",
      label: "Sold",
      icon: XCircle,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDownToLine,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRightToLine,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUpToLine,
    },
  ]