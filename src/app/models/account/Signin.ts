export interface Signin {
  /**
   * @RegEx \@"^\d{11}$" (the first backslash is an escape)
   * @StringLength 60
   */
  telNo: string;
  /** 
  * @Rrequired 
  * @MinLength 4
  */
  password: string;
  token?: string;
}