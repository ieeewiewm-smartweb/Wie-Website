export interface LeaderData {
    name: string;
    role: string;
    description: string;
    image: string;
}

export const defaultMembers: LeaderData[] = [
    {
        name: "Dr. Satvik Khara",
        role: "Mentor",
        description:
            "Dean, College of Technology, Silver Oak University; IEEE Senior Member; Chairperson, Professional Activity Committee, IEEE Gujarat Section; Advisor, Silver Oak University IEEE Computer Society Student Branch Chapter; Founding Member, Silver Oak University IEEE Student Branch.",
        image: "http://ieee.socet.edu.in/wp-content/uploads/2025/05/satviksir.jpg",
    },
    {
        name: "Prof. Gaurav Tiwari",
        role: "Faculty Advisor",
        description:
            "Assistant Professor, Department of Computer Engineering, College of Technology; Advisor, Silver Oak University IEEE Women In Engineering Student Branch Affinity Group",
        image: "http://ieee.socet.edu.in/wp-content/uploads/2025/07/gaurav-sir.png",
    },
    {
        name: "Deshna Shah",
        role: "Chairperson",
        description: "",
        image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/19.png",
    },
    {
        name: "Milan Sehgal",
        role: "Vice Chairperson",
        description: "",
        image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/20.png",
    },
    {
        name: "Maruf Fatema Mansuri",
        role: "Secretary",
        description: "",
        image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/21.png",
    },
    {
        name: "Price Sabalpara",
        role: "Treasurer",
        description: "",
        image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/22.png",
    },
    {
        name: "Suhani Singh",
        role: "Webmaster",
        description: "",
        image: "http://ieee.socet.edu.in/wp-content/uploads/2026/02/23.png",
    },
];

export default defaultMembers;
