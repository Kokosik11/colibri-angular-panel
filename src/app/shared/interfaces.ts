
export interface User {
  email: string,
  password: string
}

export interface IProject {
  _id: string,
  title: string,
  imageURL: string,
  link: string,
  isPublished?: boolean
}
