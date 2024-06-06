import axios from "@/lib/axios";

export async function getPersonHomeData() {
  const popular = await axios.get<Person[]>("/getPopular", { params: { type: "person" } });

  return {
    popular: popular.data,
  };
}
