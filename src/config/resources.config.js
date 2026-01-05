import { IoFileTrayStacked } from "react-icons/io5";
import { FaNotesMedical } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";

export const RESOURCES = {
    policies: {
        title: "Policies & Procedures",
        description:
            "Practice policies, documentation standards, consent forms, and compliance guidance.",
        icon: IoFileTrayStacked,
        items: [
            {
                id: "insync-manual",
                title: "Insync User Manual",
                description: "Step-by-step guide to using Insync EHR effectively.",
                type: "pdf",
                tags: ["ehr", "documentation", "scheduling", "billing", "intakes", "consult calls"],
                embedUrl:"https://drive.google.com/file/d/1srvIwBuFSjzsDW1fskkQIjOzb_JPHWwN/preview ",
                driveUrl: "https://docs.google.com/document/d/1srvIwBuFSjzsDW1fskkQIjOzb_JPHWwN/edit",
            },
        ],
    },
    clinical: {
        title: "Clinical Tools",
        description:
            "Assessment tools, therapy frameworks, diagnostic resources, and clinical references.",
        icon: FaNotesMedical,
    },
    training: {
        title: "Training & Supervision",
        description:
            "Intern materials, onboarding, supervision expectations, and recorded trainings.",
        icon: FaRegLightbulb,
    },
    admin: {
        title: "Admin & Operations",
        description:
            "Scheduling, billing guidance, payroll, PTO, and internal workflows.",
        icon: LuNotebookPen,
    },  
}