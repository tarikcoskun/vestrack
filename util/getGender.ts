enum Gender {
  "Not specified",
  "Female",
  "Male",
  "Non-binary",
}

export const getGender = (gender: number) => Gender[gender];
