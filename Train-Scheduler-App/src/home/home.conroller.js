export async function authorize() {
  const response = await fetch("http://20.244.56.144/train/auth", {
    method: "POST",
    body: JSON.stringify({
      companyName: "hardikdheer afformed",
      clientID: "f79617af-2f69-42a6-bc26-81c8be7270af",
      clientSecret: "LTCUuMjkYCfDYflx",
      ownerName: "hardik",
      ownerEmail: "hardikdheer@gmail.com",
      rollNo: "05320802720",
    }),
  });
  const data = await response.json();
  return data;
}
