
import { Tooltip } from "@mui/material";

type PropsType = {
  output: {
    registrant?: { name: string },
    technicalContact?: { name: string },
    administrativeContact?: { name: string },
    contactEmail: string
  }
};

export default function ContactTable({ output }: PropsType) {
  return (
    <div className="flex flex-wrap justify-between gap-8">
      <Tooltip title={output.registrant?.name || "N/A"}>
        <div>
          <div className="font-bold text-neutral-700">Registrant Name</div>
          <div>{output.registrant?.name || "N/A"}</div>
        </div>
      </Tooltip>
      <Tooltip title={output.technicalContact?.name || "N/A"}>
        <div>
          <div className="font-bold text-neutral-700">Technical Contact Name</div>
          <div>{output.technicalContact?.name || "N/A"}</div>
        </div>
      </Tooltip>
      <Tooltip title={output.administrativeContact?.name || "N/A"}>
        <div>
          <div className="font-bold text-neutral-700">Administrative Contact Name</div>
          <div>{output.administrativeContact?.name || "N/A"}</div>
        </div>
      </Tooltip>
      <Tooltip title={output.contactEmail || "N/A"}>
        <div>
          <div className="font-bold text-neutral-700">Contact Email</div>
          <div>{output.contactEmail || "N/A"}</div>
        </div>
      </Tooltip>
    </div>
  )
}
