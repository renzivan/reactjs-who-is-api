import { Tooltip } from "@mui/material";
import { formatDate } from "../lib/utils";

type PropsType = {
  output: {
    domainName: string,
    registrarName: string,
    createdDate: string,
    expiresDate: string,
    estimatedDomainAge: string,
    nameServers?: { hostNames: string[] }
  }
};

export default function DomainTable({ output }: PropsType) {
  return (
    <div className="flex flex-wrap justify-between gap-8">
      <Tooltip title={output.domainName}>
        <div>
          <div className="font-bold text-neutral-700">Domain Name</div>
          <div>{output.domainName}</div>
        </div>
      </Tooltip>
      <Tooltip title={output.registrarName}>
        <div>
          <div className="font-bold text-neutral-700">Registrar</div>
          <div>{output.registrarName}</div>
        </div>
      </Tooltip>
      <Tooltip title={output.createdDate && formatDate(output.createdDate)}>
        <div>
          <div className="font-bold text-neutral-700">Registration Date</div>
          <div>{output.createdDate && formatDate(output.createdDate)}</div>
        </div>
      </Tooltip>
      <Tooltip title={output.createdDate && formatDate(output.expiresDate)}>
        <div>
          <div className="font-bold text-neutral-700">Expiration Date</div>
          <div>{output.createdDate && formatDate(output.expiresDate)}</div>
        </div>
      </Tooltip>
      <Tooltip title={output.estimatedDomainAge}>
        <div>
          <div className="font-bold text-neutral-700">Estimated Domain Age</div>
          <div>{output.estimatedDomainAge} day(s)</div>
        </div>
      </Tooltip>
      <div className="w-48">
        <Tooltip title={output.nameServers?.hostNames.join(", ")}>
          <div>
            <div className="font-bold text-neutral-700">Hostnames</div>
            <div className="truncate text-ellipsis overflow-hidden">
              {output.nameServers?.hostNames.join(", ")}
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
