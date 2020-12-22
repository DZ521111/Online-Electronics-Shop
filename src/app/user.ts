export interface User
{
  fname: string;
  lname: string;
  email: string;
  password: string;
  cpassword?: string;
  roles?: any[];
}

