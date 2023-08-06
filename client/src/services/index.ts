import { ProcessStatementType } from "@/types";
import { api } from "@/utils";

export async function searchEntity(uen: string) {
  return api(`request/entitySearch/${uen}`);
}

export async function getTransactionId() {
  return api("bank-statement/initialTransaction");
}

export async function uploadFile(formData: any) {
  return api("bank-statement/upload", {
    method: "POST",
    body: formData,
  });
}

export async function processStatement(payload: ProcessStatementType) {
  return api("bank-statement/process/statements", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function submitForm(payload: any) {
  return api("request/submit", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });
}
