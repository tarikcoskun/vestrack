import axios from "@/lib/axios";

export async function getPersonInfo(id: string) {
  const res = await axios.get<PersonInfo>("/getPersonInfo", { params: { id: id.split("-").pop() } });
  return res.data;
}
