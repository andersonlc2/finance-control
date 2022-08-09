export type fields = {
  name: String,
  message: String
}

export type error = {
  name: String,
  email: String,
  password: String,
  confirmPassword: String
}

export type objectError = {
  dateTime: String,
  status: String,
  title: String,
  fields: fields[]
}
